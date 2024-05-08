import {
  BadGatewayException,
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class SelfUserGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('Unauthorized user(Authorization)');
    }
    const bearer = authHeader.split(' ')[0];
    const token = authHeader.split(' ')[1];
    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException('Unauthorized user(Token Not Found)');
    }

    async function verify(token: string, jwtService: JwtService) {
      let user: any;

      try {
        user = await jwtService.verify(token, {
          secret: process.env.ACCESS_TOKEN_KEY,
        });
        if(user.admin){
          return true;
        }
      } catch (error) {
        throw new BadRequestException(error.message);
      }

      if (!user || !user.role) {
        throw new UnauthorizedException('Unauthorized user');
      }

      if (!user.is_active) {
        throw new BadGatewayException('User is not activated');
      }

      req.user = user;

      console.log(req.user.sub);
      console.log(req.params.id);

      if (String(req.user.sub) != req.params.id) {
        throw new ForbiddenException({
          message: 'Ruxsat etilmagan foydalanuvchi',
        });
      }
      return true;
    }

    return verify(token, this.jwtService);

  }
}

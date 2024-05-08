import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class SelfCreatorGuard implements CanActivate {
  constructor(private readonly jwtService : JwtService){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException('Unauthorized admin(Authorization)');
    }
    const bearer = authHeader.split(' ')[0];
    const token = authHeader.split(' ')[1];
    if (bearer != 'Bearer' || !token) {
      throw new UnauthorizedException('Unauthorized admin(Token Not Found)');
    }
    let admin: any;
    async function verify(token: string, jwtService: JwtService) {
      try {
        admin = await jwtService.verify(token, {
          secret: process.env.ACCESS_TOKEN_KEY,
        });

        if (!admin || admin.role) {
          throw new UnauthorizedException('Unauthorized admin');
        }

        if (!admin.admin.is_creator || admin.role) {
          throw new UnauthorizedException({
            message: 'Admin account is not creator',
          });
        }
      } catch (error) {
        throw new BadRequestException(error.message);
      }
      req.admin = admin;
      if (String(req.admin.admin.id) !== req.params.id) {
        throw new ForbiddenException({
          message:
            'Access denied. You are not authorized to access this creator',
        });
      }
      return true;
    }
    return verify(token, this.jwtService);
  }
}

import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { err } from 'neverthrow';
import { Observable } from 'rxjs';

@Injectable()
export class SelfAdminGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw err(new UnauthorizedException('Unauthorized admin'));
    }
    const bearer = authHeader.split(' ')[0];
    const token = authHeader.split(' ')[1];
    if (bearer != 'Bearer' || !token) {
      throw new UnauthorizedException('Unauthorized admin');
    }
    let admin: any;
    async function verify(token: string, jwtService: JwtService) {
      try {
        admin = await jwtService.verify(token, {
          secret: process.env.ACCESS_TOKEN_KEY,
        });
      } catch (error) {
        throw new BadRequestException(error.message);
      }
      if (!admin || admin.role) {
        throw new UnauthorizedException('Unauthorized Admin');
      }
      req.admin = admin;
      console.log(req.admin);

      if (String(req.admin.admin.id) != req.params.id) {
        throw new ForbiddenException({
          message: 'Ruxsat etilmagan admin',
        });
      }

      return true;
    }
    return verify(token, this.jwtService);
  }
}

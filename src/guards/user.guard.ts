import { CanActivate, Injectable, ExecutionContext, UnauthorizedException, BadGatewayException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class UserGuard implements CanActivate {
   constructor(private readonly jwtService: JwtService) {
   }
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
            throw new UnauthorizedException('Invalid token');
         }

         if (!user || !user.role) {
            throw new UnauthorizedException('Unauthorized user');
         }
         
         if (!user.is_active) {
            throw new BadGatewayException('User is not activated');
         }

         req.user = user;
         return true;
      }

      return verify(token, this.jwtService);
   }
}
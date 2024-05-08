import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException("Unauthorized admin(Authorization)");
    }
    const bearer = authHeader.split(" ")[0];
    const token = authHeader.split(" ")[1];
    if (bearer != "Bearer" || !token) {
      throw new UnauthorizedException("Unauthorized admin(Token Not Found)");
    }
    let admin: any;
    async function verify(token: string, jwtService: JwtService) {
      try {
        admin = await jwtService.verify(token, {
          secret: process.env.ACCESS_TOKEN_KEY,
        });
        console.log(admin);
      } catch (error) {
        throw new BadRequestException(error.message);
      }
      if (!admin || admin.role) {
        throw new UnauthorizedException("Unauthorized admin");
      }
      req.admin = admin;
      return true;
    }
    return verify(token, this.jwtService);
  }
}

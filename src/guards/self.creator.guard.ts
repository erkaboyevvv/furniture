import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class SelfCreatorGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    // Check if req.creator exists
    if (!req.creator) {
      throw new ForbiddenException({
        message: 'Creator information not found',
      });
    }

    console.log('req.creator ', req.creator);
    console.log('req.query.id  ', req.params.id); // Assuming ID is passed as a query parameter

    // Compare doctor ID with the ID passed in the query
    if (String(req.creator.id) !== req.params.id) {
      throw new ForbiddenException({
        message: 'Access denied. You are not authorized to access this creator',
      });
    }

    // Return true if all conditions pass
    return true;
  }
}

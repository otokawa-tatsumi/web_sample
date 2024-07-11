import { Injectable, CanActivate, ExecutionContext, UnauthorizedException  } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    if (!request.isAuthenticated()) {
      throw new UnauthorizedException('Not authenticated');
    }
    return true;
  }
}

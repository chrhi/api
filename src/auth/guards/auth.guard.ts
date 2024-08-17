import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const authantication = request.headers.authorization; // Bearer <token>

    const token = authantication.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const tokenPayload = await this.jwtService.verifyAsync(token);

      request.user = {
        userId: tokenPayload.sub,
        email: tokenPayload.email,
      };

      return true;
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}

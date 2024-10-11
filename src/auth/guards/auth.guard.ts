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
    const authorization = request.headers.authorization;

    console.log(authorization);

    try {
      const tokenPayload = await this.jwtService.verifyAsync(authorization);

      request.user = {
        userId: tokenPayload.sub,
        email: tokenPayload.email,
      };

      return true;
    } catch (err) {
      console.log(err);
      throw new UnauthorizedException('Invalid token');
    }
  }
}

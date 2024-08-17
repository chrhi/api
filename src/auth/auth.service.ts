import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthInput, AuthResult, SignInData } from './utils/types';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}
  async validateUser(input: AuthInput): Promise<User | null> {
    const user = await this.userService.findUserByEmail({ email: input.email });

    if (!user) {
      return null;
    }

    const isValid = await bcrypt.compare(input.password, user.password);

    if (!isValid) {
      return null;
    }
    return user;
  }

  async signIn(user: SignInData): Promise<AuthResult> {
    const tokenPayload = {
      sub: user.userId,
      email: user.email,
    };

    const accessToken = await this.jwtService.signAsync(tokenPayload);
    return { accessToken, userId: user.userId, email: user.email };
  }

  async authanticate(input: AuthInput): Promise<AuthResult | null> {
    const user = await this.validateUser(input);

    if (!user) {
      throw new UnauthorizedException();
    }

    return this.signIn({
      email: user?.email,
      userId: user?.id,
    });
  }

  async getUserById(input: { id: string }): Promise<User | null> {
    const user = await this.userService.findUserById({ id: input.id });

    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }
}

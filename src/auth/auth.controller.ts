import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() input: { email: string; password: string }) {
    const data = await this.authService.authanticate({
      password: input.password,
      email: input.email,
    });

    console.log('this is the data returned from the auth service', data);
    return data;
  }

  @UseGuards(AuthGuard)
  @Get('/user-info')
  async getUserInfo(@Request() request) {
    const user = await this.authService.getUserById(request.user.userId);

    return user;
  }
}

import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/create')
  async createUser(
    @Body()
    input: {
      email: string;
      password: string;
      fname: string;
      phone: string;
    },
  ): Promise<User> {
    try {
      const user = await this.usersService.create({
        email: input.email,
        fname: input.fname,
        password: input.password,
        phone: input.phone,
      });

      return user;
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException(err);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  async getUserProfile(@Req() req) {
    const user = await this.usersService.getUserProfile(req?.user.userId);
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('verification-code')
  async getVerificationCode(@Req() req) {
    await this.usersService.generateVerificationCode(req?.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('verify-email')
  async verifyUser(
    @Body()
    input: {
      code: string;
    },
  ) {
    await this.usersService.verifyEmail(Number(input.code));
  }
}

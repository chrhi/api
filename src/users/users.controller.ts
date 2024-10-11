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
// import { AuthGuard } from 'src/auth/guards/auth.guard';
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
      phone: number;
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
  async getUserProfile(@Req() req): Promise<User> {
    try {
      console.log('this is the userId from the attached request');
      console.log(req?.user?.userId);
      const userId = req?.user?.userId;
      const user = await this.getUserProfile(userId);
      return user;
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException(err);
    }
  }
}

import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '@prisma/client';

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
}

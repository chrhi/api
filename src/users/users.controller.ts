import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('all-users')
  async getAllUsers(): Promise<User[]> {
    const users = await this.usersService.getAllUsers();

    console.log('here are all the users', users);
    return users;
  }

  @Get('/id/:id')
  async getUserById(@Param('id') id: string): Promise<User> {
    try {
      const user = await this.usersService.findUserById({
        id,
      });

      return user;
    } catch (err) {
      throw new NotFoundException();
    }
  }

  @Get('/email/:email')
  async findUserByEmail(@Param('id') email: string): Promise<User> {
    try {
      const user = await this.usersService.findUserByEmail({
        email,
      });

      return user;
    } catch (err) {
      throw new NotFoundException();
    }
  }

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
    console.log(input);
    try {
      const user = await this.usersService.createUser({
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

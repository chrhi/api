import { Controller, Get } from '@nestjs/common';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUserById(): string {
    return this.usersService.getUserById();
  }

  getAllUsers(): string {
    return this.usersService.getUserById();
  }

  createUser(): string {
    return this.usersService.getUserById();
  }

  deleteUser(): string {
    return this.usersService.getUserById();
  }
}

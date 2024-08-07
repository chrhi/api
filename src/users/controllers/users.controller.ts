import { Controller, Get } from '@nestjs/common';
import { UsersService } from '../services/users.service';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUser(): string {
    return this.usersService.getUserById();
  }
}

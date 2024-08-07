import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';

@Module({
  imports: [PrismaModule],
  providers: [UsersService],
  exports: [],
  controllers: [UsersController],
})
export class UserModule {}

import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { EmailService } from 'src/email/email.service';

@Module({
  providers: [UsersService, PrismaService, EmailService],
  exports: [UsersService],
})
export class UsersModule {}

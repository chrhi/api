import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './email/email.module';

@Module({
  imports: [UserModule, AuthModule, EmailModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

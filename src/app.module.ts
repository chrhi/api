import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './email/email.module';
import { ProtectedController } from './products/protected.controller';
import { ConfigModule } from '@nestjs/config';
import { UsersController } from './users/users.controller';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    EmailModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [ProtectedController, UsersController],
  providers: [],
})
export class AppModule {}

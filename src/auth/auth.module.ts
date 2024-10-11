import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthGuard } from './guards/auth.guard';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, LocalStrategy, JwtAuthGuard, AuthGuard],
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET!,
      signOptions: { expiresIn: '1d' },
    }),
    PassportModule,
  ],
  exports: [AuthService, JwtAuthGuard, AuthGuard],
})
export class AuthModule {}

// JwtModule.registerAsync({
//   imports: [ConfigModule],
//   useFactory: async (configService: ConfigService) => ({
//     secret: configService.get<string>('JWT_SECRET'),
//     signOptions: { expiresIn: '1h' },
//   }),
//   inject: [ConfigService],
// }),

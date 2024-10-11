import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { EmailService } from 'src/email/email.service';
import { generateRandomSixDigitNumber } from './utils';

type TUser = {
  fname: string;
  password: string;
  phone: string;
  email: string;
};

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private resend: EmailService,
  ) {}

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async generateVerificationCode(userId: string) {
    const code = generateRandomSixDigitNumber();

    const user = await this.prisma.user.findFirst({ where: { id: userId } });
    const verificationCode = await this.prisma.verificationCode.create({
      data: {
        code: code,
        type: 'CONFIRM_EMAIL',
        userId,
        isActive: true,
      },
    });

    this.resend.sendVerificationCode(user.email, verificationCode.id);
  }

  async verifyEmail(code: number) {
    const verification = await this.prisma.verificationCode.findFirst({
      where: {
        code: code,
        isActive: true,
        type: 'CONFIRM_EMAIL',
      },
    });

    if (!verification) {
      throw new BadRequestException('Invalid or expired verification code');
    }

    await this.prisma.user.update({
      where: { id: verification.userId },
      data: { verified: true },
    });

    await this.prisma.verificationCode.update({
      where: { id: verification.id },
      data: { isActive: false },
    });

    return true;
  }

  async create(userData: TUser) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = await this.prisma.user.create({
      data: {
        email: userData.email,
        fname: userData.fname,
        lname: 'later',
        phone: userData.phone,
        password: hashedPassword,
        verified: false,
      },
    });

    await this.generateVerificationCode(user.id);

    return user;
  }

  async getUserProfile(userId: string) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...user } = await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    return user;
  }
}

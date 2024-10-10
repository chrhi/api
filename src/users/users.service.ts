import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { EmailService } from 'src/email/email.service';

type TUser = {
  fname: string;
  password: string;
  phone: number;
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

  async generateConfirmationCode(userId: string, userEmail: string) {
    const verificationCode = await this.prisma.verificationCode.create({
      data: {
        code: 'RAYAN_IS_ANGRY',
        type: 'CONFIRM_EMAIL',
        userId,
        isActive: true,
      },
    });

    this.resend.sendVerificationCode(userEmail, verificationCode.id);
  }

  async confirmeUserAccount(userId: string) {
    const code = await this.prisma.verificationCode.findFirst({
      where: {
        userId,
      },
    });

    if (!code.isActive) {
      return 'user already activated';
    }

    const user = this.prisma.user.update({
      where: {
        id: code.userId,
      },
      data: {
        verified: true,
      },
    });

    return user;
  }

  async create(userData: TUser) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = await this.prisma.user.create({
      data: {
        email: userData.email,
        fname: userData.fname,
        lname: 'later',
        phone: Number(userData.phone),
        password: hashedPassword,
        verified: false,
      },
    });

    await this.generateConfirmationCode(user.id, user.email);

    return user;
  }
}

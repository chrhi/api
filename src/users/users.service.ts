import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

type TUser = {
  fname: string;

  password: string;
  phone: number;
  email: string;
};

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findUserById({ id }: { id: string }): Promise<User> {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          id,
        },
      });

      return user;
    } catch (err) {
      throw new NotFoundException();
    }
  }
  async findUserByEmail({ email }: { email: string }): Promise<User> {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          email,
        },
      });

      return user;
    } catch (err) {
      throw new NotFoundException();
    }
  }

  async createUser(user: TUser) {
    const saltOrRounds = 10;

    try {
      const hash = await bcrypt.hash(user?.password, saltOrRounds);
      const dbUser = await this.prisma.user.create({
        data: {
          ...user,
          verified: false,
          password: hash,
          lname: 'later',
          phone: Number(user?.phone),
        },
      });

      return dbUser;
    } catch (err) {
      console.error(err);
      throw new InternalServerErrorException();
    }
  }

  async getAllUsers() {
    const users = await this.prisma.user.findMany();

    return users;
  }
}

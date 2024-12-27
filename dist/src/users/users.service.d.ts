import { PrismaService } from 'src/prisma/prisma.service';
import { EmailService } from 'src/email/email.service';
type TUser = {
    fname: string;
    password: string;
    phone: string;
    email: string;
};
export declare class UsersService {
    private prisma;
    private resend;
    constructor(prisma: PrismaService, resend: EmailService);
    findByEmail(email: string): Promise<any>;
    generateVerificationCode(userId: string): Promise<void>;
    verifyEmail(code: number): Promise<boolean>;
    create(userData: TUser): Promise<any>;
    getUserProfile(userId: string): Promise<any>;
}
export {};

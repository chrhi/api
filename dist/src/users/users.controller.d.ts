import { UsersService } from './users.service';
import { User } from '@prisma/client';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    createUser(input: {
        email: string;
        password: string;
        fname: string;
        phone: string;
    }): Promise<User>;
    getUserProfile(req: any): Promise<any>;
    getVerificationCode(req: any): Promise<void>;
    verifyUser(input: {
        code: string;
    }): Promise<void>;
}

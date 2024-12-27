"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = require("bcrypt");
const email_service_1 = require("../email/email.service");
const utils_1 = require("./utils");
let UsersService = class UsersService {
    constructor(prisma, resend) {
        this.prisma = prisma;
        this.resend = resend;
    }
    async findByEmail(email) {
        return this.prisma.user.findUnique({ where: { email } });
    }
    async generateVerificationCode(userId) {
        const code = (0, utils_1.generateRandomSixDigitNumber)();
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
    async verifyEmail(code) {
        const verification = await this.prisma.verificationCode.findFirst({
            where: {
                code: code,
                isActive: true,
                type: 'CONFIRM_EMAIL',
            },
        });
        if (!verification) {
            throw new common_1.BadRequestException('Invalid or expired verification code');
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
    async create(userData) {
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
    async getUserProfile(userId) {
        const { password, ...user } = await this.prisma.user.findFirst({
            where: {
                id: userId,
            },
        });
        return user;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        email_service_1.EmailService])
], UsersService);
//# sourceMappingURL=users.service.js.map
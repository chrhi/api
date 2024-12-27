export declare class EmailService {
    private resend;
    constructor();
    sendVerificationCode(to: string, code: string): Promise<void>;
}

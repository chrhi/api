import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';

@Injectable()
export class EmailService {
  private resend: Resend;

  constructor() {
    this.resend = new Resend(process.env.RESEND_API_KEY);
  }

  async sendVerificationCode(to: string, code: string): Promise<void> {
    try {
      const subject = 'Your Verification Code';
      const html = `
        <h1>Verification Code</h1>
        <p>Your verification code is: <strong>${code}</strong></p>
      `;

      const response = await this.resend.emails.send({
        from: 'noreply@jethings.com',
        to,
        subject,
        html,
      });

      console.log('Email sent successfully:', response);
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send verification email');
    }
  }
}

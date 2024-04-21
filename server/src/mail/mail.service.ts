import { Injectable } from '@nestjs/common';
import { User } from '../user/entities/user.entity';
import { sendMail } from './mail';
import { resetPasswordTemplate } from './resetPasswordTemplate';

@Injectable()
export class MailService {
  async sendPasswordResetEmail(user: User, token: string) {
    sendMail(
      {
        from: 'aipuameh.16@gmail.com',
        to: user.email,
        subject: 'Chic Days: Reset Your Password',
        html: resetPasswordTemplate(token, user.id),
      },
      () => {
        console.log('password reset email sent');
      },
    );
  }
}

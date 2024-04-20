import { Injectable } from '@nestjs/common';
import { User } from '../user/entities/user.entity';

@Injectable()
export class MailService {
  async sendPasswordResetEmail(user: User, token: string) {
    console.log('USER:', user);
    console.log('TOKEN:', token);
    return 'HI';
  }
}

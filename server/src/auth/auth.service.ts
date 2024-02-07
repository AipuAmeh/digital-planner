import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async login(username: string, pass: string) {
    const user = await this.userService.findOneUser(username);
    if (user?.password !== pass) {
      console.log('USER:', user);
    } else {
      console.log('NO USER');
    }

    // if (user?.password !== pass) {
    //   throw new UnauthorizedException();
    // }
    // const { password, ...result } = user;
    // TODO: Generate a JWT and return it here
    // instead of the user object

    // return result;
  }
}

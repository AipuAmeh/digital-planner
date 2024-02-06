import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService) {}

  async login(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOneUser(username);
    console.log(user);
    // if (user?.password !== pass) {
    //   throw new UnauthorizedException();
    // }
    // const { password, ...result } = user;
    // TODO: Generate a JWT and return it here
    // instead of the user object

    // return result;
  }
}

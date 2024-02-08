import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(username: string, pass: string) {
    const user = await this.userService.findOneUser(username);
    if (user !== null) {
      const passwordsMatch = await bcrypt.compare(pass, user.password);
      if (!passwordsMatch) {
        throw new UnauthorizedException();
      }
      const payload = { sub: user.id, username: user.username };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } else {
      console.log('user does not exist');
    }
  }

  async hashPassword(password) {
    return await bcrypt.hash(password, 10);
  }

  async signup(email, username, password) {
    const hashedPassword = await this.hashPassword(password);
    const user = await this.userService.createUser(
      email,
      username,
      hashedPassword,
    );
    console.log('USER:', user);
  }
}
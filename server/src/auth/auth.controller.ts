import { Body, Post, Controller } from '@nestjs/common';
import { AuthService } from './auth.service';

type LoginDTO = {
  username: string;
  password: string;
};

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/user')
  async createUser(@Body() body: LoginDTO) {
    console.log(body.username, body.password);
    return await this.authService.login(body.username, body.password);
  }
}

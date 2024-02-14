import { 
  Body,
  Post,
  Controller,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

type LoginDTO = {
  username: string;
  password: string;
};

type SignupDTO = {
  email: string;
  username: string;
  password: string;
};
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() body: LoginDTO) {
    console.log(body.username, body.password);
    return await this.authService.login(body.username, body.password);
  }

  @Post('/signup')
  async signup(@Body() body: SignupDTO) {
    console.log(body);
    return await this.authService.signup(
      body.email,
      body.username,
      body.password,
    );
  }

  @UseGuards(AuthGuard)
  @Get('/profile')
  getUserData(@Request() req) {
    if (req.user) {
      const username = req.user.username;
      return this.authService.getUser(username);
    } else {
      return 'No User';
    }
  }
}

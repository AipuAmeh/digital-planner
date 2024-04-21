import {
  Body,
  Post,
  Controller,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { CreateTodoDto } from './dto/create-todo.dto';
import {
  IsEmail,
  IsNotEmpty,
  IsStrongPassword,
  MinLength,
} from 'class-validator';
import { Transform } from 'class-transformer';
import * as sanitizeHtml from 'sanitize-html';

type LoginDTO = {
  username: string;
  password: string;
};

// put these in separate files for dtos
export class Email {
  @IsEmail(undefined, { message: 'Please enter a valid email address.' })
  @Transform((params) => sanitizeHtml(params.value))
  email: string;
}
export class AccountDetailDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  field: string;

  @IsNotEmpty()
  value: string;
}

export class NewPasswordDTO {
  @IsNotEmpty()
  @MinLength(8, { message: 'Password must be a minimum of 8 characters.' })
  @Transform((params) => sanitizeHtml(params.value))
  @IsStrongPassword({
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  newPassword: string;

  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  token: string;
}
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() body: LoginDTO) {
    return await this.authService.login(body.username, body.password);
  }

  @Post('/signup')
  async signup(@Body() body: CreateUserDto) {
    return await this.authService.signup(body);
  }

  @UseGuards(AuthGuard)
  @Post('/change-account-details')
  async changeAccountDetails(@Body() accountDetailDTO: AccountDetailDto) {
    return this.authService.changeAccountDetails(accountDetailDTO);
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

  @UseGuards(AuthGuard)
  @Get('/user-todos')
  getUserTodos(@Request() req) {
    console.log(req.user);
    if (req.user) {
      const username = req.user.username;
      return this.authService.getUser(username);
    } else {
      return 'No User';
    }
  }

  @UseGuards(AuthGuard)
  @Post('/create-todo')
  async createTodo(@Body() createTodoDto: CreateTodoDto, @Request() req) {
    return this.authService.createTodo(
      createTodoDto.todo,
      createTodoDto.reflectionText,
      createTodoDto.priority,
      req.user.sub,
    );
  }

  @Post('/reset-password')
  sendResetPasswordEmail(@Body() body: Email) {
    return this.authService.sendResetPasswordEmail(body.email);
  }

  @Post('/save-new-password')
  saveNewPassword(@Body() body: NewPasswordDTO) {
    return this.authService.saveNewPassword(
      body.newPassword,
      body.id,
      body.token,
    );
  }
}

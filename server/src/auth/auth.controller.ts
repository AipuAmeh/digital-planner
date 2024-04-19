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
import { IsNotEmpty } from 'class-validator';

type LoginDTO = {
  username: string;
  password: string;
};

export class AccountDetailDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  field: string;

  @IsNotEmpty()
  value: string;
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
}

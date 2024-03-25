import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { TodoService } from 'src/todo/todo.service';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { User } from 'src/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// import { CreateTodoDto } from './dto/create-todo.dto';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private todoService: TodoService,
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

  async signup(CreateUserDto: CreateUserDto) {
    const hashedPassword = await this.hashPassword(CreateUserDto.password);
    const user = await this.userService.createUser({
      email: CreateUserDto.email,
      username: CreateUserDto.username,
      password: hashedPassword,
    });
    if (user) {
      const payload = { sub: user.id, username: user.username };
      return { access_token: await this.jwtService.signAsync(payload) };
    }
  }

  async getUser(username: string) {
    const user = await this.userService.findOneUser(username);
    console.log(user);
    if (user == null) {
      throw new UnauthorizedException();
    } else {
      return {
        password: user.password,
        email: user.email,
        username: user.username,
        id: user.id,
      };
    }
  }

  async createTodo(
    todo: string,
    reflectionText: string,
    priority: string,
    userId: number,
  ) {
    return await this.todoService.createTodo(
      todo,
      reflectionText,
      priority,
      userId,
    );
  }
}

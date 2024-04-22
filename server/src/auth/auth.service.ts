import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { TodoService } from '../todo/todo.service';
import { AccountDetailDto } from './auth.controller';
import { User } from '../user/entities/user.entity';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private mailService: MailService,
    private jwtService: JwtService,
    private todoService: TodoService,
  ) { }

  async createAccessToken(user: User, secret?: string) {
    const payload = { sub: user.id };

    if (secret) {
      return this.jwtService.signAsync(payload, {
        secret,
        expiresIn: '10m',
      });
    } else {
      return await this.jwtService.signAsync(payload);
    }
  }

  // add createAccessToken to this function for cleanliness
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
      throw new Error('user does not exist');
    }
  }

  async hashPassword(password) {
    return await bcrypt.hash(password, 10);
  }

  async signup(CreateUserDto: CreateUserDto) {
    const hashedPassword = await this.hashPassword(CreateUserDto.password);
    const existingUser = await this.userService.findOneUser(
      CreateUserDto.username,
    );
    const user = await this.userService.createUser({
      email: CreateUserDto.email,
      username: CreateUserDto.username,
      password: hashedPassword,
    });
    if (user === existingUser) {
      throw new Error('user already exists.');
    } else if (user) {
      const payload = { sub: user.id, username: user.username };
      return { access_token: await this.jwtService.signAsync(payload) };
    }
  }

  async sendResetPasswordEmail(email: string) {
    const user = await this.userService.findUserByEmail(email);
    if (user === null) {
      throw new BadRequestException('email not found');
    }
    const token = await this.createAccessToken(user, user.password);

    return await this.mailService.sendPasswordResetEmail(user, token);
  }

  async saveNewPassword(newPassword: string, id: number, token: string) {
    const user = await this.userService.findUserById(id);
    await this.jwtService
      .verifyAsync(token, {
        secret: user.password,
      })
      .catch(() => {
        throw new UnauthorizedException('token is invalid');
      })
      .then(async () => {
        const hashedPassword = await this.hashPassword(newPassword);
        user.password = hashedPassword;
        return await this.userService.createUser(user);
      });
  }

  async changeAccountDetails(accountDetailDTO: AccountDetailDto) {
    const user = await this.userService.findOneUser(accountDetailDTO.username);
    console.log('FIELD', accountDetailDTO.field);
    console.log('VALUE', accountDetailDTO.value);
    if (accountDetailDTO.field === 'password') {
      const plainTextPassword = accountDetailDTO.value;
      const hashPassword = await this.hashPassword(plainTextPassword);
      user[accountDetailDTO.field] = hashPassword;
    } else {
      user[accountDetailDTO.field] = accountDetailDTO.value;
    }
    const updatedUser = await this.userService.createUser(user);
    return {
      username: updatedUser.username,
      email: updatedUser.email,
    };
  }

  async getUser(username: string) {
    const user = await this.userService.findOneUser(username);
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

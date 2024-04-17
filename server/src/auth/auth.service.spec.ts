import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { TodoService } from '../todo/todo.service';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Todo } from '../todo/entities/todo.entity';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';
// import { access } from 'fs';

describe('AuthService', () => {
  let service: AuthService;
  let userService: UserService;
  let jwtService: JwtService;
  let todoService: TodoService;

  const mockUserRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
  };

  const mockTodoRepository = {
    find: jest.fn(),
    save: jest.fn(),
    findOneBy: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        UserService,
        TodoService,
        JwtService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
        {
          provide: getRepositoryToken(Todo),
          useValue: mockTodoRepository,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
    todoService = module.get<TodoService>(TodoService);
  });

  it('authService should be defined', () => {
    expect(service).toBeDefined();
  });

  it('userService should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('jwtService should be defined', () => {
    expect(jwtService).toBeDefined();
  });

  it('todoService should be defined', () => {
    expect(todoService).toBeDefined();
  });

  it('login => should return an access token when a username and password is presented', async () => {
    const username = 'aameh';
    const hashedPassword = '********';
    const user = {
      id: 1,
      username: 'aameh',
      email: 'aameh@test.com',
      password: 'Password*12',
    } as User;
    jest.spyOn(mockUserRepository, 'findOne').mockReturnValue(user);
    const result = await userService.findOneUser(username);
    expect(result).toEqual(user);
    expect(mockUserRepository.findOne).toHaveBeenCalled();
    expect(mockUserRepository.findOne).toHaveBeenCalledWith({
      where: { username },
    });

    // test jwt Service
    if (user !== null) {
      const passwordsMatch = await bcrypt.compare(
        hashedPassword,
        user.password,
      );
      if (!passwordsMatch) {
        throw new UnauthorizedException();
      }
      const payload = { sub: user.id, username: user.username };
      return {
        access_token: await jwtService.signAsync(payload),
      };
    } else {
      console.log('user does not exist');
    }
    jest.spyOn(service, 'login').mockResolvedValue(user);
  });
});

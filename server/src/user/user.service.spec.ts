import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

describe('UserService', () => {
  let service: UserService;

  const mockUserRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
      }],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findUserById => it should find user by exisiting ID', async () => {
    const id = 1;
    const user = {
      id: 1,
      username: 'aameh',
      email: 'aameh@test.com',
      password: 'Password*12',
    } as User;
    jest.spyOn(mockUserRepository, 'findOne').mockReturnValue(user);
    const result = await service.findUserById(id);
    expect(result).toEqual(user);
    expect(mockUserRepository.findOne).toHaveBeenCalled();
    expect(mockUserRepository.findOne).toHaveBeenCalledWith({ where: { id } });
  });

  it('findOneUser => it should find user by username', async () => {
    const username = 'aameh';
    const user = {
      id: 1,
      username: 'aameh',
      email: 'aameh@test.com',
      password: 'Password*12',
    } as User;
    jest.spyOn(mockUserRepository, 'findOne').mockReturnValue(user);
    const result = await service.findOneUser(username);
    expect(result).toEqual(user);
    expect(mockUserRepository.findOne).toHaveBeenCalled();
    expect(mockUserRepository.findOne).toHaveBeenCalledWith({
      where: { username },
    });
  });

  it('findAllUsers => it should return all users', async () => {
    const users = [
      {
        id: 1,
        username: 'aameh',
        email: 'aameh@test.com',
        password: 'Password*12',
      },
      {
        id: 2,
        username: 'test',
        email: 'testh@test.com',
        password: 'Password*12',
      },
    ];
    jest.spyOn(mockUserRepository, 'find').mockReturnValue(users);
    const result = await service.findAllUsers();
    expect(result).toEqual(users);
    expect(mockUserRepository.find).toHaveBeenCalled();
  });

  it('createUser => should return the user object that is passed into the method with an id property', async () => {
    const createUserDto = {
      username: 'aameh',
      email: 'aameh@test.com',
      password: 'Password*12',
    } as CreateUserDto;
    const user = {
      id: 1,
      username: 'aameh',
      email: 'aameh@test.com',
      password: 'Password*12',
    };

    jest.spyOn(mockUserRepository,'save').mockReturnValue(user);
    const result = await service.createUser(createUserDto);
    expect(result).toEqual(user);
    expect(mockUserRepository.save).toHaveBeenCalled();
    expect(mockUserRepository.save).toHaveBeenCalledWith(createUserDto);
  });

  it('removeUser => should return a user object that corresponds to id passed in', async () => {
    const id = 1;
    const user = {
      id: 1,
      username: 'aameh',
      email: 'aameh@test.com',
      password: 'Password*12',
    };
    jest.spyOn(mockUserRepository,'delete').mockReturnValue(user);
    const result = await service.removeUser(id);
    expect(result).toEqual(user);
    expect(mockUserRepository.delete).toHaveBeenCalled();
    expect(mockUserRepository.delete).toHaveBeenCalledWith(id);
  });
});

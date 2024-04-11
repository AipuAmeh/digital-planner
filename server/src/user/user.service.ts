import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createUser(user: CreateUserDto) {
    return await this.userRepository.save({ ...user });
  }

  findAllUsers() {
    return this.userRepository.find();
  }

  async findOneUser(username: string) {
    return await this.userRepository.findOne({ where: { username } });
  }

  async findUserById(id: number) {
    return await this.userRepository.findOne({ where: { id } });
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const updatedUser: User = new User();
    updatedUser.email = updateUserDto.email;
    updatedUser.username = updateUserDto.username;
    updatedUser.password = updateUserDto.password;
    updatedUser.id = id;
    return await this.userRepository.save(updatedUser);
  }

  removeUser(id: number): Promise<{ affected?: number }> {
    return this.userRepository.delete(id);
  }
}

import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { TodoModule } from 'src/todo/todo.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => TodoModule)],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}

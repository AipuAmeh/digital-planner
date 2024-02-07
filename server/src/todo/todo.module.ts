import { Module, forwardRef } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Todo]), forwardRef(() => UserModule)],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}

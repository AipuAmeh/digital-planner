import { Module, forwardRef } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Todo]), forwardRef(() => UserModule)],
  providers: [TodoService],
  exports: [TodoService],
})
export class TodoModule {}

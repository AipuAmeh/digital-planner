import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TodoService } from './todo.service';
// import { CreateTodoDto } from '../auth/dto/create-todo.dto';
import { UpdateTodoDto } from '../auth/dto/update-todo.dto';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  findAllTodos() {
    return this.todoService.findAllTodos();
  }

  @Get(':id')
  findOneTodo(@Param('id') id: string) {
    return this.todoService.findOneTodo(+id);
  }

  @Patch(':id')
  updateTodo(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.updateTodo(+id, updateTodoDto);
  }

  @Delete(':id')
  removeTodo(@Param('id') id: string) {
    return this.todoService.removeTodo(+id);
  }
}

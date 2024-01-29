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
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post('')
  async createTodo(@Body() createTodoDto: CreateTodoDto) {
    console.log(createTodoDto);
    // return 'IT WORKS';
    return this.todoService.createTodo(createTodoDto);
  }

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

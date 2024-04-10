import { Controller, Get, Body, Patch, Param, Delete } from '@nestjs/common';
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

  @Get('/find-user-projects/:id')
  findUserProjects(@Param('id') id: string) {
    return this.todoService.findUserProjects(+id);
  }

  @Patch(':id')
  updateTodo(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.updateTodo(+id, updateTodoDto);
  }

  @Patch('/mark-complete/:id')
  markTaskAsComplete(@Param('id') id: string) {
    return this.todoService.markTaskAsComplete(+id);
  }

  @Patch('/mark-incomplete/:id')
  markTaskIncomplete(@Param('id') id: string) {
    return this.todoService.markTaskIncomplete(+id);
  }

  @Delete(':id')
  removeTodo(@Param('id') id: string) {
    return this.todoService.removeTodo(+id);
  }
}

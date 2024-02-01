import { Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo) private readonly todoRepository: Repository<Todo>,
  ) {}

  createTodo(createTodoDto: CreateTodoDto): Promise<Todo> {
    const newTodo: Todo = new Todo();
    newTodo.todo = createTodoDto.todo;
    newTodo.reflectionText = createTodoDto.reflectionText;
    newTodo.todaysDate = createTodoDto.todaysDate;
    return this.todoRepository.save(newTodo);
  }

  findAllTodos(): Promise<Todo[]> {
    return this.todoRepository.find();
  }

  findOneTodo(id: number): Promise<Todo> {
    return this.todoRepository.findOneBy({ id });
  }

  updateTodo(id: number, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    const updatedTodo: Todo = new Todo();
    updatedTodo.todo = updateTodoDto.todo;
    updatedTodo.reflectionText = updateTodoDto.todo;
    updatedTodo.id = id;
    return this.todoRepository.save(updatedTodo);
  }

  removeTodo(id: number): Promise<{ affected?: number }> {
    return this.todoRepository.delete(id);
  }
}

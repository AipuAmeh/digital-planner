import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoDto } from '../auth/dto/create-todo.dto';
import { UpdateTodoDto } from '../auth/dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo) private todoRepository: Repository<Todo>,
  ) {}

  async findUserProjects(id: number): Promise<Todo[]> {
    return await this.todoRepository.find({ where: { user: { id } } });
  }

  async createTodo(createTodoDto: CreateTodoDto) {
    // await this.todoRepository.save({
    //   todo: createTodoDto.todo,
    //   reflectionText: createTodoDto.reflectionText,
    //   priority: createTodoDto.priority,
    //   userId: createTodoDto.id,
    // });
    // return this.findUserProjects(createTodoDto.id);
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

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { CreateTodoDto } from '../auth/dto/create-todo.dto';
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

  async createTodo(
    todo: string,
    reflectionText: string,
    priority: string,
    userId: number,
  ) {
    await this.todoRepository.save({
      todo,
      reflectionText,
      priority,
      user: {
        id: userId,
      },
    });
    return this.findUserProjects(userId);
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
    updatedTodo.reflectionText = updateTodoDto.reflectionText;
    updatedTodo.priority = updateTodoDto.priority;
    updatedTodo.id = id;
    return this.todoRepository.save(updatedTodo);
  }

  async markTaskAsComplete(id: number) {
    const todo = await this.findOneTodo(id);
    if (!todo) {
      throw new Error('No task found');
    }
    todo.completed = true;
    return this.todoRepository.save(todo);
  }

  // markTaskAsUncomplete for returning it back to false??

  removeTodo(id: number): Promise<{ affected?: number }> {
    return this.todoRepository.delete(id);
  }
}

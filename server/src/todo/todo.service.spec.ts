import { Test, TestingModule } from '@nestjs/testing';
import { TodoService } from './todo.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { UpdateTodoDto } from '../auth/dto/update-todo.dto';

describe('TodoService', () => {
  let service: TodoService;
  const mockTodoRepository = {
    find: jest.fn(),
    save: jest.fn(),
    findOneBy: jest.fn(),
    delete: jest.fn(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodoService,
        {
          provide: getRepositoryToken(Todo),
          useValue: mockTodoRepository,
        },
      ],
    }).compile();

    service = module.get<TodoService>(TodoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findUserProjects => returns a users project when given an id', async () => {
    const id = 1;
    const userProjects = [
      {
        id: 1,
        todo: 'test task',
        reflectionText: 'test task reflection',
        priority: 'high',
        completed: false,
      },
      {
        id: 2,
        todo: 'test task',
        reflectionText: 'test task reflection',
        priority: 'high',
        completed: false,
      },
    ];
    jest.spyOn(mockTodoRepository, 'find').mockReturnValue(userProjects);
    const result = await service.findUserProjects(id);
    expect(result).toEqual(userProjects);
    expect(mockTodoRepository.find).toHaveBeenCalled();
    expect(mockTodoRepository.find).toHaveBeenCalledWith({
      where: { user: { id } },
    });
  });

  it('createTodo => should return todo projects created by specific user', async () => {
    const todo = 'Task';
    const reflectionText = 'reflectionText';
    const priority = 'high';
    const userId = 1;
    const userProjects = ['ProjectA', 'ProjectB'];

    service.findUserProjects = jest.fn().mockResolvedValue(userProjects);

    const result = await service.createTodo(
      todo,
      reflectionText,
      priority,
      userId,
    );
    expect(result).toEqual(userProjects);
    expect(mockTodoRepository.save).toHaveBeenCalledWith({
      todo,
      reflectionText,
      priority,
      user: {
        id: userId,
      },
    });
    expect(service.findUserProjects).toHaveBeenCalledWith(userId);
  });

  it('findAllTodos => returns all todos in database', async () => {
    const todos = [
      {
        id: 1,
        todo: 'test task',
        reflectionText: 'test task reflection',
        priority: 'high',
        userId: 1,
        completed: false,
      },
      {
        id: 2,
        todo: 'test task',
        reflectionText: 'test task reflection',
        priority: 'high',
        userId: 1,
        completed: false,
      },
    ];
    jest.spyOn(mockTodoRepository, 'find').mockReturnValue(todos);
    const result = await service.findAllTodos();
    expect(result).toEqual(todos);
    expect(mockTodoRepository.find).toHaveBeenCalled();
  });

  it('findOneTodo => returns a todo found through its unique id property', async () => {
    const id = 1;
    const todo = {
      id: 1,
      todo: 'test task',
      reflectionText: 'test task reflection',
      priority: 'high',
      userId: 1,
      completed: false,
      todaysDate: '2024-04-11',
    };
    jest.spyOn(mockTodoRepository, 'findOneBy').mockReturnValue(todo);
    const result = await service.findOneTodo(id);
    expect(result).toEqual(todo);
    expect(mockTodoRepository.findOneBy).toHaveBeenCalled();
    expect(mockTodoRepository.findOneBy).toHaveBeenCalledWith({ id });
  });

  it('updateTodo => returns new todo object with id of original todo', async () => {
    const todoId = 2;
    const updateTodoDto = {
      todo: 'Updated Todo',
      reflectionText: 'Updated Reflection Text',
      priority: 'high',
    } as UpdateTodoDto;

    const updatedTodo: Todo = new Todo();
    updatedTodo.todo = updateTodoDto.todo;
    updatedTodo.reflectionText = updateTodoDto.reflectionText;
    updatedTodo.priority = updateTodoDto.priority;
    updatedTodo.id = todoId;
    jest.spyOn(mockTodoRepository, 'save').mockReturnValue(updatedTodo);
    const result = await service.updateTodo(todoId, updateTodoDto);
    expect(result).toEqual(updatedTodo);
    expect(mockTodoRepository.save).toHaveBeenCalled();
    expect(mockTodoRepository.save).toHaveBeenCalledWith(updatedTodo);
  });

  it('removeTodo => deletes a todo and returns the entity that should be deleted', async () => {
    const id = 1;
    const todo = {
      id: 1,
      todo: 'test',
      reflectionText: 'test text',
      priority: 'high',
      completed: false,
    };
    jest.spyOn(mockTodoRepository, 'delete').mockReturnValue(todo);
    const result = await service.removeTodo(id);
    expect(result).toEqual(todo);
    expect(mockTodoRepository.delete).toHaveBeenCalled();
    expect(mockTodoRepository.delete).toHaveBeenCalledWith(id);
  });

  it('markTaskAsComplete => should return a new todo object with completed marked as true', async () => {
    const id = 1;
    const incompleteTodo = {
      id: 1,
      todo: 'test',
      reflectionText: 'test text',
      priority: 'high',
      completed: false,
    };
    const completedTodo = {
      id: 1,
      todo: 'test',
      reflectionText: 'test text',
      priority: 'high',
      completed: true,
    };
    jest.spyOn(mockTodoRepository, 'findOneBy').mockReturnValue(incompleteTodo);
    if (!incompleteTodo) {
      throw new Error('No task found');
    }
    expect(mockTodoRepository.findOneBy).toHaveBeenCalled();
    expect(mockTodoRepository.findOneBy).toHaveBeenCalledWith({ id });
    jest.spyOn(mockTodoRepository, 'save').mockReturnValue(completedTodo);
    const result = await service.markTaskAsComplete(id);
    expect(result).toEqual(completedTodo);
  });
});

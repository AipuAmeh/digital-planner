import { Test, TestingModule } from '@nestjs/testing';
import { TodoService } from './todo.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';

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

  // it('createTodo => should return todo projects created by specific user', async () => {
  //   // const userId = 1;
  //   const expectedTodo = {
  //     id: 1,
  //     todo: 'test task',
  //     reflectionText: 'test task reflection',
  //     priority: 'high',
  //     userId: 1,
  //     completed: false,
  //   };
  //   jest.spyOn(mockTodoRepository, 'save').mockReturnValue(expectedTodo);
  //   const result = await service.createTodo(
  //     'test task',
  //     'test task reflection',
  //     'high',
  //     1,
  //   );
  //   expect(result).toEqual(expectedTodo);
  // });

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

  // it('updateTodo => returns new todo object with id of original todo', async () => {
  //   const todoId = 2;
  //   const updateTodoDto = {
  //     todo: 'Updated Todo',
  //     reflectionText: 'Updated Reflection Text',
  //     priority: 'high',
  //   } as UpdateTodoDto;

  //   const updatedTodo = {
  //     id: 2,
  //     todo: 'Updated Todo',
  //     reflectionText: 'Updated Reflection Text',
  //     priority: 'high',
  //   };
  //   jest.spyOn(mockTodoRepository, 'save').mockReturnValue(updatedTodo);
  //   const result = await service.updateTodo(todoId, updateTodoDto);
  //   expect(result).toEqual(updateTodoDto);
  // });
});

// import { PartialType } from '@nestjs/mapped-types';
// import { CreateTodoDto } from './create-todo.dto';

import { IsNotEmpty, Length } from 'class-validator';

export class UpdateTodoDto {
  @Length(5, 100)
  // @Transform((params) => sanitizeHtml(params.value))
  todo: string;

  @Length(10, 250)
  @IsNotEmpty()
  // @Transform((params) => sanitizeHtml(params.value))
  reflectionText: string;

  priority: string;

  completed: boolean;
}

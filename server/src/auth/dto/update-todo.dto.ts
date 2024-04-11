import { Transform } from 'class-transformer';
import * as sanitizeHtml from 'sanitize-html';
import { Length } from 'class-validator';

export class UpdateTodoDto {
  @Length(3, 100)
  @Transform((params) => sanitizeHtml(params.value))
  todo: string;

  @Length(5, 250)
  @Transform((params) => sanitizeHtml(params.value))
  reflectionText: string;

  priority: string;

  completed: boolean;
}

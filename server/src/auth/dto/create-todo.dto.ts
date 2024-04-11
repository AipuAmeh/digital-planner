import { Transform } from 'class-transformer';
import { Length } from 'class-validator';
import * as sanitizeHtml from 'sanitize-html';

export class CreateTodoDto {
  @Length(3, 100)
  @Transform((params) => sanitizeHtml(params.value))
  todo: string;

  @Length(5, 250)
  @Transform((params) => sanitizeHtml(params.value))
  reflectionText: string;

  priority: string;
}

import { Transform } from 'class-transformer';
import { Length, IsNotEmpty } from 'class-validator';
import sanitizeHtml from 'sanitize-html';

export class CreateTodoDto {
  @Length(5, 100)
  // @Transform((params) => sanitizeHtml(params.value))
  todo: string;

  @Length(10, 250)
  @IsNotEmpty()
  // @Transform((params) => sanitizeHtml(params.value))
  reflectionText: string;

  priority: string;

  // @IsNotEmpty()
  // id: number;
}

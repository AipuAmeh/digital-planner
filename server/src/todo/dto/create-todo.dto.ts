import { Length, IsNotEmpty, IsDate } from 'class-validator';

export class CreateTodoDto {
  @Length(10, 100)
  todo: string;

  @Length(10, 250)
  @IsNotEmpty()
  reflectionText: string;

  @IsDate(null)
  todaysDate: Date;
}

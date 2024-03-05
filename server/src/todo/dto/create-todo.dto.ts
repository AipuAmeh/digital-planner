import { Length, IsNotEmpty } from 'class-validator';

export class CreateTodoDto {
  @Length(5, 100)
  todo: string;

  @Length(10, 250)
  @IsNotEmpty()
  reflectionText: string;

  priority: string;
  // @IsDate()
  // todaysDate: Date;
}

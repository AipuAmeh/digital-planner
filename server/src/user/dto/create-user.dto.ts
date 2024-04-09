import {
  IsAlphanumeric,
  IsEmail,
  IsNotEmpty,
  MinLength,
} from 'class-validator';
import * as sanitizeHtml from 'sanitize-html';
import { Transform } from 'class-transformer';
// think about password matching

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  @Transform((params) => sanitizeHtml(params.value))
  email: string;

  @IsNotEmpty()
  @MinLength(3, { message: 'Username must have a minimum of three characters' })
  @IsAlphanumeric()
  @Transform((params) => sanitizeHtml(params.value))
  username: string;

  @IsNotEmpty()
  @MinLength(8, { message: 'Password must be a minimum of 8 characters.' })
  password: string;
}

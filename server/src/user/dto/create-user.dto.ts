import {
  IsAlphanumeric,
  IsEmail,
  IsNotEmpty,
  Matches,
  MinLength,
} from 'class-validator';

// think about password matching
const passwordRegEx =
  '^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,20}$';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(3, { message: 'Username must have a minimum of three characters' })
  @IsAlphanumeric()
  username: string;

  @IsNotEmpty()
  @MinLength(8, { message: 'Password must be a minimum of 8 characters.' })
  // @Matches(passwordRegEx)
  password: string;
}

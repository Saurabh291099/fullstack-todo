import {
  IsString,
  IsNumber,
  IsEmail,
  MinLength,
  MaxLength,
  IsOptional,
  Length,
  Matches
} from 'class-validator';

export class SignupDto {
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name: string;

  @IsString()
  @Matches(/^[0-9]+$/, { message: 'Phone number must contain only digits' })
  @Length(10, 10, { message: 'Phone number must be exactly 10 digits' })
  phoneNumber: string;

  @IsString()
  @IsOptional()
  gender?: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}

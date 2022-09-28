import { IsString, IsEmail, MinLength, MaxLength,IsEnum,IsOptional } from 'class-validator'
import { Roles } from '../../enum/enum'

export class EmailDto{
  @IsEmail({}, {
    message: 'email does`t correct',
  })
  email: string

}

export class AuthDto extends EmailDto{

  @IsString()
  @MinLength(4, {
    message: 'Title is too short',
  })
  @MaxLength(10, {
    message: 'Title is too long',
  })
  password: string

  @IsOptional()
  @IsEnum(Roles, {
    message: 'May be enum',
  })
  role?: Roles
}



import { ApiProperty, } from '@nestjs/swagger'
import { IsNotEmpty, } from 'class-validator'

export class SignInUserDto {
  @IsNotEmpty()
  @ApiProperty()
  username: string

  @IsNotEmpty()
  @ApiProperty()
  password: string
}
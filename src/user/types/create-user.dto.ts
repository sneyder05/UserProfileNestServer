import { ApiProperty, } from '@nestjs/swagger'
import { IsNotEmpty, IsPositive, } from 'class-validator'

export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty()
  username: string

  @IsNotEmpty()
  @ApiProperty()
  password: string

  @IsNotEmpty()
  @ApiProperty()
  name: string

  @IsNotEmpty()
  @ApiProperty()
  address: string

  @IsNotEmpty()
  @IsPositive({})
  @ApiProperty()
  cityId: number
}
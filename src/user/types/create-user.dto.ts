import { IsNotEmpty, IsPositive, } from 'class-validator'

export class CreateUserDto {
  @IsNotEmpty()
  username: string

  @IsNotEmpty()
  password: string

  @IsNotEmpty()
  name: string

  @IsNotEmpty()
  address: string

  @IsNotEmpty()
  @IsPositive({})
  cityId: number
}
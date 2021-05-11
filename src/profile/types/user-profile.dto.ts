import { ApiProperty, } from '@nestjs/swagger'

export class UserProfileDto {
  @ApiProperty()
  id: number

  @ApiProperty()
  name: string

  @ApiProperty()
  address: {
    street: string,
    city: string,
    country: string,
  }
}
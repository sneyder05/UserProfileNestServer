import { Controller, Post, } from '@nestjs/common'
import { AuthService, } from 'src/auth/auth.service'
import { UserService, } from './user.service'

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService, private readonly authService: AuthService) {}

  @Post('/signIn')
  async signIn(): Promise<any> {
    const user = await this.userService.signIn()
    const token = await this.authService.generateAccessToken()

    return token
  }
}
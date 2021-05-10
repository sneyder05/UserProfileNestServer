import { Injectable, } from '@nestjs/common'
import { JwtService, } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  generateAccessToken(): any {
    const token = this.jwtService.sign({
      user: {
        id: 999,
      },
    })

    return {
      access_token: token,
    }
  }
}
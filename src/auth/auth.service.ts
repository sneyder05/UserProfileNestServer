import { Injectable, } from '@nestjs/common'
import { JwtService, } from '@nestjs/jwt'
import { TokenType, } from 'src/util/constants.util'
import { JwtPayload, JwtSigned, } from './types/jwt.type'

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  generateAccessToken(payload: JwtPayload): JwtSigned {
    const token = this.jwtService.sign(payload)

    return {
      token_type: TokenType.Bearer,
      access_token: token,
    }
  }
}
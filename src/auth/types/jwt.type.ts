import { TokenType, } from 'src/util/constants.util'

export type JwtPayload = {
  id: number,
  username: string,
}

export type JwtSigned = {
  token_type?: TokenType,
  access_token: string
}
import { Injectable, UnauthorizedException, } from '@nestjs/common'
import { PassportStrategy, } from '@nestjs/passport'
import { ExtractJwt, Strategy, } from 'passport-jwt'
import { AppConfigService, } from 'config/app/app.service'
import { UserDto, } from 'user/types/user.dto'
import { UserService, } from 'user/user.service'
import { JwtPayload, } from '../types/jwt.type'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(public readonly appConfigService: AppConfigService, private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: appConfigService.jwt.secret,
    })
  }

  async validate(payload: JwtPayload): Promise<UserDto> {
    try {
      const user = await this.userService.getById(payload.id)

      return user
    } catch (error) {
      throw new UnauthorizedException()
    }
  }
}
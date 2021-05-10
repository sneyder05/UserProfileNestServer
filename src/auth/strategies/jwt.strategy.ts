import { Injectable, } from '@nestjs/common'
import { PassportStrategy, } from '@nestjs/passport'
import { ExtractJwt, Strategy, } from 'passport-jwt'
import { AppConfigService, } from 'src/config/app/app.service'
import { IJwtPayload, } from '../interfaces/jwt.interface'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private appConfigService: AppConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: appConfigService.jwt.secret,
    })
  }

  async validate(payload: IJwtPayload): Promise<any> {
    return { id: 777, }
  }
}
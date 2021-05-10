import { Injectable, } from '@nestjs/common'
import { ConfigService, } from '@nestjs/config'
import { JwtConfig, } from './types/jwt.types'

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService) {}

  get jwt(): JwtConfig {
    return {
      secret: this.configService.get<string>('app.jwt.secret'),
      expiresIn: this.configService.get<string>('app.jwt.expiresIn', '3600s'),
    }
  }
}
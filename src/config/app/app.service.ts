import { Injectable, } from '@nestjs/common'
import { ConfigService, } from '@nestjs/config'
import { AppSettingsConfig } from './types/appSettings.type'
import { JwtConfig, } from './types/jwt.type'
import { MySQLConfig, } from './types/mysql.type'
import { RedisConfig, } from './types/redis.type'

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService) {}

  get jwt(): JwtConfig {
    return {
      secret: this.configService.get<string>('app.jwt.secret'),
      expiresIn: this.configService.get<string>('app.jwt.expiresIn', '3600s'),
    }
  }

  get mysql(): MySQLConfig {
    return {
      host: this.configService.get<string>('app.mysql.host'),
      port: this.configService.get<number>('app.mysql.port'),
      user: this.configService.get<string>('app.mysql.user'),
      password: this.configService.get<string>('app.mysql.password'),
      connectionLimit: this.configService.get<number>('app.mysql.connectionLimit'),
      database: this.configService.get<string>('app.mysql.database'),
    }
  }

  get redis(): RedisConfig {
    return {
      host: this.configService.get<string>('app.redis.host'),
      port: this.configService.get<number>('app.redis.port'),
      ttl: this.configService.get<number>('app.redis.ttl'),
    }
  }

  get app(): AppSettingsConfig {
    return {
      port: this.configService.get<number>('app.settings.port'),
    }
  }
}
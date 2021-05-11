import { Module, } from '@nestjs/common'
import { NestMysql2Module, } from 'mysql2-nestjs'
import { AppConfigModule, } from './config/app/app.module'
import { AppConfigService, } from './config/app/app.service'
import { ProfileModule, } from './profile/profile.module'
import { UserModule, } from './user/user.module'

@Module({
  imports: [
    UserModule, ProfileModule,
    NestMysql2Module.registerAsync({
      imports: [ AppConfigModule, ],
      inject: [ AppConfigService, ],
      useFactory: async (appConfigService: AppConfigService) => ({
        waitForConnections: true,
        connectionLimit: appConfigService.mysql.connectionLimit,
        host: appConfigService.mysql.host,
        port: appConfigService.mysql.port,
        user: appConfigService.mysql.user,
        password: appConfigService.mysql.password,
        database: appConfigService.mysql.database,
        namedPlaceholders: true,
      }),
    }),
  ],
  controllers: [ ],
  providers: [ ],
})
export class AppModule {}

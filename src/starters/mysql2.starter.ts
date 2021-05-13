import { NestMysql2AsyncOptions, } from 'mysql2-nestjs'
import { AppConfigModule, } from 'config/app/app.module'
import { AppConfigService, } from 'config/app/app.service'

const getSetupForMysql2Module = (): NestMysql2AsyncOptions => ({
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
})

export default getSetupForMysql2Module
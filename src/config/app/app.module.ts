import { Module, } from '@nestjs/common'
import { ConfigModule, ConfigService, } from '@nestjs/config'
import appConfigRegister from './app.register'
import { AppConfigService, } from './app.service'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [ appConfigRegister, ],
    }),
  ],
  providers: [ ConfigService, AppConfigService, ],
  exports: [ ConfigService, AppConfigService, ],
})
export class AppConfigModule {}
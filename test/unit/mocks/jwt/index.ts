import { DynamicModule, } from '@nestjs/common'
import { JwtModule, } from '@nestjs/jwt'
import { AppConfigModule, } from 'config/app/app.module'
import { AppConfigService, } from 'config/app/app.service'

const JWT = {
  register: (): DynamicModule => {
    return JwtModule.registerAsync({
      imports: [ AppConfigModule, ],
      inject: [ AppConfigService, ],
      useFactory: async (appConfigService: AppConfigService) => ({
          secret: appConfigService.jwt.secret,
          signOptions: {
            expiresIn: appConfigService.jwt.expiresIn,
          },
      }),
    })
  },
}

export default JWT
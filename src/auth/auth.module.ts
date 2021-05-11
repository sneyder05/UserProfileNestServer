import { forwardRef, Module, } from '@nestjs/common'
import { JwtModule, } from '@nestjs/jwt'
import { AppConfigModule, } from 'src/config/app/app.module'
import { AppConfigService, } from 'src/config/app/app.service'
import { UserModule, } from 'src/user/user.module'
import { AuthService, } from './auth.service'
import { JwtStrategy, } from './strategies/jwt.strategy'

@Module({
  imports: [
    AppConfigModule,
    forwardRef(() => UserModule),
    JwtModule.registerAsync({
      imports: [ AppConfigModule, ],
      inject: [ AppConfigService, ],
      useFactory: async (appConfigService: AppConfigService) => ({
          secret: appConfigService.jwt.secret,
          signOptions: {
            expiresIn: appConfigService.jwt.expiresIn,
          },
      }),
    }),
  ],
  controllers: [ ],
  providers: [ AuthService, JwtStrategy, ],
  exports: [ AuthService, ],
})
export class AuthModule {}
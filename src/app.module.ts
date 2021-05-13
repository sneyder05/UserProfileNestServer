import { CacheInterceptor, CacheModule, Module, } from '@nestjs/common'
import { APP_INTERCEPTOR, } from '@nestjs/core'
import { NestMysql2Module, } from 'mysql2-nestjs'
import { ProfileModule, } from './profile/profile.module'
import { UserModule, } from './user/user.module'
import getSetupForMysql2Module from './starters/mysql2.starter'
import getSetupForRedisModule from './starters/redis.starter'
import { CountryModule, } from 'country/country.module'
import { CityModule, } from 'city/city.module'

@Module({
  imports: [
    UserModule, ProfileModule, CountryModule, CityModule,
    NestMysql2Module.registerAsync(getSetupForMysql2Module()),
    CacheModule.registerAsync(getSetupForRedisModule()),
  ],
  controllers: [ ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}

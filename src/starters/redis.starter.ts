import { CacheModuleAsyncOptions, } from '@nestjs/common'
import * as redisStore from 'cache-manager-redis-store'
import { AppConfigModule, } from 'config/app/app.module'
import { AppConfigService, } from 'config/app/app.service'

const getSetupForRedisModule = (): CacheModuleAsyncOptions => ({
  imports: [ AppConfigModule, ],
  inject: [ AppConfigService, ],
  useFactory: async (appConfigService: AppConfigService) => ({
    store: redisStore,
    host: appConfigService.redis.host,
    port: appConfigService.redis.port,
    ttl: appConfigService.redis.ttl,
  }),
})

export default getSetupForRedisModule
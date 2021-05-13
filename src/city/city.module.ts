import { Module, } from '@nestjs/common'
import { CityService, } from './city.service'

@Module({
  providers: [ CityService, ],
  exports: [ CityService, ],
})
export class CityModule {}
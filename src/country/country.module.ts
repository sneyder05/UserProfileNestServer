import { Module, } from '@nestjs/common'
import { CityModule, } from 'city/city.module'
import { CountryController, } from './country.controller'
import { CountryService, } from './country.service'

@Module({
  imports: [ CityModule, ],
  controllers: [ CountryController, ],
  providers: [ CountryService, ],
})
export class CountryModule {}
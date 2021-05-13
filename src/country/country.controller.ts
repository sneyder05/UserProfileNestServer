import { CacheTTL, Controller, Get, Param, } from '@nestjs/common'
import { ApiResponse, ApiTags, } from '@nestjs/swagger'
import { CityService, } from 'city/city.service'
import { SimpleCityDto, } from 'city/types/simple-city.dto'
import { StatusCodes, } from 'http-status-codes'
import SwaggerLiteApiResponse from 'swagger/builders/apiResponse-builder'
import GetCitiesByCountrySwaggerSchema from 'swagger/schemas/city/get-by-country.schema'
import GetAllCountriesSwaggerSchema from 'swagger/schemas/country/get-all.schema'
import { TimeDurationSec, } from 'util/constants.util'
import { CountryService, } from './country.service'
import { CountryDto, } from './types/country.dto'

@Controller('/countries')
@ApiTags('Country')
export class CountryController {
  constructor(private readonly countryService: CountryService, private readonly cityService: CityService) {}

  @Get()
  @ApiResponse(SwaggerLiteApiResponse(StatusCodes.OK, 'All countries', GetAllCountriesSwaggerSchema))
  @CacheTTL(TimeDurationSec.Day)
  async getAll(): Promise<CountryDto[]> {
    return this.countryService.getAll()
  }

  @Get('/:id/cities')
  @ApiResponse(SwaggerLiteApiResponse(StatusCodes.OK, 'Cities by country', GetCitiesByCountrySwaggerSchema))
  @CacheTTL(TimeDurationSec.Day)
  async getCitiesByCountry(@Param('id') id: number): Promise<SimpleCityDto[]> {
    return this.cityService.getByCountry(id)
  }
}
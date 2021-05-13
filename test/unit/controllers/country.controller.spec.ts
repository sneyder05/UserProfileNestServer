import { Test, } from '@nestjs/testing'
import { CityService, } from 'city/city.service'
import { SimpleCityDto, } from 'city/types/simple-city.dto'
import { CountryController, } from 'country/country.controller'
import { CountryService, } from 'country/country.service'
import { CountryDto, } from 'country/types/country.dto'
import MySQL2 from '../mocks/mysql2'

describe('[Controller] Country', () => {
  let countryController: CountryController
  let countryService: CountryService
  let cityService: CityService

  const mockedCountries: CountryDto[] = [
    { id: 1, name: 'Country 1', },
    { id: 2, name: 'Country 2', },
  ]

  const mockedCities: SimpleCityDto[] = [
    { id: 1, name: 'City 1', },
    { id: 2, name: 'City 2', },
  ]

  beforeEach(async () => {
    const cityModule = await Test.createTestingModule({
      providers: [
        MySQL2.simpleConnection(),
        CityService,
      ],
    }).compile()

    cityService = cityModule.get<CityService>(CityService)

    const countryModule = await Test.createTestingModule({
      controllers: [ CountryController, ],
      providers: [
        MySQL2.simpleConnection(),
        {
          provide: 'CityService',
          useValue: cityService,
        },
        CountryService,
      ],
    }).compile()

    countryService = countryModule.get<CountryService>(CountryService)
    countryController = countryModule.get<CountryController>(CountryController)
  })

  it('Get all', async () => {
    const countryServiceGetAllMock = jest.spyOn(countryService, 'getAll').mockImplementation(() => Promise.resolve(mockedCountries))

    const countries = await countryController.getAll()

    expect(countries).toBeDefined()
    expect(countryServiceGetAllMock).toHaveBeenCalled()
    expect(countries).toStrictEqual(mockedCountries)
  })

  it('Get cities by country', async () => {
    const cityServiceGetByCountryMock = jest.spyOn(cityService, 'getByCountry').mockImplementation(() => Promise.resolve(mockedCities))

    const cities = await countryController.getCitiesByCountry(1)

    expect(cities).toBeDefined()
    expect(cityServiceGetByCountryMock).toHaveBeenCalled()
    expect(cities).toStrictEqual(mockedCities)
  })
})
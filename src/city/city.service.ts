import { Injectable, } from '@nestjs/common'
import { RowDataPacket, } from 'mysql2'
import { InjectMysql, Mysql, } from 'mysql2-nestjs'
import { SimpleCityDto, } from './types/simple-city.dto'

@Injectable()
export class CityService {
  constructor(@InjectMysql() private readonly mysql: Mysql) {}

  async getByCountry(countryId: number): Promise<SimpleCityDto[]> {
    const query = 'SELECT id, name FROM city WHERE countryId = ?'
    const [ queryInfo, ] = await this.mysql.query(query, [ countryId, ])
    const result = queryInfo as RowDataPacket[]

    return result && result.length ? result as SimpleCityDto[] : []
  }
}
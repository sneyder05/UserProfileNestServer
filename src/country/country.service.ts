import { Injectable, } from '@nestjs/common'
import { RowDataPacket, } from 'mysql2'
import { InjectMysql, Mysql, } from 'mysql2-nestjs'
import { CountryDto, } from './types/country.dto'

@Injectable()
export class CountryService {
  constructor(@InjectMysql() private readonly mysql: Mysql) {}

  async getAll(): Promise<CountryDto[]> {
    const query = 'SELECT * FROM country'
    const [ queryInfo, ] = await this.mysql.query(query)
    const result = queryInfo as RowDataPacket[]

    return result && result.length ? result as CountryDto[] : []
  }
}
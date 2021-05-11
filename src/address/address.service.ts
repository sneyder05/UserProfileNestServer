import { Injectable, InternalServerErrorException, } from '@nestjs/common'
import { ResultSetHeader, } from 'mysql2'
import { InjectMysql, Mysql, } from 'mysql2-nestjs'
import { CreateAddressDto, } from './types/create-address.dto'

@Injectable()
export class AddressService {
  constructor(@InjectMysql() private readonly mysql: Mysql) {}

  async create(address: CreateAddressDto): Promise<number> {
    const query = 'INSERT INTO address VALUES (NULL, :cityId, :street)'
    const [ execInfo, ] = await this.mysql.execute(query, address)
    const result = execInfo as ResultSetHeader

    if (result.affectedRows) {
      return result.insertId
    }

    throw new InternalServerErrorException('Unable to save the address record')
  }
}
import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform, } from '@nestjs/common'
import { RowDataPacket, } from 'mysql2'
import { InjectMysql, Mysql, } from 'mysql2-nestjs'
import { GenericObject, } from 'src/types/generic'

@Injectable()
export class ValidateCityPipe implements PipeTransform {
  constructor(@InjectMysql() private readonly mysql: Mysql) { /**/ }

  async transform(value: GenericObject | number, metadata: ArgumentMetadata): Promise<GenericObject | number> {
    let cityId: number = null

    if (metadata.type === 'body') {
      cityId = (value as GenericObject).cityId
    } else if (metadata.type === 'param') {
      cityId = value as number
    }

    if (cityId) {
      const query = 'SELECT id FROM city WHERE id = ?'
      const [ rows, ] = await this.mysql.query(query, [ cityId, ])

      if (!rows || !(rows as RowDataPacket[]).length) {
        throw new BadRequestException(`Invalid city id '${cityId}'`)
      }
    } else {
      throw new BadRequestException('City id must be a valid value')
    }

    return value
  }
}
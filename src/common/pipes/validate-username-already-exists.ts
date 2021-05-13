import { ArgumentMetadata, BadRequestException, ConflictException, Injectable, PipeTransform, } from '@nestjs/common'
import { RowDataPacket, } from 'mysql2'
import { InjectMysql, Mysql, } from 'mysql2-nestjs'
import { GenericObject, } from 'types/generic'

@Injectable()
export class ValidateUsernameAlreadyExistsPipe implements PipeTransform {
  constructor(@InjectMysql() private readonly mysql: Mysql) { /**/ }

  async transform(value: GenericObject | string, metadata: ArgumentMetadata): Promise<GenericObject | string> {
    let username: string = null

    if (metadata.type === 'body') {
      username = (value as GenericObject).username
    } else if (metadata.type === 'param') {
      username = value as string
    }

    if (username) {
      const query = 'SELECT id FROM user WHERE LOWER(username) = ?'
      const [ rows, ] = await this.mysql.query(query, [ username.trim().toLowerCase(), ])

      if (rows && (rows as RowDataPacket[]).length) {
        throw new ConflictException(`The username '${username}' already exists`)
      }
    } else {
      throw new BadRequestException('Username must be a valid value')
    }

    return value
  }
}
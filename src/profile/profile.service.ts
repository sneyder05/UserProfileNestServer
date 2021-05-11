import { Injectable, InternalServerErrorException, NotFoundException, } from '@nestjs/common'
import { ResultSetHeader, RowDataPacket, } from 'mysql2'
import { InjectMysql, Mysql, } from 'mysql2-nestjs'
import { CreateProfileDto, } from './types/create-profile.dto'
import { UserProfileDto, } from './types/user-profile.dto'

@Injectable()
export class ProfileService {
  constructor(@InjectMysql() private readonly mysql: Mysql) {}

  async getByUserId(userId: number): Promise<UserProfileDto> {
    const query = `
      SELECT
        u.id, p.name, a.street, c.name AS city, ct.name AS country
      FROM
        user AS u
          INNER JOIN profile AS p ON p.userId = u.id
          INNER JOIN address AS a ON a.id = p.addressId
          INNER JOIN city AS c ON c.id = a.cityId
          INNER JOIN country AS ct ON ct.id = c.countryId
      WHERE
        u.id = ?
    `
    const [ queryInfo, ] = await this.mysql.query(query, [ userId, ])
    const result = queryInfo as RowDataPacket[]

    if (result && result.length) {
      const { id, name, street, city, country, } = result[0]

      return {
        id,
        name,
        address: {
          street,
          city,
          country,
        },
      }
    }

    throw new NotFoundException(`Unable to find a profile with id '${userId}'`)
  }

  async create(profile: CreateProfileDto): Promise<number> {
    const query = 'INSERT INTO profile VALUES (NULL, :userId, :addressId, :name)'
    const [ execInfo, ] = await this.mysql.execute(query, profile)
    const result = execInfo as ResultSetHeader

    if (result.affectedRows) {
      return result.insertId
    }

    throw new InternalServerErrorException('Unable to save the profile record')
  }
}
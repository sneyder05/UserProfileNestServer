import { Injectable, NotFoundException, } from '@nestjs/common'
import { ResultSetHeader, RowDataPacket, } from 'mysql2'
import { InjectMysql, Mysql, } from 'mysql2-nestjs'
import { CreateUserDto, } from './types/create-user.dto'
import { SignInUserDto, } from './types/signIn-user.dto'
import { UserDto, } from './types/user.dto'

@Injectable()
export class UserService {
  constructor(@InjectMysql() private readonly mysql: Mysql) {}

  async signIn(signIn: SignInUserDto): Promise<UserDto> {
    const query = 'SELECT * FROM user WHERE username = ? AND password = ?'
    const [ queryInfo, ] = await this.mysql.query(query, [ signIn.username, signIn.password, ])
    const result = queryInfo as RowDataPacket[]

    if (result && result.length) {
      return result[0] as UserDto
    }

    return null
  }

  async create(user: CreateUserDto): Promise<number> {
    const query = 'INSERT INTO user VALUES (NULL, :username, :password)'
    const [ execInfo, ] = await this.mysql.execute(query, user)
    const result = execInfo as ResultSetHeader

    if (result.affectedRows) {
      return result.insertId
    }

    return null
  }

  async getById(id: number): Promise<UserDto> {
    const query = 'SELECT * FROM user WHERE id = ?'
    const [ queryInfo, ] = await this.mysql.query(query, [ id, ])
    const result = queryInfo as RowDataPacket[]

    if (result && result.length) {
      return result[0] as UserDto
    }

    throw new NotFoundException(`Unable to find user with id '${id}'`)
  }
}
import { Injectable, } from '@nestjs/common'

@Injectable()
export class UserService {
  async signIn(): Promise<any> {
    return { id: 888, }
  }
}
import { Injectable, } from '@nestjs/common'

@Injectable()
export class ProfileService {
  get(): string {
    return 'ProfileService.get'
  }
}
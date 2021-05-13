import { forwardRef, Module, } from '@nestjs/common'
import { AddressModule, } from 'address/address.module'
import { AuthModule, } from 'auth/auth.module'
import { ProfileModule, } from 'profile/profile.module'
import { UserController, } from './user.controller'
import { UserService, } from './user.service'

@Module({
  imports: [
    forwardRef(() => AuthModule),
    ProfileModule,
    AddressModule,
  ],
  controllers: [ UserController, ],
  providers: [ UserService, ],
  exports: [ UserService, ],
})
export class UserModule {}
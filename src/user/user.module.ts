import { forwardRef, Module, } from '@nestjs/common'
import { AddressModule, } from 'src/address/address.module'
import { AuthModule, } from 'src/auth/auth.module'
import { ProfileModule, } from 'src/profile/profile.module'
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
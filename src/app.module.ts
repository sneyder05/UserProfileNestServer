import { Module, } from '@nestjs/common'
import { ProfileModule, } from './profile/profile.module'
import { UserModule, } from './user/user.module'

@Module({
  imports: [
    UserModule, ProfileModule,
  ],
  controllers: [ ],
  providers: [ ],
})
export class AppModule {}

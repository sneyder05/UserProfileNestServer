import { Controller, Get, UseGuards, } from '@nestjs/common'
import { AuthGuard, } from '@nestjs/passport'
import { AuthUser, } from 'src/common/decorators/authUser.decorator'
import { ProfileService, } from './profile.service'

@Controller('/users/profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  get(@AuthUser() user): string {
    console.log('TCL -> ~ file: profile.controller.ts ~ line 13 ~ ProfileController ~ get ~ user', user)
    return this.profileService.get()
  }
}
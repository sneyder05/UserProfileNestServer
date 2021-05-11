import { Controller, Get, UseGuards, } from '@nestjs/common'
import { AuthGuard, } from '@nestjs/passport'
import { ApiBearerAuth, ApiResponse, ApiTags, } from '@nestjs/swagger'
import { StatusCodes, } from 'http-status-codes'
import { AuthUser, } from 'src/common/decorators/authUser.decorator'
import SwaggerLiteApiResponse from 'src/swagger/builders/apiResponse-builder'
import UserProfileSwaggerSchema from 'src/swagger/schemas/profile/user-profile.schema'
import { UserDto, } from 'src/user/types/user.dto'
import { ProfileService, } from './profile.service'
import { UserProfileDto, } from './types/user-profile.dto'

@Controller('/users/profile')
@ApiTags('Profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiResponse(SwaggerLiteApiResponse(StatusCodes.OK, 'An user profile information', UserProfileSwaggerSchema))
  @ApiResponse(SwaggerLiteApiResponse(StatusCodes.UNAUTHORIZED, 'Invalid or empty user JWT Token'))
  async get(@AuthUser() user: UserDto): Promise<UserProfileDto> {
    return this.profileService.getByUserId(user.id)
  }
}
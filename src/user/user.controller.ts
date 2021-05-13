import { Body, Controller, HttpCode, Post, UsePipes, } from '@nestjs/common'
import { ApiResponse, ApiTags, } from '@nestjs/swagger'
import { StatusCodes, } from 'http-status-codes'
import { AuthService, } from 'auth/auth.service'
import { JwtPayload, JwtSigned, } from 'auth/types/jwt.type'
import { ValidateCityPipe, } from 'common/pipes/validate-city.pipe'
import { ValidateUsernameAlreadyExistsPipe, } from 'common/pipes/validate-username-already-exists'
import { ValidateUsernameExistsPipe, } from 'common/pipes/validate-username-exists.pipe'
import SwaggerLiteApiResponse from 'swagger/builders/apiResponse-builder'
import SwaggerRequestSchema from 'swagger/schemas/request.schema'
import UserCreatedSwaggerSchema from 'swagger/schemas/user/user-created.schema'
import UserSignInSwaggerSchema from 'swagger/schemas/user/user-signIn.schema'
import { CreateUserDto, } from './types/create-user.dto'
import { SignInUserDto, } from './types/signIn-user.dto'
import { UserDto, } from './types/user.dto'
import { UserService, } from './user.service'

@Controller('/users')
@ApiTags('User')
export class UserController {
  constructor(
    private readonly userService: UserService, private readonly authService: AuthService
  ) {}

  @Post('/signIn')
  @HttpCode(StatusCodes.OK)
  @UsePipes(ValidateUsernameExistsPipe)
  @ApiResponse(SwaggerLiteApiResponse(StatusCodes.OK, 'A JWT Token', UserSignInSwaggerSchema))
  @ApiResponse(SwaggerLiteApiResponse(StatusCodes.CONFLICT, 'Invalid username or password', SwaggerRequestSchema.error()))
  async signIn(@Body() signInDto: SignInUserDto): Promise<JwtSigned> {
    const user = await this.userService.signIn(signInDto)
    const payload = this.authService.generateAccessToken(this.makeJwtPayload(user))

    return payload
  }

  @Post()
  @UsePipes(ValidateCityPipe, ValidateUsernameAlreadyExistsPipe)
  @ApiResponse(SwaggerLiteApiResponse(StatusCodes.CREATED, 'A user model', UserCreatedSwaggerSchema))
  async create(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    const userId = await this.userService.create(createUserDto)

    const user: UserDto = {
      ...createUserDto,
      id: userId,
    }

    return user
  }

  private makeJwtPayload(userDto: UserDto): JwtPayload {
    const { id, username, } = userDto

    const payload: JwtPayload = {
      id, username,
    }

    return payload
  }
}
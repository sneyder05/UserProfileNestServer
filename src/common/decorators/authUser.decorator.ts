import { createParamDecorator, ExecutionContext, } from '@nestjs/common'
import { UserDto, } from 'src/user/types/user.dto'

export const AuthUser = createParamDecorator((data: unknown, ctx: ExecutionContext): UserDto => {
  const request = ctx.switchToHttp().getRequest()

  return request.user
})
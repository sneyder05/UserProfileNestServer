import { createParamDecorator, ExecutionContext, } from '@nestjs/common'

export const AuthUser = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest()
  console.log('TCL -> ~ file: authUser.decorator.ts ~ line 5 ~ AuthUser ~ request', request)
  return request.user
})
import { CallHandler, ExecutionContext, Injectable, NestInterceptor, } from '@nestjs/common'
import { Observable, } from 'rxjs'
import { map, } from 'rxjs/operators'

export interface IResponse<T> {
  data: T
}

@Injectable()
export class RequestTransformInterceptor<T> implements NestInterceptor<T, IResponse<T>> {
  intercept(ctx: ExecutionContext, next: CallHandler): Observable<IResponse<T>> {
    const httpResponse = ctx.switchToHttp().getResponse()

    return next
      .handle()
      .pipe(
        map(data => ({
          data,
          statusCode: httpResponse.statusCode,
          message: httpResponse.message || 'Success',
        }))
      )
  }
}
import { CallHandler, ExecutionContext, Injectable, NestInterceptor, } from '@nestjs/common'
import { Observable, } from 'rxjs'
import { map, } from 'rxjs/operators'
import { IRequestResponse, } from 'src/types/request'

@Injectable()
export class RequestTransformInterceptor<T> implements NestInterceptor<T, IRequestResponse<T>> {
  intercept(ctx: ExecutionContext, next: CallHandler): Observable<IRequestResponse<T>> {
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
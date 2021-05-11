import { ValidationPipe, } from '@nestjs/common'
import { NestFactory, } from '@nestjs/core'
import { AppModule, } from './app.module'
import { RequestTransformInterceptor, } from './common/interceptors/request.interceptor'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalInterceptors(new RequestTransformInterceptor())

  await app.listen(4000)
}

bootstrap()

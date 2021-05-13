import { ValidationPipe, } from '@nestjs/common'
import { NestFactory, } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule, } from '@nestjs/swagger'
import { AppConfigService, } from 'config/app/app.service'
import { AppModule, } from './app.module'
import { RequestTransformInterceptor, } from './common/interceptors/request.interceptor'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalInterceptors(new RequestTransformInterceptor())

  const swaggerConfig = new DocumentBuilder()
    .setTitle('API Wiki')
    .setDescription('Endpoints description')
    .setVersion('1.0')
    .build()
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('api', app, swaggerDocument)

  const appConfig: AppConfigService = app.get('AppConfigService')

  app.enableCors()

  await app.listen(appConfig.app.port)
}

bootstrap()

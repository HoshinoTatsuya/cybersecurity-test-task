import { INestApplication } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { SecuritySchemeType } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface'

import { AppModule } from './app.module'
import { CustomGlobalSettings } from './domain/exceptions'
import { SwaggerConfigService } from './infrastructure/libs/swagger/config/swagger.config'

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule)
  CustomGlobalSettings.createGlobalSettings<INestApplication>(app)

  const configService = new ConfigService()
  const swaggerConfigService = new SwaggerConfigService(configService)
  const swaggerConfig = swaggerConfigService.createSwaggerOptions()

  const swaggerDocument = new DocumentBuilder()
    .setTitle(swaggerConfig.title)
    .setDescription(swaggerConfig.description)
    .setVersion(swaggerConfig.version)
    .addBearerAuth({
      type: swaggerConfig.bearerAuth.type as SecuritySchemeType,
      description: swaggerConfig.bearerAuth.description,
      name: swaggerConfig.bearerAuth.name,
      in: swaggerConfig.bearerAuth.in,
    })
    .build()

  app.enableCors()

  app.setGlobalPrefix(configService.get<string>('MICROSERVICES_GATEWAY_ROUTE_PREFIX'), { exclude: [] })

  const document = SwaggerModule.createDocument(app, swaggerDocument)

  SwaggerModule.setup(`${swaggerConfig.routePrefix}/docs`, app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  })

  await app.listen(+configService.get<number>('MICROSERVICES_GATEWAY_PORT'))
}

void bootstrap()

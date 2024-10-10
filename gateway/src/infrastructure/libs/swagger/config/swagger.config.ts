import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { SecuritySchemeType } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface'

import { BooleanUtils } from '../../utils/boolean.utils'
import { SwaggerModuleOptions } from '../interface-inject/swagger.interface'

@Injectable()
export class SwaggerConfigService {
  public constructor(private readonly _configService: ConfigService) {}

  public createSwaggerOptions(): SwaggerModuleOptions {
    const swaggerConfig = {
      title: this._configService.get<string>('SWAGGER_TITLE', undefined),
      description: this._configService.get<string>('SWAGGER_DESCRIPTION', undefined),
      version: this._configService.get<string>('SWAGGER_VERSION', undefined),
      routePrefix: this._configService.get<string>('SWAGGER_ROUTE_PREFIX', undefined),
      path: this._configService.get<string>('SWAGGER_PATH', undefined),
      persistAuthorization: BooleanUtils.strToBoolWithDefault(
        this._configService.get<boolean>('SWAGGER_PERSIST_AUTHORIZATION', undefined),
        undefined,
      ),
      bearerAuth: {
        type: this._configService.get<SecuritySchemeType>('SWAGGER_BEARER_AUTH_TYPE', undefined),
        description: this._configService.get<string>('SWAGGER_BEARER_AUTH_DESCRIPTION', undefined),
        name: this._configService.get<string>('SWAGGER_BEARER_AUTH_NAME', undefined),
        in: this._configService.get<string>('SWAGGER_BEARER_AUTH_IN', undefined),
      },
    }

    if (swaggerConfig.title === undefined) {
      throw new InternalServerErrorException('Swagger variable "title" is not found!')
    }

    if (swaggerConfig.description === undefined) {
      throw new InternalServerErrorException('Swagger variable "description" is not found!')
    }

    if (swaggerConfig.version === undefined) {
      throw new InternalServerErrorException('Swagger variable "version" is not found!')
    }

    if (swaggerConfig.routePrefix === undefined) {
      throw new InternalServerErrorException('Swagger variable "routePrefix" is not found!')
    }

    if (swaggerConfig.path === undefined) {
      throw new InternalServerErrorException('Swagger variable "path" is not found!')
    }

    if (swaggerConfig.persistAuthorization === undefined) {
      throw new InternalServerErrorException('Swagger variable "persistAuthorization" is not found!')
    }

    if (swaggerConfig.bearerAuth.type === undefined) {
      throw new InternalServerErrorException('Swagger variable "bearerAuth type" is not found!')
    }

    if (swaggerConfig.bearerAuth.description === undefined) {
      throw new InternalServerErrorException('Swagger variable "bearerAuth description" is not found!')
    }

    if (swaggerConfig.bearerAuth.name === undefined) {
      throw new InternalServerErrorException('Swagger variable "bearerAuth name" is not found!')
    }

    if (swaggerConfig.bearerAuth.in === undefined) {
      throw new InternalServerErrorException('Swagger variable "bearerAuth in" is not found!')
    }

    return swaggerConfig
  }
}

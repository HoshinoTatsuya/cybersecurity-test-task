import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { LanguagesEnum } from '../libs/helper-services/jwt/exceptions'
import {
  JWTCustomModuleOptions,
  JWTCustomModuleOptionsFactory,
} from '../libs/helper-services/jwt/jwt-options.interface'
import { BooleanUtils } from '../libs/utils/boolean.utils'

@Injectable()
export class JWTConfigService implements JWTCustomModuleOptionsFactory {
  public constructor(private readonly _configService: ConfigService) {}

  public createJWTCustomModuleOptions(): JWTCustomModuleOptions {
    const jwtConfig = {
      secret: this._configService.get<number>('JWT_SECRET', undefined),
      accessTokenExpire: this._configService.get<number>('JWT_ACCESS_TOKEN_EXPIRE', undefined),
      refreshTokenExpire: this._configService.get<number>('JWT_REFRESH_TOKEN_EXPIRE', undefined),
      language: this._configService.get<LanguagesEnum>('JWT_LANGUAGE', LanguagesEnum.EN),
      logger: {
        axios: BooleanUtils.strToBoolWithDefault(
          this._configService.get<boolean>('AXIOS_LOGGING', undefined),
          undefined,
        ),
        nats: BooleanUtils.strToBoolWithDefault(this._configService.get<boolean>('NATS_LOGGING', undefined), undefined),
      },
    }

    if (jwtConfig.secret === undefined) {
      // TODO: Светить предупреждение, если нет секрета => переход на новую версию по дефолту
      throw new InternalServerErrorException('Variable "secret" in "ms-core" config is not found')
    }

    if (jwtConfig.accessTokenExpire === undefined) {
      throw new InternalServerErrorException('Variable "accessTokenExpire" in "ms-core" config is not found')
    }

    if (jwtConfig.refreshTokenExpire === undefined) {
      throw new InternalServerErrorException('Variable "refreshTokenExpire" in "ms-core" config is not found')
    }

    if (jwtConfig.logger.axios === undefined) {
      throw new InternalServerErrorException('Variable "logger axios" in "ms-core" config is not found')
    }

    if (jwtConfig.logger.nats === undefined) {
      throw new InternalServerErrorException('Variable "logger nats" in "ms-core" config is not found')
    }

    return jwtConfig
  }
}

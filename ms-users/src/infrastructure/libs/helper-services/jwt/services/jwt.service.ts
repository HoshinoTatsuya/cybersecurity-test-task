import { Inject, Injectable, Logger } from '@nestjs/common'

import { JWT_CUSTOM_MODULE_OPTIONS } from '../constants'
import { TokenEnum } from '../enums'
import { JwtCustomException } from '../exceptions'
import {
  ICreateAccessTokenNewVersion,
  ICreateAccessTokenOldVersion,
  ICreateRefreshToken,
  ICreateTokensNewVersion,
  ICreateTokensOldVersion,
  IDecodeAccessToken,
  IDecodeOptions,
  IDecodeRefreshToken,
  IJwtService,
  IVerifyAccessTokenNewVersion,
  IVerifyAccessTokenOldVersion,
  IVerifyRefreshToken,
  JwtSignOptions,
} from '../interfaces'
import { IJWTCustomModuleOptionsFactory } from '../jwt-options.interface'
import {
  CreateAccessTokenNewVersionModel,
  CreateAccessTokenOldVersionModel,
  CreateRefreshTokenModel,
  CreateTokensNewVersionsModel,
  CreateTokensOldVersionModel,
  DecodeAccessTokenModel,
  DecodeRefreshTokenModel,
  PayloadTokenModel,
  VerifyAccessTokenNewVersionModel,
  VerifyAccessTokenOldVersionModel,
  VerifyRefreshTokenModel,
} from '../models'
import { DateExpireTokenEnum, getFutureDays, getFutureHours } from '../utils/work-with-time'

import { JwtBaseService } from './jwt-base.service'

@Injectable()
export class JwtCustomService extends JwtBaseService implements IJwtService {
  private readonly _loggerService = new Logger(JwtCustomService.name)

  public constructor(
    @Inject(JWT_CUSTOM_MODULE_OPTIONS)
    private readonly _optionsJWT: IJWTCustomModuleOptionsFactory,
  ) {
    super(_optionsJWT)
  }

  public async decodeAccessToken<OutputData extends Record<string, unknown> & PayloadTokenModel>(
    data: IDecodeAccessToken,
    options?: IDecodeOptions,
  ): Promise<DecodeAccessTokenModel<OutputData> | JwtCustomException> {
    const { accessToken } = data

    const decodeToken = this.decode<OutputData>(accessToken, options)

    if (decodeToken instanceof JwtCustomException) {
      return decodeToken
    }

    if (!decodeToken) {
      return new JwtCustomException(JwtCustomException.jwt[this._optionsJWT.language].ACCESS_TOKEN_UNCORRECTED)
    }

    const { iat, exp } = decodeToken

    return new DecodeAccessTokenModel<OutputData>({ accessTokenData: decodeToken, iat, exp })
  }

  public async decodeRefreshToken<OutputData extends Record<string, unknown> & PayloadTokenModel>(
    data: IDecodeRefreshToken,
  ): Promise<DecodeRefreshTokenModel<OutputData> | JwtCustomException> {
    const { refreshToken } = data
    const decodeToken = this.decode<OutputData>(refreshToken.toString())
    if (decodeToken instanceof JwtCustomException) {
      return decodeToken
    }

    if (!decodeToken) {
      return new JwtCustomException(JwtCustomException.jwt[this._optionsJWT.language].REFRESH_TOKEN_UNCORRECTED)
    }

    const { iat, exp } = decodeToken

    return new DecodeRefreshTokenModel<OutputData>({ refreshTokenData: decodeToken, iat, exp })
  }

  public async createRefreshToken<RefreshTokenInputType extends Record<string, unknown>>(
    data: ICreateRefreshToken<RefreshTokenInputType>,
  ): Promise<CreateRefreshTokenModel | JwtCustomException> {
    if (!data?.refreshTokenData) {
      const defaultData = { [Date.now()]: Date.now() }
      const refreshTokenData = await this._createToken(defaultData, undefined, TokenEnum.REFRESH)

      if (refreshTokenData instanceof JwtCustomException) {
        return refreshTokenData
      }

      return new CreateRefreshTokenModel({
        refreshToken: refreshTokenData.token,
        refreshTokenExpire: refreshTokenData.tokenExpire,
      })
    }

    const refreshTokenData = await this._createToken(
      {
        ...data.refreshTokenData,
        [Date.now()]: Date.now(),
      },
      undefined,
      TokenEnum.REFRESH,
    )

    if (refreshTokenData instanceof JwtCustomException) {
      return refreshTokenData
    }

    return new CreateRefreshTokenModel({
      refreshToken: refreshTokenData.token,
      refreshTokenExpire: refreshTokenData.tokenExpire,
    })
  }

  public async verifyRefreshToken<OutputData extends Record<string, unknown>>(
    data: IVerifyRefreshToken,
  ): Promise<VerifyRefreshTokenModel<OutputData> | JwtCustomException> {
    const result = this.verify<OutputData>(data.refreshToken)

    if (result instanceof JwtCustomException) {
      return result
    }

    return new VerifyRefreshTokenModel<OutputData>({ refreshTokenData: result })
  }

  public async createTokensOldVersion<
    AccessTokenInputType extends Record<string, unknown>,
    RefreshTokenInputType extends Record<string, unknown>,
  >(
    data: ICreateTokensOldVersion<AccessTokenInputType, RefreshTokenInputType>,
  ): Promise<CreateTokensOldVersionModel | JwtCustomException> {
    let refreshToken: string = ''
    let refreshTokenExpire: number = 0

    if (!this._optionsJWT?.secret || this._optionsJWT?.secret?.length === 0) {
      return new JwtCustomException(
        JwtCustomException.jwt[this._optionsJWT.language].USED_OLD_VERSION_METHOD_WITHOUT_SECRET,
      )
    }

    if (!data?.refreshTokenData) {
      const defaultData = { [Date.now()]: Date.now() }
      const refreshTokenData = await this._createToken(defaultData, undefined, TokenEnum.REFRESH)

      if (refreshTokenData instanceof JwtCustomException) {
        return refreshTokenData
      }

      refreshToken = refreshTokenData.token
      refreshTokenExpire = refreshTokenData.tokenExpire
    }

    if (refreshToken.length === 0) {
      const refreshTokenData = await this._createToken(
        {
          ...data.refreshTokenData,
          [Date.now()]: Date.now(),
        },
        undefined,
        TokenEnum.REFRESH,
      )

      if (refreshTokenData instanceof JwtCustomException) {
        return refreshTokenData
      }

      refreshToken = refreshTokenData.token
      refreshTokenExpire = refreshTokenData.tokenExpire
    }

    if (!data?.accessTokenData) {
      const defaultData = { date: Date.now() }
      const result = await this._createToken(defaultData, undefined, TokenEnum.ACCESS)

      if (result instanceof JwtCustomException) {
        return result
      }

      const { token: accessToken, tokenExpire: accessTokenExpire } = result

      return new CreateTokensOldVersionModel({
        accessToken,
        refreshToken,
        refreshTokenExpire,
        accessTokenExpire,
      })
    }

    const result = await this._createToken({ ...data.accessTokenData }, undefined, TokenEnum.ACCESS)

    if (result instanceof JwtCustomException) {
      return result
    }

    const { token: accessToken, tokenExpire: accessTokenExpire } = result

    return new CreateTokensOldVersionModel({
      accessToken,
      refreshToken,
      refreshTokenExpire,
      accessTokenExpire,
    })
  }

  public async createTokensNewVersion<
    AccessTokenInputType extends Record<string, unknown> | undefined,
    RefreshTokenInputType extends Record<string, unknown> | undefined,
  >(
    data: ICreateTokensNewVersion<AccessTokenInputType, RefreshTokenInputType>,
  ): Promise<CreateTokensNewVersionsModel | JwtCustomException> {
    let refreshToken: string = ''
    let refreshTokenExpire: number = 0
    if (!data?.refreshTokenData) {
      const defaultData = { [Date.now()]: Date.now() }
      const refreshTokenData = await this._createToken(defaultData, undefined, TokenEnum.REFRESH)

      if (refreshTokenData instanceof JwtCustomException) {
        return refreshTokenData
      }

      refreshToken = refreshTokenData.token
      refreshTokenExpire = refreshTokenData.tokenExpire
    }

    if (refreshToken.length === 0) {
      const refreshTokenData = await this._createToken(
        {
          ...data.accessTokenData,
          [Date.now()]: Date.now(),
        },
        undefined,
        TokenEnum.REFRESH,
      )

      if (refreshTokenData instanceof JwtCustomException) {
        return refreshTokenData
      }

      refreshToken = refreshTokenData.token
      refreshTokenExpire = refreshTokenData.tokenExpire
    }

    if (!data?.accessTokenData) {
      const defaultData = { date: Date.now() }
      const result = await this._createToken(defaultData, { secret: refreshToken }, TokenEnum.ACCESS)

      if (result instanceof JwtCustomException) {
        return result
      }

      const { token: accessToken, tokenExpire: accessTokenExpire } = result

      return new CreateTokensNewVersionsModel({
        accessToken,
        refreshToken,
        refreshTokenExpire,
        accessTokenExpire,
      })
    }

    const result = await this._createToken({ ...data.accessTokenData }, { secret: refreshToken }, TokenEnum.ACCESS)

    if (result instanceof JwtCustomException) {
      return result
    }

    const { token: accessToken, tokenExpire: accessTokenExpire } = result
    return new CreateTokensNewVersionsModel({
      accessToken,
      refreshToken,
      refreshTokenExpire,
      accessTokenExpire,
    })
  }

  public async verifyAccessTokenOldVersion<OutputData extends Record<string, unknown>>(
    data: IVerifyAccessTokenOldVersion,
  ): Promise<VerifyAccessTokenOldVersionModel<OutputData> | JwtCustomException> {
    if (!this._optionsJWT?.secret || this._optionsJWT?.secret?.length === 0) {
      return new JwtCustomException(
        JwtCustomException.jwt[this._optionsJWT.language].USED_OLD_VERSION_METHOD_WITHOUT_SECRET,
      )
    }

    const result = await this.verify(data.accessToken)

    if (result instanceof JwtCustomException) {
      return result
    }

    return new VerifyAccessTokenOldVersionModel<OutputData>({ accessTokenData: result })
  }

  public async verifyAccessTokenNewVersion<OutputData extends Record<string, unknown>>(
    data: IVerifyAccessTokenNewVersion,
  ): Promise<VerifyAccessTokenNewVersionModel<OutputData> | JwtCustomException> {
    const result = await this.verify(data.accessToken, { secret: data.refreshToken })

    if (result instanceof JwtCustomException) {
      return result
    }

    return new VerifyAccessTokenNewVersionModel<OutputData>({ accessTokenData: result })
  }

  public async createAccessTokenNewVersion<AccessTokenInputType extends Record<string, unknown> | undefined>(
    data: ICreateAccessTokenNewVersion<AccessTokenInputType>,
  ): Promise<CreateAccessTokenNewVersionModel | JwtCustomException> {
    if (!data?.accessTokenData) {
      const defaultData = { [Date.now()]: Date.now() }
      const result = await this._createToken(
        defaultData,
        {
          secret: data.refreshToken,
        },
        TokenEnum.ACCESS,
      )

      if (result instanceof JwtCustomException) {
        return result
      }

      const { token: accessToken, tokenExpire: accessTokenExpire } = result

      return new CreateAccessTokenNewVersionModel({
        accessToken,
        accessTokenExpire,
      })
    }

    const result = await this._createToken(
      {
        ...data.accessTokenData,
        [Date.now()]: Date.now(),
      },
      { secret: data.refreshToken },
      TokenEnum.ACCESS,
    )

    if (result instanceof JwtCustomException) {
      return result
    }

    const { token: accessToken, tokenExpire: accessTokenExpire } = result

    return new CreateAccessTokenNewVersionModel({
      accessToken,
      accessTokenExpire,
    })
  }

  public async createAccessTokenOldVersion<AccessTokenInputType extends Record<string, unknown> | undefined>(
    data: ICreateAccessTokenOldVersion<AccessTokenInputType>,
  ): Promise<CreateAccessTokenOldVersionModel | JwtCustomException> {
    if (!this._optionsJWT?.secret || this._optionsJWT?.secret?.length === 0) {
      return new JwtCustomException(
        JwtCustomException.jwt[this._optionsJWT.language].USED_OLD_VERSION_METHOD_WITHOUT_SECRET,
      )
    }

    if (!data?.accessTokenData) {
      const defaultData = { [Date.now()]: Date.now() }
      const result = await this._createToken(defaultData, undefined, TokenEnum.ACCESS)

      if (result instanceof JwtCustomException) {
        return result
      }

      const { token: accessToken, tokenExpire: accessTokenExpire } = result

      return new CreateAccessTokenOldVersionModel({
        accessToken,
        accessTokenExpire,
      })
    }

    const result = await this._createToken(
      {
        ...data.accessTokenData,
        [Date.now()]: Date.now(),
      },
      undefined,
      TokenEnum.ACCESS,
    )

    if (result instanceof JwtCustomException) {
      return result
    }

    const { token: accessToken, tokenExpire: accessTokenExpire } = result

    return new CreateAccessTokenOldVersionModel({
      accessToken,
      accessTokenExpire,
    })
  }

  /**
   *
   * @param {object} data - data set into token
   * @param {Pick<JwtSignOptions, 'secret'> | undefined} options - jwt secret. if undefined to set default secret
   * @param {TokenEnum} tokenType - it's enum
   * @private
   */
  private async _createToken(
    data: object,
    options: Pick<JwtSignOptions, 'secret'> | undefined,
    tokenType: TokenEnum,
  ): Promise<{ token: string; tokenExpire: number } | JwtCustomException> {
    if (tokenType === TokenEnum.ACCESS) {
      if (options?.secret === undefined) {
        const { 0: token } = await Promise.all([
          this.signAsync(data, {
            secret: this._optionsJWT.secret,
            expiresIn: this._optionsJWT.accessTokenExpire,
          }),
        ])

        if (token instanceof JwtCustomException) {
          return token
        }

        const tokenExpire = await this._getTimeTokenExpire(this._optionsJWT.accessTokenExpire)
        if (tokenExpire instanceof JwtCustomException) {
          return tokenExpire
        }

        return { token, tokenExpire }
      }

      const { 0: token } = await Promise.all([
        this.signAsync(data, {
          secret: options.secret,
          expiresIn: this._optionsJWT.accessTokenExpire,
        }),
      ])

      if (token instanceof JwtCustomException) {
        return token
      }

      const tokenExpire = await this._getTimeTokenExpire(this._optionsJWT.accessTokenExpire)
      if (tokenExpire instanceof JwtCustomException) {
        return tokenExpire
      }

      return { token, tokenExpire }
    }

    if (tokenType === TokenEnum.REFRESH) {
      if (options?.secret === undefined) {
        const { 0: token } = await Promise.all([
          this.signAsync(data, {
            secret: this._optionsJWT.secret,
            expiresIn: this._optionsJWT.refreshTokenExpire,
          }),
        ])

        if (token instanceof JwtCustomException) {
          return token
        }

        const tokenExpire = await this._getTimeTokenExpire(this._optionsJWT.refreshTokenExpire)
        if (tokenExpire instanceof JwtCustomException) {
          return tokenExpire
        }

        return { token, tokenExpire }
      }

      const { 0: token } = await Promise.all([
        this.signAsync(data, {
          secret: options.secret,
          expiresIn: this._optionsJWT.refreshTokenExpire,
        }),
      ])

      if (token instanceof JwtCustomException) {
        return token
      }

      const tokenExpire = await this._getTimeTokenExpire(this._optionsJWT.refreshTokenExpire)
      if (tokenExpire instanceof JwtCustomException) {
        return tokenExpire
      }

      return { token, tokenExpire }
    }
  }

  private async _getTimeTokenExpire(timeToken: string): Promise<number | JwtCustomException> {
    if (timeToken.includes(DateExpireTokenEnum.HOUR)) {
      const hours = Number(timeToken.split(DateExpireTokenEnum.HOUR)[0])
      const result = await getFutureHours(hours)
      return result
    } else if (timeToken.includes(DateExpireTokenEnum.DAY)) {
      const days = Number(timeToken.split(DateExpireTokenEnum.DAY)[0])
      const result = await getFutureDays(days)
      return result
    }

    return new JwtCustomException(JwtCustomException.jwt[this._optionsJWT.language].LIFE_TIME_TOKEN_UNCORRECTED)
  }
}

import { JwtCustomException } from '../../../../infrastructure/libs/helper-services/jwt/exceptions'
import { IJwtService } from '../../../../infrastructure/libs/helper-services/jwt/interfaces'
import { BaseException } from '../../../exceptions'
import { AuthenticationExceptionEnum } from '../../../exceptions/enums/authentication-exception.enum'
import {
  CreateTokensNewVersionGeneric,
  DecodeAccessTokenGeneric,
  VerifyAccessTokenGeneric,
  VerifyRefreshTokenGeneric,
} from '../generics'
import {
  ICreateAccessTokenNewVersionInput,
  ICreateAccessTokenNewVersionOutput,
  ICreateRefreshTokenInput,
  ICreateRefreshTokenOutput,
  ICreateTokensNewVersionInput,
  ICreateTokensNewVersionOutput,
  IDecodeAccessTokenInput,
  IDecodeAccessTokenOutput,
  IVerifyAccessTokenNewVersionInput,
  IVerifyAccessTokenNewVersionOutput,
  IVerifyRefreshTokenInput,
  IVerifyRefreshTokenOutput,
} from '../interfaces'

/**
 * This class is an integration layer between JWT and the business logic of the project.
 *
 * @class JwtServiceIntegration
 *
 * METHODS:
 * - Create tokens new version {@link JwtServiceIntegration.createTokensNewVersion} - This is short description
 * - Create refresh token {@link JwtServiceIntegration.createRefreshToken} - This is short description
 * - Create access token new version {@link JwtServiceIntegration.createAccessTokenNewVersion}
 * - This is short description
 * - Verify refresh token {@link JwtServiceIntegration.verifyRefreshToken} - This is short description
 * - Verify access token new version {@link JwtServiceIntegration.verifyAccessTokenNewVersion}
 * - This is short description
 * - Decode access token {@link JwtServiceIntegration.decodeAccessToken} - This is short description
 *
 * @abstract
 */
export class JwtServiceIntegration {
  /**
   * This is description
   * @param {IRedisService} jwtCustomService - type is {@link IJwtService }
   * @constructor
   */
  public constructor(public readonly jwtCustomService: IJwtService) {}

  /**
   * This is description method
   * @param { ICreateTokensNewVersionInput } data - type is {@link ICreateTokensNewVersionInput }
   * @return {ICreateTokensNewVersionOutput | BaseException} - data returned type is
   * {@link ICreateTokensNewVersionOutput} | {@link BaseException}
   *
   * @method createTokensNewVersion
   * @public
   */
  public async createTokensNewVersion(
    data: ICreateTokensNewVersionInput,
  ): Promise<ICreateTokensNewVersionOutput | BaseException> {
    const resultTokenData = await this.jwtCustomService.createTokensNewVersion<
      CreateTokensNewVersionGeneric,
      undefined
    >({
      accessTokenData: { userId: data.userId, sessionId: data.sessionId },
    })

    if (resultTokenData instanceof JwtCustomException) {
      return new BaseException(BaseException.common.EN.INTERNAL_SERVER_ERROR, false)
    }

    return resultTokenData
  }

  /**
   * This is description method
   * @param { ICreateRefreshTokenInput } [data = undefined] - type is {@link ICreateRefreshTokenInput }
   * @return {ICreateRefreshTokenOutput | BaseException} - data returned type is
   * {@link ICreateRefreshTokenOutput} | {@link BaseException}
   *
   * @method createRefreshToken
   * @public
   */
  public async createRefreshToken(
    data?: ICreateRefreshTokenInput | undefined,
  ): Promise<ICreateRefreshTokenOutput | BaseException> {
    const dataFromRefresh = data?.refreshTokenData

    const refreshTokenData = await this.jwtCustomService.createRefreshToken({ refreshTokenData: dataFromRefresh })

    if (refreshTokenData instanceof JwtCustomException) {
      return new BaseException(BaseException.common.EN.INTERNAL_SERVER_ERROR, false)
    }

    return refreshTokenData
  }

  /**
   * This is description method
   * @param { ICreateAccessTokenNewVersionInput } data - type is {@link ICreateAccessTokenNewVersionInput }
   * @return {ICreateAccessTokenNewVersionOutput | BaseException} - data returned type is
   * {@link ICreateAccessTokenNewVersionOutput} | {@link BaseException}
   *
   * @method createAccessTokenNewVersion
   * @public
   */
  public async createAccessTokenNewVersion(
    data: ICreateAccessTokenNewVersionInput,
  ): Promise<ICreateAccessTokenNewVersionOutput | BaseException> {
    const resultTokenData = await this.jwtCustomService.createAccessTokenNewVersion<CreateTokensNewVersionGeneric>({
      accessTokenData: { userId: data.userId, role: data.role },
      refreshToken: data.refreshToken,
    })

    if (resultTokenData instanceof JwtCustomException) {
      return new BaseException(BaseException.common.EN.INTERNAL_SERVER_ERROR, false)
    }

    return resultTokenData
  }

  /**
   * This is description method
   * @param { IVerifyRefreshTokenInput } data - type is {@link IVerifyRefreshTokenInput }
   * @return {IVerifyRefreshTokenOutput | BaseException} - data returned type is
   * {@link IVerifyRefreshTokenOutput} | {@link BaseException}
   *
   * @method verifyRefreshToken
   * @public
   */
  public async verifyRefreshToken(data: IVerifyRefreshTokenInput): Promise<IVerifyRefreshTokenOutput | BaseException> {
    const verifyRefreshToken = await this.jwtCustomService.verifyRefreshToken<VerifyRefreshTokenGeneric>({
      refreshToken: data.refreshToken,
    })

    if (verifyRefreshToken instanceof JwtCustomException) {
      if (verifyRefreshToken.code === JwtCustomException.jwt.EN.JWT_EXPIRED.code) {
        return new BaseException(BaseException.authentication.EN.REFRESH_TOKEN_EXPIRED, true)
      }

      return new BaseException().errorSubstitution({
        error: verifyRefreshToken,
        loggingTrueData: false,
      })
    }

    const { refreshTokenData: result } = verifyRefreshToken

    return result
  }

  /**
   * This is description method
   * @param { IVerifyAccessTokenNewVersionInput } data - type is {@link IVerifyAccessTokenNewVersionInput }
   * @return {IVerifyAccessTokenNewVersionOutput | BaseException} - data returned type is
   * {@link IVerifyAccessTokenNewVersionOutput} | {@link BaseException}
   *
   * @method verifyAccessTokenNewVersion
   * @public
   */
  public async verifyAccessTokenNewVersion(
    data: IVerifyAccessTokenNewVersionInput,
  ): Promise<IVerifyAccessTokenNewVersionOutput | BaseException> {
    const verifyAccessToken = await this.jwtCustomService.verifyAccessTokenNewVersion<VerifyAccessTokenGeneric>({
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    })

    if (verifyAccessToken instanceof JwtCustomException) {
      if (verifyAccessToken.code === JwtCustomException.jwt.EN.JWT_EXPIRED.code) {
        return new BaseException(BaseException.authentication.EN.ACCESS_TOKEN_EXPIRED, true)
      }

      return new BaseException().errorSubstitution({
        error: verifyAccessToken,
        loggingTrueData: false,
      })
    }

    const { accessTokenData: result } = verifyAccessToken

    return result
  }

  /**
   * This is description method
   * @param { IDecodeAccessTokenInput } data - type is {@link IDecodeAccessTokenInput }
   * @return {IDecodeAccessTokenOutput | BaseException} - data returned type is
   * {@link IDecodeAccessTokenOutput} | {@link BaseException}
   *
   * @method decodeAccessToken
   * @public
   */
  public async decodeAccessToken(data: IDecodeAccessTokenInput): Promise<IDecodeAccessTokenOutput | BaseException> {
    const decodeAccessToken = await this.jwtCustomService.decodeAccessToken<DecodeAccessTokenGeneric>({
      accessToken: data.accessToken,
    })

    if (decodeAccessToken instanceof JwtCustomException) {
      const substitutionNotUse = Object.values(AuthenticationExceptionEnum).join().includes(decodeAccessToken.errorName)

      if (substitutionNotUse) {
        return new BaseException(BaseException.authentication.EN[decodeAccessToken.errorName])
      }

      return new BaseException().errorSubstitution({
        error: decodeAccessToken,
        loggingTrueData: false,
      })
    }

    const { accessTokenData: result } = decodeAccessToken

    return result
  }
}

import { JwtCustomException } from '../exceptions'
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

import { ICreateAccessTokenNewVersion, ICreateAccessTokenOldVersion } from './create/create-access-token'
import { ICreateRefreshToken } from './create/create-refresh-token'
import { ICreateTokensNewVersion, ICreateTokensOldVersion } from './create/create-tokens'
import { IDecodeAccessToken, IDecodeRefreshToken } from './decode'
import { IDecodeOptions } from './options'
import { IVerifyRefreshToken } from './verify/verify-refresh-token'
import { IVerifyAccessTokenNewVersion, IVerifyAccessTokenOldVersion } from './verify/veriy-access-token'

/**
 * This class describes possible methods for calling.
 *
 * The JwtCustomException class is used to generate errors on the side of this library. You can import this class
 * into your system and use the jwt method to collect the errors you need. You can also import the
 * jwtConstantExceptions variable, which contains all types of library errors in various languages.
 *
 *
 * You can also configure the standard system language, which this library will monitor and display errors in
 * the language that you specified in the configuration file. If you have not specified which standard language
 * to generate errors in, then the standard language will be used - English. A more detailed description of setting
 * configuration parameters is described in the README.
 *
 *
 * @class IJwtService
 *
 * METHODS:
 * - Decode access token {@link IJwtService.decodeAccessToken}
 * - Decode refresh token {@link IJwtService.decodeRefreshToken}
 * - Create tokens old version {@link IJwtService.createTokensOldVersion}
 * - Create tokens new version {@link IJwtService.createTokensNewVersion}
 * - Create access token old version {@link IJwtService.createAccessTokenOldVersion}
 * - Create access token new version {@link IJwtService.createAccessTokenNewVersion}
 * - Create refresh token {@link IJwtService.createRefreshToken}
 * - Verify access token new version {@link IJwtService.verifyAccessTokenNewVersion}
 * - Verify access token old version {@link IJwtService.verifyAccessTokenOldVersion}
 * - Verify refresh token {@link IJwtService.verifyRefreshToken}
 *
 * @abstract
 *
 * @example getting all kinds of errors:
 * const jwtErrors = JwtCustomException.jwt()
 * OR
 * const jwtErrors = jwtConstantExceptions
 */
export abstract class IJwtService {
  /**
   * This method decodes the token without checking for relevance in terms of lifetime.
   * @param { IDecodeAccessToken } data - type is {@link IDecodeAccessToken }
   * @param {IDecodeOptions} [options = undefined] - type is {@link IDecodeOptions}
   * @return {DecodeAccessTokenModel | RedisCustomException} data type is {@link DecodeAccessTokenModel} | {@link JwtCustomException }
   * @method decodeAccessToken
   * @public
   * @abstract
   *
   * @example
   *  const decodeAccessToken = await this.jwtCustomService.decodeAccessToken<DecodeAccessTokenGeneric>({
   *       accessToken: data.accessToken,
   *  })
   * @example input:
   * data: {
   *     accessToken: 'eyJhbGciOiJIUzI1NiJ9.eyJ0ZXh0IjoiV2UgYXJlIGdsYWQgdGhhdCB5b3UgYXJlIHVzaW5nIHRoaXMgbGlicmFyeSEifQ.6KpjxZK_VYiPvSZpU5k62etIU6hz1RtPfG0zaZR62SE'
   * },
   * options: {
   *     complete: false
   *     json: false
   * }
   * @example output success:
   * {
   *     accessTokenData: DecodeAccessTokenGeneric
   * }
   *
   * @example output error:
   * {
   *    code: 1007,
   *     errorName: 'JWT_EXPIRED',
   *     message: 'Token has expired!',
   *     description: 'Token has expired!',
   * }
   *
   */
  public abstract decodeAccessToken<OutputData extends Record<string, unknown> & PayloadTokenModel>(
    data: IDecodeAccessToken,
    options?: IDecodeOptions,
  ): Promise<DecodeAccessTokenModel<OutputData> | JwtCustomException>

  /**
   * This method decodes the token without checking for relevance in terms of lifetime.
   * @param { IDecodeRefreshToken } data - type is {@link IDecodeRefreshToken }
   * @return {DecodeAccessTokenModel | JwtCustomException} data type is {@link DecodeAccessTokenModel} | {@link JwtCustomException }
   * @method decodeRefreshToken
   * @public
   * @abstract
   *
   * @example
   *  const decodeRefreshToken = await this.jwtCustomService.decodeRefreshToken<DecodeRefreshTokenGeneric>({
   *       refreshToken: data.refreshToken,
   *  })
   * @example input:
   * data: {
   *     refreshToken: 'eyJhbGciOiJIUzI1NiJ9.eyJ0ZXh0IjoiV2UgYXJlIGdsYWQgdGhhdCB5b3UgYXJlIHVzaW5nIHRoaXMgbGlicmFyeSEifQ.6KpjxZK_VYiPvSZpU5k62etIU6hz1RtPfG0zaZR62SE'
   * },
   * options: {
   *     complete: false
   *     json: false
   * }
   * @example output success:
   * {
   *     refreshTokenData: DecodeRefreshTokenGeneric
   * }
   *
   * @example output error:
   * {
   *    code: 1007,
   *     errorName: 'JWT_EXPIRED',
   *     message: 'Token has expired!',
   *     description: 'Token has expired!',
   * }
   */
  public abstract decodeRefreshToken<OutputData extends Record<string, unknown> & PayloadTokenModel>(
    data: IDecodeRefreshToken,
  ): Promise<DecodeRefreshTokenModel<OutputData> | JwtCustomException>

  /**
   * This method first generates a refresh token based on the data that was passed in the accessTokenData field, and
   * then generates a refresh token based on the data that was passed in the refreshTokenData field, and additionally
   * enters the token creation timestamp with an accuracy of milliseconds - this guarantees the uniqueness of the
   * referrer token if the same parameters are passed.
   *
   * @param { ICreateTokensOldVersion } data - type is {@link ICreateTokensOldVersion }
   * @return {CreateTokensOldVersionModel | JwtCustomException} data type is {@link CreateTokensOldVersionModel} | {@link JwtCustomException }
   * @method createTokensOldVersion
   * @public
   * @abstract
   *
   * @example
   *  const resultTokens = await this.jwtCustomService.createTokensOldVersion<CreateTokenInterface>({
   *       accessTokenData: {
   *           userId: '12',
   *           sessionId: '21',
   *       },
   *       refreshTokenData: {
   *           userId: '12',
   *           sessionId: '21',
   *       },
   *  })
   * @example input:
   * {
   *     accessTokenData: {
   *           userId: '12',
   *           sessionId: '21',
   *       },
   *       refreshTokenData: {
   *           userId: '12',
   *           sessionId: '21',
   *       },
   * },
   * @example output success:
   * {
   *     accessToken: 'eyJhbGciOiJIUzI1NiJ9.eyJ0ZXh0IjoiV2UgYXJlIGdsYWQgdGhhdCB5b3UgYXJlIHVzaW5nIHRoaXMgbGlicmFyeSEifQ.6KpjxZK_VYiPvSZpU5k62etIU6hz1RtPfG0zaZR62SE',
   *     refreshToken: 'eyJhbGciOiJIUzI1NiJ9.eyJ0ZXh0IjoiV2UgYXJlIGdsYWQgdGhhdCB5b3UgYXJlIHVzaW5nIHRoaXMgbGlicmFyeSEhIn0.QFwko1SzzZqZn7iVbG4Un7h_3eqFFZSSAdkSQipAD3M',
   *     accessTokenExpire: 1805575406,
   *     refreshTokenExpire: 1905575406
   * }
   *
   * @example output error:
   * {
   *    code: 1005,
   *     errorName: 'USED_OLD_VERSION_METHOD_WITHOUT_SECRET',
   *     message: 'You used an old version of jwt to create tokens or token and did not set the secret!',
   *     description: 'You used an old version of jwt to create tokens or token and did not set the secret!',
   * }
   */
  public abstract createTokensOldVersion<
    AccessTokenInputType extends Record<string, unknown>,
    RefreshTokenInputType extends Record<string, unknown>,
  >(
    data: ICreateTokensOldVersion<AccessTokenInputType, RefreshTokenInputType>,
  ): Promise<CreateTokensOldVersionModel | JwtCustomException>

  /**
   * This method first generates a refresh token based on the data that was passed in the accessTokenData field, and
   * then generates a refresh token based on the data that was passed in the refreshTokenData field, and additionally
   * enters the token creation timestamp with an accuracy of milliseconds - this guarantees the uniqueness of the
   * referrer token if the same parameters are passed.
   *
   * The referrer token is signed with the key from the configuration file.
   *
   * The access token is signed with a refresh token!!! Do not pass it to the client, this will
   * lead to a hole in the system!
   *
   * @param { ICreateTokensNewVersion } data - type is {@link ICreateTokensNewVersion }
   * @return {CreateTokensNewVersionsModel | JwtCustomException} data type
   * is {@link CreateTokensNewVersionsModel} | {@link JwtCustomException }
   * @method createTokensNewVersion
   * @public
   * @abstract
   *
   * @example
   *  const resultTokens = await this.jwtCustomService.createTokensNewVersion<CreateTokenInterface>({
   *       accessTokenData: {
   *           userId: '12',
   *           sessionId: '21',
   *       },
   *       refreshTokenData: {
   *           userId: '12',
   *           sessionId: '21',
   *       },
   *  })
   * @example input:
   * {
   *     accessTokenData: {
   *           userId: '12',
   *           sessionId: '21',
   *       },
   *       refreshTokenData: {
   *           userId: '12',
   *           sessionId: '21',
   *       },
   * },
   * @example output success:
   * {
   *     accessToken: 'eyJhbGciOiJIUzI1NiJ9.eyJ0ZXh0IjoiV2UgYXJlIGdsYWQgdGhhdCB5b3UgYXJlIHVzaW5nIHRoaXMgbGlicmFyeSEifQ.aHZVA8HxfO4c3hhq4QjwEBu3guNWMPZvQh3kT2h_McM',
   *     refreshToken: 'eyJhbGciOiJIUzI1NiJ9.eyJ0ZXh0IjoiV2UgYXJlIGdsYWQgdGhhdCB5b3UgYXJlIHVzaW5nIHRoaXMgbGlicmFyeSEhIn0.QFwko1SzzZqZn7iVbG4Un7h_3eqFFZSSAdkSQipAD3M',
   *     accessTokenExpire: 1805575406,
   *     refreshTokenExpire: 1905575406
   * }
   *
   * @example output error:
   * {
   *     code: 1006,
   *     errorName: 'LIFE_TIME_TOKEN_UNCORRECTED',
   *     message: 'The lifetime of the token in the config file is not correctly defined!',
   *     description: 'The lifetime of the token in the config file is not correctly defined!',
   * }
   */
  public abstract createTokensNewVersion<
    AccessTokenInputType extends Record<string, unknown> | undefined,
    RefreshTokenInputType extends Record<string, unknown> | undefined,
  >(
    data: ICreateTokensNewVersion<AccessTokenInputType, RefreshTokenInputType>,
  ): Promise<CreateTokensNewVersionsModel | JwtCustomException>

  /**
   * This is description method
   * @param { ICreateAccessTokenOldVersion } data - type is {@link ICreateAccessTokenOldVersion }
   * @return {CreateAccessTokenOldVersionModel | JwtCustomException} data type
   * is {@link CreateAccessTokenOldVersionModel} | {@link JwtCustomException }
   * @method createAccessTokenOldVersion
   * @public
   * @abstract
   */
  public abstract createAccessTokenOldVersion<AccessTokenInputType extends Record<string, unknown> | undefined>(
    data: ICreateAccessTokenOldVersion<AccessTokenInputType>,
  ): Promise<CreateAccessTokenOldVersionModel | JwtCustomException>

  /**
   * This is description method
   * @param { ICreateAccessTokenNewVersion } data - type is {@link ICreateAccessTokenNewVersion }
   * @return {CreateAccessTokenNewVersionModel | JwtCustomException} data type
   * is {@link CreateAccessTokenNewVersionModel} | {@link JwtCustomException }
   * @method createAccessTokenNewVersion
   * @public
   * @abstract
   */
  public abstract createAccessTokenNewVersion<AccessTokenInputType extends Record<string, unknown> | undefined>(
    data: ICreateAccessTokenNewVersion<AccessTokenInputType>,
  ): Promise<CreateAccessTokenNewVersionModel | JwtCustomException>

  /**
   * This is description method
   * @param { ICreateRefreshToken } data - type is {@link ICreateRefreshToken }
   * @return {CreateRefreshTokenModel | JwtCustomException} data type
   * is {@link CreateRefreshTokenModel} | {@link JwtCustomException }
   * @method createRefreshToken
   * @public
   * @abstract
   */
  public abstract createRefreshToken<RefreshTokenInputType extends Record<string, unknown> | undefined>(
    data: ICreateRefreshToken<RefreshTokenInputType>,
  ): Promise<CreateRefreshTokenModel | JwtCustomException>

  /**
   * This is description method
   * @param { IVerifyAccessTokenNewVersion } data - type is {@link IVerifyAccessTokenNewVersion }
   * @return {VerifyAccessTokenNewVersionModel | JwtCustomException} data type
   * is {@link VerifyAccessTokenNewVersionModel} | {@link JwtCustomException }
   * @method verifyAccessTokenNewVersion
   * @public
   * @abstract
   */
  public abstract verifyAccessTokenNewVersion<OutputData extends Record<string, unknown>>(
    data: IVerifyAccessTokenNewVersion,
  ): Promise<VerifyAccessTokenNewVersionModel<OutputData> | JwtCustomException>

  /**
   * This is description method
   * @param { IVerifyAccessTokenOldVersion } data - type is {@link IVerifyAccessTokenOldVersion }
   * @return {VerifyAccessTokenOldVersionModel | JwtCustomException} data type
   * is {@link VerifyAccessTokenOldVersionModel} | {@link JwtCustomException }
   * @method verifyAccessTokenOldVersion
   * @public
   * @abstract
   */
  public abstract verifyAccessTokenOldVersion<OutputData extends Record<string, unknown>>(
    data: IVerifyAccessTokenOldVersion,
  ): Promise<VerifyAccessTokenOldVersionModel<OutputData> | JwtCustomException>

  /**
   * This is description method
   * @param { IVerifyRefreshToken } data - type is {@link IVerifyRefreshToken }
   * @return {VerifyRefreshTokenModel | JwtCustomException} data type
   * is {@link VerifyRefreshTokenModel} | {@link JwtCustomException }
   * @method verifyRefreshToken
   * @public
   * @abstract
   */
  public abstract verifyRefreshToken<OutputData extends Record<string, unknown>>(
    data: IVerifyRefreshToken,
  ): Promise<VerifyRefreshTokenModel<OutputData> | JwtCustomException>
}

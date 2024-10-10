import { Inject, Injectable, Logger, Optional } from '@nestjs/common'
import * as jwt from 'jsonwebtoken'

import { JWT_MODULE_OPTIONS } from '../constants'
import { JwtSecretRequestType } from '../enums'
import { JwtCustomException, JwtExceptionEnum, LanguagesEnum } from '../exceptions'
import { JwtSignOptions, JwtVerifyOptions } from '../interfaces'
import { IJWTCustomModuleOptionsFactory } from '../jwt-options.interface'
import { GetSecretKeyResult } from '../types/secret-key-result.type'

@Injectable()
export class JwtBaseService {
  private readonly _logger = new Logger(JwtBaseService.name)

  public constructor(
    @Optional()
    @Inject(JWT_MODULE_OPTIONS)
    private readonly _options: IJWTCustomModuleOptionsFactory,
  ) {}

  public sign(payload: string, options?: Omit<JwtSignOptions, keyof jwt.SignOptions>): string
  public sign(payload: Buffer | object, options?: JwtSignOptions): string
  public sign(payload: string | Buffer | object, options?: JwtSignOptions): string {
    const signOptions = this._mergeJwtOptions({ ...options }, 'signOptions') as jwt.SignOptions
    const secret = this._getSecretKey(payload, options, 'privateKey', JwtSecretRequestType.SIGN)

    if (secret instanceof Promise) {
      secret.catch(() => {}) // suppress rejection from async provider
      throw new JwtCustomException(
        JwtCustomException.jwt[this._options.language][JwtExceptionEnum.ACCESS_TOKEN_UNCORRECTED],
      )
    }

    const allowedSignOptKeys = ['secret', 'privateKey']
    const signOptKeys = Object.keys(signOptions)
    if (typeof payload === 'string' && signOptKeys.some((k) => !allowedSignOptKeys.includes(k))) {
      const error = JwtCustomException.jwt[this._options.language][JwtExceptionEnum.PAYLOAD_STRING_ERROR]
      error.description += signOptKeys.join(', ')

      throw new JwtCustomException(error)
    }

    return jwt.sign(payload, secret, signOptions)
  }

  public signAsync(
    payload: string,
    options?: Omit<JwtSignOptions, keyof jwt.SignOptions>,
  ): Promise<string> | JwtCustomException
  public signAsync(payload: Buffer | object, options?: JwtSignOptions): Promise<string> | JwtCustomException
  public signAsync(payload: string | Buffer | object, options?: JwtSignOptions): Promise<string> | JwtCustomException {
    const signOptions = this._mergeJwtOptions({ ...options }, 'signOptions') as jwt.SignOptions
    const secret = this._getSecretKey(payload, options, 'privateKey', JwtSecretRequestType.SIGN)

    const allowedSignOptKeys = ['secret', 'privateKey']
    const signOptKeys = Object.keys(signOptions)
    if (typeof payload === 'string' && signOptKeys.some((k) => !allowedSignOptKeys.includes(k))) {
      const error = JwtCustomException.jwt[this._options.language][JwtExceptionEnum.PAYLOAD_STRING_ERROR]
      error.description += signOptKeys.join(', ')

      return new JwtCustomException(error)
    }

    return new Promise((resolve, reject) =>
      Promise.resolve()
        .then(() => secret)
        .then((scrt: GetSecretKeyResult) => {
          jwt.sign(payload, scrt, signOptions, (err, encoded) => (err ? reject(err) : resolve(encoded)))
        }),
    )
  }

  public verify<T extends object = any>(token: string, options?: JwtVerifyOptions): T | JwtCustomException {
    const verifyOptions = this._mergeJwtOptions({ ...options }, 'verifyOptions')
    const secret = this._getSecretKey(token, options, 'publicKey', JwtSecretRequestType.VERIFY)

    if (secret instanceof Promise) {
      secret.catch(() => {}) // suppress rejection from async provider
      throw new JwtCustomException(
        JwtCustomException.jwt[this._options.language][JwtExceptionEnum.ACCESS_TOKEN_UNCORRECTED],
      )
    }

    try {
      return jwt.verify(token, secret, verifyOptions) as T
    } catch (err) {
      return JwtCustomException.parseAndReturnInstance(err, LanguagesEnum.EN)
    }
  }

  public verifyAsync<T extends object = any>(token: string, options?: JwtVerifyOptions): Promise<T> {
    const verifyOptions = this._mergeJwtOptions({ ...options }, 'verifyOptions')
    const secret = this._getSecretKey(token, options, 'publicKey', JwtSecretRequestType.VERIFY)

    return new Promise((resolve, reject) =>
      Promise.resolve()
        .then(() => secret)
        .then((scrt: GetSecretKeyResult) => {
          jwt.verify(token, scrt, verifyOptions, (err, decoded) => (err ? reject(err) : resolve(decoded as T)))
        })
        .catch(reject),
    ) as Promise<T>
  }

  public decode<T = any>(token: string, options?: jwt.DecodeOptions): T {
    return jwt.decode(token, options) as T
  }

  private _mergeJwtOptions(
    options: JwtVerifyOptions | JwtSignOptions,
    key: 'verifyOptions' | 'signOptions',
  ): jwt.VerifyOptions | jwt.SignOptions {
    delete options.secret
    if (key === 'signOptions') {
      delete (options as JwtSignOptions).privateKey
    } else {
      delete (options as JwtVerifyOptions).publicKey
    }

    return options
      ? {
          ...(this._options[key] || {}),
          ...options,
        }
      : this._options[key]
  }

  private _getSecretKey(
    token: string | object | Buffer,
    options: JwtVerifyOptions | JwtSignOptions,
    key: 'publicKey' | 'privateKey',
    secretRequestType: JwtSecretRequestType,
  ): GetSecretKeyResult | Promise<GetSecretKeyResult> {
    const secret =
      options?.secret ||
      this._options.secret ||
      (key === 'privateKey'
        ? (options as JwtSignOptions)?.privateKey || this._options.privateKey
        : (options as JwtVerifyOptions)?.publicKey || this._options.publicKey) ||
      this._options[key]

    return secret instanceof Promise ? secret.then((sec) => sec) : secret
  }
}

import { Logger } from '@nestjs/common'

// eslint-disable-next-line @typescript-eslint/naming-convention
import * as JwtCustomErrors from './constants/jwt.constant'
import { LanguagesEnum } from './enums'
import { JwtConstantExceptionsType, JwtExceptionType, ParseResponseErrorType } from './types'

export class JwtCustomException extends Error {
  public code?: number
  public message: string
  public stack?: string
  public errorName?: string
  public description?: string
  private readonly _logger = new Logger(JwtCustomException.name)

  public constructor(params?: JwtExceptionType, logger = true) {
    super()

    this.code = params?.code
    this.message = params?.message
    this.description = params?.description
    this.errorName = params?.errorName

    if (this.message && logger) {
      this._logger.error('Error: ' + this.message)
    }
  }

  public static get jwt(): JwtConstantExceptionsType {
    return JwtCustomErrors.jwtConstantExceptions
  }

  protected get _heap(): JwtConstantExceptionsType {
    return {
      ...JwtCustomErrors.jwtConstantExceptions,
    }
  }

  public static checkErrorIntoData<TypeData>(data: TypeData & JwtCustomException): boolean {
    return !!Object.keys(data).includes('code')
  }

  public static parseAndReturnInstance<T>(
    data: T & ParseResponseErrorType,
    language: keyof typeof LanguagesEnum,
  ): JwtCustomException | null {
    if (data.message?.replace(' ', '_')?.toUpperCase() == 'SUCCESS') {
      return
    }

    const errorCode = (data.providerErrorCode || data.errorCode || data.message)?.replace(' ', '_')?.toUpperCase()

    const error = new JwtCustomException()._heap[language][errorCode]

    if (error) {
      return new JwtCustomException(error)
    }

    const unknownError = JwtCustomException.jwt.EN.UNKNOWN_ERROR
    unknownError.description += data.message
    return new JwtCustomException(unknownError)
  }

  public parse<T>(data: T & ParseResponseErrorType, language: keyof typeof LanguagesEnum): JwtCustomException | null {
    if (data.message?.replace(' ', '_')?.toUpperCase() == 'SUCCESS') {
      return
    }

    const errorCode = (data.providerErrorCode || data.errorCode || data.message)?.replace(' ', '_')?.toUpperCase()

    const error = this._heap[language][errorCode]

    if (error) {
      throw new JwtCustomException(error)
    }

    const unknownError = JwtCustomException.jwt.EN.UNKNOWN_ERROR
    unknownError.description += data.message
    throw new JwtCustomException(unknownError)
  }
}

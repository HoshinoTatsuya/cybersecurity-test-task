import { AuthenticationExceptionEnum } from '../../enums/authentication-exception.enum'
import { ExceptionType } from '../exception.type'

export type AuthenticationExceptionType = Record<keyof typeof AuthenticationExceptionEnum, ExceptionType>

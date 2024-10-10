import { UsersExceptionEnum } from '../../enums'
import { ExceptionType } from '../exception.type'

export type UsersExceptionType = Record<keyof typeof UsersExceptionEnum, ExceptionType>

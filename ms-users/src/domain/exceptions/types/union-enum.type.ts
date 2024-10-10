import { CommonExceptionEnum, UsersExceptionEnum, ValidationExceptionEnum } from '../enums'
import { AuthenticationExceptionEnum } from '../enums/authentication-exception.enum'

export type UnionEnumType =
  | typeof UsersExceptionEnum
  | typeof AuthenticationExceptionEnum
  | typeof CommonExceptionEnum
  | typeof ValidationExceptionEnum

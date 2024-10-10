import { CommonExceptionEnum, UsersExceptionEnum, ValidationExceptionEnum } from '../enums'
import { AuthenticationExceptionEnum } from '../enums/authentication-exception.enum'
import { CommentsExceptionEnum } from '../enums/comments-exception.enum'

export type UnionEnumType =
  | typeof UsersExceptionEnum
  | typeof AuthenticationExceptionEnum
  | typeof CommentsExceptionEnum
  | typeof CommonExceptionEnum
  | typeof ValidationExceptionEnum

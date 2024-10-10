import { CommonExceptionEnum, UsersExceptionEnum, ValidationExceptionEnum } from '../enums'
import { CommentsExceptionEnum } from '../enums/comments-exception.enum'

export type UnionEnumType =
  | typeof UsersExceptionEnum
  | typeof CommentsExceptionEnum
  | typeof CommonExceptionEnum
  | typeof ValidationExceptionEnum

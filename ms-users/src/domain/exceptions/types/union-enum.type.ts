import { CommonExceptionEnum, UsersExceptionEnum, ValidationExceptionEnum } from '../enums'

export type UnionEnumType = typeof UsersExceptionEnum | typeof CommonExceptionEnum | typeof ValidationExceptionEnum

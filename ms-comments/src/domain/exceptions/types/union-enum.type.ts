import { CommentsExceptionEnum, CommonExceptionEnum, ValidationExceptionEnum } from '../enums'

export type UnionEnumType = typeof CommentsExceptionEnum | typeof CommonExceptionEnum | typeof ValidationExceptionEnum

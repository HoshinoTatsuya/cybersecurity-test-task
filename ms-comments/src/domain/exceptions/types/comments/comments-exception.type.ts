import { CommentsExceptionEnum } from '../../enums'
import { ExceptionType } from '../exception.type'

export type CommentsExceptionType = Record<keyof typeof CommentsExceptionEnum, ExceptionType>

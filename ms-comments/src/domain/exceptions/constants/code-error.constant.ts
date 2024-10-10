import { CommentsExceptionEnum, CommonExceptionEnum } from '../enums'
import { UnionEnumType } from '../types'

export const codeError: Record<keyof UnionEnumType, number> = {
  // Common
  [CommonExceptionEnum.INTERNAL_SERVER_ERROR]: 500,
  [CommonExceptionEnum.BAD_REQUEST]: 400,
  [CommonExceptionEnum.UNKNOWN_ERROR]: 520,
  [CommonExceptionEnum.DATA_DUPLICATION]: 400,
  [CommonExceptionEnum.VALIDATION]: 422,

  // Scheduler Comments
  [CommentsExceptionEnum.SCHEDULER_DROP_COMMENT_ERROR]: 1001,

  // Comments
  [CommentsExceptionEnum.FAILED_TO_UPDATE_COMMENT]: 10001,
  [CommentsExceptionEnum.COMMENTS_IS_NOT_FOUND]: 10002,
}

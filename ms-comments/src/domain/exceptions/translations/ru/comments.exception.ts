import { codeError } from '../../constants/code-error.constant'
import { CommentsExceptionEnum } from '../../enums'
import { CommentsExceptionType } from '../../types/comments'

export const commentsExceptionRu: CommentsExceptionType = {
  [CommentsExceptionEnum.SCHEDULER_DROP_COMMENT_ERROR]: {
    code: codeError[CommentsExceptionEnum.SCHEDULER_DROP_COMMENT_ERROR],
    errorName: CommentsExceptionEnum.SCHEDULER_DROP_COMMENT_ERROR,
    message: `Запланированная задача по удалению комментариев завершилась с ошибкой!`,
    description: `Запланированная задача по удалению комментариев завершилась с ошибкой!`,
  },

  [CommentsExceptionEnum.FAILED_TO_UPDATE_COMMENT]: {
    code: codeError[CommentsExceptionEnum.FAILED_TO_UPDATE_COMMENT],
    errorName: CommentsExceptionEnum.FAILED_TO_UPDATE_COMMENT,
    message: `Не удалось обновить комментарий!`,
    description: `Не удалось обновить комментарий!`,
  },
  [CommentsExceptionEnum.COMMENTS_IS_NOT_FOUND]: {
    code: codeError[CommentsExceptionEnum.COMMENTS_IS_NOT_FOUND],
    errorName: CommentsExceptionEnum.COMMENTS_IS_NOT_FOUND,
    message: `Комментарий не найден!`,
    description: `Комментарий не найден!`,
  },
}

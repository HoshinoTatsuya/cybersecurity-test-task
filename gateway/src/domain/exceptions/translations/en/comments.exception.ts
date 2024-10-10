import { codeError } from '../../constants/code-error.constant'
import { CommentsExceptionEnum } from '../../enums'
import { CommentsExceptionType } from '../../types/comments'

export const commentsExceptionEn: CommentsExceptionType = {
  [CommentsExceptionEnum.SCHEDULER_DROP_COMMENT_ERROR]: {
    code: codeError[CommentsExceptionEnum.SCHEDULER_DROP_COMMENT_ERROR],
    errorName: CommentsExceptionEnum.SCHEDULER_DROP_COMMENT_ERROR,
    message: `The scheduled task to delete comments failed!`,
    description: `The scheduled task to delete comments failed!`,
  },

  [CommentsExceptionEnum.FAILED_TO_UPDATE_COMMENT]: {
    code: codeError[CommentsExceptionEnum.FAILED_TO_UPDATE_COMMENT],
    errorName: CommentsExceptionEnum.FAILED_TO_UPDATE_COMMENT,
    message: `Failed to update comment!`,
    description: `Failed to update comment!`,
  },
  [CommentsExceptionEnum.COMMENTS_IS_NOT_FOUND]: {
    code: codeError[CommentsExceptionEnum.COMMENTS_IS_NOT_FOUND],
    errorName: CommentsExceptionEnum.COMMENTS_IS_NOT_FOUND,
    message: `Comment not found!`,
    description: `Comment not found!`,
  },
}

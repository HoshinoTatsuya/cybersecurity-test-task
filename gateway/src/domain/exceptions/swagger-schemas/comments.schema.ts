import { CommentsExceptionEnum } from '../enums'
import { badResponseSchemaFactory } from '../factories/bad-response-schema.factory'
import { commentsExceptionEn } from '../translations/en/comments.exception'

export const commentsSchemas = {
  [CommentsExceptionEnum.SCHEDULER_DROP_COMMENT_ERROR]: badResponseSchemaFactory(
    commentsExceptionEn.SCHEDULER_DROP_COMMENT_ERROR,
  ),

  [CommentsExceptionEnum.FAILED_TO_UPDATE_COMMENT]: badResponseSchemaFactory(
    commentsExceptionEn.FAILED_TO_UPDATE_COMMENT,
  ),
  [CommentsExceptionEnum.COMMENTS_IS_NOT_FOUND]: badResponseSchemaFactory(commentsExceptionEn.COMMENTS_IS_NOT_FOUND),
}

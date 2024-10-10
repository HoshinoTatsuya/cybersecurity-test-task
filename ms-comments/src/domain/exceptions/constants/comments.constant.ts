import { SupportLanguageEnum } from '../enums/support-language.enum'
import { commentsExceptionEn, commentsExceptionRu } from '../translations'
import { CommentsLanguagesExceptionType } from '../types/comments'

export const commentsExceptions: CommentsLanguagesExceptionType = {
  [SupportLanguageEnum.RU]: commentsExceptionRu,
  [SupportLanguageEnum.EN]: commentsExceptionEn,
}

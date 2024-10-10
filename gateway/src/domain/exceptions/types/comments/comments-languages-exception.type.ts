import { SupportLanguageEnum } from '../../enums/support-language.enum'

import { CommentsExceptionType } from './comments-exception.type'

export type CommentsLanguagesExceptionType = Record<keyof typeof SupportLanguageEnum, CommentsExceptionType>

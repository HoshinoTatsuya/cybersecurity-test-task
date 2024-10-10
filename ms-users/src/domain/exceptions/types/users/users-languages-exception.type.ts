import { SupportLanguageEnum } from '../../enums/support-language.enum'

import { UsersExceptionType } from './users-exception.type'

export type UsersLanguagesExceptionType = Record<keyof typeof SupportLanguageEnum, UsersExceptionType>

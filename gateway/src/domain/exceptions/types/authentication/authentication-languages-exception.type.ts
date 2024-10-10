import { SupportLanguageEnum } from '../../enums/support-language.enum'

import { AuthenticationExceptionType } from './authentication-exception.type'

export type AuthenticationLanguagesExceptionType = Record<keyof typeof SupportLanguageEnum, AuthenticationExceptionType>

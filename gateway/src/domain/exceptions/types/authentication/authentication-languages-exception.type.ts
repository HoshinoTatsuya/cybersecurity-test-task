import { LanguagesEnum } from '@libs/shared/common/enums/languages.enum'
import { AuthenticationExceptionType } from '@libs/shared/common/exceptions'

export type AuthenticationLanguagesExceptionType = Record<keyof typeof LanguagesEnum, AuthenticationExceptionType>

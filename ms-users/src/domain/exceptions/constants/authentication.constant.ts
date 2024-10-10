import { SupportLanguageEnum } from '../enums/support-language.enum'
import { authenticationExceptionEn, authenticationExceptionRu } from '../translations'
import { AuthenticationLanguagesExceptionType } from '../types/authentication'

export const authenticationExceptions: AuthenticationLanguagesExceptionType = {
  [SupportLanguageEnum.RU]: authenticationExceptionRu,
  [SupportLanguageEnum.EN]: authenticationExceptionEn,
}

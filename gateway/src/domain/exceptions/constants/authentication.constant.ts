import { LanguagesEnum } from '@libs/shared/common/enums/languages.enum'
import { AuthenticationLanguagesExceptionType } from '@libs/shared/common/exceptions'

import { authenticationExceptionEn, authenticationExceptionRu } from '../translations'

export const authenticationExceptions: AuthenticationLanguagesExceptionType = {
  [LanguagesEnum.RU]: authenticationExceptionRu,
  [LanguagesEnum.EN]: authenticationExceptionEn,
}

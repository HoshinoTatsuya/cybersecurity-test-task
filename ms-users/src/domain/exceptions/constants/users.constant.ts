import { SupportLanguageEnum } from '../enums/support-language.enum'
import { usersExceptionEn, usersExceptionRu } from '../translations'
import { UsersLanguagesExceptionType } from '../types/users'

export const usersExceptions: UsersLanguagesExceptionType = {
  [SupportLanguageEnum.RU]: usersExceptionRu,
  [SupportLanguageEnum.EN]: usersExceptionEn,
}

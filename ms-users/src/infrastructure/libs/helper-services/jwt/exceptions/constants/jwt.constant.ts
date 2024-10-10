import { LanguagesEnum } from '../enums'
import { jwtExceptionEn, jwtExceptionRu } from '../i18n'
import { JwtConstantExceptionsType } from '../types'

export const jwtConstantExceptions: JwtConstantExceptionsType = {
  [LanguagesEnum.EN]: jwtExceptionEn,
  [LanguagesEnum.RU]: jwtExceptionRu,
}

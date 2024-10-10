import { SupportLanguageEnum } from '../../domain/exceptions/enums/support-language.enum'

export const isAlphaLanguage: Record<keyof typeof SupportLanguageEnum, RegExp> = {
  [SupportLanguageEnum.RU]: /^[А-Яа-яЁё\s]+$/,
  [SupportLanguageEnum.EN]: /^[A-Za-z\s]+$/,
}

export const maxStringLength = 50
export const maxPasswordLength = 24
export const passwordSettings = {
  minLength: 9,
  minUppercase: 1,
  minLowercase: 1,
  minNumbers: 1,
  minSymbols: 1,
}
export const uuidV4 = 4

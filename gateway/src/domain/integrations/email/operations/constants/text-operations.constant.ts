import { LanguagesEnum } from '../enums'
import { textOperationsEn, textOperationsRu } from '../i18n'
import { MailConstantTextOperationsType } from '../types'

export const textOperations: MailConstantTextOperationsType = {
  [LanguagesEnum.RU]: textOperationsRu,
  [LanguagesEnum.EN]: textOperationsEn,
}

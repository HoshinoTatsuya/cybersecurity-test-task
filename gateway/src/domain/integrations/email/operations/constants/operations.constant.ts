import { LanguagesEnum } from '../enums'
import { operationsEn, operationsRu } from '../i18n'
import { MailConstantOperationsType } from '../types'

export const operations: MailConstantOperationsType = {
  [LanguagesEnum.RU]: operationsRu,
  [LanguagesEnum.EN]: operationsEn,
}

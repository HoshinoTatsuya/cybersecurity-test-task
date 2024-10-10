import { LanguagesEnum } from '../enums'

import { MailTextOperationsType } from './mail-text-operations.type'

export type MailConstantTextOperationsType = Record<keyof typeof LanguagesEnum, MailTextOperationsType>

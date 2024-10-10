import { LanguagesEnum } from '../enums'

import { MailOperationsType } from './mail-operations.type'

export type MailConstantOperationsType = Record<keyof typeof LanguagesEnum, MailOperationsType>

import { OperationsEnum } from '../enums'

export type MailOperationsType = Record<keyof typeof OperationsEnum, string>

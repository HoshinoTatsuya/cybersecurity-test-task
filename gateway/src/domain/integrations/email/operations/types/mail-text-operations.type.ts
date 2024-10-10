import { OperationsEnum } from '../enums'

import {
  EmailRecoveryType,
  PasswordRecoveryType,
  PhoneRecoveryType,
  UserRegistrationType,
  UserRegistrationWithGenerateCredsType,
} from './text-structures'

export type MailTextOperationsType = {
  [OperationsEnum.REGISTRATION_USER]: UserRegistrationType
  [OperationsEnum.REGISTRATION_WITH_CREDENTIALS]: UserRegistrationWithGenerateCredsType
  [OperationsEnum.PASSWORD_RECOVERY]: PasswordRecoveryType
  [OperationsEnum.PHONE_RECOVERY]: PhoneRecoveryType
  [OperationsEnum.EMAIL_RECOVERY]: EmailRecoveryType
}

import { OperationsEnum } from '../../enums'
import { MailOperationsType } from '../../types'

export const operationsEn: MailOperationsType = {
  [OperationsEnum.REGISTRATION_USER]: 'User registration.',
  [OperationsEnum.REGISTRATION_WITH_CREDENTIALS]: 'User registration.',
  [OperationsEnum.PASSWORD_RECOVERY]: 'Password recovery.',
  [OperationsEnum.PHONE_RECOVERY]: 'Changing user phone.',
  [OperationsEnum.EMAIL_RECOVERY]: 'Changing user email.',
}

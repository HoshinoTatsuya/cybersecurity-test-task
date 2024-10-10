import { OperationsEnum } from '../../enums'
import { MailOperationsType } from '../../types'

export const operationsRu: MailOperationsType = {
  [OperationsEnum.REGISTRATION_USER]: 'Регистрация пользователя.',
  [OperationsEnum.REGISTRATION_WITH_CREDENTIALS]: 'Регистрация пользователя.',
  [OperationsEnum.PASSWORD_RECOVERY]: 'Восстановление пароля.',
  [OperationsEnum.PHONE_RECOVERY]: 'Изменение телефона пользователя.',
  [OperationsEnum.EMAIL_RECOVERY]: 'Изменение почты пользователя.',
}

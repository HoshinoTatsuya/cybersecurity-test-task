import { OperationsEnum } from '../../enums'
import { MailTextOperationsType } from '../../types'

import { endTextMessageRu, messageSignatureRu, textInstallApplicationOnMobileRu } from './default-text-ru'

export const textOperationsRu: MailTextOperationsType = {
  [OperationsEnum.REGISTRATION_USER]: {
    welcomeHeader: 'Уважаемый __NAME_USER__, благодарим вас за регистрацию на нашем сайте!',
    mainText: 'Пожалуйста, введите ниже указанный регистрационный код, чтобы активировать личный кабинет.',
    textForCode: 'Ваш разовый код:',
    messageSignature: messageSignatureRu,
    textInstallApplicationOnMobile: textInstallApplicationOnMobileRu,
    endTextMessage: endTextMessageRu,
  },
  [OperationsEnum.REGISTRATION_WITH_CREDENTIALS]: {
    welcomeHeader: 'Уважаемый __NAME_USER__, благодарим вас за регистрацию на нашем сайте!',
    mainText:
      'Компания создала для вас свой личный кабинет. ' +
      'Чтобы воспользоваться нашим сервисом скачайте мобильное приложение и укажите данные для входа.',
    loginUser: 'Ваш логин: ',
    passwordUser: 'Ваш пароль: ',
    messageSignature: messageSignatureRu,
    textInstallApplicationOnMobile: textInstallApplicationOnMobileRu,
    endTextMessage: endTextMessageRu,
  },
  [OperationsEnum.PASSWORD_RECOVERY]: {
    mainText:
      'Вы получили данное письмо, потому что запросили сброс пароля для учетной записи __PROJECT_NAME__. ' +
      'Чтобы выбрать новый пароль и завершить операцию, пожалуйста, введите данный код на странице сброса пароля:',
    textForCode: 'Ваш разовый код:',
    warningText: 'Если вы не инициировали запрос, проигнорируйте данное письмо.',
    textForParamsRequest: 'Данное письмо было инициоравано с системы со следующими параметрами:',
    ipRequest: '',
    clientRequest: '',
    osRequest: '',
    messageSignature: messageSignatureRu,
    textInstallApplicationOnMobile: textInstallApplicationOnMobileRu,
    endTextMessage: endTextMessageRu,
  },
  [OperationsEnum.PHONE_RECOVERY]: {
    mainText:
      'Вы получили данное письмо, потому что запросили изменение телефона для учетной записи __PROJECT_NAME__. ' +
      'Чтобы завершить операцию, пожалуйста, введите данный код на странице сброса пароля:',
    textForCode: 'Ваш разовый код:',
    warningText: 'Если вы не инициировали запрос, обратитесь в поддержку.',
    textForParamsRequest: 'Данное письмо было инициоравано с системы со следующими параметрами:',
    ipRequest: '',
    clientRequest: '',
    osRequest: '',
    messageSignature: messageSignatureRu,
    textInstallApplicationOnMobile: textInstallApplicationOnMobileRu,
    endTextMessage: endTextMessageRu,
  },
  [OperationsEnum.EMAIL_RECOVERY]: {
    mainText:
      'Вы получили данное письмо, потому что запросили изменение почты для учетной записи __PROJECT_NAME__. ' +
      'Чтобы завершить операцию, пожалуйста, введите данный код на странице сброса пароля:',
    textForCode: 'Ваш разовый код:',
    warningText: 'Если вы не инициировали запрос, обратитесь в поддержку.',
    textForParamsRequest: 'Данное письмо было инициоравано с системы со следующими параметрами:',
    ipRequest: '',
    clientRequest: '',
    osRequest: '',
    messageSignature: messageSignatureRu,
    textInstallApplicationOnMobile: textInstallApplicationOnMobileRu,
    endTextMessage: endTextMessageRu,
  },
}

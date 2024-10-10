import { OperationsEnum } from '../../enums'
import { MailTextOperationsType } from '../../types'

import { endTextMessageEn, messageSignatureEn, textInstallApplicationOnMobileEn } from './default-text-en'

export const textOperationsEn: MailTextOperationsType = {
  [OperationsEnum.REGISTRATION_USER]: {
    welcomeHeader: 'Dear __NAME_USER__, thank you for registering on our website!',
    mainText: 'Please enter the registration code below to activate your personal account.',
    textForCode: 'Your one-time code:',
    messageSignature: messageSignatureEn,
    textInstallApplicationOnMobile: textInstallApplicationOnMobileEn,
    endTextMessage: endTextMessageEn,
  },
  [OperationsEnum.REGISTRATION_WITH_CREDENTIALS]: {
    welcomeHeader: 'Dear __NAME_USER__, thank you for registering on our website!',
    mainText:
      'The company has created its own personal account for you. ' +
      'To use our service, download the mobile application and enter your login details.',
    loginUser: 'Your login: ',
    passwordUser: 'Your password: ',
    messageSignature: messageSignatureEn,
    textInstallApplicationOnMobile: textInstallApplicationOnMobileEn,
    endTextMessage: endTextMessageEn,
  },
  [OperationsEnum.PASSWORD_RECOVERY]: {
    mainText:
      'You received this email because you requested a password reset for your __PROJECT_NAME__ account. ' +
      'To select a new password and complete the operation, please enter this code on the password reset page:',
    textForCode: 'Your one-time code:',
    warningText: 'If you did not initiate the request, please ignore this email.',
    textForParamsRequest: 'This letter was initiated from the system with the following parameters:',
    ipRequest: '',
    clientRequest: '',
    osRequest: '',
    messageSignature: messageSignatureEn,
    textInstallApplicationOnMobile: textInstallApplicationOnMobileEn,
    endTextMessage: endTextMessageEn,
  },
  [OperationsEnum.PHONE_RECOVERY]: {
    mainText:
      'You received this email because you requested a phone change for your __PROJECT_NAME__ account. ' +
      'To complete the transaction, please enter this code on the password reset page:',
    textForCode: 'Your one-time code:',
    warningText: 'If you did not initiate a request, please contact support.',
    textForParamsRequest: 'This letter was initiated from the system with the following parameters:',
    ipRequest: '',
    clientRequest: '',
    osRequest: '',
    messageSignature: messageSignatureEn,
    textInstallApplicationOnMobile: textInstallApplicationOnMobileEn,
    endTextMessage: endTextMessageEn,
  },
  [OperationsEnum.EMAIL_RECOVERY]: {
    mainText:
      'You received this email because you requested an email change for the __PROJECT_NAME__ account. ' +
      'To complete the transaction, please enter this code on the password reset page:',
    textForCode: 'Your one-time code:',
    warningText: 'If you did not initiate a request, please contact support.',
    textForParamsRequest: 'This letter was initiated from the system with the following parameters:',
    ipRequest: '',
    clientRequest: '',
    osRequest: '',
    messageSignature: messageSignatureEn,
    textInstallApplicationOnMobile: textInstallApplicationOnMobileEn,
    endTextMessage: endTextMessageEn,
  },
}

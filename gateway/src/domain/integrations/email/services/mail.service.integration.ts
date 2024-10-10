import { BaseException } from '@libs/shared/common/exceptions'
import { InternalServerErrorException } from '@nestjs/common'

import { ISendMailOptions } from '../../../../infrastructure/libs/helper-services/email'
import { IMailService } from '../../../../infrastructure/libs/helper-services/email/interfaces/mail-service.interface'
import { appStoreLogo, googlePlayLogo, mainLogo } from '../constants/default-variable.constant'
import {
  IPasswordRecoveryInput,
  IPasswordRecoveryOutput,
  IPersonalAccountActivationInput,
  IPersonalAccountActivationOutput,
  ISendCodeForResetCredentialsUserInput,
  ISendCodeForResetCredentialsUserOutput,
  ISendCredentialsForLoginInput,
  ISendCredentialsForLoginOutput,
  ISendMailInput,
} from '../interfaces'
import { operations, templateList, textOperations } from '../operations'

import { ConvertTextService } from './convert-text.service'

// TODO: ПОЛНОСТЬЮ ПЕРЕДЕЛАТЬ ДАННЫЙ КЛАСС!!!!!
export class MailServiceIntegration extends ConvertTextService {
  public constructor(private readonly _mailCustomService: IMailService) {
    super()
  }

  public async sendCredentialsForLogin(data: ISendCredentialsForLoginInput): Promise<ISendCredentialsForLoginOutput> {
    const { result: resultConvertText } = await this._convertMailTextCredentialsForLogin({
      text: textOperations[data.userLanguage].REGISTRATION_WITH_CREDENTIALS,
      userFirstName: data.userFirstName,
      loginUser: data.login,
      passwordUser: data.password,
    })

    const result = await this._sendMail({
      subTitle: operations[data.userLanguage].REGISTRATION_WITH_CREDENTIALS,
      mailData: {
        to: data.email,
        data: {
          login: data.login,
          password: data.password,
          ...resultConvertText,
          mainLogo,
          appStoreLogo,
          googlePlayLogo,
        },
      },

      template: templateList.userRegistrationWithGenerateCreds,
    })

    return { result }
  }

  public async sendCodeForResetCredentialsUser(
    data: ISendCodeForResetCredentialsUserInput,
  ): Promise<ISendCodeForResetCredentialsUserOutput> {
    const { result: resultConvertText } = await this._convertMailTextPasswordRecovery({
      text: textOperations[data.userLanguage].PASSWORD_RECOVERY,
      ipRequest: data.ipClient,
      clientRequest: data.userAgentInfo,
      osRequest: data.userAgentInfo,
    })

    const result = await this._sendMail({
      subTitle: operations[data.userLanguage].PASSWORD_RECOVERY,
      mailData: {
        to: data.email,
        data: { code: data.code, ...resultConvertText },
      },
      template: templateList.emailRecovery,
    })

    return { result }
  }

  public async sendCodeForEmailRecovery(
    data: ISendCodeForResetCredentialsUserInput,
  ): Promise<ISendCodeForResetCredentialsUserOutput> {
    const { result: resultConvertText } = await this._convertMailTextPasswordRecovery({
      text: textOperations[data.userLanguage].EMAIL_RECOVERY,
      ipRequest: data.ipClient,
      clientRequest: data.userAgentInfo,
      osRequest: data.userAgentInfo,
    })

    const result = await this._sendMail({
      subTitle: operations[data.userLanguage].EMAIL_RECOVERY,
      mailData: {
        to: data.email,
        data: {
          code: data.code,
          ...resultConvertText,
          mainLogo,
          appStoreLogo,
          googlePlayLogo,
        },
      },
      template: templateList.emailRecovery,
    })

    return { result }
  }

  public async sendCodeForPhoneRecovery(
    data: ISendCodeForResetCredentialsUserInput,
  ): Promise<ISendCodeForResetCredentialsUserOutput> {
    const { result: resultConvertText } = await this._convertMailTextPasswordRecovery({
      text: textOperations[data.userLanguage].PHONE_RECOVERY,
      ipRequest: data.ipClient,
      clientRequest: data.userAgentInfo,
      osRequest: data.userAgentInfo,
    })

    const result = await this._sendMail({
      subTitle: operations[data.userLanguage].PHONE_RECOVERY,
      mailData: {
        to: data.email,
        data: {
          code: data.code,
          ...resultConvertText,
          mainLogo,
          appStoreLogo,
          googlePlayLogo,
        },
      },
      template: templateList.emailRecovery,
    })

    return { result }
  }

  public async sendMailPasswordRecovery(data: IPasswordRecoveryInput): Promise<IPasswordRecoveryOutput> {
    const { result: resultConvertText } = await this._convertMailTextPasswordRecovery({
      text: textOperations[data.userLanguage].PASSWORD_RECOVERY,
      ipRequest: data.ipClient,
      clientRequest: data.userAgentInfo,
      osRequest: data.userAgentInfo,
    })

    const result = await this._sendMail({
      subTitle: operations[data.userLanguage].PASSWORD_RECOVERY,
      mailData: {
        to: data.email,
        data: {
          code: data.passwordRecoveryCode,
          ...resultConvertText,
          mainLogo,
          appStoreLogo,
          googlePlayLogo,
        },
      },
      template: templateList.passwordRecovery,
    })

    return { result }
  }

  public async sendMailPersonalAccountActivation(
    data: IPersonalAccountActivationInput,
  ): Promise<IPersonalAccountActivationOutput | BaseException> {
    const { result: resultConvertText } = await this._convertMailTextAccountActivation({
      text: textOperations[data.userLanguage].REGISTRATION_USER,
      userFirstName: data.userFirstName,
    })

    const result = await this._sendMail({
      subTitle: operations[data.userLanguage].REGISTRATION_USER,
      mailData: {
        to: data.email,
        data: { code: data.activationCode, ...resultConvertText, mainLogo, appStoreLogo, googlePlayLogo },
      },

      template: templateList.userRegistration,
    })

    return { result }
  }

  private async _sendMail<InputMailData>(scopeData: ISendMailInput<InputMailData>): Promise<boolean> {
    try {
      const { result: title } = this._createMailTitles({ subTitle: scopeData.subTitle, title: scopeData.title })
      const reqData: ISendMailOptions = {
        to: scopeData.mailData.to,
        subject: title,
      }

      if (scopeData.template !== undefined) {
        reqData.template = scopeData.template
        reqData.context = scopeData.mailData.data
      }

      if (scopeData.text !== undefined) {
        reqData.text = scopeData.text
      }

      await this._mailCustomService.sendMail(reqData).catch((error) => {
        throw new InternalServerErrorException(error)
      })

      return true
    } catch (e) {
      return false
    }
  }
}

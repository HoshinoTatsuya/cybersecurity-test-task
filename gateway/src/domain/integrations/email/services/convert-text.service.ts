import { defaultProjectName, defaultTitle, realProjectName } from '../constants/default-variable.constant'
import {
  IConvertMailTextAccountActivationInput,
  IConvertMailTextAccountActivationOutput,
  IConvertMailTextCredentialsForLoginInput,
  IConvertMailTextCredentialsForLoginOutput,
  IConvertMailTextPasswordRecoveryInput,
  IConvertMailTextPasswordRecoveryOutput,
  ICreateMailTitlesInput,
  ICreateMailTitlesOutput,
} from '../interfaces/convert-mail-text'

export class ConvertTextService {
  protected _createMailTitles(data: ICreateMailTitlesInput): ICreateMailTitlesOutput {
    if (!data.title) {
      data.title = defaultTitle
    }

    const result = `${data.title} :: ${data.subTitle}`

    return { result }
  }

  protected async _convertMailTextPasswordRecovery(
    data: IConvertMailTextPasswordRecoveryInput,
  ): Promise<IConvertMailTextPasswordRecoveryOutput> {
    const newMainText = this._setProjectNameToString(data.text.mainText)

    const newTextInstallApplicationOnMobile = this._setProjectNameToString(data.text.textInstallApplicationOnMobile)

    const newTextSignature = this._setProjectNameToString(data.text.messageSignature)

    const newEndTextMessage = this._setProjectNameToString(data.text.endTextMessage)

    const browserInfo = Object.values(data.clientRequest.browser).join(',')
    const clientRequest = Object.values(data.clientRequest.engine)
      .concat(Object.values(data.clientRequest.os))
      .join(',')

    return {
      result: {
        mainText: newMainText,
        textForCode: data.text.textForCode,
        warningText: data.text.warningText,
        textForParamsRequest: data.text.textForParamsRequest,
        ipRequest: data.ipRequest,
        clientRequest: browserInfo,
        osRequest: clientRequest,
        messageSignature: newTextSignature,
        textInstallApplicationOnMobile: newTextInstallApplicationOnMobile,
        endTextMessage: newEndTextMessage,
      },
    }
  }

  protected async _convertMailTextAccountActivation(
    data: IConvertMailTextAccountActivationInput,
  ): Promise<IConvertMailTextAccountActivationOutput> {
    const { userFirstName } = data

    const newWelcomeHeader = this._setNameToString(data.text.welcomeHeader, userFirstName)

    const newTextInstallApplicationOnMobile = this._setProjectNameToString(data.text.textInstallApplicationOnMobile)

    const newTextSignature = this._setProjectNameToString(data.text.messageSignature)

    const newEndTextMessage = this._setProjectNameToString(data.text.endTextMessage)

    return {
      result: {
        welcomeHeader: newWelcomeHeader,
        mainText: data.text.mainText,
        messageSignature: newTextSignature,
        textForCode: data.text.textForCode,
        textInstallApplicationOnMobile: newTextInstallApplicationOnMobile,
        endTextMessage: newEndTextMessage,
      },
    }
  }

  protected async _convertMailTextCredentialsForLogin(
    data: IConvertMailTextCredentialsForLoginInput,
  ): Promise<IConvertMailTextCredentialsForLoginOutput> {
    const { userFirstName } = data

    const newWelcomeHeader = this._setNameToString(data.text.welcomeHeader, userFirstName)

    const newTextInstallApplicationOnMobile = this._setProjectNameToString(data.text.textInstallApplicationOnMobile)

    const newTextSignature = this._setProjectNameToString(data.text.messageSignature)

    const newEndTextMessage = this._setProjectNameToString(data.text.endTextMessage)

    return {
      result: {
        welcomeHeader: newWelcomeHeader,
        mainText: data.text.mainText,
        messageSignature: newTextSignature,
        textInstallApplicationOnMobile: newTextInstallApplicationOnMobile,
        endTextMessage: newEndTextMessage,
        loginUser: data.text.loginUser + data.loginUser,
        passwordUser: data.text.passwordUser + data.passwordUser,
      },
    }
  }

  private _setProjectNameToString(data: string): string {
    const projectName = realProjectName ?? defaultProjectName

    return data.replace('__PROJECT_NAME__', projectName)
  }

  private _setNameToString(defaultString: string, login: string): string {
    return defaultString.replace('__NAME_USER__', login)
  }
}

import { BaseException, CommonExceptionEnum } from '@libs/shared/common/exceptions'

import {
  GreenApiCustomException,
  GreenApiExceptionEnum,
} from '../../../../infrastructure/libs/helper-services/green-api/exceptions'
import { IGreenApi } from '../../../../infrastructure/libs/helper-services/green-api/interfaces/green-api.interface'
import { basedMaintainerFromMessage } from '../constants'
import {
  ISendCodeForResetCredentialsUserInput,
  ISendCodeForResetCredentialsUserOutput,
} from '../interfaces/send-code-for-reset-credentials-user'
import { ISendCredentialsForLoginInput, ISendCredentialsForLoginOutput } from '../interfaces/send-credentials-for-login'
import {
  ISendPasswordRecoveryCodeToPhoneInput,
  ISendPasswordRecoveryCodeToPhoneOutput,
} from '../interfaces/send-password-recovery-code-to-phone'
import {
  ISendRegistrationCodeToPhoneInput,
  ISendRegistrationCodeToPhoneOutput,
} from '../interfaces/send-registration-code-to-phone'

export class GreenApiServiceIntegration {
  public constructor(public readonly _greenApiService: IGreenApi) {}

  public async sendPasswordRecoveryCodeToPhone(
    data: ISendPasswordRecoveryCodeToPhoneInput,
  ): Promise<ISendPasswordRecoveryCodeToPhoneOutput | BaseException> {
    return await this._sendCode({
      toUserPhone: data.phoneNumber,
      textMessage: data.code,
      fromUser: basedMaintainerFromMessage,
    })
  }

  public async sendRegistrationCodeToPhone(
    data: ISendRegistrationCodeToPhoneInput,
  ): Promise<ISendRegistrationCodeToPhoneOutput | BaseException> {
    return await this._sendCode({
      toUserPhone: data.phoneNumber,
      textMessage: data.code,
      fromUser: basedMaintainerFromMessage,
    })
  }

  public async sendCodeForResetCredentialsUser(
    data: ISendCodeForResetCredentialsUserInput,
  ): Promise<ISendCodeForResetCredentialsUserOutput | BaseException> {
    return await this._sendCode({
      toUserPhone: data.phoneNumber,
      textMessage: data.code,
      fromUser: basedMaintainerFromMessage,
    })
  }

  public async sendCredentialsForLogin(
    data: ISendCredentialsForLoginInput,
  ): Promise<ISendCredentialsForLoginOutput | BaseException> {
    const textMessage = `
    login: ${data.login}
    password: ${data.password}
    `

    return await this._sendCode({
      toUserPhone: data.phoneNumber,
      textMessage,
      fromUser: basedMaintainerFromMessage,
    })
  }

  private async _sendCode(data: {
    toUserPhone: string
    textMessage: string
    fromUser?: string
  }): Promise<BaseException | { requestId: string }> {
    const resultSendCode = await this._greenApiService.sendMessageToPhone.sendCode({
      toUserPhone: data.toUserPhone,
      textMessage: data.textMessage,
      fromUser: data.fromUser || basedMaintainerFromMessage,
    })

    if (resultSendCode instanceof GreenApiCustomException) {
      if (resultSendCode.errorName === GreenApiExceptionEnum.AUTHORIZATION_DECLINED) {
        await this._greenApiService.refreshToken()
        const resultSendCodeRepeat = await this._greenApiService.sendMessageToPhone.sendCode({
          toUserPhone: data.toUserPhone,
          textMessage: data.textMessage,
          fromUser: data.fromUser || basedMaintainerFromMessage,
        })

        if (resultSendCodeRepeat instanceof GreenApiCustomException) {
          return new BaseException().errorSubstitution({
            error: resultSendCode,
            substitution: CommonExceptionEnum.INTERNAL_SERVER_ERROR,
            loggingTrueData: false,
            loggingSubstitution: true,
          })
        }

        return { requestId: resultSendCodeRepeat.requestId }
      }

      return new BaseException().errorSubstitution({
        error: resultSendCode,
        loggingTrueData: false,
        loggingSubstitution: true,
      })
    }

    return { requestId: resultSendCode.requestId }
  }
}

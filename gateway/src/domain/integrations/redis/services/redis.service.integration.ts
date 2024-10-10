import {AuthenticationExceptionEnum, BaseException} from '@libs/shared/common/exceptions'
import {GetShadowAgentModel, GetShadowAgentWsModel} from '@libs/shared/common/shadow-agent/models'
import {Injectable} from '@nestjs/common'

import {RedisCustomException} from '../../../../infrastructure/libs/helper-services/redis/exceptions/redis.exception'
import {IRedisService} from '../../../../infrastructure/libs/helper-services/redis/interfaces'
import {GetRegistrationDataGeneric, GetSessionDataGeneric} from '../generics'
import {
    IAcceptRedisEmailRecoveryDataInput,
    IAcceptRedisPasswordRecoveryDataInput,
    IAcceptRedisPhoneRecoveryDataInput,
    IDeleteAcceptedEmailRecoveryDataRedisInput,
    IDeleteAcceptedPasswordRecoveryDataRedisInput,
    IDeleteAcceptedPhoneRecoveryDataRedisInput,
    IDeleteAllUserTokensInRedisInput,
    IDeleteEmailRecoveryInput,
    IDeleteManySessionsInRedisInput,
    IDeletePasswordRecoveryDataRedisInput,
    IDeletePhoneRecoveryInput,
    IDeleteRedisRegistrationDataInput,
    IDeleteTokensInRedisInput,
    IGetAcceptedEmailRecoveryDataRedisInput,
    IGetAcceptedEmailRecoveryDataRedisOutput,
    IGetAcceptedPasswordRecoveryDataRedisInput,
    IGetAcceptedPasswordRecoveryDataRedisOutput,
    IGetAcceptedPhoneRecoveryDataRedisInput,
    IGetAcceptedPhoneRecoveryDataRedisOutput,
    IGetEmailRecoveryInput,
    IGetEmailRecoveryOutput,
    IGetPasswordRecoveryDataRedisInput,
    IGetPasswordRecoveryDataRedisOutput,
    IGetPhoneRecoveryInput,
    IGetPhoneRecoveryOutput,
    IGetRegistrationDataRedisInput,
    IGetRegistrationDataRedisOutput,
    IGetSessionDataRedisInput,
    IGetSessionDataRedisOutput,
    ISetEmailRecoveryInput,
    ISetEmailRecoveryOutput,
    ISetPhoneRecoveryInput,
    ISetPhoneRecoveryOutput,
    ISetRedisPasswordRecoveryDataInput,
    ISetRedisPasswordRecoveryDataOutput,
    ISetRedisRegistrationDataInput,
    ISetRedisTokensDataInput,
    IVerifyRedisDataWithInputDataInput,
    IVerifyRedisDataWithInputDataOutput,
} from '../interfaces'

/**
 * This class is an integration layer between Redis and the business logic of the project.
 *
 * @class RedisServiceIntegration
 *
 * METHODS:
 * - Delete tokens in redis {@link RedisServiceIntegration.deleteTokensInRedis} - This is short description
 * - Get session data redis {@link RedisServiceIntegration.getSessionDataRedis} - This is short description
 * - Set redis tokens data {@link RedisServiceIntegration.setRedisTokensData} - This is short description
 *
 * @abstract
 */
@Injectable()
export class RedisServiceIntegration {
  /**
   * This is description
   * @param {IRedisService} redisCustomService - type is {@link IRedisService }
   * @constructor
   */
  public constructor(public readonly redisCustomService: IRedisService) {}

  /**
   * This is description method
   * @param { IDeleteTokensInRedisInput } data - type is {@link IDeleteTokensInRedisInput }
   * @param {GetShadowAgentModel} agentInfo - type is {@link GetShadowAgentModel }
   * @return {boolean | BaseException} - data returned type is {@link BaseException} | boolean
   *
   * @method deleteTokensInRedis
   * @public
   */
  public async deleteTokensInRedis(data: IDeleteTokensInRedisInput): Promise<boolean | BaseException> {
    const resultDeleteTokenRedis = await this.redisCustomService.deleteTokens({
      sessionId: data.sessionId,
      userId: data.userId,
    })

    if (resultDeleteTokenRedis instanceof RedisCustomException) {
      if (resultDeleteTokenRedis.errorName === AuthenticationExceptionEnum.SESSION_NOT_FOUND) {
        return new BaseException(BaseException.authentication.EN.SESSION_NOT_FOUND)
      }

      return new BaseException().errorSubstitution({
        error: resultDeleteTokenRedis,
        loggingTrueData: false,
      })
    }

    return resultDeleteTokenRedis
  }

  /**
   * This is description method
   * @param { IDeleteTokensInRedisInput } data - type is {@link IDeleteTokensInRedisInput }
   * @param {GetShadowAgentModel} agentInfo - type is {@link GetShadowAgentModel }
   * @return {boolean | BaseException} - data returned type is {@link BaseException} | boolean
   *
   * @method deleteAllUserTokensInRedis
   * @public
   */
  public async deleteAllUserTokensInRedis(data: IDeleteAllUserTokensInRedisInput): Promise<boolean | BaseException> {
    const allPathsTokens = await this.redisCustomService.getAllPathsTokensByUser({
      userId: data.userId,
    })

    if (allPathsTokens instanceof RedisCustomException) {
      if (allPathsTokens.errorName === AuthenticationExceptionEnum.SESSION_NOT_FOUND) {
        return new BaseException(BaseException.authentication.EN.SESSION_NOT_FOUND)
      }

      return new BaseException().errorSubstitution({
        error: allPathsTokens,
        loggingTrueData: false,
      })
    }

    if (allPathsTokens.length === 0) {
      return true
    }

    const resultDeleteTokenRedis = await this.redisCustomService.deleteArrayTokensByPaths({
      paths: allPathsTokens,
    })

    if (resultDeleteTokenRedis instanceof RedisCustomException) {
      if (resultDeleteTokenRedis.errorName === AuthenticationExceptionEnum.SESSION_NOT_FOUND) {
        return new BaseException(BaseException.authentication.EN.SESSION_NOT_FOUND)
      }

      return new BaseException().errorSubstitution({
        error: resultDeleteTokenRedis,
        loggingTrueData: false,
      })
    }

    return resultDeleteTokenRedis
  }

  /**
   * This is description method
   * @param { IDeleteTokensInRedisInput } data - type is {@link IDeleteTokensInRedisInput }
   * @param {GetShadowAgentModel} agentInfo - type is {@link GetShadowAgentModel }
   * @return {boolean | BaseException} - data returned type is {@link BaseException} | boolean
   *
   * @method deleteManySessionsInRedis
   * @public
   */
  public async deleteManySessionsInRedis(data: IDeleteManySessionsInRedisInput): Promise<boolean | BaseException> {
    const resultDeleteTokenRedis = await this.redisCustomService.deleteManySessions({
      sessionsIds: data.sessionsIds,
      userId: data.userId,
    })

    if (resultDeleteTokenRedis instanceof RedisCustomException) {
      if (resultDeleteTokenRedis.errorName === AuthenticationExceptionEnum.SESSION_NOT_FOUND) {
        return new BaseException(BaseException.authentication.EN.SESSION_NOT_FOUND)
      }

      return new BaseException().errorSubstitution({
        error: resultDeleteTokenRedis,
        loggingTrueData: false,
      })
    }

    return resultDeleteTokenRedis
  }

  /**
   * This is description method
   * @param { IGetSessionDataRedisInput } data - type is {@link IGetSessionDataRedisInput }
   * @param {GetShadowAgentModel} agentInfo - type is {@link GetShadowAgentModel }
   * @return {IGetSessionDataRedisOutput | BaseException} - data returned type is
   * {@link BaseException} | {@link IGetSessionDataRedisOutput}
   *
   * @method getSessionDataRedis
   * @public
   */
  public async getSessionDataRedis(
    data: IGetSessionDataRedisInput,
  ): Promise<IGetSessionDataRedisOutput | BaseException> {
    const sessionDataInRedis = await this.redisCustomService.getSessionData<GetSessionDataGeneric>({
      sessionId: data.sessionId,
      userId: data.userId,
    })

    if (sessionDataInRedis instanceof RedisCustomException) {
      if (sessionDataInRedis.errorName === AuthenticationExceptionEnum.SESSION_NOT_FOUND) {
        return new BaseException(BaseException.authentication.EN.SESSION_NOT_FOUND, false)
      }

      return new BaseException(BaseException.common.EN.INTERNAL_SERVER_ERROR, false)
    }

    const { sessionData: result } = sessionDataInRedis

    return result
  }

  /**
   * This is description method
   * @param { ISetRedisTokensDataInput } data - type is {@link ISetRedisTokensDataInput }
   * @param {GetShadowAgentModel} agentInfo - type is {@link GetShadowAgentModel }
   * @return {boolean | BaseException} data returned type is {@link BaseException} | boolean
   *
   * @method setRedisTokensData
   * @public
   */
  public async setRedisTokensData(data: ISetRedisTokensDataInput): Promise<boolean | BaseException> {
    const result = await this.redisCustomService.setTokens({
      sessionId: data.sessionId,
      userId: data.userId,
      dataCache: { ...data.dataCache },
    })

    if (result instanceof RedisCustomException) {
      return new BaseException().errorSubstitution({
        error: result,
        loggingTrueData: false,
      })
    }

    return result
  }

  /**
   * This is description method
   * @param { IVerifyRedisDataWithInputDataInput } data - type is {@link IVerifyRedisDataWithInputDataInput }
   * @param {GetShadowAgentModel} agentInfo - type is {@link GetShadowAgentModel }
   * @return {IVerifyRedisDataWithInputDataOutput | BaseException} data returned type is
   * {@link BaseException} | {@link IVerifyRedisDataWithInputDataOutput}
   *
   * @method verifyRedisDataWithInputData
   * @public
   */
  public async verifyRedisDataWithInputData(
    data: IVerifyRedisDataWithInputDataInput,
    agentInfo: GetShadowAgentModel | GetShadowAgentWsModel,
  ): Promise<IVerifyRedisDataWithInputDataOutput | BaseException> {
    const error: string[] = []
    let detectedError: boolean = false

    const tokenIsHack = await this._detectHackingAttempt(data.accessToken?.input, data.accessToken?.redis)

    if (tokenIsHack) {
      const errorInstance = new BaseException(BaseException.authentication.EN.TOKEN_SUBSTITUTION)
      error.push(errorInstance.message)

      detectedError = true
    }

    const ipClientIsHack = await this._detectHackingAttempt(data.ipClient?.input, data.ipClient?.redis)

    if (ipClientIsHack) {
      const errorInstance = new BaseException(BaseException.authentication.EN.THIRD_PARTY_IP)
      error.push(errorInstance.message)

      detectedError = true
    }

    const userAgentIsHack = await this._detectHackingAttempt(data.userAgent?.input, data.userAgent?.redis)

    if (userAgentIsHack) {
      const errorInstance = new BaseException(BaseException.authentication.EN.THIRD_PARTY_CLIENT)
      error.push(errorInstance.message)

      detectedError = true
    }

    if (detectedError) {
      const newErrorData = new BaseException(BaseException.authentication.EN.HACKING_ATTEMPT_DETECTED)

      newErrorData.message += error.join(' ')
      newErrorData.description += JSON.stringify(agentInfo)

      return new BaseException().errorSubstitution({
        error: newErrorData,
        substitution: AuthenticationExceptionEnum.VERIFICATION_FAILED,
      })
    }

    return { result: true }
  }

  public async setRedisRegistrationData(data: ISetRedisRegistrationDataInput): Promise<boolean | BaseException> {
    const result = await this.redisCustomService.setRegistrationData({
      ...data,
      email: data.email,
      key: data.key,
      firstName: data.firstName,
      passwordHash: data.passwordHash,
      code: data.code,
      phoneNumber: data.phoneNumber,
    })

    if (result instanceof RedisCustomException) {
      return new BaseException().errorSubstitution({
        error: result,
        loggingTrueData: false,
      })
    }

    return result
  }

  public async getRedisRegistrationData(
    data: IGetRegistrationDataRedisInput,
  ): Promise<IGetRegistrationDataRedisOutput | BaseException | undefined> {
    const result = await this.redisCustomService.getRegistrationData<GetRegistrationDataGeneric>({
      key: data.key,
    })

    if (result instanceof RedisCustomException) {
      if (RedisCustomException.redis.EN.REGISTRATION_DATA_NOT_FOUND.errorName === result.errorName) {
        return undefined
      }

      const error = new BaseException().errorSubstitution({
        error: result,
        loggingTrueData: false,
      })

      return error
    }

    return { ...result.registrationData }
  }

  public async deleteRedisRegistrationData(data: IDeleteRedisRegistrationDataInput): Promise<boolean | BaseException> {
    const result = await this.redisCustomService.deleteRegistrationData({
      key: data.key,
    })

    if (result instanceof RedisCustomException) {
      return new BaseException().errorSubstitution({
        error: result,
        loggingTrueData: false,
      })
    }

    return true
  }

  public async setPasswordRecoveryInRedis(
    data: ISetRedisPasswordRecoveryDataInput,
  ): Promise<ISetRedisPasswordRecoveryDataOutput | BaseException> {
    const result = await this.redisCustomService.setPasswordRecoveryCode(data)

    if (result instanceof RedisCustomException) {
      return new BaseException().errorSubstitution({
        error: result,
        loggingTrueData: false,
      })
    }

    return { expiresTime: result.expiresTime }
  }

  public async acceptPasswordRecoveryInRedis(data: IAcceptRedisPasswordRecoveryDataInput): Promise<BaseException> {
    const result = await this.redisCustomService.acceptPasswordRecoveryCode(data)

    if (result instanceof RedisCustomException) {
      return new BaseException().errorSubstitution({
        error: result,
        loggingTrueData: false,
      })
    }
  }

  public async acceptEmailRecoveryInRedis(data: IAcceptRedisEmailRecoveryDataInput): Promise<BaseException> {
    const result = await this.redisCustomService.acceptEmailRecoveryCode(data)

    if (result instanceof RedisCustomException) {
      return new BaseException().errorSubstitution({
        error: result,
        loggingTrueData: false,
      })
    }
  }

  public async acceptPhoneRecoveryInRedis(data: IAcceptRedisPhoneRecoveryDataInput): Promise<BaseException> {
    const result = await this.redisCustomService.acceptPhoneRecoveryCode(data)

    if (result instanceof RedisCustomException) {
      return new BaseException().errorSubstitution({
        error: result,
        loggingTrueData: false,
      })
    }
  }

  public async getAcceptedEmailRecoveryCode(
    data: IGetAcceptedEmailRecoveryDataRedisInput,
  ): Promise<IGetAcceptedEmailRecoveryDataRedisOutput | BaseException | undefined> {
    const result = await this.redisCustomService.getAcceptedEmailRecoveryCode<IGetAcceptedEmailRecoveryDataRedisOutput>(
      {
        key: data.key,
      },
    )

    if (result instanceof RedisCustomException) {
      if (result.errorName === RedisCustomException.redis.EN.ACCEPT_EMAIL_RECOVERY_CODE_NOT_FOUND.errorName) {
        return undefined
      }

      return new BaseException().errorSubstitution({
        error: result,
        loggingTrueData: false,
      })
    }

    return result
  }

  public async getAcceptedPhoneRecoveryCode(
    data: IGetAcceptedPhoneRecoveryDataRedisInput,
  ): Promise<IGetAcceptedPhoneRecoveryDataRedisOutput | BaseException | undefined> {
    const result = await this.redisCustomService.getAcceptedPhoneRecoveryCode<IGetAcceptedPhoneRecoveryDataRedisOutput>(
      {
        key: data.key,
      },
    )

    if (result instanceof RedisCustomException) {
      if (result.errorName === RedisCustomException.redis.EN.ACCEPT_PHONE_RECOVERY_CODE_NOT_FOUND.errorName) {
        return undefined
      }
      return new BaseException().errorSubstitution({
        error: result,
        loggingTrueData: false,
      })
    }

    return result
  }

  public async deleteAcceptedEmailRecoveryCode(
    data: IDeleteAcceptedEmailRecoveryDataRedisInput,
  ): Promise<void | BaseException> {
    const result = await this.redisCustomService.deleteAcceptedEmailRecoveryCode({ key: data.key })

    if (result instanceof RedisCustomException) {
      return new BaseException().errorSubstitution({
        error: result,
        loggingTrueData: false,
      })
    }
  }

  public async deleteAcceptedPhoneRecoveryCode(
    data: IDeleteAcceptedPhoneRecoveryDataRedisInput,
  ): Promise<void | BaseException> {
    const result = await this.redisCustomService.deleteAcceptedPhoneRecoveryCode({ key: data.key })

    if (result instanceof RedisCustomException) {
      return new BaseException().errorSubstitution({
        error: result,
        loggingTrueData: false,
      })
    }
  }

  public async getAcceptedPasswordRecoveryCode(
    data: IGetAcceptedPasswordRecoveryDataRedisInput,
  ): Promise<IGetAcceptedPasswordRecoveryDataRedisOutput | BaseException | undefined> {
    const result =
      await this.redisCustomService.getAcceptedPasswordRecoveryCode<IGetAcceptedPasswordRecoveryDataRedisOutput>({
        key: data.key,
      })

    if (result instanceof RedisCustomException) {
      if (result.errorName === RedisCustomException.redis.EN.ACCEPT_PASSWORD_RECOVERY_CODE_NOT_FOUND.errorName) {
        return undefined
      }
      return new BaseException().errorSubstitution({
        error: result,
        loggingTrueData: false,
      })
    }

    return result
  }

  public async deleteAcceptedPasswordRecoveryCode(
    data: IDeleteAcceptedPasswordRecoveryDataRedisInput,
  ): Promise<void | BaseException> {
    const result = await this.redisCustomService.deleteAcceptedPasswordRecoveryCode({ key: data.key })

    if (result instanceof RedisCustomException) {
      return new BaseException().errorSubstitution({
        error: result,
        loggingTrueData: false,
      })
    }
  }

  public async getPasswordRecoveryInRedis(
    data: IGetPasswordRecoveryDataRedisInput,
  ): Promise<IGetPasswordRecoveryDataRedisOutput | BaseException | undefined> {
    const result = await this.redisCustomService.getPasswordRecoveryCode<IGetPasswordRecoveryDataRedisOutput>({
      key: data.key,
    })

    if (result instanceof RedisCustomException) {
      if (result.errorName === RedisCustomException.redis.EN.PASSWORD_RECOVERY_CODE_NOT_FOUND.errorName) {
        return undefined
      }

      return new BaseException().errorSubstitution({
        error: result,
        loggingTrueData: false,
      })
    }

    return result
  }

  public async deletePasswordRecoveryInRedis(
    data: IDeletePasswordRecoveryDataRedisInput,
  ): Promise<void | BaseException> {
    const result = await this.redisCustomService.deletePasswordRecoveryCode({ key: data.key })

    if (result instanceof RedisCustomException) {
      return new BaseException().errorSubstitution({
        error: result,
        loggingTrueData: false,
      })
    }
  }

  public async setEmailRecoveryInRedis(data: ISetEmailRecoveryInput): Promise<ISetEmailRecoveryOutput | BaseException> {
    const result = await this.redisCustomService.setEmailRecoveryCode({
      key: data.key,
      code: data.code,
      email: data.email,
    })

    if (result instanceof RedisCustomException) {
      return new BaseException().errorSubstitution({
        error: result,
        loggingTrueData: false,
      })
    }

    return result
  }

  public async getEmailRecoveryInRedis(
    data: IGetEmailRecoveryInput,
  ): Promise<IGetEmailRecoveryOutput | BaseException | undefined> {
    const result = await this.redisCustomService.getEmailRecoveryCode({
      key: data.key,
    })

    if (result instanceof RedisCustomException) {
      if (result.errorName === RedisCustomException.redis.EN.EMAIL_RECOVERY_CODE_IS_NOT_FOUND.errorName) {
        return undefined
      }

      return new BaseException().errorSubstitution({
        error: result,
        loggingTrueData: false,
      })
    }

    return result
  }

  public async deleteEmailRecoveryInRedis(data: IDeleteEmailRecoveryInput): Promise<void | BaseException> {
    const result = await this.redisCustomService.deleteEmailRecoveryCode({ key: data.key })

    if (result instanceof RedisCustomException) {
      return new BaseException().errorSubstitution({
        error: result,
        loggingTrueData: false,
      })
    }
  }

  public async setPhoneRecoveryInRedis(data: ISetPhoneRecoveryInput): Promise<ISetPhoneRecoveryOutput | BaseException> {
    const result = await this.redisCustomService.setPhoneRecoveryCode({
      key: data.key,
      phone: data.phone,
      code: data.code,
    })

    if (result instanceof RedisCustomException) {
      return new BaseException().errorSubstitution({
        error: result,
        loggingTrueData: false,
      })
    }

    return result
  }

  public async getPhoneRecoveryInRedis(data: IGetPhoneRecoveryInput): Promise<IGetPhoneRecoveryOutput | BaseException> {
    const result = await this.redisCustomService.getPhoneRecoveryCode({
      key: data.key,
    })

    if (result instanceof RedisCustomException) {
      if (result.errorName === RedisCustomException.redis.EN.PHONE_RECOVERY_CODE_IS_NOT_FOUND.errorName) {
        return undefined
      }

      return new BaseException().errorSubstitution({
        error: result,
        loggingTrueData: false,
      })
    }

    return result
  }

  public async deletePhoneRecoveryInRedis(data: IDeletePhoneRecoveryInput): Promise<void | BaseException> {
    const result = await this.redisCustomService.deletePhoneRecoveryCode({ key: data.key })

    if (result instanceof RedisCustomException) {
      return new BaseException().errorSubstitution({
        error: result,
        loggingTrueData: false,
      })
    }
  }

  /**
   * This is description method
   *
   * @param {string} inputData is used for whatever reason
   * @param {string} dataForCheck is used for whatever reason
   *
   * @return {boolean} boolean result
   * @private
   */
  private async _detectHackingAttempt(inputData: string, dataForCheck: string): Promise<boolean> {
    if (!inputData && !dataForCheck) {
      return false
    }

    return inputData !== dataForCheck
  }
}

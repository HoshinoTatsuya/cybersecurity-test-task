import { IResult } from 'ua-parser-js'

import { LanguagesEnum } from '../../operations'

export interface IPasswordRecoveryInput {
  email: string
  passwordRecoveryCode: string
  userLanguage: LanguagesEnum
  ipClient: string
  userAgentInfo: IResult
}

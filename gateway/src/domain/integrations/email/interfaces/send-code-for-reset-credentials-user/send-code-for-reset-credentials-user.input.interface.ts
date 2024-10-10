import { IResult } from 'ua-parser-js'

import { LanguagesEnum } from '../../operations'

export interface ISendCodeForResetCredentialsUserInput {
  email: string
  code: string
  userLanguage: LanguagesEnum
  ipClient: string
  userAgentInfo: IResult
}

import { IResult } from 'ua-parser-js'

import { PasswordRecoveryType } from '../../../operations'

export interface IConvertMailTextPasswordRecoveryInput {
  text: PasswordRecoveryType
  ipRequest: string
  clientRequest: IResult
  osRequest: IResult
}

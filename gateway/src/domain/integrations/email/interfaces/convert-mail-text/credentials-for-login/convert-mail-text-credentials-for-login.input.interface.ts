import { UserRegistrationWithGenerateCredsType } from '../../../operations'

export interface IConvertMailTextCredentialsForLoginInput {
  text: UserRegistrationWithGenerateCredsType
  userFirstName: string
  loginUser: string
  passwordUser: string
}

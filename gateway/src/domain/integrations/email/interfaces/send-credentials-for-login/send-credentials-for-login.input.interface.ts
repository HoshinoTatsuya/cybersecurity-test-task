import { LanguagesEnum } from '../../operations'

export interface ISendCredentialsForLoginInput {
  login: string
  password: string
  email: string
  userFirstName: string
  userLanguage: LanguagesEnum
}

import { LanguagesEnum } from '../../operations'

export interface IPersonalAccountActivationInput {
  email: string
  activationCode: string
  userLanguage: LanguagesEnum
  userFirstName: string
}

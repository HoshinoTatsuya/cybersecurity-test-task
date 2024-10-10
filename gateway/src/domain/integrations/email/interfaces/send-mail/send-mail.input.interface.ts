import { MailData } from './mail-data.interface'

export interface ISendMailInput<InputMailData> {
  title?: string
  subTitle: string
  template?: string
  text?: string
  mailData: MailData<InputMailData>
}

import { Provider } from '@nestjs/common'

import { MailerService } from '../../../infrastructure/libs/helper-services/email'

import { MailServiceIntegration } from './services/mail.service.integration'

export const MAIL_INTEGRATION_SERVICE = 'MAIL_INTEGRATION_SERVICE'
export const MailIntegrationProvider: Provider = {
  inject: [MailerService],
  provide: MAIL_INTEGRATION_SERVICE,
  useFactory: (mailService: MailerService) => new MailServiceIntegration(mailService),
}

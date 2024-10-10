import { Provider } from '@nestjs/common'

import { GreenApiService } from '../../../infrastructure/libs/helper-services/green-api/services/green-api.service'

import { GreenApiServiceIntegration } from './services/green-api.service.integration'

export const GREEN_API_INTEGRATION_SERVICE = 'GREEN_API_INTEGRATION_SERVICE'
export const GreenApiIntegrationProvider: Provider = {
  inject: [GreenApiService],
  provide: GREEN_API_INTEGRATION_SERVICE,
  useFactory: (greenApiService: GreenApiService) => new GreenApiServiceIntegration(greenApiService),
}

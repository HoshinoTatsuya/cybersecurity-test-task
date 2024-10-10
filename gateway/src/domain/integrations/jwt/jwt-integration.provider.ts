import { Provider } from '@nestjs/common'

import { JwtCustomService } from '../../../infrastructure/libs/helper-services/jwt/services/jwt.service'

import { JwtServiceIntegration } from './services/jwt.service.integration'

export const JWT_INTEGRATION_SERVICE = 'JWT_INTEGRATION_SERVICE'
export const JwtIntegrationProvider: Provider = {
  inject: [JwtCustomService],
  provide: JWT_INTEGRATION_SERVICE,
  useFactory: (jwtService: JwtCustomService) => new JwtServiceIntegration(jwtService),
}

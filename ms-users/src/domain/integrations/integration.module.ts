import { Module } from '@nestjs/common'
import { JWTCustomModule } from '../../infrastructure/libs/helper-services/jwt/jwt.module'
import { JWT_INTEGRATION_SERVICE, JwtIntegrationProvider } from './jwt/jwt-integration.provider'

@Module({
  imports: [JWTCustomModule],
  providers: [JwtIntegrationProvider],
  exports: [JWT_INTEGRATION_SERVICE],
})
export class IntegrationModule {}

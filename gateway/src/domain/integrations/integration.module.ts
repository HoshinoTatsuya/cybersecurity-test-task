import { Module } from '@nestjs/common'

import { MailerCoreModule } from '../../infrastructure/libs/helper-services/email/mailer-core.module'
import { GreenApiModule } from '../../infrastructure/libs/helper-services/green-api/green-api.module'
import { JWTCustomModule } from '../../infrastructure/libs/helper-services/jwt/jwt.module'
import { RedisCustomModule } from '../../infrastructure/libs/helper-services/redis/redis.module'

import { MAIL_INTEGRATION_SERVICE, MailIntegrationProvider } from './email/mail-integration.provider'
import { GREEN_API_INTEGRATION_SERVICE, GreenApiIntegrationProvider } from './green-api/green-api-integration.provider'
import { JWT_INTEGRATION_SERVICE, JwtIntegrationProvider } from './jwt/jwt-integration.provider'
import { REDIS_INTEGRATION_SERVICE, RedisIntegrationProvider } from './redis/redis-integration.provider'

@Module({
  imports: [JWTCustomModule, RedisCustomModule, MailerCoreModule, GreenApiModule],
  providers: [JwtIntegrationProvider, RedisIntegrationProvider, MailIntegrationProvider, GreenApiIntegrationProvider],
  exports: [
    JWT_INTEGRATION_SERVICE,
    REDIS_INTEGRATION_SERVICE,
    MAIL_INTEGRATION_SERVICE,
    GREEN_API_INTEGRATION_SERVICE,
  ],
})
export class IntegrationModule {}

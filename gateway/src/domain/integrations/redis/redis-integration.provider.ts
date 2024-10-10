import { Provider } from '@nestjs/common'

import { RedisService } from '../../../infrastructure/libs/helper-services/redis/redis.service'

import { RedisServiceIntegration } from './services/redis.service.integration'

export const REDIS_INTEGRATION_SERVICE = 'REDIS_INTEGRATION_SERVICE'
export const RedisIntegrationProvider: Provider = {
  inject: [RedisService],
  provide: REDIS_INTEGRATION_SERVICE,
  useFactory: (redisService: RedisService) => new RedisServiceIntegration(redisService),
}

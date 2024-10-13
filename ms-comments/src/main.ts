import { Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { ClientProviderOptions, MicroserviceOptions } from '@nestjs/microservices'

import { AppModule } from './app.module'
import { NatsClientConfigService } from './infrastructure/libs/nats/config/nats-client.config'

async function bootstrap(): Promise<void> {
  const configService = new ConfigService()
  const natsClientConfigService = new NatsClientConfigService(configService)
  const natsClientConfig = natsClientConfigService.createNatsClientOptions() as ClientProviderOptions
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, natsClientConfig)

  await app.listen()
  Logger.log(`Service [MS-COMMENTS] is running!`)
}

void bootstrap()

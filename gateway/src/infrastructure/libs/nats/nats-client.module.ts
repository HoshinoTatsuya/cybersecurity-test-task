import { DynamicModule, Global, Inject, Logger, Module, OnApplicationBootstrap } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ClientNats, ClientProviderOptions, ClientsModule } from '@nestjs/microservices'

import { NatsClientConfigService } from './config/nats-client.config'
import { NATS } from './constants'

@Global()
@Module({})
export class NatsClientModule implements OnApplicationBootstrap {
  public constructor(@Inject(NATS) private readonly _clientNats: ClientNats) {}

  public static getNatsConfig(): ClientProviderOptions {
    const configService = new ConfigService()
    const configNats = new NatsClientConfigService(configService).createNatsClientOptions()
    return configNats as ClientProviderOptions
  }

  public static register(): DynamicModule {
    return {
      module: NatsClientModule,
      imports: [ClientsModule.register([NatsClientModule.getNatsConfig()])],
      controllers: [],
      providers: [],
      exports: [ClientsModule],
    }
  }

  public async onApplicationBootstrap(): Promise<void> {
    Logger.verbose(`Connecting to NATS servers [${NatsClientModule.getNatsConfig().options['servers'].toString()}] ...`)
    await this._clientNats
      .connect()
      .then(() => {
        Logger.verbose('Connected to NATS')
      })
      .catch((e) => Logger.error(e))
  }
}

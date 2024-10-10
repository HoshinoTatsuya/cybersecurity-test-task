import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { UsersModule } from './app/modules/users.module'
import { RepositoriesModule } from './app/repositories/repositories.module'
import { configOptions } from './infrastructure/config'
import { TypeOrmConfigService } from './infrastructure/config/typeorm.config'
import { NatsClientModule } from './infrastructure/libs/nats/nats-client.module'

@Module({
  imports: [
    ConfigModule.forRoot(configOptions),
    NatsClientModule.register(),
    RepositoriesModule.register(TypeOrmConfigService),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

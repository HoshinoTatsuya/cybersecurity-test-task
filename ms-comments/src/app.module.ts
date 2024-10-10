import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { CommentsModule } from './app/modules/comments.module'
import { SchedulersModule } from './app/modules/schedulers.module'
import { RepositoriesModule } from './app/repositories/repositories.module'
import { configOptions } from './infrastructure/config'
import { TypeOrmConfigService } from './infrastructure/config/typeorm.config'
import { NatsClientModule } from './infrastructure/libs/nats/nats-client.module'

@Module({
  imports: [
    ConfigModule.forRoot(configOptions),
    NatsClientModule.register(),
    RepositoriesModule.register(TypeOrmConfigService),
    CommentsModule,
    SchedulersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

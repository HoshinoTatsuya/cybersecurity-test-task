import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { CommentsModule } from './app/modules/comments.module'
import { UsersModule } from './app/modules/users.module'
import { configOptions } from './infrastructure/config'
import { MsCommentsConfig } from './infrastructure/config/ms-comments.config'
import { MsUsersConfig } from './infrastructure/config/ms-users.config'
import { MsCommentsModule } from './infrastructure/libs/interaction-external-services/ms-comments/ms-comments.module'
import { MsUsersModule } from './infrastructure/libs/interaction-external-services/ms-users/ms-users.module'
import { NatsClientModule } from './infrastructure/libs/nats/nats-client.module'

@Module({
  imports: [
    ConfigModule.forRoot(configOptions),
    MsCommentsModule.forRootAsync({
      useClass: MsCommentsConfig,
      imports: [ConfigModule],
    }),
    MsUsersModule.forRootAsync({
      useClass: MsUsersConfig,
      imports: [ConfigModule],
    }),
    NatsClientModule.register(),
    UsersModule,
    CommentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

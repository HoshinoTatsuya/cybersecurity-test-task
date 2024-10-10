import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { UsersModule } from './app/modules/users.module'
import { RepositoriesModule } from './app/repositories/repositories.module'
import { configOptions } from './infrastructure/config'
import { JWTConfigService } from './infrastructure/config/jwt.config'
import { TypeOrmConfigService } from './infrastructure/config/typeorm.config'
import { JWTCustomModule } from './infrastructure/libs/helper-services/jwt/jwt.module'
import { NatsClientModule } from './infrastructure/libs/nats/nats-client.module'

@Module({
  imports: [
    ConfigModule.forRoot(configOptions),
    NatsClientModule.register(),
    JWTCustomModule.forRootAsync({
      useClass: JWTConfigService,
      imports: [ConfigModule],
    }),
    RepositoriesModule.register(TypeOrmConfigService),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { Module } from '@nestjs/common'
import { IntegrationModule } from '../../domain/integrations/integration.module'

import { UsersController } from '../controllers/users/users.controller'
import { USERS_USECASE, UsersProvider } from '../providers/users.provider'

@Module({
  imports: [IntegrationModule],
  controllers: [UsersController],
  providers: [UsersProvider],
  exports: [USERS_USECASE],
})
export class UsersModule {}

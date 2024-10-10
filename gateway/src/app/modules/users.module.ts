import { Module } from '@nestjs/common'

import { MsCommentsModule } from '../../infrastructure/libs/interaction-external-services/ms-comments/ms-comments.module'
import { MsUsersModule } from '../../infrastructure/libs/interaction-external-services/ms-users/ms-users.module'
import { UsersController } from '../controllers/users/users.controller'
import { USERS_USECASE, UsersProvider } from '../providers/users.provider'

@Module({
  imports: [MsUsersModule, MsCommentsModule],
  controllers: [UsersController],
  providers: [UsersProvider],
  exports: [USERS_USECASE],
})
export class UsersModule {}

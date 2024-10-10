import { Module } from '@nestjs/common'

import { UsersController } from '../controllers/users/users.controller'
import { USERS_USECASE, UsersProvider } from '../providers/users.provider'

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersProvider],
  exports: [USERS_USECASE],
})
export class UsersModule {}

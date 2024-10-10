import { Module } from '@nestjs/common'

import { MsCommentsModule } from '../../infrastructure/libs/interaction-external-services/ms-comments/ms-comments.module'
import { MsUsersModule } from '../../infrastructure/libs/interaction-external-services/ms-users/ms-users.module'
import { CommentsController } from '../controllers/comments/comments.controller'
import { COMMENTS_USECASE, CommentsProvider } from '../providers/comments.provider'
import { USERS_USECASE, UsersProvider } from '../providers/users.provider'

@Module({
  imports: [MsUsersModule, MsCommentsModule],
  controllers: [CommentsController],
  providers: [CommentsProvider, UsersProvider],
  exports: [COMMENTS_USECASE, USERS_USECASE],
})
export class CommentsModule {}

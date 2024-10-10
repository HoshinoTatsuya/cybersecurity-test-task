import { Module } from '@nestjs/common'

import { MsCommentsModule } from '../../infrastructure/libs/interaction-external-services/ms-comments/ms-comments.module'
import { MsUsersModule } from '../../infrastructure/libs/interaction-external-services/ms-users/ms-users.module'
import { CommentsController } from '../controllers/comments/comments.controller'
import { COMMENTS_USECASE, CommentsProvider } from '../providers/comments.provider'

@Module({
  imports: [MsUsersModule, MsCommentsModule],
  controllers: [CommentsController],
  providers: [CommentsProvider],
  exports: [COMMENTS_USECASE],
})
export class CommentsModule {}

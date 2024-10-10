import { Module } from '@nestjs/common'

import { CommentsController } from '../controllers/comments/comments.controller'
import { COMMENTS_USECASE, CommentsProvider } from '../providers/comments.provider'

@Module({
  imports: [],
  controllers: [CommentsController],
  providers: [CommentsProvider],
  exports: [COMMENTS_USECASE],
})
export class CommentsModule {}

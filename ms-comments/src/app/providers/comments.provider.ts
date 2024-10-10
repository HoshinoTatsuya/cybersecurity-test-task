import { Provider } from '@nestjs/common'

import { CommentsUsecase } from '../../domain/usecases/comments.usecase'
import { CommentsRepository } from '../repositories/comments/comments.repository'

export const COMMENTS_USECASE = Symbol('COMMENTS_USECASE')
export const CommentsProvider: Provider = {
  inject: [CommentsRepository],
  provide: COMMENTS_USECASE,
  useFactory: (commentsRepository: CommentsRepository) => new CommentsUsecase(commentsRepository),
}

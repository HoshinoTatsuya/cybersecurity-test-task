import { Provider } from '@nestjs/common'

import { CommentsUsecase } from '../../domain/usecases/comments.usecase'
import { MsCommentsService } from '../../infrastructure/libs/interaction-external-services/ms-comments/ms-comments.service'
import { MsUsersService } from '../../infrastructure/libs/interaction-external-services/ms-users/ms-users.service'

export const COMMENTS_USECASE = Symbol('COMMENTS_USECASE')
export const CommentsProvider: Provider = {
  inject: [MsUsersService, MsCommentsService],
  provide: COMMENTS_USECASE,
  useFactory: (msUsersService: MsUsersService, msCommentsService: MsCommentsService) =>
    new CommentsUsecase(msUsersService, msCommentsService),
}

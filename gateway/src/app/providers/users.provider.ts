import { Provider } from '@nestjs/common'

import { UsersUsecase } from '../../domain/usecases/users.usecase'
import { MsCommentsService } from '../../infrastructure/libs/interaction-external-services/ms-comments/ms-comments.service'
import { MsUsersService } from '../../infrastructure/libs/interaction-external-services/ms-users/ms-users.service'

export const USERS_USECASE = Symbol('USERS_USECASE')
export const UsersProvider: Provider = {
  inject: [MsUsersService, MsCommentsService],
  provide: USERS_USECASE,
  useFactory: (msUsersService: MsUsersService, msCommentsService: MsCommentsService) =>
    new UsersUsecase(msUsersService, msCommentsService),
}

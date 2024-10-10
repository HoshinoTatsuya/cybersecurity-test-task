import { Provider } from '@nestjs/common'

import { UsersUsecase } from '../../domain/usecases/users.usecase'
import { UsersRepository } from '../repositories/users/users.repository'

export const USERS_USECASE = Symbol('USERS_USECASE')
export const UsersProvider: Provider = {
  inject: [UsersRepository],
  provide: USERS_USECASE,
  useFactory: (usersRepository: UsersRepository) => new UsersUsecase(usersRepository),
}

import { Provider } from '@nestjs/common'
import { JWT_INTEGRATION_SERVICE } from '../../domain/integrations/jwt/jwt-integration.provider'
import { JwtServiceIntegration } from '../../domain/integrations/jwt/services/jwt.service.integration'

import { UsersUsecase } from '../../domain/usecases/users.usecase'
import { UsersRepository } from '../repositories/users/users.repository'

export const USERS_USECASE = Symbol('USERS_USECASE')
export const UsersProvider: Provider = {
  inject: [UsersRepository, JWT_INTEGRATION_SERVICE],
  provide: USERS_USECASE,
  useFactory: (usersRepository: UsersRepository, jwtCustomServiceIntegration: JwtServiceIntegration) =>
    new UsersUsecase(usersRepository, jwtCustomServiceIntegration),
}

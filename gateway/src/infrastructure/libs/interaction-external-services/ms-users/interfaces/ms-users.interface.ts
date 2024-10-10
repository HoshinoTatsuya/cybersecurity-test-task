import { AuthRequest } from '../requests/auth.request'
import { UsersRequest } from '../requests/users.request'

export interface IMsUsersService {
  get users(): UsersRequest

  get auth(): AuthRequest
}

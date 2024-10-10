import { Role } from '../../../../../../../domain/enums'

export interface ICreateUser {
  name: string
  lastName: string
  email: string
  password: string
  role: Role
}

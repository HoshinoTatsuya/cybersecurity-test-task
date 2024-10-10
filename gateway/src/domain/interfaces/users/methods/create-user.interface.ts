import { Role } from '../../../enums'

export interface ICreateUser {
  email: string
  name: string
  lastName: string
  password: string
  role: Role
}

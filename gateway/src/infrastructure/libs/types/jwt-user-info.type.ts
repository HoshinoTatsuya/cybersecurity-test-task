import { Role } from '../../../domain/enums'

export type JwtUserInfoType = {
  userId: string
  role: Role
}

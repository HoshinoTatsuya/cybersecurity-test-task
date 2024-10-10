import { Role } from '../../../../domain/enums'

export class CreateUserDto {
  public email: string
  public name: string
  public lastName: string
  public password: string
  public role: Role
}

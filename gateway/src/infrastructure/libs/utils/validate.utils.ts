import { Role } from '../../../domain/enums'
import { BaseException } from '../../../domain/exceptions'

export class ValidateUtils {
  public static isValidRole({
    currentRole,
    validRoles,
  }: {
    currentRole: Role
    validRoles: Role[]
  }): void | BaseException {
    if (!validRoles.includes(currentRole)) {
      return new BaseException(BaseException.authentication.EN.INVALID_ROLE_FOR_THIS_ACTION)
    }
  }
}

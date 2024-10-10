import { UsersExceptionEnum } from '../enums'
import { badResponseSchemaFactory } from '../factories/bad-response-schema.factory'
import { usersExceptionEn } from '../translations/en/users.exception'

export const usersSchemas = {
  [UsersExceptionEnum.FAILED_TO_UPDATE_USER]: badResponseSchemaFactory(usersExceptionEn.FAILED_TO_UPDATE_USER),
  [UsersExceptionEnum.USER_IS_NOT_FOUND]: badResponseSchemaFactory(usersExceptionEn.USER_IS_NOT_FOUND),
}

import { LanguagesEnum } from '../enums'

import { JwtBaseExceptionType } from './jwt-base-exception.type'

export type JwtConstantExceptionsType = Record<keyof typeof LanguagesEnum, JwtBaseExceptionType>

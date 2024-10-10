import { JwtExceptionEnum } from '../enums'

import { JwtExceptionType } from './jwt-exception.type'

export type JwtBaseExceptionType = Record<keyof typeof JwtExceptionEnum, JwtExceptionType>

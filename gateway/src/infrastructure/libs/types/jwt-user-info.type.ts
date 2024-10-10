import { Role } from '@libs/shared/common/enums'

export type JwtUserInfoType = {
  userId: string
  sessionId: string
  dataCache: DataCacheType
}

type DataCacheType = {
  role: Role
}

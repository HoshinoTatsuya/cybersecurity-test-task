export type GetSessionDataGeneric = {
  accessToken: string
  refreshToken: string
  ipClient: string
  userAgent: string
  saveDataForGetInVerifyToken: Record<string, unknown>
}

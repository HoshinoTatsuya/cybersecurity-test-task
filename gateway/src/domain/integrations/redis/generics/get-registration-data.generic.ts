export type GetRegistrationDataGeneric = {
  firstName: string
  email: string
  phoneNumber: string
  code: string
  passwordHash: string
  timeRequest: number
  expiresTime: number
  [name: string]: unknown
}

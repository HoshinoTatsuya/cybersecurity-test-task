import { Logger } from '@nestjs/common'

export const logNatsRequest = (data: { token: string; serviceName: string; method: string; payload: unknown }): void =>
  Logger.log(
    JSON.stringify(
      {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        TOKEN: data.token,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        DATE: new Date(),
        // eslint-disable-next-line @typescript-eslint/naming-convention
        REQUEST: {
          method: data.method,
          address: data.serviceName,
          payload: data.payload,
        },
      },
      null,
      2,
    ),
  )

export const logNatsResponse = (data: {
  token: string
  serviceName: string
  method: string
  response: unknown
}): void =>
  Logger.log(
    JSON.stringify(
      {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        TOKEN: data.token,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        DATE: new Date(),
        // eslint-disable-next-line @typescript-eslint/naming-convention
        RESPONSE: {
          method: data.method,
          address: data.serviceName,
          payload: data.response,
        },
      },
      null,
      2,
    ),
  )

import { Logger } from '@nestjs/common'
import { AxiosRequestConfig, AxiosResponse } from 'axios'

export const logAxiosRequest = (value: AxiosRequestConfig, token: string, date: string): void => {
  let payload = value?.data
  if (payload instanceof Buffer) {
    payload = 'Производится передача файла'
  }

  Logger.log(
    JSON.stringify(
      {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        TOKEN: token,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        DATE: date,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        REQUEST: {
          method: value?.method.toUpperCase(),
          address: value?.url,
          payload: payload?._stream || payload?._streams ? 'Данные файла...' : payload,
        },
      },
      null,
      2,
    ),
  )
}

export const logAxiosResponse = (value: AxiosResponse, token: string, date: string): void => {
  let payloadResponse = value?.data

  if (payloadResponse?.body?.fileBase64) {
    // eslint-disable-next-line no-unused-vars
    const { fileBase64, ...otherData } = payloadResponse?.body
    payloadResponse = otherData
  }

  Logger.log(
    JSON.stringify(
      {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        TOKEN: token,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        DATE: date,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        RESPONSE: {
          method: value?.request?.method,
          address: `${value?.request?.protocol}://${value?.request?.host}${value?.request?.path}`,
          payload: payloadResponse instanceof Buffer ? 'Производится передача файла' : payloadResponse,
        },
      },
      null,
      2,
    ),
  )
}

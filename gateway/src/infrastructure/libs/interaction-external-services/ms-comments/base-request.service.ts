import { ClientNats } from '@nestjs/microservices'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { firstValueFrom, Observable, timeout } from 'rxjs'
import { v4 as uuidv4 } from 'uuid'

import { BaseException } from '../../../../domain/exceptions'
import { Topic } from '../../nats/custom-decorators/custom-message-pattern.decorator'
import { logAxiosRequest, logAxiosResponse, logNatsRequest, logNatsResponse } from '../loggers'

export class BaseRequestsService {
  public constructor(
    private _loggingNats = false,
    private _loggingAxios = false,
    private _natsClient?: ClientNats,
  ) {}

  /**
   * Sends `post` request to lave backend microservice's `url` with given `body`
   * @param data
   */
  protected async post<T = AxiosResponse>(data: {
    url: string
    body?: Record<string, unknown>
    params?: Record<string, unknown>
    config?: AxiosRequestConfig
    logging?: boolean
  }): Promise<T> {
    const result = await this._sendRequest<T>(
      {
        method: 'POST',
        url: data.url,
        data: data.body,
        ...(data.params && { params: data.params }),
        ...data.config,
      },
      this._getLoggingValue(this._loggingAxios, data.logging),
    )
    if (result) {
      return result.data
    }
  }

  /**
   * Sends `put` request to lave backend microservice's `url` with given `body`
   * @param data
   */
  protected async put<T = AxiosResponse>(data: {
    url: string
    body?: unknown
    params?: Record<string, unknown>
    config?: AxiosRequestConfig
    logging?: boolean
  }): Promise<AxiosResponse<T>> {
    const result = await this._sendRequest<T>(
      {
        method: 'PUT',
        url: data.url,
        data: data.body,
        ...(data.params && { params: data.params }),
        ...data.config,
      },
      this._getLoggingValue(this._loggingAxios, data.logging),
    )
    if (result) {
      return result
    }
  }

  /**
   * Sends `get` request to lave backend microservice's `url` with given `query`
   * @param data
   */
  protected async get<T = AxiosResponse>(data: {
    url: string
    query?: Record<string, unknown>
    params?: Record<string, unknown>
    config?: AxiosRequestConfig
    logging?: boolean
  }): Promise<T> {
    const result = await this._sendRequest<T>(
      {
        method: 'GET',
        url: data.url,
        data: data.query,
        ...(data.params && { params: data.params }),
        ...data.config,
      },
      this._getLoggingValue(this._loggingAxios, data.logging),
    )

    if (result) {
      return result.data
    }
  }

  /**
   * Sends `NATS` request to corp backend microservice's
   * @param data
   * @protected
   */
  protected async natsRequestWithResponse<ResponseType, RequestPayloadType>(data: {
    serviceName: string
    method: string
    payload: RequestPayloadType
    timeout?: number
    logging?: boolean
  }): Promise<ResponseType | BaseException> {
    const token = uuidv4()
    if (this._getLoggingValue(this._loggingNats, data.logging)) {
      logNatsRequest({ token, serviceName: data.serviceName, method: data.method, payload: data.payload })
    }

    const request = this.natsRequest<ResponseType, RequestPayloadType>(data)
    const response = await firstValueFrom<ResponseType>(data.timeout ? request.pipe(timeout(data.timeout)) : request)

    if (this._getLoggingValue(this._loggingNats, data.logging)) {
      logNatsResponse({ token, serviceName: data.serviceName, method: data.method, response })
    }

    if (BaseException.checkErrorIntoData(response as BaseException)) {
      return new BaseException(response)
    }

    return response
  }

  protected natsRequest<ResponseType, RequestPayloadType>(data: {
    serviceName: string
    method: string
    payload: RequestPayloadType
    timeout?: number
    logging?: boolean
  }): Observable<ResponseType> {
    if (!this._natsClient) {
      throw new Error('Add nats client to constructor for use nats methods')
    }
    return this._natsClient.send(Topic(data.serviceName, data.method), data.payload)
  }

  private _getLoggingValue(constructorValue: boolean, paramValue: boolean | undefined): boolean {
    return !!(typeof paramValue == 'boolean' ? paramValue : constructorValue)
  }

  /**
   * Sends request of given `method` to lave backend microservice
   * @param {AxiosRequestConfig} config request config
   * @param logging
   */
  private async _sendRequest<T>(config: AxiosRequestConfig, logging: boolean): Promise<AxiosResponse<T> | void> {
    try {
      if (!config.headers) {
        config.headers = {}
      }

      if (Object.keys(config.headers).join().toLowerCase().indexOf('content-type') === -1) {
        config.headers['content-type'] = 'application/json'
      }
      const loggerUUID = uuidv4()

      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      logging && logAxiosRequest(config, loggerUUID, `${new Date().toJSON()}`)

      const res = await axios.request(config)

      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      logging && logAxiosResponse(res, loggerUUID, `${new Date().toJSON()}`)
      return res
    } catch (error) {
      throw error
    }
  }
}

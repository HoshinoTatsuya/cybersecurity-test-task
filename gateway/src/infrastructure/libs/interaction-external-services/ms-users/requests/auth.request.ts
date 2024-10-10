import { Injectable } from '@nestjs/common'
import { ClientNats } from '@nestjs/microservices'
import { config } from 'rxjs'
import { BaseRequestsService } from '../base-request.service'
import { IMsUsersModuleOptionsFactory } from '../ms-users.interface'
import { GetAllSpecificationsModel, SpecificationsModel } from './models'

@Injectable()
export class AuthRequest extends BaseRequestsService {
  private _msUsersConfig: IMsUsersModuleOptionsFactory

  public constructor(
    public msUsersConfigService: IMsUsersModuleOptionsFactory,
    public _client: ClientNats,
  ) {
    super(config.logger.nats, config.logger.axios, _client)
    this._msUsersConfig = msUsersConfigService
  }

  public async login(payload: {
    userIds: number[]
    searchByBasis?: string | undefined
    sortByField?: SortByFieldGetAllSpecificationsEqEnum
    sortBy?: SortByEnum
    archive?: boolean
  }): Promise<GetAllSpecificationsModel> {
    try {
      const ms = BaseMicroservices.msUsers
      const specifications = await this.natsRequestWithResponse<
        {
          result: SpecificationsModel[]
          remark: string
          errorCode: string
        },
        {
          userIds: number[]
          searchByBasis?: string | undefined
          sortByField?: SortByFieldGetAllSpecificationsEqEnum
          sortBy?: SortByEnum
          archive?: boolean
        }
      >({
        serviceName: ms.name,
        method: ms.methods.getSpecificationsByUserIdFromEq,
        payload,
      })

      return new GetAllSpecificationsModel({
        items: specifications.result,
        totals: specifications.result.length,
        remark: specifications.remark,
        errorCode: specifications.errorCode,
      })
    } catch (error) {
      Logger.error(error?.message, error?.stack, 'ms-electronic-queue')
      return { items: [], totals: 0, errorCode: MICROSERVICE_IS_DOWN, remark: ERROR }
    }
  }

  public async getSpecificationsByIds(payload: {
    specificationsIds: number[]
    searchByBasis?: string | undefined
    startDate?: Date | undefined
    endDate?: Date | undefined
    skip?: number | undefined
    limit?: number | undefined
  }): Promise<GetSpecificationsByIds> {
    try {
      const ms = BaseMicroservices.msUsers
      const specifications = await this.natsRequestWithResponse<
        {
          result: SpecificationsModel[]
          remark: string
          errorCode: string
        },
        {
          specificationsIds: number[]
          searchByBasis?: string | undefined
          startDate?: Date | undefined
          endDate?: Date | undefined
          skip?: number | undefined
          limit?: number | undefined
        }
      >({
        serviceName: ms.name,
        method: ms.methods.getSpecificationsByIdsFromEq,
        payload,
      })
      return new GetSpecificationsByIds({
        items: specifications.result,
        totals: specifications.result.length,
        remark: specifications.remark,
        errorCode: specifications.errorCode,
      })
    } catch (error) {
      Logger.error(error?.message, error?.stack, 'ms-electronic-queue')
      return { items: [], totals: 0, errorCode: MICROSERVICE_IS_DOWN, remark: ERROR }
    }
  }

  public async getBookingSpecification(payload: {
    id: number
    userId: number
  }): Promise<GetBookingSpecificationsModel> {
    try {
      const ms = BaseMicroservices.msUsers
      const specification = await this.natsRequestWithResponse<
        {
          result: SpecificationsModel1
          remark: string
          errorCode: string
        },
        { id: number; userId: number }
      >({
        serviceName: ms.name,
        method: ms.methods.getDataUserOfSpecificationIdFromEq,
        payload,
      })

      return new GetBookingSpecificationsModel({
        items: specification.result,
        remark: specification.remark,
        errorCode: specification.errorCode,
      })
    } catch (error) {
      Logger.error(error?.message, error?.stack, 'ms-electronic-queue')
      return { items: null, errorCode: MICROSERVICE_IS_DOWN, remark: ERROR }
    }
  }

  public async getDataUserOfSpecificationId(payload: { id: number; userId: number }): Promise<{
    // eslint-disable-next-line @typescript-eslint/naming-convention
    INN: string
    contragentName: string
    productName: string
    remark: string
    errorCode: string
  }> {
    try {
      const ms = BaseMicroservices.msUsers
      return await this.natsRequestWithResponse<
        {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          INN: string
          contragentName: string
          productName: string
          remark: string
          errorCode: string
        },
        { id: number; userId: number }
      >({
        serviceName: ms.name,
        method: ms.methods.getDataUserOfSpecificationIdFromEq,
        payload,
      })
    } catch (error) {
      Logger.error(error?.message, error?.stack, 'ms-electronic-queue')
      // eslint-disable-next-line @typescript-eslint/naming-convention
      return { INN: '', contragentName: '', productName: '', errorCode: MICROSERVICE_IS_DOWN, remark: ERROR }
    }
  }
}

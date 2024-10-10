import { Injectable } from '@nestjs/common'
import { ClientNats } from '@nestjs/microservices'
import { config } from 'rxjs'

import { BaseRequestsService } from '../base-request.service'
import { IMsUsersModuleOptionsFactory } from '../ms-users.interface'
import {route} from "./constants";

import { GetElevatorModel } from './models'

@Injectable()
export class UsersRequest extends BaseRequestsService {
  private _msUsersConfig: IMsUsersModuleOptionsFactory

  public constructor(
    public msUsersConfigService: IMsUsersModuleOptionsFactory,
    public _client: ClientNats,
  ) {
    super(config.logger.nats, config.logger.axios, _client)
    this._msUsersConfig = msUsersConfigService
  }

  public async createUser(payload: { specificationId: number }): Promise<GetElevatorModel> {
    try {
      const elevator = await this.natsRequestWithResponse<
        RESPONSE TYPE,
        REQUEST TYPE
      >({
        serviceName: route.users.nameService,
        method: route.users.methods.createUser,
        payload,
      })

      return new GetElevatorModel({
        items: elevator.result,
        remark: elevator.remark,
        errorCode: elevator.errorCode,
      })
    } catch (error) {
      Logger.error(error?.message, error?.stack, 'ms-electronic-queue')
      return { items: null, errorCode: MICROSERVICE_IS_DOWN, remark: ERROR }
    }
  }

  public async uploadAvatar(payload: { specificationId: number }): Promise<GetElevatorModel> {
    try {
      const elevator = await this.natsRequestWithResponse<
          RESPONSE TYPE,
          REQUEST TYPE
      >({
        serviceName: route.users.nameService,
        method: route.users.methods.uploadAvatar,
        payload,
      })

      return new GetElevatorModel({
        items: elevator.result,
        remark: elevator.remark,
        errorCode: elevator.errorCode,
      })
    } catch (error) {
      Logger.error(error?.message, error?.stack, 'ms-electronic-queue')
      return { items: null, errorCode: MICROSERVICE_IS_DOWN, remark: ERROR }
    }
  }

  public async confirmAvatar(payload: { specificationId: number }): Promise<GetElevatorModel> {
    try {
      const elevator = await this.natsRequestWithResponse<
          RESPONSE TYPE,
          REQUEST TYPE
      >({
        serviceName: route.users.nameService,
        method: route.users.methods.confirmAvatar,
        payload,
      })

      return new GetElevatorModel({
        items: elevator.result,
        remark: elevator.remark,
        errorCode: elevator.errorCode,
      })
    } catch (error) {
      Logger.error(error?.message, error?.stack, 'ms-electronic-queue')
      return { items: null, errorCode: MICROSERVICE_IS_DOWN, remark: ERROR }
    }
  }

  public async getInfoAboutMe(payload: { specificationId: number }): Promise<GetElevatorModel> {
    try {
      const elevator = await this.natsRequestWithResponse<
          RESPONSE TYPE,
          REQUEST TYPE
      >({
        serviceName: route.users.nameService,
        method: route.users.methods.getInfoAboutMe,
        payload,
      })

      return new GetElevatorModel({
        items: elevator.result,
        remark: elevator.remark,
        errorCode: elevator.errorCode,
      })
    } catch (error) {
      Logger.error(error?.message, error?.stack, 'ms-electronic-queue')
      return { items: null, errorCode: MICROSERVICE_IS_DOWN, remark: ERROR }
    }
  }
}

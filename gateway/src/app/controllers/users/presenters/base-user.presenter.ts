import { ApiProperty } from '@nestjs/swagger'

import { BasePresenter } from './base.presenter'

export class BaseUserPresenter extends BasePresenter {
  @ApiProperty()
  public id: string

  @ApiProperty()
  public email: string

  @ApiProperty()
  public name: string

  @ApiProperty()
  public lastName: string

  public constructor(data: BaseUserPresenter) {
    super(data)
    this.id = data.id
    this.email = data.email
    this.name = data.name
    this.lastName = data.lastName
  }
}

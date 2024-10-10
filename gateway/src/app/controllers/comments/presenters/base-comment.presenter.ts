import { ApiProperty } from '@nestjs/swagger'

import { BasePresenter } from './base.presenter'

export class BaseCommentPresenter extends BasePresenter {
  @ApiProperty()
  public id: string

  @ApiProperty()
  public userId: string

  @ApiProperty()
  public text: string

  @ApiProperty()
  public automaticDeletionDate: number

  public constructor(data: BaseCommentPresenter) {
    super(data)
    this.id = data.id
    this.userId = data.userId
    this.text = data.text
    this.automaticDeletionDate = data.automaticDeletionDate
  }
}

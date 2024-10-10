import { ApiProperty } from '@nestjs/swagger'

import { BaseCommentPresenter } from './base-comment.presenter'

export class GetAllCommentsByUserPresenter {
  @ApiProperty({ type: [BaseCommentPresenter] })
  public items: BaseCommentPresenter[]

  @ApiProperty()
  public totals: number

  public constructor(data: GetAllCommentsByUserPresenter) {
    this.items =
      data.items && data.items.length > 0
        ? data.items.map((item: BaseCommentPresenter) => new BaseCommentPresenter(item))
        : []
    this.totals = data.totals
  }
}

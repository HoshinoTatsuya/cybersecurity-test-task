import { BaseCommentModel } from './base-comment.model'

export class GetAllMyCommentsModel {
  public items: BaseCommentModel[]

  public totals: number

  public constructor(data: GetAllMyCommentsModel) {
    this.items =
      data.items && data.items.length > 0 ? data.items.map((item: BaseCommentModel) => new BaseCommentModel(item)) : []
    this.totals = data.totals
  }
}

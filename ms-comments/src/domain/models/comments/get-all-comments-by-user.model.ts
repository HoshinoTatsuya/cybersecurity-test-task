import { BaseCommentModel } from './base-comment.model'

export class GetAllCommentsByUserModel {
  public items: BaseCommentModel[]

  public totals: number

  public constructor(data: GetAllCommentsByUserModel) {
    this.items =
      data.items && data.items.length > 0 ? data.items.map((item: BaseCommentModel) => new BaseCommentModel(item)) : []
    this.totals = data.totals
  }
}

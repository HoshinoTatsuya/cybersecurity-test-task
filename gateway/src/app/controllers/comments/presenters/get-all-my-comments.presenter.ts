import { BaseCommentPresenter } from './base-comment.presenter'

export class GetAllMyCommentsPresenter {
  public items: BaseCommentPresenter[]
  public totals: number

  public constructor(data: GetAllMyCommentsPresenter) {
    this.items =
      data.items && data.items.length > 0
        ? data.items.map((item: BaseCommentPresenter) => new BaseCommentPresenter(item))
        : []
    this.totals = data.totals
  }
}

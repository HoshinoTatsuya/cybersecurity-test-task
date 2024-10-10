import { BaseCommentModel } from './base-comment.model'

export class GetExpiredCommentsModel {
  public ids: string[]

  public constructor(items: Pick<BaseCommentModel, 'id'>[]) {
    this.ids = items?.map((item) => item.id)
  }
}

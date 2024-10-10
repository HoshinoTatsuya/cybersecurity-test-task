import { BasePresenter } from './base.presenter'

export class BaseCommentPresenter extends BasePresenter {
  public id: string
  public userId: string
  public text: string
  public automaticDeletionDate: number

  public constructor(data: BaseCommentPresenter) {
    super(data)
    this.id = data.id
    this.userId = data.userId
    this.text = data.text
    this.automaticDeletionDate = data.automaticDeletionDate
  }
}

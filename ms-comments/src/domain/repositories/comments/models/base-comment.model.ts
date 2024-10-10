import { BaseModel } from './base.model'

export class BaseCommentModel extends BaseModel {
  public id: string
  public userId: string
  public text: string
  public automaticDeletionDate: number

  public constructor(data: BaseCommentModel) {
    super(data)
    this.id = data.id
    this.userId = data.userId
    this.text = data.text
    this.automaticDeletionDate = data.automaticDeletionDate
  }
}

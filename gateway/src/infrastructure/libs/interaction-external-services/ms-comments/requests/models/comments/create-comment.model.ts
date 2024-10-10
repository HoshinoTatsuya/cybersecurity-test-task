export class CreateCommentModel {
  public id: string
  public userId: string
  public text: string
  public automaticDeletionDate: number
  public createdDate: Date
  public updatedDate?: Date
  public _metadata: string
  public _v: number

  public constructor(data: CreateCommentModel) {
    this.id = data.id
    this.userId = data.userId
    this.text = data.text
    this.automaticDeletionDate = data.automaticDeletionDate
    this.createdDate = data.createdDate
    this.updatedDate = data.updatedDate
    this._metadata = data._metadata
    this._v = data._v
  }
}

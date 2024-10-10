export class BaseModel {
  public createdDate: Date
  public updatedDate?: Date
  public _metadata: string
  public _v: number

  public constructor(data: BaseModel) {
    this.createdDate = data.createdDate
    this.updatedDate = data.updatedDate
    this._metadata = data._metadata
    this._v = data._v
  }
}

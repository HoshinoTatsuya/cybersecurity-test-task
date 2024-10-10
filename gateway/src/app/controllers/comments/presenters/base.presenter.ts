import { ApiProperty } from '@nestjs/swagger'

export class BasePresenter {
  @ApiProperty()
  public createdDate: Date

  @ApiProperty()
  public updatedDate?: Date

  @ApiProperty()
  public _metadata: string

  @ApiProperty()
  public _v: number

  public constructor(data: BasePresenter) {
    this.createdDate = data.createdDate
    this.updatedDate = data.updatedDate
    this._metadata = data._metadata
    this._v = data._v
  }
}

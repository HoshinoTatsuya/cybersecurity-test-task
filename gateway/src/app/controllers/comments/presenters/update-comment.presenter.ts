import { ApiProperty } from '@nestjs/swagger'

export class UpdateCommentPresenter {
  @ApiProperty()
  public result: boolean

  public constructor(data: UpdateCommentPresenter) {
    this.result = data.result
  }
}

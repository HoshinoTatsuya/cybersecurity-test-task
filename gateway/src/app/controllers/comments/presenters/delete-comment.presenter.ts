import { ApiProperty } from '@nestjs/swagger'

export class DeleteCommentPresenter {
  @ApiProperty()
  public result: boolean

  public constructor(data: DeleteCommentPresenter) {
    this.result = data.result
  }
}

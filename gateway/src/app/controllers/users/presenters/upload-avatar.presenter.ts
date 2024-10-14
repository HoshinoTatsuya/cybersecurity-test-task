import { ApiProperty } from '@nestjs/swagger'

export class UploadAvatarPresenter {
  @ApiProperty()
  public result: boolean

  public constructor(data: UploadAvatarPresenter) {
    this.result = data.result
  }
}

import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, IsUUID } from 'class-validator'

import { exampleData, uuidV4 } from '../../../constants'

export class DeleteCommentDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID(uuidV4)
  @ApiProperty({
    required: true,
    example: exampleData.uuidV4Example,
  })
  public commentId: string
}

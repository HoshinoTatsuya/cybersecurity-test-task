import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsNotEmpty, IsString, IsUUID, MaxLength } from 'class-validator'

import { SupportLanguageEnum } from '../../../../domain/exceptions/enums/support-language.enum'
import { IsAlphaWithMultipleLocalesDecorator } from '../../../../infrastructure/libs/custom-decorators'
import { descriptionsData, exampleData, isAlphaLanguage, maxStringLength, uuidV4 } from '../../../constants'

export class UpdateCommentDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID(uuidV4)
  @ApiProperty({
    required: true,
    example: exampleData.uuidV4Example,
  })
  public commentId: string

  @IsString()
  @MaxLength(maxStringLength)
  @IsAlphaWithMultipleLocalesDecorator(
    [isAlphaLanguage.RU, isAlphaLanguage.EN],
    [SupportLanguageEnum.EN, SupportLanguageEnum.RU],
  )
  @IsNotEmpty()
  @Transform((params) => params.value.trim().toLowerCase())
  @ApiProperty({
    description: descriptionsData.comments.text,
    required: true,
    example: exampleData.comments.text,
  })
  public text: string
}

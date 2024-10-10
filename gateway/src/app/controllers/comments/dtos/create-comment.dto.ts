import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator'

import { AutomaticDeletionDateEnum } from '../../../../domain/enums'
import { SupportLanguageEnum } from '../../../../domain/exceptions/enums/support-language.enum'
import { IsAlphaWithMultipleLocalesDecorator } from '../../../../infrastructure/libs/custom-decorators'
import { descriptionsData, exampleData, isAlphaLanguage, maxStringLength } from '../../../constants'

export class CreateCommentDto {
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

  @IsOptional()
  @IsEnum(AutomaticDeletionDateEnum)
  @ApiProperty({
    description: descriptionsData.comments.text,
    required: true,
    name: 'automaticDeletionDate',
    enum: AutomaticDeletionDateEnum,
    example: AutomaticDeletionDateEnum.ONE_DAY,
  })
  public automaticDeletionDate?: AutomaticDeletionDateEnum
}

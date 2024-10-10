import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsOptional } from 'class-validator'

import { SortOrderEnum } from '../../infrastructure/libs/enums/sort-order.enum'

export class SortDto {
  @IsEnum(SortOrderEnum)
  @IsOptional()
  @ApiProperty({
    required: false,
    enum: SortOrderEnum,
    enumName: 'SortOrderEnum',
    default: SortOrderEnum.DESC,
    description: 'default value is DESC',
    example: SortOrderEnum.DESC,
  })
  public sortOrder: SortOrderEnum = SortOrderEnum.DESC
}

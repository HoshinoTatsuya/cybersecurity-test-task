import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator'

export class PaginationDto {
  @IsNumber()
  @IsNotEmpty()
  @Transform((val) => Number(val.value))
  @IsOptional()
  @ApiProperty({
    required: false,
    default: 20,
    description: 'default value is 20',
    example: 20,
  })
  public readonly limit: number = 20

  @IsNumber()
  @IsNotEmpty()
  @Transform((val) => Number(val.value))
  @IsOptional()
  @ApiProperty({
    required: false,
    default: 0,
    description: 'default value is 0',
    example: 0,
  })
  public readonly skip: number = 0
}

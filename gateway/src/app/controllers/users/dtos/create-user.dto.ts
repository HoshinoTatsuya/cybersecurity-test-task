import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsEmail, IsEnum, IsNotEmpty, IsString, IsStrongPassword, MaxLength } from 'class-validator'

import { Role } from '../../../../domain/enums'
import { SupportLanguageEnum } from '../../../../domain/exceptions/enums/support-language.enum'
import { IsAlphaWithMultipleLocalesDecorator } from '../../../../infrastructure/libs/custom-decorators'
import {
  descriptionsData,
  exampleData,
  isAlphaLanguage,
  maxPasswordLength,
  maxStringLength,
  passwordSettings,
} from '../../../constants'

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  @Transform((params) => params.value.toLowerCase().trim())
  @ApiProperty({
    name: 'email',
    required: true,
  })
  public email: string

  @IsString()
  @MaxLength(maxStringLength)
  @IsAlphaWithMultipleLocalesDecorator(
    [isAlphaLanguage.RU, isAlphaLanguage.EN],
    [SupportLanguageEnum.EN, SupportLanguageEnum.RU],
  )
  @IsNotEmpty()
  @Transform((params) => params.value.trim().toLowerCase())
  @ApiProperty({
    required: true,
  })
  public name: string

  @IsString()
  @MaxLength(maxStringLength)
  @IsAlphaWithMultipleLocalesDecorator(
    [isAlphaLanguage.RU, isAlphaLanguage.EN],
    [SupportLanguageEnum.EN, SupportLanguageEnum.RU],
  )
  @IsNotEmpty()
  @Transform((params) => params.value.trim().toLowerCase())
  @ApiProperty({
    required: true,
  })
  public lastName: string

  @IsNotEmpty()
  @MaxLength(maxPasswordLength)
  @IsStrongPassword(passwordSettings)
  @IsString()
  @Transform((params) => params.value.trim())
  @ApiProperty({
    required: true,
    name: 'password',
    example: exampleData.users.password,
  })
  public password: string

  @IsNotEmpty()
  @IsEnum(Role)
  @ApiProperty({
    description: descriptionsData.comments.text,
    required: true,
    name: 'role',
    enum: Role,
    example: Role.SIMPLE,
  })
  public role: Role
}

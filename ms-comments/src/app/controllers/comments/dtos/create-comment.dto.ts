import { AutomaticDeletionDateEnum } from '../../../../domain/enums'

export class CreateCommentDto {
  public userId: string
  public text: string
  public automaticDeletionDate?: AutomaticDeletionDateEnum
}

import { AutomaticDeletionDateEnum } from '../../../../../../../domain/enums'

export interface ICreateComment {
  userId: string
  text: string
  automaticDeletionDate?: AutomaticDeletionDateEnum
}

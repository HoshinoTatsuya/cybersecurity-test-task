import { AutomaticDeletionDateEnum } from '../../../enums'

export interface ICreateComment {
  userId: string
  text: string
  automaticDeletionDate?: AutomaticDeletionDateEnum
}

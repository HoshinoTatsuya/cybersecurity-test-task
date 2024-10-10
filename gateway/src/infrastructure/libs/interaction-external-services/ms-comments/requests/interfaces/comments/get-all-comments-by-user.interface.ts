import { SortOrderEnum } from '../../../../../enums/sort-order.enum'

export interface IGetAllCommentsByUser {
  userId: string
  sortOrder: SortOrderEnum
  limit: number
  skip: number
}

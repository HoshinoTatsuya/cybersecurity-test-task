import { SortOrderEnum } from '../../../../../enums/sort-order.enum'

export interface IGetAllMyComments {
  userId: string
  sortOrder: SortOrderEnum
  limit: number
  skip: number
}

import { SortOrderEnum } from '../../../../infrastructure/libs/enums/sort-order.enum'

export interface IGetAllComments {
  readonly limit: number
  readonly skip: number
  readonly sortOrder: SortOrderEnum
  userId?: string
}

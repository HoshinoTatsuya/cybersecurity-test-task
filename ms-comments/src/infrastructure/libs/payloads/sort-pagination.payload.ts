import { SortOrderEnum } from '../enums/sort-order.enum'

import { PaginationPayload } from './pagination.payload'

export class SortPaginationPayload extends PaginationPayload {
  public readonly sortOrder: SortOrderEnum
}

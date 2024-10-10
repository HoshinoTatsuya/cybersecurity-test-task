import { SortPaginationPayload } from '../../../../infrastructure/libs/payloads'

export class GetAllMyCommentsDto extends SortPaginationPayload {
  public userId: string
}

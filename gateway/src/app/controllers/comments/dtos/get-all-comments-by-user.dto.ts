import { SortPaginationPayload } from '../../../../infrastructure/libs/payloads'

export class GetAllCommentsByUserDto extends SortPaginationPayload {
  public userId: string
}

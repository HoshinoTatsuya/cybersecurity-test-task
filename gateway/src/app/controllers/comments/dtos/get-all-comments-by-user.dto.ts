import { SortPaginationDto } from '../../../common/sort-pagination.dto'

export class GetAllCommentsByUserDto extends SortPaginationDto {
  public userId: string
}

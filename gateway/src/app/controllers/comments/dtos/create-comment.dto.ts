export class CreateCommentDto {
  public userId: string
  public text: string
  public automaticDeletionDate?: number
}

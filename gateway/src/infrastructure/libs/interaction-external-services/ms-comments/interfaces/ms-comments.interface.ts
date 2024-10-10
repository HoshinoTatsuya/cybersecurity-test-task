import { CommentsRequest } from '../requests/comments.request'

export interface IMsCommentsService {
  get comments(): CommentsRequest
}

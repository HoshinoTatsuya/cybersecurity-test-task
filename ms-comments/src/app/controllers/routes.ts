export const internalsRoutes = {
  msInfo: {
    msName: 'ms-comments',
    prefixes: {
      comments: 'comments',
    },
    apiTags: 'Microservice Comments',
  },
  methods: {
    health: {},
    comments: {
      createComment: 'createComment',
      updateComment: 'updateComment',
      deleteComment: 'deleteComment',
      getAllMyComments: 'getAllMyComments',
      getAllCommentsByUser: 'getAllCommentsByUser',
    },
  },
}

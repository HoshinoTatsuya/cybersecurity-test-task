export const externalRoutes = {
  msInfo: {
    msName: 'gateway',
    prefixes: {
      gateway: 'gateway',
    },
    apiTags: 'Microservice Gateway',
    controllers: {
      users: 'users',
      comments: 'comments',
    },
  },
  methods: {
    health: {},
    users: {
      createUser: 'createUser',
      uploadAvatar: 'uploadAvatar',
      confirmAvatar: 'confirmAvatar',
      getInfoAboutMe: 'getInfoAboutMe',
    },
    comments: {
      createComment: 'createComment',
      updateComment: 'updateComment',
      deleteComment: 'deleteComment',
      getAllMyComments: 'getAllMyComments',
      getAllCommentsByUser: 'getAllCommentsByUser',
    },
  },
}

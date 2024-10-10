export const route = {
  users: {
    nameService: 'users',
    methods: {
      createUser: 'createUser',
      uploadAvatar: 'uploadAvatar',
      confirmAvatar: 'confirmAvatar',
      getInfoAboutMe: 'getInfoAboutMe',
    },
  },
  auth: {
    nameService: 'users',
    methods: {
      login: 'login',
      verifyToken: 'verifyToken',
    },
  },
}

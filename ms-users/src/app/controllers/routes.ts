export const internalsRoutes = {
  msInfo: {
    msName: 'users',
    prefixes: {
      users: 'users',
    },
    apiTags: 'Microservice Users',
  },
  methods: {
    health: {},
    users: {
      createUser: 'createUser',
      uploadAvatar: 'uploadAvatar',
      confirmAvatar: 'confirmAvatar',
      getInfoAboutMe: 'getInfoAboutMe',
    },
    auth: {
      verifyToken: 'verifyToken',
      login: 'login',
    },
  },
}

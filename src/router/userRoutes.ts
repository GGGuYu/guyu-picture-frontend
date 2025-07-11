const userRoutes = [
    {
      path: '/user/login',
      name: '用户登录',
      component:() =>  import('@/pages/user/UserLoginPage.vue'),
    },
    {
      path: '/user/register',
      name: '用户注册',
      component:() =>  import('@/pages/user/UserRegisterPage.vue'),
    },
]

export default userRoutes;
const mainRoutes = [
    {
      path: '/',
      name: 'home',
      component:() =>  import('@/pages/HomePage.vue'),
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/pages/AboutPage.vue'),
    },
]

export default mainRoutes;
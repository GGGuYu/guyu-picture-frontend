const adminRoutes = [
    {
      path: '/admin/userManage',
      name: '用户管理',
      component:() =>  import('@/pages/admin/UserManagePage.vue'),
    },
]

export default adminRoutes;
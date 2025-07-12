<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { h, ref } from 'vue';
import { HomeOutlined , LogoutOutlined } from '@ant-design/icons-vue';
import { MenuProps, message } from 'ant-design-vue';
import { useLoginUserStore } from '@/stores/useLoginUserStore';
import { userLogoutUsingPost } from '@/api/userController';
const current = ref<string[]>([]);
const items = ref<MenuProps['items']>([
  {
    key: '/',
    icon: () => h(HomeOutlined),
    label: '主页',
    title: '主页',
  },
  {
    key: '/admin/userManage',
    label: '用户管理',
    title: '用户管理',
  },
  {
    key: '/others',
    label: '暂无',
    title: '暂无',
  },
]);
interface MenuClick {
    key:string,
}
const router = useRouter()

router.afterEach((to , from ,next) => {
    current.value = [to.path]
})
const doMenuClick = ({ key }:MenuClick) => {
    router.push({
        path:key,
    })
}

const loginUserStore = useLoginUserStore();

//用户注销
const doLogout = async () => {
    console.log('测试')
    const res = await userLogoutUsingPost(); //直接cookie过去就知道注销谁了
    if(res.data.code === 0) {
        loginUserStore.setLoginUser({userName:'未登录'});
        message.success('退出登录成功')
        await router.push({
            path:'/user/login',
        })
    } else {
        message.error('退出登录失败' + res.data.message)
    }
}


</script>


<template>
  <div id="globalHeader">
    <RouterLink class="title" to="/">
        <div class="title-bar">
            <img src="../assets/logo.png" alt="logo">
            <span>雨图</span>
        </div>
    </RouterLink>

    <a-menu class="menu" v-model:selectedKeys="current" mode="horizontal" :items="items" @click="doMenuClick" />
    <div class="user-login-status">
        <div class="right-info" v-if="loginUserStore.loginUser.id">
            <a-dropdown>
                <div class="user-head">
                    <a-avatar :src="loginUserStore.loginUser.userAvatar" shape="square" size="small"></a-avatar>
                    <span>{{ loginUserStore.loginUser.userName ?? '无名' }}</span>    
                </div>
                <template #overlay>
                    <a-menu>
                        <a-menu-item>
                        <LogoutOutlined/>
                        <span style="margin-left: 6px;" @click="doLogout">退出登录</span>
                        </a-menu-item>
                    </a-menu>
                </template>
            </a-dropdown>

        </div>
        <div class="right-info" v-else>
            <a-button type="primary" href="#" @click="() => {router.push('/user/login')}">登录</a-button>
        </div>
    </div>
  </div>
  
</template>


<style scoped>
#globalHeader {
    display: flex;
    align-items: center;
    justify-content: center;
}

#globalHeader .menu {
    flex: 1;
}

/* 尺寸 */
#globalHeader .title {
    width: 120px;
    height: auto ;
}

#globalHeader .title .title-bar {
    display: flex;
    align-items: center;
    font-size: 18px;
    font-weight: bold;
    color: #584747;
}

.title .title-bar img {
    border-radius: 30%;
    margin-right: 6px;
}

#globalHeader .user-login-status{
    display: flex;
    align-items: center;
    justify-content: end;
    width: 300px;
    margin-right: 50px;
}


#globalHeader .user-login-status .user-head {
    display: flex;
    align-items: center;
}

#globalHeader .user-login-status .user-head span {
    margin-left: 6px;
}
</style>
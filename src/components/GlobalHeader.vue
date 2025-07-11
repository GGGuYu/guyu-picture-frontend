<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { h, ref } from 'vue';
import { HomeOutlined } from '@ant-design/icons-vue';
import { MenuProps } from 'ant-design-vue';
import { useLoginUserStore } from '@/stores/useLoginUserStore';
const current = ref<string[]>([]);
const items = ref<MenuProps['items']>([
  {
    key: '/',
    icon: () => h(HomeOutlined),
    label: '主页',
    title: '主页',
  },
  {
    key: '/about',
    label: '关于',
    title: '关于',
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
            {{ loginUserStore.loginUser.userName ?? '无名' }}
        </div>
        <div class="right-info" v-else>
            <a-button type="primary" href="#">登录</a-button>
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
    width: 70px;
    margin-right: 10px;
}
</style>
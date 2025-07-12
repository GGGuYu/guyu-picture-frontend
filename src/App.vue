<script setup lang="ts">
import BasicLayout from './layouts/BasicLayout.vue';
// import { healthUsingGet } from './api/mainController';
// import { useLoginUserStore } from './stores/useLoginUserStore';

// const loginUserStore = useLoginUserStore();
//已经改为在权限获取文件中获取用户
// loginUserStore.fetchLoginUser();

// healthUsingGet().then((res) => {
//   console.log(res)
// })
</script>

<template>
  <div id="vue-app">
    <BasicLayout/>
  </div>
</template>

<style scoped>

</style>

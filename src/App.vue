<script setup lang="ts">
import { healthUsingGet } from './api/mainController';
import BasicLayout from './layouts/BasicLayout.vue';
import { useLoginUserStore } from './stores/useLoginUserStore';

const loginUserStore = useLoginUserStore();

loginUserStore.fetchLoginUser();

healthUsingGet().then((res) => {
  console.log(res)
})
</script>

<template>
  <div id="vue-app">
    <BasicLayout/>
  </div>
</template>

<style scoped>

</style>

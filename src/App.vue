<script setup lang="ts">
import { healthUsingGet } from './api/mainController';
import BasicLayout from './layouts/BasicLayout.vue';

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

<script lang="ts" setup>
import GlobalHeader from '@/components/GlobalHeader.vue';
import { RouterLink , RouterView } from 'vue-router';
</script>


<template>
    <div id="basicLayout">
        <a-layout class="layout">
            <a-layout-header class="header">
                <GlobalHeader></GlobalHeader>
            </a-layout-header>
            <a-layout-content class="content">
                <RouterView></RouterView>
            </a-layout-content>
            <a-layout-footer class="footer">
                <a href="#" target="_blank">
                    谷雨云图库 by GuGuGuYu
                </a>
            </a-layout-footer>
        </a-layout>
    </div>
</template>


<style scoped>
#basicLayout {
    background-color: #efefef;
}

.layout .header {
    background-color: #fff;
    padding: 0px 10px;
    color: unset;
    margin-bottom: 5px;
}

.layout {
    /* 100可视高度 ， 铺满视觉 */
    min-height: 100vh; 
}

.layout .content {
    padding: 30px;
    margin-bottom: 20vh;
    background-color: #fff;
}

#basicLayout .footer{
    position: fixed;
    bottom: 0;
    width: 100%;
    height: auto;
    box-sizing: border-box;
    background-color: #efefef;
}

.footer a {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
}
</style>
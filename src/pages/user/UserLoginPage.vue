<script setup lang="ts">

import { useRouter } from 'vue-router';
import { reactive, computed } from 'vue';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { RouterLink } from 'vue-router';
import { userLoginUsingPost } from '@/api/userController';
import { useLoginUserStore } from '@/stores/useLoginUserStore';


// 用户接受表单输入，类型和后端的DTO保持一致
const formState = reactive<API.UserLoginRequest>({
  userAccount: '',
  userPassword: '',
});

const loginUserStore = useLoginUserStore();
const router = useRouter()
const handleSubmit = async  () => {
    try {
        const res = await userLoginUsingPost(formState)
        // 返回状态正常并且数据存在，登录成功 
        if(res.data.code === 0 && res.data.data) {
            //登录成功后要去获取登录信息,已经写了一个获取登录信息并保存的方法了
            await loginUserStore.fetchLoginUser(); 
            message.success('登录成功')
            //然后跳转
            router.push({
                path:'/', //主页
                replace: true, //这个是为了让你点击返回不会回到登录页，所以覆盖掉，这是一个设计
                //todo ， 留一个拓展，redireat ,路由里面加一个值,因为你不知道用户从
                //todo 哪个地方被跳转到登录页面的，然后登录完以后应该自动回到用户当时想看的地方
            })
        } else {
            message.error("登录失败" + res.data.message)
        }
    } catch (e) {
        message.error("登录失败" + e)
    }
};


const disabled = computed(() => {
  return !(formState.userAccount && formState.userPassword);
});




</script>

<template>
  <div id="userLoginPage">
    <div class="title">
        <span>谷雨云图库-用户登录</span>
    </div>
    <div class="form-box">
        <a-form
            :model="formState"
            name="normal_login"
            class="login-form"
            autocomplete="off"
            @finish="handleSubmit"
        >
            <a-form-item
            name="userAccount"
            :rules="[{ required: true, message: '请输入账号!' }]"
            >
            <a-input v-model:value="formState.userAccount" placeholder="请输入账号">
                <template #prefix>
                <UserOutlined class="site-form-item-icon" />
                </template>
            </a-input>
            </a-form-item>

            <a-form-item
            name="userPassword"
            :rules="[{ required: true, message: '请输入密码!' } , {min:8 , message:'密码长度不能小于8位'}]"
            >
            <a-input-password v-model:value="formState.userPassword" placeholder="请输入密码">
                <template #prefix>
                <LockOutlined class="site-form-item-icon" />
                </template>
            </a-input-password>
            </a-form-item>

            <a-form-item>
                <div class="form-button">
                    <a-button :disabled="disabled" type="primary" html-type="submit" class="login-form-button">
                        登录
                    </a-button>
                    <div class="gap"></div>
                    <div>
                        <RouterLink :to="{ name:'用户注册' }" style="color: blue;">立即注册！</RouterLink>
                    </div>
                </div>
            </a-form-item>
        </a-form>
    </div>
  </div>
</template>

<style scoped>
#userLoginPage {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
}

#userLoginPage .title {
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    margin-bottom: 20px;
}

#userLoginPage .title span {
    width: 100%;
    text-align: center;
    padding: 10px;
}

#userLoginPage .form-box {
    
}

#userLoginPage .form-button{
    display: flex;
    align-items: center;
    position: relative;
}


#userLoginPage .form-button .gap{
    flex: 1;
}

/* 组件自带样式 */
#components-form-demo-normal-login .login-form {
  max-width: 300px;
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}


</style>
<script setup lang="ts">

import { useRouter } from 'vue-router';
import { reactive, computed } from 'vue';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { RouterLink } from 'vue-router';
import { userRegisterUsingPost } from '@/api/userController';

// 用户接受表单输入，类型和后端的DTO保持一致
const formState = reactive<API.UserRegisterRequest>({
  userAccount: '',
  userPassword: '',
  checkPassword: '',
});

const router = useRouter()

const handleSubmit = async  () => {
    if(formState.userPassword !== formState.checkPassword){
        message.error('两次输入的密码不一致！');
        return;
    }
    
    try {
        const res = await userRegisterUsingPost(formState)
        // 返回状态正常并且数据存在，注册成功 
        if(res.data.code === 0 && res.data.data) {
            //注册成功后要去获取注册信息,已经写了一个获取注册信息并保存的方法了
            message.success('注册成功')
            //然后跳转
            router.push({
                path:'/user/login', //主页
                replace: true, //这个是为了让你点击返回不会回到注册页，所以覆盖掉，这是一个设计
            })
        } else {
            message.error("注册失败" + res.data.message)
        }
    } catch (e) {
        message.error("注册失败" + e)
    }
};


const disabled = computed(() => {
  return !(formState.userAccount && formState.userPassword);
});




</script>

<template>
  <div id="userRegisterPage">
    <div class="title">
        <span>谷雨云图库-用户注册</span>
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

            <a-form-item
            name="checkPassword"
            :rules="[{ required: true, message: '请输入确认密码!' } , {min:8 , message:'确认密码长度不能小于8位'}]"
            >
            <a-input-password v-model:value="formState.checkPassword" placeholder="请输入确认密码">
                <template #prefix>
                <LockOutlined class="site-form-item-icon" />
                </template>
            </a-input-password>
            </a-form-item>

            <a-form-item>
                <div class="form-button">
                    <a-button :disabled="disabled" type="primary" html-type="submit" class="login-form-button">
                        注册
                    </a-button>
                    <div class="gap"></div>
                    <div>
                        <RouterLink :to="{ name:'用户登录' }" style="color: blue;">已有账号？去登录！</RouterLink>
                    </div>
                </div>
            </a-form-item>
        </a-form>
    </div>
  </div>
</template>

<style scoped>
#userRegisterPage {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
}

#userRegisterPage .title {
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    margin-bottom: 20px;
}

#userRegisterPage .title span {
    width: 100%;
    text-align: center;
    padding: 10px;
}

#userRegisterPage .form-box {
    
}

#userRegisterPage .form-button{
    display: flex;
    align-items: center;
    position: relative;
}


#userRegisterPage .form-button .gap{
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
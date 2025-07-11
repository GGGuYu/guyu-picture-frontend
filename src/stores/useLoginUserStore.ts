import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getLoginUserUsingGet } from '@/api/userController'



export const useLoginUserStore = defineStore('loginUser', () => {
    // 我不知道user具体长什么样子，所以只能any了
    const loginUser = ref<API.LoginUserVO>({
        userName:"未登录",
    })
 
    async function fetchLoginUser() {
        // console.log('测试，成功获取用户信息')
        // setTimeout(() => {
        //     setLoginUser({
        //     id:1,
        //     userName:'谷雨'
        // })} , 3000)
        
        const res = await getLoginUserUsingGet();
        const { data } = res;
        // 如果正常相应的同时，数据信息也存在
        if(data.code === 0 && data.data){
            setLoginUser(data.data)
        }
    }

    function setLoginUser (newLoginUser:API.LoginUserVO) {
        loginUser.value = newLoginUser        
    }

    return {
        loginUser,
        setLoginUser,
        fetchLoginUser,
    }

})
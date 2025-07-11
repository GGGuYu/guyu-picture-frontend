import axios from "axios";
import { message } from "ant-design-vue";

const myAxios = axios.create({
  baseURL: 'http://localhost:8123/', //基础API地址
  timeout: 60000, //60s超时
  withCredentials:true,  //携带cookie ， 因为要保持登录状态
});


// 添加请求拦截器 暂时没改todo
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 全局响应拦截器
myAxios.interceptors.response.use(
  function (response) {
    const { data } = response
    // 未登录
    if (data.code === 40100) {
      // 不是获取用户信息的请求，并且用户目前不是已经在用户登录页面，则跳转到登录页面
      //因为如果是当前 ，刚刚进网站，那么就是我前端自己发请求get/login，所以这个时候还不用强制跳转用户，他可能在首页看看其他的东西，没有去请求到一些需要登陆的东西
      if (
        !response.request.responseURL.includes('user/get/login') &&
        !window.location.pathname.includes('/user/login')
      ) {
        message.warning('请先登录')
        window.location.href = `/user/login?redirect=${window.location.href}`
      }
    }
    return response
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error)
  },
)

export default myAxios;
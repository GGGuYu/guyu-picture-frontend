// 权限校验 ， 阻止用户试图进入不能进入的路由
// import { useRouter } from "vue-router";
import { useLoginUserStore } from "./stores/useLoginUserStore";
import { message } from "ant-design-vue";
import router from "./router";

// const router = useRouter()
//是否为首次进入APP，首次才获取用户信息，不用反复获取
let firstFetchLoginUser:boolean = true;

/**
 * 全局权限校验 ,每次切换路由的时候 ， 但登录信息只需要获取一次
 */
router.beforeEach(async (to , from , next) => {
    const loginUserStore = useLoginUserStore();
    let loginUser:API.LoginUserVO = loginUserStore.loginUser;
    if(firstFetchLoginUser) {
        //因为页面刷新的时候，你去调用后端接口获取用户信息是要时间的
        //所以要确保用户刷新时，首次加载时，能等待后端返回信息后再校验权限
        await loginUserStore.fetchLoginUser();//获取用户信息
        loginUser = loginUserStore.loginUser;
        firstFetchLoginUser = false;
    }
    const toUrl = to.fullPath; //我要去哪，判断权限
    //自定义规则， 比如管理员才能访问admin开头的页面
    // console.log(`toUrl:${toUrl}`)
    if(toUrl.startsWith("/admin")) {
        if(!loginUser || loginUser.userRole !== 'admin') {
            message.error('无访问权限！');
            next(`/user/login?redirect=${to.fullPath}`) //todo 可以实现登录后重定向回要访问的页面
            return;
        }
    }
    next();
});
import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../View/Login.vue';
import Home from '../View/Home.vue';
import Dashboard from "../View/Dashboard.vue";
import PwdSetting from "../View/PwdSetting";
import Transfer from "../View/Transfer";
import TransferQuery from "../View/TransferQuery";
Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login
    },
    {
        path: '/home',
        name: 'Home',
        component: Home,
        children: [
            {
                path: '/dashboard',
                name: 'Dashboard',
                component: Dashboard
            },
            {
                path: '/pwdsetting',
                component: PwdSetting
            },
            {
                path: '/transfer',
                component: Transfer
            },
            {
                path: '/transferquery',
                component: TransferQuery
            }
        ]

    },
    {
        path: '/404',
        component: () => import('../View/404Page.vue'),
    },
    {
      path: '*',
      redirect: '/404'
    },
    {
        path: '/403',
        component: () => import('../View/403Page')
    }
]


const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    if(to.meta.requireAuth){
        if(sessionStorage.getItem("uid")){
            next();
        }else{
            next({path: '/'});
        }
    }else{
        next();
    }
})

export default router

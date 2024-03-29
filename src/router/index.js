import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../View/Login.vue';
import Home from '../View/Home.vue';
import Dashboard from "../View/Dashboard.vue";
import PwdSetting from "../View/PwdSetting";
import Transfer from "../View/Transfer";
import TransferQuery from "../View/TransferQuery";
import Buy from "../View/Buy";
import Sell from "../View/Sell";
import TradeQuery from "../View/TradeQuery";
import OrderQuery from "../View/OrderQuery";
import HisTradeQuery from "../View/HisTradeQuery";
import HisOrderQuery from "../View/HisOrderQuery";
Vue.use(VueRouter)

const routes = [
    {path:'*',redirect:"/login"},
    {path: '', redirect: "/login"},
    {path:'/login', component:Login},
    {
        path: '/home',
        name: 'Home',
        component: Home,
        children: [
            {
                path: '/dashboard',
                name: 'Dashboard',
                component: Dashboard,
                meta: {requiredAuth: true}
            },
            {
                path: '/pwdsetting',
                component: PwdSetting,
                meta: {requiredAuth: true}
            },
            {
                path: '/transfer',
                component: Transfer,
                meta: {requiredAuth: true}
            },
            {
                path: '/transferquery',
                component: TransferQuery,
                meta: {requiredAuth: true}
            },
            {
                path: '/tradequery',
                component: TradeQuery,
                meta: {requiredAuth: true}
            },
            {
                path: '/orderquery',
                component: OrderQuery,
                meta: {requiredAuth: true}
            },
            {
                path: '/hisorderquery',
                component: HisOrderQuery,
                meta: {requiredAuth: true}
            },
            {
                path: '/histradequery',
                component: HisTradeQuery,
                meta: {requiredAuth: true}
            },
            {
                path: '/buy',
                component: Buy,
                meta: {requiredAuth: true}
            },
            {
                path: '/sell',
                component: Sell,
                meta: {requiredAuth: true}
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
    if(to.meta.requiredAuth){
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

import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../View/Login.vue';
import Home from '../View/Home.vue';
import Dashboard from "../View/Dashboard.vue";
import PwdSetting from "../View/PwdSetting";
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

export default router

import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../View/Login.vue';
import Home from '../View/Home.vue';
import Dashboard from "../View/Dashboard.vue";
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
        ]

    }
]


const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router

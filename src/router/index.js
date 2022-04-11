import Vue from 'vue'
import VueRouter from 'vue-router'
import ProductIntroduction from '../components/01-ProductIntroduction.vue'
import VersionDescription from '../components/02-VersionDescription.vue'
import Main from '../components/main.vue'
import 检查项管理 from '../components/3-5检查项管理.vue'
import 检查组管理 from '../components/3-4检查组管理.vue'
import 套餐管理 from '../components/3-3套餐管理.vue'
import 预约设置 from '../components/3-2预约设置.vue'
// import Login from '../../views/login.vue'
import 会员数量 from '../components/5-1会员数量.vue'
import 套餐占比 from '../components/5-2套餐占比.vue'
import 运营数据 from '../components/5-3运营数据.vue'
import Login from '../components/login.vue'
// import { createApp } from 'vue';
// import Vant from 'vant';
// import 'vant/lib/index.css';

// const app = createApp();
// app.use(Vant);


// import { Button } from 'vant';
// import { createApp } from 'vue';

// const app = createApp();

// 方式一. 通过 app.use 注册
// 注册完成后，在模板中通过 <van-button> 或 <VanButton> 标签来使用按钮组件
// app.use(Button);

// 方式二. 通过 app.component 注册
// 注册完成后，在模板中通过 <van-button> 标签来使用按钮组件
// app.component(Button.name, Button);


Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: '/login'
}, {
    path: '/ProductIntroduction',
    component: ProductIntroduction
}, {
    path: '/VersionDescription',
    component: VersionDescription
}, {
    path: '/main',
    component: Main,
    children: [
        { path: '/3-5', component: 检查项管理 },
        { path: '/3-4', component: 检查组管理 },
        { path: '/3-3', component: 套餐管理 },
        { path: '/3-2', component: 预约设置 },
        { path: '/5-1', component: 会员数量 },
        { path: '/5-2', component: 套餐占比 },
        { path: '/5-3', component: 运营数据 },
    ]
}, {
    path: '/login',
    component: Login
}]

const router = new VueRouter({
    routes,
    mode: 'hash'
})


//挂载路由导航守卫
router.beforeEach((to, from, next) => {
    //to要访问的路径

    //from代表从哪个路径来

    //next是函数 放行

    if (to.path === '/login') return next();
    //token
    const tokenstr = window.sessionStorage.getItem('token')
    if (!tokenstr) return next('/login')
    next()
})

export default router
/*
import Vue from "vue";
import Router from "vue-router";
import HelloWorld from "@/components/HelloWorld";
import HelloVue from "@/components/myComponents/HelloVue";

Vue.use(Router);

export  default new Router({
    routers : [{
        path:"/",
        name: "HelloWorld",
        component: HelloWorld
    },
        {
        path: "/HelloVue",
        name: "HelloVue",
        component: HelloVue
    }]


});*/
//注意不同版本处理路由的方式可能不同 本项目是vue3.2版本(https://blog.csdn.net/wsjzzcbq/article/details/117789118)
//先npm安装路由npm install vue-router@4，然后自己创建的router文件夹
import {createRouter, createWebHistory} from 'vue-router'
import routes from './routes'

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
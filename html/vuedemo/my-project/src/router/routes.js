//路由注册
const routes = [
    {
        path: "/HelloVue",
        name: "HelloVue",
        component: () => import('@/components/myComponents/HelloVue')//正式项目一般自己创建view文件夹放页面模板而不在组件文件夹中创建页面（组件文件夹创建组件为主）
    },

];

export default routes
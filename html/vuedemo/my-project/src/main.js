import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'

//createApp(App).mount('#app') //无法识别<router-link>标签
createApp(App).use(router).mount('#app')
/*const app = createApp(App)
app.use(router)
app.mount('#app')*/
//打包：使用工具 vue-cil  或 webpack，配置打包文件在项目目录下npm run build 就打包了。（https://www.jb51.net/article/233569.htm）


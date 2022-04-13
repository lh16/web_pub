import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'

//createApp(App).mount('#app') //无法识别<router-link>标签
createApp(App).use(router).mount('#app')
/*const app = createApp(App)
app.use(router)
app.mount('#app')*/


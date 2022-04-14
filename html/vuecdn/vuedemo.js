var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!'
    }
})
//基础入门视频：https://www.imooc.com/video/16977
// 指令：  属性绑定:  :v-bind；双向数据绑定: v-model；
//computed 计算属性（表示变量是通过别的数据或属性计算出来的）。计算的变量不变的化取上次缓存值 不会重新计算（性能可以）
//watch 侦听器 （侦听模板中变量发生改变就执行相应代码）、
//todolist
 //组件： Vue.component('todo-item',{template:'<li>123</li>'}) //定义一个全局组件，在模板中可使用。    局部组件
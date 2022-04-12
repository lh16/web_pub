/*每个js文件都是一个独立的模块。模块名即文件夹名*/
/*
几种模块化规范----语法不一样！！（https://www.jianshu.com/p/8f6770f1f751）：
=》ES6  JS语法（高版本浏览器直接支持可以跑）
=》CommonJs    node.js语法就是CommonJs规范   （微信小程序支持commonjs规范，同时还支持官方的ES6规范）：
module.exports={
  name:"我是抛出的模块"
}
引用模块
let com=require("component.js")

=》AMD
=》CMD
*/

/*
es6模块化基本语法：
默认导出与默认导入
按需导出与按需导入
直接导入并执行模块中的代码*/


/*
//默认导出语法：
let a = 11;
let b = 22;
function name(params){ console.log(params)}
export default {
    a,b,name  //默认导出的成员
}*/

/*
//按需导出：
export const aa = 'aa';
export const bb = 'bb';
export function name(params){ console.log(params)};*/


//直接导入文件模块并执行
//只想单纯的执行运行某个模块中的代码，并不需要得到某个模块向外暴露的成员，可以直接导入并执行代码
console.log('直接导入模块文件并执行本模块代码')


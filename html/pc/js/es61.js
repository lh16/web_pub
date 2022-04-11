/*每个js文件都是一个独立的模块。模块名即文件夹名*/
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


/*import es61js from './es61.js';//默认导入语法： import {接收名称} from '{模块标识符}';  接收名称可以任意命名
es61js.name('xiaoma');*/

/*
//按需导入（按需导入可以和默认导入一起使用）
import { aa, bb as zz, name } from './es61.js';//按需导入的成员名称需与按需导出的成员名称一致，可以用as取别名
name('myname');
console.log(zz);
*/

//直接导入文件模块并执行代码
import './es61.js';


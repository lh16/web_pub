const path = require('path');
const webpack = require('webpack'); 
module.exports = { 
    entry:{
        app:__dirname+'/src/app.js',//唯一入口文件,__dirname是nodejs里的一个全局变量，它指向的是我们项目的根目录
    },
    output:{
        path: path.resolve(__dirname, './dist'),//打包后的文件存放的地方
        filename:'bundle.js'   //打包后输出文件的文件名（注意html的文件名要从默认main.js改为bundle.js）
    }
};
//教程：https://cloud.tencent.com/developer/article/1195063
//步骤总结： 安装nodejs；安装webpack;配置webpack.json；配置webpack.conf.js；命令行运行webpack命令；html引入打包后的js文件。
//注意，命令行直接执行webpack，前提是全局安装了webpack，如果不是全局安装，还需要在后面加上入口文件的路径。
//package.json文件：
//"start":"webpack"     npm start 
//"dev":"webpack"     npm run dev 
//"dev":"webpack --mode development"     npm run dev   开发模式（与生产模式打包压缩后的代码不一样，体积较大）
//"build":"webpack --mode production"     npm run build  生产模式（webpack 会将 production 作为 mode 的默认值去设置）


const path = require('path');
const webpack = require('webpack'); 
module.exports = {
	devtool : 'source-map',//默认none将不生成 source map文件（暴露危险）。值有source-map(报错跟踪debug用),hidden-source-map,nosources-source-map。文档：https://www.webpackjs.com/configuration/devtool/
	mode : 'production',//这项不配置的话运打包命令会报警告信息："WARNING in configuration The 'mode' option has not been set, ..."//development为开发者环境，production为生产环境变量 ，还有一个为none
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
//package.json文件scripts标签下：
//"start":"webpack"     npm start 
//"dev":"webpack"     npm run dev 
//"dev":"webpack --mode development"     npm run dev   开发模式（与生产模式打包压缩后的代码不一样，体积较大）
//"build":"webpack --mode production"     npm run build  生产模式（webpack 会将 production 作为 mode 的默认值去设置）


//Babel是一个工具链，主要用于将ECMAScript 2015+版本的代码转换为向后兼容的JavaScript代码，使之可以运行在各种环境中。(https://blog.csdn.net/sinat_41212418/article/details/121779790)
//【Babel用于处理JavaScript代码实现在不同运行环境的兼容，其可以单独使用，也可以集成到各种构建工具中去，本章节着重讲一下如何在Webpack中集成Babel。！！！】
//第三方库依赖 安装命令：npm install --save-dev babel-loader @babel/core @babel/preset-env -D
//安装所需依赖之后，要使用babel-loader需要在Webpack的配置文件中进行如下配置：
/*module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        // 预设集合
                        presets: ['@babel/preset-env'],
                        // 插件集合
                        plugins: [
                            // 使用其他插件
                        ]
                    }
                }
            }
        ]
    }
}//上面配置中针对JavaScript文件，使用了babel-loader进行处理，在options配置中告诉了Babel要使用哪些预设和插件进行JavaScript代码的处理。*/



//webpack反编译与source map：
//浏览器端的js代码一般都是压缩的。通过webpack、grunt、gulp 、 etc 的一些ugly 插件压缩打包后，会生成一个 source map的映射文件，将行映射成列的。所以只要有source map 都可以还原，没有的话，就别想了，只能格式化下。
//node反编译插件库： https://github.com/1egoman/debundle
//vue的source map配置需要关闭 : https://blog.csdn.net/weixin_31047023/article/details/113687529
//前端打包优化，且uglifyjs可以对webpack打包后的js文件进行再次压缩混淆（H5游戏前端加密方案参考）：   https://blog.csdn.net/LiuBo_1999/article/details/117549295
//uglifyjs 可以不依赖webpack单独压缩js文件


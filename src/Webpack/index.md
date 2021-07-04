# 介绍

## webpack

<p> webpack 是模块打包的工具，如果要处理其他文件必须使用 loader 或 plugin，两者的区别简单来说 loader 的功能比较少（将文件转化成 webpack 能够识别的），plugin 能做的东西更多（打包优化、压缩、定义环境变量）</p>

<p>官方文档:<a href="https://www.webpackjs.com/concepts/#%E5%85%A5%E5%8F%A3-entry-">https://www.webpackjs.c om/concepts/#%E5%85%A5%E5%8F%A3-entry-</a>webpack4-0 配置打包</p>

## 从 0 到 1 配置 webpack 方法

对模块内容进行处理-->loader 增加一些特殊的功能-->plugin 项目上的打包简化，可变性配置-->编写相应的操作函数

### 初始化

<ol>
<li><code>mkdir webpack_demo</code>新建一个 webpack_demo 的文件夹</li>
<li><code>cd webpack_demo</code> 进入当前新建的文件夹</li>
<li><code>npm init -y</code> 初始化一个 package.json 文件，可以用 ls 命令进行查看</li>
<li><code>yarn add webpack@4.45.0 webpack-cli --dev</code>
    <p>可能遇到的问题： Cannot read property 'tap' of undefined 错误</p>
    <p>解决方法： 此问题 webpack 版本不兼容，可以尝试安装最新版本</p>
    <p><code>yarn add webpack webpack-cli --dev</code></p>
</li>
<li>package.json 在 scripts 中添加 "dev":"webpack"</li>

```bash
"scripts": {
    "dev": "webpack",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

<li>新建 src/index.js</li>

```bash
function add(a, b) {
  return a + b;
}
console.log('start learn webpack');
```

<li><code>npm run dev</code>可以看到 dist 文件夹下生成 main.js,main.js 是个生产的文件</li>
<li>新建webpack.config.js文件，添加基本配置属性</li>

```bash
const { resolve } = require('path') // node写法 导入path模块处理文件路径

module.exports = {
    // 1.工程资源的入口，单个入口文件的简写如下
    entry:'.src/index.js'
    // 2.输出文件
    output:{
        filename: 'bundle.js'
        path: resolve(__dirname, 'dist')// __dirname 当前文件夹的绝对路径
    },
    // 模块
    module:{},
    // 插件
    plugins:[],
    //开发模式  生产模式需要替换 production
    mode:'development'
}
```

<li><code>npm run dev</code> 再次执行dev可以看到会生成一个dist文件夹，同时在dist文件夹下生成bundle.js，是没有被压缩过的，是打包后开发的文件</li>
</ol>

### 1、入口起点 entry

<ol>
<li>默认入口文件路径是 src/index.js</li>
<li>entry属性是单个文件入口的语法，是下面的简写</li>

```bash
    entry: {
    main: './path/to/my/entry/file.js';
  }
```

<li>对象语法</li>

```bash
    entry:{
        main:'./src/index.tsx',
        anotherEntry: './src/anotherEntry.tsx'
    }
```

</ol>

### 2、输出 output

<ol>
<li>最低要求是包含输出文件的文件名（filename）和目标输出目录（path）的对象</li>
<li>如果有多个入口起点的话要使用占位符来确保每个文件具有唯一的名称</li>

```bash
    output: {
        //输出文件的文件名
        filename: '[name].js', //使用占位符确保每个文件具有唯一的名称
        path: __dirname + '/dist', //__dirname 是当前文件夹的绝对路径
    }
```

</ol>

### 3、模式 mode

告知 webpack 使用相应的内置优化

```bash
    //webpack使用相应的内置优化模式
    mode: 'development'
```

1、<code>development</code>：会将 process.env.NODE_ENV 的值设置为 development </br>
2、<code>production</code>： 会将 process.env.NODE_ENV 的值设置为 production

### 4、处理文件 loader

将所有类型的文件转换 webpack 可以处理的有效模块

<ol>
<li>
<p>三种配置loader的方式</p>
<p>1) 配置- module.rules 允许你在 webpack 配置中指定多个 loader 最好的方式:可以减少源码中的代码量，并且可以在出错时，更快地调试和定位 loader 中的问题</p>
<p>2) 内联</p>

```bash
    import styles from `style-loader!css-loader?modules!./styles.css`
```

<p>3) CLI</p>

```bash
    webpack --module-bind jade-loader --module-bind 'css=style-loader!css-loader'
```

</li>
<li>
    loader  </br>
    1) 一组链式的loader将按照相反的顺序执行，最后一个loader返回webpack所预期的js </br>
    2) loader可以使用options对象的方式进行配置
</li>

</ol>

### 5、处理 html 文件

<ol>
<li>输入!, tab键生成src/index.html</li>
<li><code>yarn add html-webpack-plugin --dev</code>进行安装html-webpack-plugin处理html文件插件</li>
<li>webpack.config.js中配置</li>

```bash
const HtmlWebpackPlugin = require('html-webpack-plugin');
plugins: [
    //处理html文件
    new HtmlWebpackPlugin({
        filename: "index.html", //在目标文件下的文件名
        template: "src/index.html", //被处理文件的路径
    }),
],
```

<li><code>yarn dev</code> 生成dist/index.html,并且文件中自动引入bundle.js,直接在浏览器中打开index.html,控制台将会看到输出'start learn webpack'还没有配置devsevice --open不能用 <code>"dev":"webpack --open"</code></li>
</ol>

### 6、插件 plugins 的配置使用

目的： </br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在于解决 loader 无法解决的其他事项 </br>
用法： </br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;在 webpack.config.js 配置中添加 plugins 属性并且传入插件实例数组

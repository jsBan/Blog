---
group:
  order: 2
---

### Loader

视频链接: <a>https://www.bilibili.com/video/BV1cv411C74F?p=2&spm_id_from=pageDriver</a> P12-P16

### 自定义 loader

<ol>
  <li><code>mkdir loader</code></li>
  <li><code>yarn add webpack webpack-cli --dev</code> 安装 webpack 包</li>
  <li>新建 src/index.js 
  
  ```ts
console.log('dddddddddd');
  ```
  </li>
  <li>新建 loaders/loader1.js

```ts
//content 文件的内容
//map  文件的sourceMap的信息
//meta 文件的一些源信息
module.exports = function (content, map, meta) {
  console.log(content)
  return content
}
```

  </li>
  <li>webpack.config.json
  
  ```ts
const path = require('path');
module.exports = {
  module: {
    rules: [
      {
        test: /.\js$/,
        //loader:path.resolve(__dirname, 'loaders','loader')
        //配置laoder的解析规则后可简写如下
        loader: 'loader',
      },
    ],
  },
  //loader的解析规则
  resolveLoader: {
    modules: [
      'node_modules', //默认去node_modules中找
      path.resolve(__dirname, 'loaders'), //找不到会到loader目录下找
    ],
  },
  mode: 'development',
};
  ```
  </li>
  <li><code>yarn webpack</code></li>
  <li>通过 use 配置多个 loader 
  
  ```ts
{
    test: /.\js$/,
    use: [
        'loader',
        'loader2',
        'loader3'
    ]
}
  ```
  </li>
  <li>各个 loader.js 中的代码
  
  ```ts
module.exports = function(content, map, meta) {
  console.log('111');
  return content;
};
module.exports.pitch = function(content, map, meta) {
  console.log('pitch 1');
};
  ```
  </li>
  <li>yarn webpack 可以看到输出
  
  ```ts
  pitch 1
  pitch 2
  pitch 3
  333
  222
  111
  ```
  </li>
</ol>

### 同步 loader 和异步 loader

<ol>
  <li>loader 有同步 loader 也有一部 loader, 目前我们写的都是同步 loader, 下面我们看一下同步 loader 的另一种写法
  
  ```ts
module.exports = function(content, map, meta) {
  console.log('111');
  this.callback(null, content, map, meta); //第一个参数表示有没有错误， 没有错误就传个null
};
```
  </li>
  <li>异步 loader 是我们比较推荐的写法 loader2.js 中
  
  ```ts
//异步loader
module.exports = function(content, map, meta) {
  console.log('222222');
  const callback = this.async();
  //webpack 会等待callback执行然后进入下一个loader
  setTimeout(() => {
    callback(null, content);
  }, 2000);
};
```
  </li>
  <li><code>yarn webpack</code>可以看到输出 222 2 秒后输出 111</li>
</ol>

### 在 loader 中获取的 options

<ol>
  <li><code>yarn add loader-utils --dev </code>安装 loader-utils</li>
  <li>webpack 配置 loader3 的 options
  
  ```ts
{
    loader: 'loader3',
    options: {
        name:"loader3"
    }

}

````
</li>
<li>loader3.js 中

```ts
const { getOptions } = require('loader-utils');
module.exports = function(content, map, meta) {
console.log('333');
//接收this参数
const options = getOptions(this);
console.log(options);
return content;
};
````

  </li>
</ol>

### 验证 loader options 配置是否符合规范

<ol>
  <li>新建 loaders/schema.json
  
  ```ts
{
    "type": "object",
    "properties":{
       "name":{
        "type":"string",
        "description":"string"
       }
    },
    "additionalProperties":true
}
  ```
  </li>
  <li>loader3.js
  
  ```ts
const { getOptions } = require('loader-utils');
const { validate } = require('schema-utils');
const schema = require('./schema.json');

module.exports = function(content, map, meta) {
console.log('333');
const options = getOptions(this);
console.log(options);
//校验 options 是否合法, 第三个参数是为了不合法时提示更友好
validate(schema, options, {
name: 'loader3',
});
return content;
};

````
</li>
</ol>

### 自定义 babel loader

<ol>
<li>新建 loaders/babelSchema.json

```ts
{
  "type": "object",
  "properties":{
     "presets":{
      "type":"array"
     }
  },
  "additionalProperties":true
}
````

  </li>
  <li>新建 loaders/babelLoader.js
  
  ```ts
const { getOptions } = require('loader-utils');
const { validate } = require('schema-utils');
const babel = require('@babel/core');
const util = require('util');

const schema = require('./babelSchema.json');
//babel.transform 用来编译代码的异步方法
//util.promisify 将普通的异步方法转换为基于 promise 的异步方法
const transform = util.promisify(babel.transform);

module.exports = function(content, map, meta) {
//获取 options
const options = getOptions(this) || {};
//校验 babel 的 options 配置
validate(schema, options, {
name: 'Babel Loader',
});
// 创建异步
const callback = this.async();
//使用 babel 编译代码
transform(content, options)
.then(({ code, map }) => {
callback(null, code, map, meta);
})
.catch(e => callback(e));
return content;
};

````
</li>
<li>webpack 配置 loader3 的 options

```ts
{
  test: /.\js$/,
  loader: 'babelLoader.js'
}
````

  </li>
  <li>index.js 中加入一些 es6 代码 
  
  ```ts
class Person {
  constructor() {
    this.name = this.name;
  }
  setName(name) {
    this.name = name;
  }
}
console.log(new Person('jack'));
  ```
  </li>
  <li><code>yarn webpack</code></li>
</ol>

### 场景: 对 js 文件或对 css 文件统一处理

<ol>
  <li>版本库升级 .bind-->.bind−−>.on</li>
  <li>写好的项目增加移动端适配 px-->rem, 10px-->0.21rem</li>
</ol>

```ts
module.exports = (context) => {
  return context.replace('bind', 'on')
}
```

```ts
module: {
    rules: [{
      test: /\.js$/,
      use: [{
        loader: 'happypack/loader?id=happybabel',
      },{
        loader: './myloader.js',
      }],
    },
    ]
  },
```

---
group:
  order: 3
---

### Plugin

常用的插件：

<ol>
  <li>webpack.DefinePlugin--打包阶段定义全局变量 webpack --env 只能在 webpack 配置文件中使用, 不能给到业务代码</li>
  <li>webpack.HashedModulesPlugin--保持 module.id 的稳定 chunkHash 能保正的是改动业务代码第三方包的 hash 不会改动，当模块改了引入的包的数量,模块的 chunkhash 还是会变</li>
  <li>webpack.NoEmitOnErrorPlugin -屏蔽错误 webpack 打包遇到错误会终端编译</li>
  <li>webpack.providerPlugin--提供全局的 plugin</li>
  <li>copy-webpack-plugin --帮助拷贝内容 webpack 只会把它处理的资源放到 dist 中 视频链接: <a>https://www.bilibili.com/video/BV1cv411C74F?p=2&spm_id_from=pageDriver</a> P17-P23</li>
</ol>

complier 和 compilation compiler 是 webpack 的主要引擎， 拓展自 tapable 类

```ts
const {
  SyncHook, //普通的同步钩子不管有没有出错都往下走
  SyncBailHook, // 如果钩子有返回值退出，则不继续执行后面的钩子， 没有返回值继续执行, 通过有没有返回值来判断当前钩子有没有出错
  SyncWaterfallHook, //瀑布流: 在这个钩子中我可以注册n多钩子，上一个钩子的返回值会给下一个钩子
  SyncLoopHook,
  AsyncParallelHook, //并行执行: 意味着异步代码可以同时工作执行
  AsyncParallelBailHook, // 最终的钩子函数有返回值也会终止
  AsyncSeriesHook, // 所有的异步代码串行执行，一个执行完执行另一个
  AsyncSeriesBailHook,
  AsyncSeriesWaterfallHook,
} = require('tapable')
```

### tapable

<ol>
  <li><code>mkdir plugin</code></li>
  <li>新建<code>tapable.test.js</code>
  
  ```ts
const {
  SyncHook,
  SyncBailHook,
  AsyncParallelHook,
  AsyncSeriesHook,
} = require('tapable');
class Lesson {
  constructor() {
    //初始化hook容器
    this.hooks = {
      //同步hook, 任务依次执行
      //go:new SyncHook(['address'])
      go: new SyncBailHook(['address']),
      //异步hook
      //AsyncParallelHook: 异步并行
      //
      //leave: new AsyncParallelHook(['name', 'age'])
      //AsyncSeriesHook: 串行执行
      leave: new AsyncParallelHook(['name', 'age']),
    };
  }
  tap() {
    //往hooks容器中注册事件/添加回调函数,将来钩子被触发相应的回调函数就会
    //class0318 和 class0410 顺序执行
    //call方法触发hook, 会将hook容器中的所有钩子全都触发
    this.hooks.go.tap('class0318', address => {
      console.log('class0318', address);
      return 111;
    });
    this.hooks.go.tap('class0410', address => {
      console.log('class0410', address);
    });
    //异步钩子用tab绑定也可以 意义不大
    // this.hooks.leave.tap('class0510', (name,age) => {
    //     console.log("class0510", name,age)
    // })
    // 定义异步钩子的两种方式tapAsync和tapPromise
    //如果是并行执行 所以一秒后执行class0610, 2秒后执行class0510
    //如果是串行执行 2秒后执行class0510 然后再一秒后执行class0610
    this.hooks.leave.tapAsync('class0510', (name, age, cb) => {
      setTimeout(() => {
        console.log('class0510', name, age);
        //异步代码执行完了 接着往下走
        cb();
      }, 2000);
    });
    this.hooks.leave.tapPromise('class0610', (name, age) => {
      return new Promise(resolve => {
        setTimeout(() => {
          console.log('class0510', name, age);
          //异步代码执行完了 接着往下走
          resolve();
        }, 1000);
      });
    });
  }
  start() {
    //触发
    this.hooks.go.call('c318');
    //this.hooks.leave.call('zou',18)
    this.hooks.leave.callAsync('zou', 18, () => {
      //所有leave 容器中的钩子都触发完了再触发
      console.log('end~~~');
    });
  }
}
const l = new Lesson();
l.tap();
l.start();
  ```
  </li>
  <li><code>yarn add tapable --dev</code></li>
  <li><code>node tapable.test.js</code></li>
</ol>

### 手动实现一个插件

### compiler

<ol>
  <li><code>yarn add webpack webpack-cli --dev</code></li>
  <li><code>yarn add tapable --dev</code></li>
  <li>新建 plugins/Plugin1
  
  ```ts
// 在webpack 生命周期中做一些事 会保证前面的生命周期执行完，再执行后面的
class Plugin1 {
  apply(compiler) {
    compiler.hooks.emit.tap('Plugin1', compilation => {
      console.log('emit.tap 111');
    });
    compiler.hooks.emit.tapAsync('Plugin1', (compilation, cb) => {
      setTimeout(() => {
        console.log('emit.tap 111');
        cb();
      }, 2000);
    });
    compiler.hooks.emit.tapPromise('Plugin1', (compilation, resolve) => {
      return new Promise(resolve => {
        setTimeout(() => {
          console.log('emit.tap 111');
          resolve();
        }, 2000);
      });
    });
    compiler.hooks.afterEmit.tap('Plugin1', compilation => {
      console.log('afterEmit.tap 111');
    });
    compiler.hooks.done.tap('Plugin1', compilation => {
      console.log('done.tap 111');
    });
  }
}
module.exports = Plugin1;
  ```
  </li>
  <li><code>webpack.config.js </code>中
  
  ```ts
  const Plugin1 = require('./plugins/Plugin1');
module.exports = {
  plugins: [new Plugin1()],
};
```
  </li>
  <li><code>yarn webpack </code>会看到输出</li>
</ol>

### compilation

<ol>
  <li>新建 plugins/Plugin1
  
  ```ts
class Plugin2 {
  apply(compiler) {
    //thisCompilation 初始化compilation
    compiler.hooks.thisCompilation.tap('Plugin2', compilation => {
      debugger;
      console.log(compilation);
    });
  }
}
module.exports = Plugin2;
  ```
  </li>
  <li><code>为了方便清晰的看到compilation对象</code> node 以调试模式运行 webpack.js,并在首行停住</li>
  <li><code>"start": "node --inspect-brk ./node_modules/webpack/bin/webpack.js"npm start</code> 打开浏览器 F12， 点击 node 的绿色图标添加 Watch</li>
</ol>

### 用例 1

场景: 往要输出的资源中添加一个 txt 文件

<ol>
  <li>新建 plugins/b.txt,c.txt</li>
  <li>Plugin2.js
  
  ```ts
const fs = require('fs');
const util = require('util');
const path = require('path');
const webpack = require('webpack');
const { RawSource } = webpack.sources;
//将fs异步方法变成基于promise风格的异步代码
const readFile = util.promisify(fs.readFile);

class Plugin2 {
apply(compiler) {
//thisCompilation 初始化 compilation
compiler.hooks.thisCompilation.tap('Plugin2', compilation => {
// debugger
// console.log(compilation)
//添加资源文件
compilation.hooks.additionalAssets.tapAsync('Plugin2', async cb => {
// debugger
// console.log(compilation)
const content = 'hello plugin2';
//往要输出的资源中添加一个 a.txt 文件
compilation.assets['a.txt'] = {
//文件大小
size() {
return content.length;
},
//文件内容
source() {
return content;
},
};
//往要输出的资源中添加一个 b.txt 文件
const bData = await readFile(path.resolve(**dirname, 'b.txt'));
compilation.assets['b.txt'] = new RawSource(bData);
//往要输出的资源中添加一个 c.txt 文件
const cData = await readFile(path.resolve(**dirname, 'c.txt'));
debugger;
compilation.emitAsset('c.txt', new RawSource(cData));
cb();
});
});
}
}
module.exports = Plugin2;

````
</li>
<li>webpack.config.js

```ts
const Plugin2 = require('./plugins/Plugin2');
module.exports = {
plugins: [new Plugin2()],
};
````

  </li>
  <li><code>yarn webpack</code></li>
</ol>

### 实现一个 CopyPlugin

打包时将一个文件夹下的文件拷贝到输出目录

<ol>
  <li>新建 public/index.html, public/reset.css</li>
  <li><code>yarn add globby schema-utils --dev</code></li>
  <li>webpack.config.js
  
  ```ts
const CopyWebPackPlugin = require('./plugins/CopyWebPackPlugin');
module.exports = {
  plugins: [
    new CopyWebPackPlugin({
      from: 'public',
      to: 'css',
      ignore: ['**/index.html'], //任意目录下的index.html都会被忽略
    }),
  ],
};
  ```
  </li>
  <li>新建 plugins/copyPluginSchema.json 文件
  
  ```ts
{
    "type": "object",
    "properties":{
       "from":{
        "type":"string"
       },
       "to":{
        "type":"string"
       },
       "ignore":{
        "type":"array"
       }
    },
    "additionalProperties":false
}
  ```
  </li>
  <li>新建 plugins/CopyWebPackPlugin.js 文件
  
  ```ts
const path = require('path');
const fs = require('fs');
const { promisify } = require('util');
const webpack = require('webpack');
const { RawSource } = webpack.sources;
//globby 匹配文件列表 并且根据自己的规则忽略一些文件
const globby = require('globby');
const { validate } = require('schema-utils');
const schema = require('./copyPluginSchema.json');
const { Compilation } = require('webpack');
const readFile = promisify(fs.readFile);

class CopyWebPackPlugin {
constructor(options = {}) {
//验证 option 是否符合规范
validate(schema, options, {
name: 'CopyWebPackPlugin',
});
this.options = options;
}
//插件内部会调用 apply 方法
apply(compiler) {
//初始化 compilation
compiler.hooks.thisCompilation.tap('CopyWebPackPlugin', compilation => {
//添加资源的 hook
compilation.hooks.additionalAssets.tapAsync(
'CopyWebPackPlugin',
async cb => {
//将 from 中的资源复制到 to 中去，输出出去
const { from, to = '.', ignore } = this.options;
//context 就是 webpack 配置
const context = compiler.options.context; // process.cwd 运行指令的目录
//将输入路径变成绝对路径
const absoluteFrom = path.isAbsolute(from)
? from
: path.resolve(context, from);
//1. 过滤掉 ignore 的文件
//globby(要处理的文件夹, options)
const paths = await globby(absoluteFrom, { ignore });
//2. 读取 paths 中的资源
//map 方法遇到 async 函数并不会等
// paths.map( async (path) => {
// const bData = await readFile(path)
// })
//改写成 Promise.allasync 函数的返回值一定是个 promise 对象
const files = await Promise.all(
paths.map(async absolutePath => {
//读取文件
const data = await readFile(absolutePath);
//basename 得到最后的文件名称
const relativePath = path.basename(absolutePath);
//和 to 属性组合一下
//没有 to --> reset.css,
//有 to(to 的值是 aa)--> aa/reset.css
//to 是“.”啥也不会做
const filename = path.join(to, relativePath);
return {
//文件数据
data,
//文件名称
filename,
};
}),
);
//3. 生成 webpack 格式的文件
const assets = files.map(file => {
const source = new RawSource(file.data);
return {
source,
filename: file.filename,
};
});
//4. 添加到 compilation
assets.forEach(asset => {
compilation.emitAsset(asset.filename, asset.source);
});
cb();
},
);
});
}
}
module.exports = CopyWebPackPlugin;

````
</li>
<li><code>yarn webpack</code></li>
</ol>

### 用例 2

场景: 开发的时候文件服务器不能用，只能使用本地的静态资源文件夹<br />
../static/WechatLogo.jpeg --> <a>https://epos-tl-dev3.zatech.com/WechatLogo.jpeg</a>

<ol>
<li>src/index.html

```ts
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <img src="../static/WechatLogo.jpeg">
</body>
</html>
````

  </li>
  <li>myPlugin.js
  
  ```ts
  const path = require('path');
  const fs = require('fs');
  class myPlugin {
    apply(compiler) {
      //done 所有打包已经完成 并且输出成dist目录了
      compiler.hooks.done.tap('myPlugin', compilation => {
        let context = compiler.options.context;
        //获取dist目录
        const publicPath = path.resolve(context, 'dist');
        //遍历打包的资源
        compilation.toJson().assets.forEach(ast => {
          const filePath = path.resolve(publicPath, ast.name);
          fs.readFile(filePath, (err, file) => {
            //替换生成新的conext
            const newFileContext = file
              .toString()
              .replace('../static', 'https://epos-tl-dev3.zatech.com');
            fs.writeFile(filePath, newFileContext, () => {
              if (err) {
              } else {
                console.log('文件创建成功');
              }
            });
          });
        });
      });
    }
  }
  module.exports = myPlugin;
  ```
  </li>
  <li><code>webpack</code> 浏览器可以看到 index.html 中的引用路径被替换了</li>
</ol>

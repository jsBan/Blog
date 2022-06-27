### 指令

指令 (Directives) 是带有 `v-` 前缀的特殊 attribute。指令 attribute 的值预期是 <strong>单个 JavaScript 表达式</strong> ' (`v-for` 是例外情况，稍后我们再讨论)。<br />
指令的职责是，当表达式的值改变时，将其产生的连带影响，响应式地作用于 DOM。回顾我们在介绍 <a href="https://learning.dcloud.io/#/?vid=6">视频</a> 中看到的例子：

```html
<p v-if="seen">现在你看到我了</p>
```

这里，`v-if` 指令将根据表达式 `seen` 的值的真假来插入/移除 `<p>` 元素。

### 参数

一些指令能够接收一个“参数”，在指令名称之后以冒号表示。例如，`v-bind` 指令可以用于响应式地更新 HTML attribute：

```html
<a v-bind:href="url">...</a>
```

在这里 `href` 是参数，告知 `v-bind` 指令将该元素的 `href` attribute 与表达式 `url` 的值绑定。

另一个例子是 `v-on` 指令，它用于监听 DOM 事件：

```html
<a v-on:click="doSomething">...</a>
```

在这里参数是监听的事件名。我们也会更详细地讨论事件处理。

### 常用指令

| 指令描述 | 命令行          | 缩写 | 备注                                            |
| -------- | --------------- | ---- | ----------------------------------------------- |
| 动态绑定 | v-bind:xxx={{}} | :xxx |
| 绑定事件 | v-on:xxx={{}}   | @xxx | .prevent 修饰符（v-on:xxx.prevent）阻止事件冒泡 |
| 展示条件 | v-show={{}}     |      | dom 结构保留                                    |
| 展示条件 | v-if={{}}       |      | dom 结构不存在                                  |
| 循环遍历 | v-for={{}}      |

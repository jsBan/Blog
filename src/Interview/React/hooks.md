## Hooks

## react hooks 是什么？

<ol>
  <li>Hook 是 React 16.8 的新增特性</li>
  <li>Hooks 本质上就是一类特殊的函数，它们可以为你的函数型组件（function component）注入一些特殊的功能，让您在不编写类的情况下使用 state(状态) 和其他 React 特性。</li>
</ol>

## react hooks 解决了什么问题？

<ol>
  <li><strong>​状态逻辑难以复用：</strong>业务变得复杂之后，组件之间共享状态变得频繁，组件复用和状态逻辑管理就变得十分复杂。使用 redux 也会加大项目的复杂度和体积。</li>
  <li><strong>组成复杂难以维护：</strong>复杂的组件中有各种难以管理的状态和副作用，在同一个生命周期中你可能会因为不同情况写出各种不相关的逻辑，但实际上我们通常希望一个函数只做一件事情。</li>
  <li><strong>类的 this 指向性问题：</strong>我们用 class 来创建 react 组件时，为了保证 this 的指向正确，我们要经常写这样的代码：<code>​const that = this</code>​，或者是​<code>​this.handleClick = this.handleClick.bind(this)></code>​​；一旦 <code>this</code> 使用错误，各种 <code>bug</code> 就随之而来。</li>
</ol>

## useMemo 和 useCallBack 的区别

`useMemo`和`useCallback`都是`reactHook`提供的两个 API，用于缓存数据，优化性能;两者接收的参数都是一样的，第一个参数表示一个回调函数，第二个表示依赖的数据。

<ol>
  <li><strong>共同作用：</strong>在依赖数据发生变化的时候，才会调用传进去的回调函数去重新计算结果，起到一个缓存的作用。</li>
  <li><strong>区别：</strong><code>useMemo</code>将调用 fn 函数并返回其结果；<code>useCallback</code>将返回 fn 函数而不调用它</li>
</ol>

**useMemo 案例如下：**

<ol>
  <li>
    <strong>不使用：</strong>该组件，维护了两个 state ，可以看到 getNum 的计算仅仅跟 count 有关，但是现在无论是 count 还是 val 变化，都会导致 getNum 重新计算，所以这里我们希望 val 修改的时候，不需要再次计算，这种情况下我们可以使用 <strong>useMemo</strong>
    <br />
    <br />
    <code src="./code/useMemo/example1.tsx"></code>
  </li>
  <br />
  <li>
    <strong>使用：</strong>使用 <strong>useMemo</strong> 后，并将 count 作为依赖值传递进去，此时仅当 count 变化时才会重新执行 getNum。
    <br />
    <br />
    <code src="./code/useMemo/example1.tsx"></code>
  </li>
</ol>

**useCallback 案例如下：**

<ol>
  <li>
    有一个父组件，其中包含子组件，子组件接收一个函数作为 props ；通常而言，如果父组件更新了，子组件也会执行更新；但是大多数场景下，更新是没有必要的，我们可以借助 <strong>useCallback</strong> 来返回函数，然后把这个函数作为 props 传递给子组件；这样，子组件就能避免不必要的更新
    <br />
    <br />
    <code src="./code/useCallback/example1.tsx"></code>
  </li>
  <br />
  <li>
    使用 <strong>useCallback</strong> 之后，仅当 count 发生变化时 Child 组件才会重新渲染，而 val 变化时，Child 组件是不会重新渲染的。<strong>useCallback</strong>使用的第二个例子：测量 DOM 节点
    <br />
    <br />
    <code src="./code/useCallback/example2.tsx"></code>
  </li>
  <li>
    获取 DOM 节点的位置或是大小的基本方式是使用 <strong>callback ref</strong>。每当 ref 被附加到一个另一个节点，React 就会调用 <strong>callback</strong> 在这个案例中，我们没有选择使用 useRef，因为当 ref 是一个对象时它并不会把当前 ref 的值的 变化 通知到我们。使用 <strong>callback ref</strong> 可以确保 即便子组件延迟显示被测量的节点 (比如为了响应一次点击)，我们依然能够在父组件接收到相关的信息，以便更新测量结果。注意到我们传递了 [] 作为 <strong>useCallback</strong> 的依赖列表。这确保了 <strong>ref callback</strong> 不会在再次渲染时改变，因此 React 不会在非必要的时候调用它。在此示例中，当且仅当组件挂载和卸载时，<strong>callback ref</strong> 才会被调用，因为渲染的标签组件在整个重新渲染期间始终存在。如果你希望在每次组件调整大小时都收到通知，则可能需要使用 <strong>ResizeObserver</strong> 或基于其构建的第三方 Hook。如果你愿意，你可以 把这个逻辑抽取出来作为 一个可复用的 Hook:
    <br />
    <br />
    <code src="./code/useCallback/example3.tsx"></code>
  </li>
</ol>

## 简单总结

| hook                | 功能                                                       |
| ------------------- | ---------------------------------------------------------- |
| useState            | 设置和改变 state，代替原来的 state 和 setState             |
| useReducer          | 代替原来 redux 里的 reducer，方便管理状态逻辑              |
| useEffect           | 引入具有副作用的操作，类比原来的生命周期                   |
| useLayoutEffect     | 与 useEffect 作用相同，但它会同步调用 effect               |
| useMemo             | 可根据状态变化控制方法执行，优化无用渲染，提高性能         |
| useCallback         | 类似 useMemo，useMemo 优化传值，usecallback 优化传入的方法 |
| useContext          | 上下文爷孙组件及更深层组件传值                             |
| useRef              | 返回一个可变的 ref 对象                                    |
| useImperativeHandle | 可以让你在使用 ref 时自定义暴露给父组件的实例值            |

## Tips

<a href="/react/hooks">React 相关知识点 →</a>

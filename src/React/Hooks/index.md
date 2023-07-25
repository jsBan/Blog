---
title: Hooks
nav:
  group: 2
---

### Hooks

## useState()

`let [count, setCount] = useState(0)`

作为 `setState()` 的替换，提供了 initialState 作为 `useState()` 方法的入参，`count`是`state`的值，`setCount`是用来修改 count 值的方法，`setCount(1)` 相当于 `setState({count: 1})`

## useEffect()

`useEffect(() => {}, [])`

useEffect()方法接受两个参数，第一个是 `() => {}`, 第二个是可选参数，是一个数组，数组里面的值发生变化时会执行
useEffect()里面的第一个参数，也就是函数

- `componentDidMount` 相当于 `useEffect(() => {}, [])`
- `componentDidUpdate` 相当于 `useEffect(() => {}, [count, index])`, 当 count、index 改变的时候相当于触发了 componentDidUpdate
- `componentWillUnmount` 相当于

```js
useEffect(() => {
  return () => {
    console.log('Trigger when componentWillUnmount')
  }
}, [])
```

当组件卸载的时候会执行`useEffect()` 第一个参数函数里面的返回的的函数, 即

```ts
;() => {
  console.log('Trigger when componentWillUnmount')
}
```

## useContext

```ts
const themes = {
  light: {
    foreground: '#000000',
    background: '#eeeeee',
  },
  dark: {
    foreground: '#ffffff',
    background: '#222222',
  },
}

const MyContext = React.createContext(themes.light)

useContext(MyContext)
```

`useContext` 的参数是 `React.createContext()` 返回值，不能是 `MyContext.Provider` 或者 `MyContext.Consumer`

当 context 的值发生改变的时候，使用了`useContext()`的组件每次都会重新渲染，如果需要优化的话可以使用`React.memo`进行优化

## useCallback

`useCallback(fn, deps)`

`useCallback`返回一个**函数**，用来处理父组给子组件传递一个函数的时候做优化，缓存该函数，使得子组件只在需要的时候重新渲染

## useMemo

`useMemo(() => computedExpensiveValue, deps)`

`useMemo`返回的是计算过的**值或函数**，用来做组件内部高开销计算的优化，使得组件内部不需要每次渲染都触发高开销的计算

### useCallback 对比 useMemo

`useCallback` 用来做父组件向 **子组件** 传递函数时候做优化使用

`useMemo` 用来做 **组件内部** 高开销的计算优化使用

`useCallback(fn, deps)` 相当于 `useMemo(() => fn, deps)`

## useLayoutEffect()

`useLayoutEffect(() => {}, [])`

90%的时候使用 useEffect(), 当需要在 dom 全部加载完成且未渲染之前做一下 dom 操作的时候, 需要 useLayoutEffect()

跟 useEffect()的区别是：

useEffect: 渲染 => useEffect() => 渲染
useLayoutEffect: useLayoutEffect() => 渲染

useEffect

```js
const Message = ({boxRef, children}) => {
  const msgRef = React.useRef(null);
  React.useEffect(() => {
    const rect = boxRef.current.getBoundingClientRect();
    msgRef.current.style.top = `${rect.height + rect.top}px`;
  }, []);

  return <span ref={msgRef} className="msg">{children}</span>;
};

const App = () => {
  const [show, setShow] = React.useState(false);
  const boxRef = React.useRef(null);

  return (
    <div>
      <div ref={boxRef} className="box" onClick={() => setShow(prev => !prev)}>Click me</div>
      {show && <Message boxRef={boxRef}>Foo bar baz</Message>}
    </div>
  );
};

.box {
  position: absolute;
  width: 100px;
  height: 100px;
  background: green;
  color: white;
}

.msg {
  position: relative;
  border: 1px solid red;
}
```

useLayoutEffect

```ts
const Message = ({ boxRef, children }) => {
  const msgRef = React.useRef(null)
  React.useLayoutEffect(() => {
    const rect = boxRef.current.getBoundingClientRect()
    msgRef.current.style.top = `${rect.height + rect.top}px`
  }, [])

  return (
    <span ref={msgRef} className="msg">
      {children}
    </span>
  )
}

const App = () => {
  const [show, setShow] = React.useState(false)
  const boxRef = React.useRef(null)

  return (
    <div>
      <div ref={boxRef} className="box" onClick={() => setShow(prev => !prev)}>
        Click me
      </div>
      {show && <Message boxRef={boxRef}>Foo bar baz</Message>}
    </div>
  )
}

.box {
  position: absolute;
  width: 100px;
  height: 100px;
  background: green;
  color: white;
}

.msg {
  position: relative;
  border: 1px solid red;
}
```

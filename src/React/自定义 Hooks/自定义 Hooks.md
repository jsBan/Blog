### 自定义 Hooks

作为合格的摸鱼仔，不得写个玩具，满足下自己的期待吗？<br />
接下来我手动实现一个返回`Proxy`对象的 `hook` 代替 `useState` 的功能。<br />
期待的功能是当修改这个对象时，使用这个对象的 `dom` 自动更新，并能 `useEffect` 可以监听到这个对象的变化。<br />
所以，我们需要使用 `useState` 定义一个变量存储这个对象，最后并且返回这个对象

```ts
export const useProxy = (state: any): any => {
  const [value, setValue] = useState<any>()

  return value
}
```

接下来，我们创建一个 `Proxy` 对象，并且赋值给 `value`，当用户改变某个属性时，将变化的值重新赋值给 `value`

```ts
export const useProxy = (state: any): any => {

  const [value, setValue] = useState<any>()

  useEffect(() => {
    const state = new Proxy(state, {
      get: Reflect.get,
      set: (target, key, value, reciver) => {
        target[key] = value
        setValue(target)
        return Reflect.set(target, key, value, reciver)
    })

    setValue(state)

  }, [])

  return value
}
```

看起来似乎没问题，但是实际上只要发生一次改变，当前的 `target` 就成为了普通对象，所以我们还需要将这个对象也变为代理对象....

这样思考下去，是不是都点递归的意思了，所以，我们改造下这里的逻辑，抽离创建代理对象过程。

```ts
import { useMemo, useState } from 'react'

export const useProxy = (state: any) => {
  const [value, setValue] = useState<any>()

  const createProxy = (target: any): any => {
    return new Proxy(target, {
      get: Reflect.get,
      set: (target, key, value, reciver) => {
        target[key] = value
        setValue(createProxy(target))
        return Reflect.set(target, key, value, reciver)
      },
    })
  }

  const initVlaue = useMemo(() => createProxy(state), [state])

  return value ?? initVlaue
}
```

这里当没有发生属性变化时，代理对象是基于原始`state`。

接下来我们验证下

```ts
import { useEffect } from 'react'
import { useProxy } from './useProxy'

function App() {
  const up = useProxy({
    name: '萌萌哒草头将军',
    age: 18,
  })

  useEffect(() => console.log(up), [up])

  return (
    <>
      <button
        onClick={() => {
          up.age++
        }}
      >
        change
      </button>
      <p>{up.age}</p>
    </>
  )
}

export default App
```

效果如下：

<code src="../code/useProxy1.tsx"></code>

不过此时，无法直接让嵌套对象具有响应式。

我们可以通过下面的方法间接的获得响应式

<code src="../code/useProxy2.tsx"></code>

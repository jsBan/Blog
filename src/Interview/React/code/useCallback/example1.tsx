import React, { useState, useCallback } from 'react'

export default () => {
  const [count, setCount] = useState(1)
  const [val, setValue] = useState('')

  const getNum = useCallback(() => {
    return Array.from({ length: count * 100 }, (v, i) => i).reduce(
      (a, b) => a + b,
    )
  }, [count])

  return (
    <div>
      <Child getNum={getNum} />
      <div>
        <button onClick={() => setCount(count + 1)}>+1</button>
        <input value={val} onChange={event => setValue(event.target.value)} />
      </div>
    </div>
  )
}

const Child = React.memo(function({ getNum }: any) {
  return <h4>总和：{getNum()}</h4>
})

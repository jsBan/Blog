import React, { useState, useCallback } from 'react'

export default () => {
  const [rect, ref] = useClientRect()
  return (
    <>
      <h1 ref={ref}>Hello, world</h1>
      {rect !== null && (
        <h2>The above header is {Math.round(rect.height)}px tall</h2>
      )}
    </>
  )
}

const useClientRect: any = () => {
  const [rect, setRect] = useState(null)
  const ref = useCallback(
    (
      node: { getBoundingClientRect: () => React.SetStateAction<null> } | null,
    ) => {
      if (node !== null) {
        setRect(node.getBoundingClientRect())
      }
    },
    [],
  )
  return [rect, ref]
}

import React, { useState, useCallback } from 'react'

export default () => {
  const [height, setHeight] = useState(0)

  const measuredRef: any = useCallback(
    (
      node: {
        getBoundingClientRect: () => {
          (): any
          new (): any
          height: React.SetStateAction<number>
        }
      } | null,
    ) => {
      if (node !== null) {
        setHeight(node.getBoundingClientRect().height)
      }
    },
    [],
  )
  return (
    <>
      <h1 ref={measuredRef}>Hello, world</h1>
      <h2>The above header is {Math.round(height)}px tall</h2>
    </>
  )
}

import React, { useEffect } from 'react'
import { Observable, interval } from 'rxjs'
import { Button } from 'antd'
import { useProxy } from './useProxy'

const Index: React.FC = () => {
  const up = useProxy({
    name: '哈哈哈哈',
    age: 18,
  })

  useEffect(() => {
    console.log(up)
  }, [up])

  return (
    <div>
      <Button onClick={() => up.age++}>增加</Button> &nbsp;
      <Button onClick={() => up.age--}>减少</Button>
      <p>up.age: {up.age}</p>
    </div>
  )
}
export default Index

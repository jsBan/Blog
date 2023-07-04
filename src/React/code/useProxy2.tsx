import React, { useEffect } from 'react'
import { Observable, interval } from 'rxjs'
import { Button } from 'antd'
import { useProxy } from './useProxy'

const Index: React.FC = () => {
  const project = useProxy({
    version: 'v0.1',
    message: 'o',
  })

  const up = useProxy({
    name: '哈哈哈哈',
    age: 18,
    project,
  })

  useEffect(() => {
    console.log(up)
  }, [up])

  return (
    <div>
      <Button onClick={() => up.age++}>Change Age</Button>
      <p>up.age: {up.age}</p>
      <Button onClick={() => (up.project.message += 'h')}>
        Change Message
      </Button>
      <p>up.message: {up.project.message}</p>
    </div>
  )
}
export default Index

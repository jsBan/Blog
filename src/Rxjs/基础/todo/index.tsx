import React, { useRef } from 'react'
import { useObservable } from 'rxjs-hooks'
import TodoService from './model/service'

const useInstance = (instanceClass: any) => {
  const instance = useRef(null)
  return instance.current || (instance.current = new instanceClass())
}

const Todo = (props: any) => {
  const todoService = useInstance(TodoService)
  const todoList = useObservable(() => todoService.todoList$, [])
  const loading = useObservable(() => todoService.loading$, false)
  return (
    <div>
      <div>
        {todoList.length &&
          todoList.map((item: any, index: number) => (
            <div key={index}>
              <input type="checkbox" checked={item.done} /> &nbsp;
              <span>{item.name}</span>
            </div>
          ))}
      </div>
      <div>loading: {loading.toString()}</div>
    </div>
  )
}

export default Todo

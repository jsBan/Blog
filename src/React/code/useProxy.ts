import { useMemo, useState } from 'react'

export const useProxy = (state: any) => {
  const [value, setValue] = useState()
  const createProxy = (target: any) => {
    return new Proxy(target, {
      get: Reflect.get,
      set: (target, key, value, reciver) => {
        target[key] = value
        setValue(createProxy(target))
        return Reflect.set(target, key, value, reciver)
      },
    })
  }
  const initValue = useMemo(() => createProxy(state), [state])
  return value ?? initValue
}

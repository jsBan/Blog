import React, { useState } from 'react'
import { SchemaForm, SchemaMarkupField as Field, Submit } from '@formily/antd'
import { Input, ArrayTable, ArrayCards } from '@formily/antd-components'
import 'antd/dist/antd.css'
import schema from './schema'

const DragTable = () => {
  const initValue = {
    userListTable: [{ username: 'hello', age: '21' }],
    TextAreaData: '',
  }
  // const [initValue, setInitValue] = useState({
  //     userListTable: [{ username: 'hello', age: '21' }],
  //     TextAreaData: ''
  // })
  const submit = (value: any) => {
    console.log(JSON.parse(JSON.stringify(value)))
    // setInitValue(() => {
    //   initValue.TextAreaData = '22222'
    //   return {...initValue}
    // })
    initValue.TextAreaData = '222'
    console.log(initValue)
  }

  return (
    <SchemaForm
      components={{ ArrayTable, ArrayCards, Input, TextArea: Input.TextArea }}
      initialValues={initValue}
      schema={schema}
    >
      <Submit onSubmit={submit}></Submit>
    </SchemaForm>
  )
}

export default DragTable

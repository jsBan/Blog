import React, { useEffect, useState } from 'react'

import {
  SchemaForm,
  SchemaMarkupField as Field,
  createFormActions,
  createAsyncFormActions,
  FormEffectHooks,
  FormButtonGroup,
  Submit,
} from '@formily/antd' // 或者 @formily/next

import { Input, Select } from '@formily/antd-components'

import { merge, combineLatest } from 'rxjs'

import 'antd/dist/antd.css'

import schema from './schema'

const {
  onFieldValueChange$,
  onFieldInputChange$,
  onFieldInit$,
} = FormEffectHooks

const actions = createAsyncFormActions()
const OneToMan = () => {
  const [obj, setObj] = useState({
    a: false,
    b: '',
    c: '',
    d: '',
  })
  const submit = (val: any) => {
    console.log(val)
  }

  const chainEffects = () => {
    const { setFieldState } = createFormActions()
    // formilyjs写法
    //  onFieldValueChange$('a').subscribe(({ value }) => {
    //      setFieldState('*(b,c,d)', state => {
    //        state.visible = value
    //      })
    //   })
    //   onFieldInputChange$('b').subscribe(({value}) => {
    //       setFieldState('*(c,d)', state => {
    //           state.value = value
    //       })
    //   })
    // rxjs写法
    combineLatest([
      merge(onFieldInputChange$('a'), onFieldInit$('a')),
    ]).subscribe(([{ value }]) => {
      setFieldState('*(b,c,d)', state => {
        state.visible = value
      })
    })
    combineLatest([
      merge(onFieldInputChange$('b'), onFieldInit$('b')),
    ]).subscribe(([{ value }]) => {
      setFieldState('*(c,d)', state => {
        state.value = value
      })
    })
  }

  return (
    <SchemaForm
      initialValues={obj}
      schema={schema}
      components={{ Input, Select }}
      effects={() => {
        chainEffects()
      }}
    >
      <FormButtonGroup>
        <Submit onSubmit={submit}>提交</Submit>
      </FormButtonGroup>
    </SchemaForm>
  )
}

export default OneToMan

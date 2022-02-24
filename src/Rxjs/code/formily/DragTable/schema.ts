const schema = {
  type: 'object',
  properties: {
    userListTable: {
      type: 'array',
      title: '用户列表',
      name: 'userListTable',
      key: 'userListTable',
      'x-component': 'ArrayTable',
      'x-component-props': {
        draggable: true,
      },
      maxItems: 4,
      items: {
        type: 'object',
        properties: {
          username: {
            name: 'username',
            key: 'username',
            type: 'string',
            title: '用户名',
            'x-component': 'Input',
            'x-component-props': {
              placeholder: '请输入',
            },
            'x-rules': {
              required: true,
              message: '不能为空',
            },
          },
          age: {
            name: 'age',
            key: 'age',
            type: 'string',
            title: '年龄',
            'x-component': 'Input',
            'x-component-props': {
              placeholder: '请输入',
            },
            'x-rules': {
              required: true,
              message: '不能为空',
            },
          },
        },
      },
    },
    // TextAreaData: {
    //     type: 'string',
    //     title: '输出数据',
    //     name: 'TextAreaData',
    //     key: 'TextAreaData',
    //     'x-component': "TextArea",
    //     'x-component-props':{
    //         placeholder: 'textarea'
    //     }
    // }
  },
}

export default schema

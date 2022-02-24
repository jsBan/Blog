const schema = {
  type: 'object',
  properties: {
    a: {
      name: 'a',
      title: 'A',
      key: 'a',
      type: 'string',
      'x-component': 'select',
      enum: [
        {
          label: 'visible',
          value: true,
        },
        {
          label: 'hidden',
          value: false,
        },
      ],
    },
    b: {
      name: 'b',
      title: 'B',
      key: 'b',
      type: 'string',
      'x-component': 'Input',
      'x-rules': [
        {
          required: true,
          message: '不能为空',
          trigger: 'blur',
        },
        {
          pattern: /^[0-9]*$/,
          message: '只能输入数字',
          trigger: 'change',
        },
      ],
    },
    c: {
      name: 'c',
      title: 'C',
      key: 'c',
      type: 'string',
      'x-component': 'Input',
    },
    d: {
      name: 'd',
      title: 'D',
      key: 'd',
      type: 'string',
      'x-component': 'Input',
    },
  },
}

export default schema

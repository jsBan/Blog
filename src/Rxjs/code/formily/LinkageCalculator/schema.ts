const random = Math.random()
  .toString(36)
  .substring(3, 8)

const schema = {
  type: 'object',
  properties: {
    projects: {
      type: 'array',
      title: 'Projects',
      key: 'Projects',
      name: 'Projects',
      'x-decorator': 'FormItem',
      'x-component': 'ArrayTable',
      items: {
        type: 'object',
        properties: {
          column_1: {
            type: 'void',
            title: 'Sort',
            key: 'column_1',
            name: 'column_1',
            'x-component': 'Input',
            'x-component-props': {
              width: 50,
              align: 'center',
              draggable: true,
            },
            properties: {
              sortable: {
                type: 'void',
                key: 'sortable',
                'x-component': 'ArrayTable.SortHandle',
              },
            },
          },
          column_2: {
            type: 'void',
            title: 'Index',
            key: 'column_2',
            name: 'column_2',
            'x-component': 'Input',
            'x-component-props': {
              width: 50,
              align: 'center',
            },
            properties: {
              index: {
                type: 'void',
                key: 'index',
                'x-component': 'ArrayTable.Index',
              },
            },
          },
        },
      },
    },
  },
}

export default schema

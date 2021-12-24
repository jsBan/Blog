## 二叉树遍历

### 方法讨论

1. 递归
2. 迭代

DFS（深度优先遍历）: 利用栈进行辅助

BFS (广度优先遍历) : 利用队列进行辅助

1. 先序遍历

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */

// 递归实现
function preorderTraversal(root) {
  return !root
    ? []
    : [
        root.val,
        ...preorderTraversal(root.left),
        ...preorderTraversal(root.right),
      ]
}

// 模拟栈
function preorderTraversal(root) {
  let res = []
  let stack = []
  root && stack.push(root)
  while (stack.length > 0) {
    let cur = stack.pop()
    res.push(cur.val)
    cur.right && stack.push(cur.right)
    cur.left && stack.push(cur.left)
  }
  return res
}

function perOrderSearchWithStack(root) {
  // 模拟栈
  let res = []
  let stack = []
  root && stack.push(root)
  while (stack.length > 0) {
    let cur = stack.pop()
    res.push(cur.val)
    cur.right && stack.push(cur.right)
    cur.left && stack.push(cur.left)
  }
  return res
}
```

### try..finally

<code>try 中有 return 或 trow 语句的情况会先执行 finally 后将返回值返回出去</code>

```ts
function foo() {
  try {
    return 'Hello'
  } finally {
    console.log('word')
  }
  //以下代码在return和throw的情况下都不会执行
  console.log('never runs')
}
console.log(foo())

// Hello
// 42
```

<code>那如果 try 的代码如下思考输出什么 </code>

```ts
try {
  throw 42;
}
```

<code>重中之重：</code> <br />
<code>finally 中有抛出异常，try 中 return 的返回值会被抛弃，只会抛出异常</code><br />
<code>finally 中有 return，会覆盖 try 和 catch 中的 return 的返回值</code>

```ts
function foo() {
  try {
    return 'hello'
  } finally {
    return 'word'
  }
}

function baz() {
  try {
    return 'hello'
  } finally {
    return
  }
}
foo() // 'word'
baz() // undefined
```

<code>在函数中省略 return 或 return;以及 return undefined; 函数返回值都是 undefined</code>

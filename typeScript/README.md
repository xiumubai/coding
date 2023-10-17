文章：https://juejin.cn/post/7283797053338517545

入门 TypeScript 类型体操

1. keyof 操作符的使用
2. TypeScript 中的映射类型使用，以及映射类型结合as` 关键字的使用
3. extends 条件判断类型的基本使用
4. infer 关键字的使用
5. 通过这些基础知识真实场景改造你现在的代码(用其中一篇文章 函数参数的例子来写)


> 交叉类型在使用的时候有时候会产生一个新的类型 never,一般产生这种情况是两个 interface 使用交叉类型 & 进行处理，在 interface1 中有一个 name:string ,在 interface2 中有一个name:number，对于这种情况最后产生的新 interface ,里面的 name 属性类型会变为 never 类型 。 因为没有一个类型即是 string 类型又是number 类型。

### keyof 操作符

keyof 用于返回对应类型所有 Key 的联合类型。



// 映射类型语法 in

type InExample = 'a' | 'b' | 'c' | 'd';

// 遍历InExample，定义每一个key的类型为string
type Obj = {
  [T in InExample]: string
}


// 上面Obj等价于;
/*
  type Obj = {
    a:string,
    b:string,
    c:string,
    d:string
  }
*/

// 在 Pick 的实现中，{[S in K]:T[S]} 这段实现就有用到映射类型语法,表示遍历类型 K中所有的类型。 T[S] 可以理解为属性访问的语法，用来获取对象类型某个属性对应值的类型。
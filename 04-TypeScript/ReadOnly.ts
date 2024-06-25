// ReadOnly 用于修改类型中属性为只读

type MyReadOnly<T> = { readonly [P in keyof T]: T[P] }


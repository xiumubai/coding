// Extract 用于从联合类型中提取特定类型 跟Exclude相反

type MyExtract<T, K> = T extends K ? K : never

type Type2 = string | number; // 联合类型
type TypeExclude2 = MyExtract<Type2, string>; // string


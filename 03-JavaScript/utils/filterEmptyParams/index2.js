/**
 * 使用reduce方法过滤掉空数组、空字符串、null和undefined，保留false
 */
let formFields = {
  sex: undefined,
  children: [],
  show: false,
  info: null,
  name: "",
  email: "user@example.com",
  age: "",
  address: "123 Main St",
};
const filteredFields = Object.keys(formFields).reduce((acc, key) => {
  const value = formFields[key];
  // 过滤掉空数组、空字符串、null和undefined，保留false
  if (
    value !== "" &&
    value !== null &&
    value !== undefined &&
    !(Array.isArray(value) && value.length === 0)
  ) {
    acc[key] = value;
  }
  return acc;
}, {});

// 打印过滤后的结果
console.log(filteredFields);

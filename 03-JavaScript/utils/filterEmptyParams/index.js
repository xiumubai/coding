/**
 * 过滤值为空的字段
 */
// 假设我们有一个表单对象，其中包含了用户输入的数据
let formFields = {
  sex: undefined,
  children: [],
  show: false,
  info: null,
  name: '',
  email: 'user@example.com',
  age: '',
  address: '123 Main St'
};

// 过滤函数，过滤掉空数组、空字符串、null、undefined，保留false
function filterEmptyValues(formData) {
  // 创建一个新的对象来存储过滤后的数据
  let filteredData = {};

  for (let key in formData) {
      let value = formData[key];

      // 检查值是否为空数组、空字符串、null或undefined
      if (value !== '' && value !== null && value !== undefined && !(Array.isArray(value) && value.length === 0)) {
          // 如果值不是上述情况，则添加到过滤后的数据中
          filteredData[key] = value;
      }
  }

  // 返回过滤后的表单数据
  return filteredData;
}

// 使用过滤函数
let filteredFields = filterEmptyValues(formFields);

// 打印过滤后的结果
console.log(filteredFields);
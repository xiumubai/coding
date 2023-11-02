/*
 * @Author: 朽木白
 * @Date: 2023-11-02 18:46:37
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-11-02 18:50:25
 * @Description: 校验html是否合法
 */

// 方式一

function validateHTML(htmlString) {
  // 创建一个临时的div元素，将HTML字符串赋给它的innerHTML属性
  var tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlString;

  // 检查HTML是否有效
  if (tempDiv.innerHTML === htmlString) {
      return true;
  } else {
      return false;
  }
}

// 要验证的HTML字符串
var htmlToValidate = "<div><h1>Hello, World!</h1></div>";

// 调用验证函数
var isValid = validateHTML(htmlToValidate);

if (isValid) {
  console.log("HTML is valid.");
} else {
  console.log("HTML is not valid.");
}

// 方式二

function validateHTML(htmlString) {
  try {
      var parser = new DOMParser();
      var doc = parser.parseFromString(htmlString, "text/html");
      
      // 检查是否存在语法错误
      if (doc.querySelector('parsererror')) {
          return false; // 存在语法错误
      } else {
          return true; // HTML有效
      }
  } catch (e) {
      return false; // 解析失败，HTML无效
  }
}

// 要验证的HTML字符串
var htmlToValidate = "<html><head><title>Sample HTML</title></head><body><h1>Hello, World!</h1></body></html>";

// 调用验证函数
var isValid = validateHTML(htmlToValidate);

if (isValid) {
  console.log("HTML is valid.");
} else {
  console.log("HTML is not valid.");
}

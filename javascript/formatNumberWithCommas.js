/*
 * @Author: 朽木白
 * @Date: 2023-11-11 21:18:04
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-11-11 21:18:11
 * @Description: 千分位分割
 */

function formatNumberWithCommas(number) {
  // 将数字转换为字符串，并按小数点分割
  const parts = number.toString().split(".");

  // 处理整数部分
  let integerPart = parts[0];
  let formattedInteger = "";
  let count = 0;

  for (let i = integerPart.length - 1; i >= 0; i--) {
    count++;
    formattedInteger = integerPart[i] + formattedInteger;
    if (count % 3 === 0 && i !== 0) {
      formattedInteger = "," + formattedInteger;
    }
  }

  // 处理小数部分
  const decimalPart = parts[1] || "";

  // 返回格式化后的数字
  return formattedInteger + (decimalPart.length > 0 ? "." + decimalPart : "");
}

// 使用示例
const numberWithCommas = formatNumberWithCommas(1234567890.123456);
console.log(numberWithCommas); // 输出 "1,234,567,890.123456"

/**
 * 获取url参数
 * @param {*} url 
 * @returns 
 */
function getURLParams(url) {
  const params = {};
  const queryString = url.split('?')[1];
  const keyValuePairs = queryString.split('&');

  keyValuePairs.forEach(pair => {
      const [key, value] = pair.split('=');
      params[decodeURIComponent(key)] = decodeURIComponent(value || '');
  });

  return params;
}

const url = 'https://example.com?param1=value1&param2=value2';
const params = getURLParams(url);
console.log(params); // 输出: { param1: 'value1', param2: 'value2' }

// 手写JSON.stringify、JSON.parse
if (!window.JSON) {
  window.JSON = {
      parse: function(jsonStr) {
          return eval('(' + jsonStr + ')');
      },
      stringify: function(jsonObj) {
          var result = '',
              curVal;
          if (jsonObj === null) {
              return String(jsonObj);
          }
          switch (typeof jsonObj) {
              case 'number':
              case 'boolean':
                  return String(jsonObj);
              case 'string':
                  return '"' + jsonObj + '"';
              case 'undefined':
              case 'function':
                  return undefined;
          }

          switch (Object.prototype.toString.call(jsonObj)) {
              case '[object Array]':
                  result += '[';
                  for (var i = 0, len = jsonObj.length; i < len; i++) {
                      curVal = JSON.stringify(jsonObj[i]);
                      result += (curVal === undefined ? null : curVal) + ",";
                  }
                  if (result !== '[') {
                      result = result.slice(0, -1);
                  }
                  result += ']';
                  return result;
              case '[object Date]':
                  return '"' + (jsonObj.toJSON ? jsonObj.toJSON() : jsonObj.toString()) + '"';
              case '[object RegExp]':
                  return "{}";
              case '[object Object]':
                  result += '{';
                  for (i in jsonObj) {
                      if (jsonObj.hasOwnProperty(i)) {
                          curVal = JSON.stringify(jsonObj[i]);
                          if (curVal !== undefined) {
                              result += '"' + i + '":' + curVal + ',';
                          }
                      }
                  }
                  if (result !== '{') {
                      result = result.slice(0, -1);
                  }
                  result += '}';
                  return result;

              case '[object String]':
                  return '"' + jsonObj.toString() + '"';
              case '[object Number]':
              case '[object Boolean]':
                  return jsonObj.toString();
          }
      }
  };
}
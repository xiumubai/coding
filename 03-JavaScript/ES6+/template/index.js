// 手写模版引擎
function easyTpl(tpl, data){
  var re = /{{([a-zA-Z$_][a-zA-Z$_0-9\.]*)}}/g;
  return tpl.replace(re, function(raw, key, offset, string){
    var paths = key.split('.'),
        lookup = data;
    while(paths.length>0){
      lookup = lookup[paths.shift()];
    }
    return lookup||raw;
  }); 
}
var data = {
  name: 'rashomon',
  dog: {
      color: 'yellow',
      age: 2
  }
};
var tpl = 'Hello, my name is  {{name}}. I have a {{dog.age}} year old  {{dog.color}} dog.';
console.log(easyTpl(tpl, data));
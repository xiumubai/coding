// 美化打印实现方法
const prettyLog = () => {
  // const isProduction = import.meta.env.MODE === 'production';

  const isEmpty = (value) => {
      return value == null || value === undefined || value === '';
  };
  const prettyPrint = (title, text, color) => {
      // if (isProduction) return;
      console.log(
          `%c ${title} %c ${text} %c`,
          `background:${color};border:1px solid ${color}; padding: 1px; border-radius: 2px 0 0 2px; color: #fff;`,
          `border:1px solid ${color}; padding: 1px; border-radius: 0 2px 2px 0; color: ${color};`,
          'background:transparent'
      );
  };
  const info = (textOrTitle, content = '') => {
      const title = isEmpty(content) ? 'Info' : textOrTitle;
      const text = isEmpty(content) ? textOrTitle : content;
      prettyPrint(title, text, '#909399');
  };
  const error = (textOrTitle, content = '') => {
      const title = isEmpty(content) ? 'Error' : textOrTitle;
      const text = isEmpty(content) ? textOrTitle : content;
      prettyPrint(title, text, '#F56C6C');
  };
  const warning = (textOrTitle, content = '') => {
      const title = isEmpty(content) ? 'Warning' : textOrTitle;
      const text = isEmpty(content) ? textOrTitle : content;
      prettyPrint(title, text, '#E6A23C');
  };
  const success = (textOrTitle, content = '') => {
      const title = isEmpty(content) ? 'Success ' : textOrTitle;
      const text = isEmpty(content) ? textOrTitle : content;
      prettyPrint(title, text, '#67C23A');
  };
  const table = () => {
      const data = [
          { id: 1, name: 'Alice', age: 25 },
          { id: 2, name: 'Bob', age: 30 },
          { id: 3, name: 'Charlie', age: 35 }
      ];
      console.log(
          '%c id%c name%c age',
          'color: white; background-color: black; padding: 2px 10px;',
          'color: white; background-color: black; padding: 2px 10px;',
          'color: white; background-color: black; padding: 2px 10px;'
      );

      data.forEach((row) => {
          console.log(
              `%c ${row.id} %c ${row.name} %c ${row.age} `,
              'color: black; background-color: lightgray; padding: 2px 10px;',
              'color: black; background-color: lightgray; padding: 2px 10px;',
              'color: black; background-color: lightgray; padding: 2px 10px;'
          );
      });
  };

  // retu;
  return {
      info,
      error,
      warning,
      success,
      table
  };
};
// 创建打印对象
const log = prettyLog();

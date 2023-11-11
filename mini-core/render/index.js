/*
 * @Author: 朽木白
 * @Date: 2023-11-01 15:33:07
 * @LastEditors: 1547702880@@qq.com
 * @LastEditTime: 2023-11-01 15:33:10
 * @Description: 虚拟dom转真实dom
 */

const vnode = {
  tag: 'DIV',
  attrs: {
      id: 'app'
  },
  children: [{
      tag: 'SPAN',
      children: [{
          tag: 'A',
          children: []
      }]
  },
  {
      tag: 'SPAN',
      children: [{
          tag: 'A',
          children: []
      },
      {
          tag: 'A',
          children: []
      }
      ]
  }
  ]
}

function render(vnode, container) {
  return container.appendChild(_render(vnode));
}

function _render(vnode) {
  if (typeof vnode === 'number') {
      vnode = String(vnode);
  }
  //处理文本节点
  if (typeof vnode === 'string') {
      const textNode = document.createTextNode(vnode)
      return textNode;
  }
  //处理组件
  if (typeof vnode.tag === 'function') {
      const component = createComponent(vnode.tag, vnode.attrs);
      setComponentProps(component, vnode.attrs);
      return component.base;
  }
  //普通的dom
  const dom = document.createElement(vnode.tag);
  if (vnode.attrs) {
      Object.keys(vnode.attrs).forEach(key => {
          const value = vnode.attrs[key];
          setAttribute(dom, key, value);    // 设置属性
      });
  }
  vnode.children.forEach(child => render(child, dom));    // 递归渲染子节点
  return dom;    // 返回虚拟dom为真正的DOM
}

//实现dom挂载到页面某个元素
const ReactDOM = {
  render: (vnode, container) => {
      container.innerHTML = '';
      return render(vnode, container);
  }
}

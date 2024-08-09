## React组件目录规范

```markdown
.
├── README.md
├── myFirtsPage                 // 一级页面
│   ├── components              // 公共组件
│   │   ├── BasicModel.js
│   │   ├── BasicProgress
│   │   │   ├── index.js
│   │   │   └── index.less
│   │   ├── BasicSearch.js
│   │   └── BasicTable.js
│   ├── details                 // 二级页面
│   │   └── index.js            // 二级页面入口
│   ├── hooks                   // 自定义hooks
│   │   ├── useCount.hooks.js
│   │   └── useTime.hooks.js
│   ├── index.js                // 一级页面入口
│   ├── index.less
│   └── model.js                // 一级页面model数据
├── mySecondPage
│   └── index.js
└── system
    └── index.js
```
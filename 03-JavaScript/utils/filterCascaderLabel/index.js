// antd Cascader 组件中，根据选中的value从options中获取label
const options = [
  {
    "children": [
        {
            "children": [
                {
                    "children": [
                        {
                            "children": [
                                {
                                    "children": [
                                        {
                                            "children": [
                                                {
                                                    "label": "张1",
                                                    "type": 2,
                                                    "value": 833
                                                },
                                                {
                                                    "label": "张2",
                                                    "type": 2,
                                                    "value": 1058
                                                },
                                                {
                                                    "label": "张3",
                                                    "type": 2,
                                                    "value": 4368
                                                },
                                                {
                                                    "label": "张1",
                                                    "type": 2,
                                                    "value": 4679
                                                },
                                            ],
                                            "adminId": "afd5727cff954001b83fbf885e4f5c69",
                                            "label": "中后台组",
                                            "type": 1,
                                            "value": "6874b176748747c2a2c8f9f878316813",
                                            "parentid": "65b4f8f57a9149348c1289ca99067182"
                                        }
                                    ],
                                    "adminId": "bb4f780a879e485e951394f5c07b6a47",
                                    "label": "大前端组",
                                    "type": 1,
                                    "value": "65b4f8f57a9149348c1289ca99067182",
                                    "parentid": "321aef8c5f1849388dd50cac846b9fa2"
                                }
                            ],
                            "adminId": "7a317e5e46014859aa5b82c88f093a45",
                            "label": "四级部门",
                            "type": 1,
                            "value": "321aef8c5f1849388dd50cac846b9fa2",
                            "parentid": "414375a218bf4a84b9e4d3ea1d94ede1"
                        },
                    ],
                    "adminId": "a7eeaaacac364cbf8e640f4c9325d557",
                    "label": "三级部门",
                    "type": 1,
                    "value": "414375a218bf4a84b9e4d3ea1d94ede1",
                    "parentid": "100"
                },
            ],
            "adminId": null,
            "label": "二级部门",
            "type": 1,
            "value": "100",
            "parentid": "-1"
        },
    ],
    "adminId": null,
    "label": "一级部门",
    "type": 1,
    "value": "-1",
    "parentid": "0"
  }
];

// // 根据 value 路径递归查找对应的 label 路径
// const findLabelsByValuePath = (options, valuePath) => {
//   let labels = [];
//   let currentOptions = options;

//   for (const value of valuePath) {
//     const matchedOption = currentOptions.find((option) => option.value === value);
//     if (matchedOption) {
//       labels.push(matchedOption.label);
//       currentOptions = matchedOption.children || []; // 继续深入子节点
//     } else {
//       break; // 如果找不到匹配的节点，终止搜索
//     }
//   }

//   return labels;
// };

// 根据 value 路径递归查找对应的最后一级 label
const findLastLabelByValuePath = (options, valuePath) => {
  let currentOptions = options;
  let lastLabel = null;

  for (const value of valuePath) {
    const matchedOption = currentOptions.find((option) => option.value === value);
    if (matchedOption) {
      lastLabel = matchedOption.label; // 更新最后一个匹配到的 label
      currentOptions = matchedOption.children || []; // 继续深入子节点
    } else {
      break; // 如果找不到匹配的节点，终止搜索
    }
  }

  return lastLabel;
};


const selectedValues = [
  [
    "-1",
    "100",
    "414375a218bf4a84b9e4d3ea1d94ede1",
    "321aef8c5f1849388dd50cac846b9fa2",
    "db2193e49628479184953b69963b02eb",
    "003562ad34ec44568f8a20a996bee7bf",
    4834,
  ],
  [
    "-1",
    "100",
    "414375a218bf4a84b9e4d3ea1d94ede1",
    "68bc8013c2af472b9f202fa62392bdc4",
    "cb075caf5ae9471eb5ba65c36d8356d4",
  ],
  [
    "-1",
    "100",
    "414375a218bf4a84b9e4d3ea1d94ede1",
    "321aef8c5f1849388dd50cac846b9fa2",
    "65b4f8f57a9149348c1289ca99067182",
    "6874b176748747c2a2c8f9f878316813",
    6476,
  ],
];

const selectedLabels = selectedValues.map((valuePath) =>
  findLastLabelByValuePath(options, valuePath)
);

console.log(selectedLabels);

/**
 
把

const parentCompanyIds = [2235]
const parentCompanyNames = ['北京智谱华章科技有限公司']

转化成下方数据

const arr = [
  {
    id: -1,
    companyName: '全部',
    children: [
      {
        id: 2235,
        companyName: '北京智谱华章科技有限公司',
      },
    ]
  }
]

 */


const parentCompanyIds = [2235, 2236, 2237];
const parentCompanyNames = ['北京智谱华章科技有限公司', '北京智谱华章科技有限公司2', '北京智谱华章科技有限公司3'];

const arr = [
  {
    id: -1,
    companyName: '全部',
    children: parentCompanyIds.map((id, index) => ({
      id: id,
      companyName: parentCompanyNames[index]
    }))
  }
];

console.log(JSON.stringify(arr));

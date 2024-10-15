/**

把

const parentCompanyIds = [2235]
const parentCompanyNames = ['北京智谱华章科技有限公司']

转化成下方数据

const arr = [
  {
    lable: '北京智谱华章科技有限公司
    value: 2235
  }
]

 */

const parentCompanyIds = [2235];
const parentCompanyNames = ['北京智谱华章科技有限公司'];

const arr = parentCompanyIds.map((id, index) => ({
  label: parentCompanyNames[index],
  value: id
}));

console.log(arr);

const data = [
	[
		{
			"id": -1,
			"companyName": "全部",
		},
		{
			"companyCode": "C34617781313006",
			"companyTypeEnum": "PERSONAL",
			"level": 1,
			"companyType": 2,
			"companyName": "福佑客户_kfyDlk",
			"companyStatus": 1,
			"levelName": "预付客户",
			"companyStatusDesc": "潜在客户",
			"updateTime": 1621584181000,
			"registerSourceDesc": "专车APP安卓",
			"overdueFlagName": "关闭询价",
			"certificationStatus": 1,
			"registersourceEnum": "ANDROID_SPECIAL",
			"registerSource": 6,
			"companyTypeDesc": "个人",
			"priceShowStyle": 4,
			"priceShowStyleName": "分段展示",
			"createTime": 1621584181000,
			"companyStatusEnum": "POTENTIAL_COMPANY",
			"id": 14368,
			"credit": 0,
			"overdueFlag": 2
		}
	],
	[
		{
			"id": -1,
			"companyName": "全部",
		},
		{
			"companyCode": "C35128806800007",
			"companyTypeEnum": "PERSONAL",
			"level": 1,
			"companyType": 2,
			"companyName": "福佑客户_W354Fy",
			"companyStatus": 1,
			"levelName": "预付客户",
			"companyStatusDesc": "潜在客户",
			"updateTime": 1622095206000,
			"registerSourceDesc": "专车APP安卓",
			"overdueFlagName": "关闭询价",
			"certificationStatus": 1,
			"registersourceEnum": "ANDROID_SPECIAL",
			"registerSource": 6,
			"companyTypeDesc": "个人",
			"priceShowStyle": 4,
			"priceShowStyleName": "分段展示",
			"createTime": 1622095206000,
			"companyStatusEnum": "POTENTIAL_COMPANY",
			"id": 14422,
			"credit": 0,
			"overdueFlag": 2
		}
	]
];

const result = data.flatMap(group => 
	group.filter(item => item.id !== -1)
		.map(({ companyName, id }) => ({ label: companyName, value: id }))
);

console.log(result);

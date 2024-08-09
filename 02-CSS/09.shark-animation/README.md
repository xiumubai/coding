## 扫光效果

- [参考文档](https://mp.weixin.qq.com/s?__biz=Mzg2MDU4MzU3Nw==&mid=2247498828&idx=1&sn=d2ce24c2c498ce392692c335f363f52a&chksm=ce269fbaf95116ac3c4e89da6b09de8134891f63bee355cc98f981424a885ab1f96fbb1da123&mpshare=1&scene=1&srcid=0808uIoHfRqXEkQIXJgyTWqW&sharer_shareinfo=553181c0ebff33c591bdd599c4a13c95&sharer_shareinfo_first=fe0e711973e3afe2ce2e6c2b2b4c1ed6#rd)


```txt
扫光样式本身可以直接用线性渐变绘制而成

扫光动画原理很简单，就是一个水平的位移动画

文本扫光动画需要通过改变background-postion实现

当背景尺寸等于容器尺寸时，设置background-postion百分比无效

普通容器的扫光效果需要借助伪元素实现，因为如果使用背景会被容器内的元素覆盖

普通容器的扫光动画可以直接用transfrom实现

使用overflow:hidden裁剪容器外的部分

不规则图片的扫光效果无法直接根据形状裁剪

借助CSS mask可以根据图片本身裁剪掉扫光多余部分
```

[1] CSS shark animation (codepen.io)： https://codepen.io/xboxyan/pen/KKLLZOE

[2] CSS shark animation (juejin.cn)： https://code.juejin.cn/pen/7385810378132815882
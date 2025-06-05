<script setup>
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
</script>

<template>
  <div class="container">
    <header class="header hairline-bottom">
      <h1 class="title">vw适配方案</h1>
    </header>
    
    <section class="banner">
      <img src="https://pic.rmb.bdstatic.com/bjh/240520/events/5fc2a0f287ebdaf89b2de39cd15584f15957.png" alt="Banner">
    </section>
    
    <section class="features">
      <div class="feature-item">
        <div class="icon">
          <img src="https://img2.baidu.com/it/u=3134235566,1012432277&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500" />
        </div>
        <h3>功能一</h3>
        <p>功能描述文字</p>
      </div>
      <div class="feature-item">
        <div class="icon">
          <img src="https://img1.baidu.com/it/u=1482756505,13267603&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=800" />
        </div>
        <h3>功能二</h3>
        <p>功能描述文字</p>
      </div>
      <div class="feature-item">
        <div class="icon">
          <img src="https://img2.baidu.com/it/u=2286271922,1808777373&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=800" />
        </div>
        <h3>功能三</h3>
        <p>功能描述文字</p>
      </div>
    </section>
    
    <footer class="footer">
      <p>© 2023 vw适配方案示例</p>
    </footer>
  </div>
</template>

<style scoped>
/* 重置样式 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  font-size: 30px; /* 基础字体大小，相当于设计稿中的30px (30/750*100=4) */
  line-height: 1.5;
  color: #333;
}

/* 容器 */
.container {
  width: 100%;
  max-width: 100vw;
  margin: 0 auto;
  padding: 0 30px; /* 左右内边距30px (30/750*100=4) */
}

/* 头部 */
.header {
  height: 100px; /* 100px (100/750*100=13.33) */
  display: flex;
  align-items: center;
  /* border-bottom: 2px solid #eee; 2px (2/750*100=0.27) */
}

.title {
  font-size: 40px; /* 40px (40/750*100=5.33) */
  font-weight: bold;
}

/* Banner */
.banner {
  margin: 30px 0; /* 上下边距30px */
}

.banner img {
  width: 100%;
  height: 400px; /* 400px (400/750*100=53.33) */
  object-fit: cover;
  border-radius: 20px; /* 20px (20/750*100=2.67) */
}

/* 功能区 */
.features {
  display: flex;
  justify-content: space-between;
  margin: 50px 0; /* 50px (50/750*100=6.67) */
}

.feature-item {
  width: 200px; /* 220px (220/750*100=29.33) */
  text-align: center;
}

.icon {
  width: 120px; /* 120px (120/750*100=16) */
  height: 120px; /* 120px */
  background-color: #f5f5f5;
  border-radius: 50%;
  margin: 0 auto 20px; /* 下边距20px */
}

.icon img {
  border-radius: 50%;
  width: 100%; /* 60px (60/750*100=8) */
  height: 100%; /* 60px */
  object-fit: cover;
}
.feature-item h3 {
  font-size: 36px; /* 36px (36/750*100=4.8) */
  margin-bottom: 10px; /* 10px (10/750*100=1.33) */
}

.feature-item p {
  font-size: 28px; /* 28px (28/750*100=3.73) */
  color: #666;
}

/* 页脚 */
.footer {
  padding: 40px 0; /* 40px (40/750*100=5.33) */
  text-align: center;
  border-top: 2px solid #eee; /* 2px */
  font-size: 24px; /* 24px (24/750*100=3.2) */
  color: #999;
}

/* 媒体查询，防止在大屏设备上字体过大 */
@media screen and (min-width: 750px) {
  body {
    font-size: 16px;
  }
  
  .container {
    width: 750px;
    padding: 0 15px;
  }
  
  /* 其他元素也可以在这里设置最大值 */
}

.hairline-bottom {
  position: relative;
}

.hairline-bottom::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 1px;
  background-color: #eee;
  transform: scaleY(0.5);
  transform-origin: 0 100%;
}
</style>

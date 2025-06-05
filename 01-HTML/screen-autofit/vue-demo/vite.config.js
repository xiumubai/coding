import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
// 使用自定义的插件
import postcsspxtoviewportCustom from './postcss-px-to-viewport-custom.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  css: {
    postcss: {
      plugins: [
        postcsspxtoviewportCustom({
          viewportWidth: 375, // UI稿设计比例
          designWidth: 750,   // 实际设计稿宽度
          // viewportHeight: 667,
          unitPrecision: 3,
          viewportUnit: 'vw',
          selectorBlackList: ['.ignore', '.hairlines'],
          minPixelValue: 1,
          mediaQuery: false,
          replace: true,
          exclude: [/node_modules/],
          maxDisplayWidth: 750, // 最大显示宽度
          enableMaxWidth: true  // 启用最大宽度限制
        })
      ]
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})

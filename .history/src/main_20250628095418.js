import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

function initVendors() {
  // 1. SimpleBar：初始化所有 data-simplebar 元素
  if (window.SimpleBar) {
    document.querySelectorAll('[data-simplebar]').forEach(el => {
      // 防止重复 new
      if (!el.SimpleBarInitialized) {
        new window.SimpleBar(el)
        el.SimpleBarInitialized = true
      }
    })
  }

  // 2. AnchorJS：给 h1~h3 添加锚点
  if (window.AnchorJS) {
    const anchors = new window.AnchorJS()
    anchors.add('h1, h2, h3')
  }

  // 3. theme.js 里的初始化
  if (window.initTheme) {
    window.initTheme()
  }

  // 4. 其它按需扩展……
  //    ECharts：如果页面里有 <div class="echart" data-chart-options="…">
  document.querySelectorAll('.echart').forEach(el => {
    try {
      const options = JSON.parse(el.dataset.chartOptions || '{}')
      if (!el._echart) {
        el._echart = window.echarts.init(el)
      }
      el._echart.setOption(options)
    } catch (e) {
      console.warn('图表初始化失败', e)
    }
  })
}

// 创建 Vue 应用
const app = createApp(App)
app.use(router)

// 全局路由切换后，等待 DOM 更新完毕再 initVendors
router.afterEach((to, from) => {
  nextTick(() => {
    initVendors()
  })
})

// 首次加载也手动跑一次
router.isReady().then(() => {
  initVendors()
  app.mount('#app')
})

// createApp(App)
//   .use(router)
//   .mount('#app')

import { createApp, nextTick } from 'vue'
import App from './App.vue'
import router from './router'

// 把所有你想“每次重新跑一次”的脚本 URL 都放这里
const RELOADABLE_SCRIPTS = [
  '../public/js/config.js',
  '../public/js/simplebar.min.js',
  '../public/js/popper.min.js',
  '../public/js/bootstrap.min.js',
  '../public/js/anchor.min.js',
  '../public/js/is.min.js',
  '../public/js/echarts.min.js',
  '../public/js/dayjs.min.js',
  '../public/js/all.min.js',
  '../public/js/lodash.min.js',
  '../public/js/list.min.js',
  '../public/js/theme.js',
  '../public/js/chart.umd.js',
  '../public/js/countUp.umd.js',
  '../public/js/d3.min.js',
  '../public/js/echarts-example.js',
  '../public/js/echarts.min.js',
  '../public/js/flatpickr.min.js',
  '../public/js/index.global.min.js',
  '../public/js/leaflet-tilelayer-colorfilter.min.js',
  '../public/js/leaflet.markercluster.js',
  '../public/js/prism.js',
]

/**
 * 删除所有带 data-reloadable 的 <script>，
 * 然后按顺序重新插入一份新的同 src <script>，
 * 强制浏览器重新执行它们里的顶层代码。
 */
function reloadScripts() {
  // 1) 删掉旧的
  document.querySelectorAll('script[data-reloadable]').forEach(el => el.remove())
  // 2) 按顺序插入新的，浏览器会重新执行它们
  RELOADABLE_SCRIPTS.forEach(src => {
    const s = document.createElement('script')
    s.setAttribute('data-reloadable', '')
    s.src = src
    s.async = false  // 保证按数组顺序执行
    document.body.appendChild(s)
  })
}

// 创建并挂载 Vue
const app = createApp(App)
app.use(router)

// 每次路由切换后，等 DOM 更新完再重载脚本
router.afterEach(() => nextTick(reloadScripts))

// 首次加载也跑一次，然后挂载
router.isReady().then(() => {
  reloadScripts()
  app.mount('#app')
})

// createApp(App)
//   .use(router)
//   .mount('#app')

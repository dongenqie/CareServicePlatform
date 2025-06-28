import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// 把所有你想“每次重新跑一次”的脚本 URL 都放这里
const RELOADABLE_SCRIPTS = [
  '/js/config.js',
  '/js/simplebar.min.js',
  '/js/popper.min.js',
  '/js/bootstrap.min.js',
  '/js/anchor.min.js',
  '/js/is.min.js',
  '/js/echarts.min.js',
  '/js/dayjs.min.js',
  '/js/all.min.js',
  '/js/lodash.min.js',
  '/js/list.min.js',
  '/js/theme.js'
]

/**
 * 删除所有带 data-reloadable 的 <script>，
 * 然后按顺序重新插入一份新的同 src <script>，
 * 强制浏览器重新执行它们里的顶层代码。
 */
function reloadScripts() {
  // 1. 删除旧的
  document.querySelectorAll('script[data-reloadable]').forEach(el => el.remove())

  // 2. 依次插入新的
  RELOADABLE_SCRIPTS.forEach(src => {
    const s = document.createElement('script')
    s.setAttribute('data-reloadable', '')
    s.src = src
    s.async = false    // 保证按顺序执行
    document.body.appendChild(s)
  })
}

// 创建并挂载 Vue
const app = createApp(App)
app.use(router)

// 路由切换后，等视图渲染完再重载脚本
router.afterEach((to, from) => {
  nextTick(reloadScripts)
})

// 首次加载也要跑一次（因为 index.html 上的 script 只跑了“打标记”的那批）
router.isReady().then(() => {
  reloadScripts()
  app.mount('#app')
})

// createApp(App)
//   .use(router)
//   .mount('#app')

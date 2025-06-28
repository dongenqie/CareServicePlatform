import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/js/vendors/popper/popper.min.js'
import '@/assets/js/vendors/bootstrap/bootstrap.min.js'
import '@/assets/js/vendors/anchorjs/anchor.min.js'
import '@/assets/js/vendors/is/is.min.js'
import '@/assets/js/vendors/echarts/echarts.min.js'
import '@/assets/js/vendors/fontawesome/all.min.js'
import '@/assets/js/vendors/lodash/lodash.min.js'
import '@/assets/js/vendors/list.js/list.min.js'
import '@/assets/js/theme.js'

createApp(App)
  .use(router)
  .mount('#app')

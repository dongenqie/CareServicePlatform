import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/theme.min.css';
import './assets/css/user.min.css';
import './assets/js/vendors/simplebar/simplebar.min.css';
import 'https://fonts.googleapis.com/css?family=Open+Sans:300,400,500,600,700|Poppins:300,400,500,600,700,800,900&display=swap';

createApp(App)
  .use(router)
  .mount('#app')

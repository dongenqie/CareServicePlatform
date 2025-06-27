import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login/Login.vue'
import Resgister from '../views/Login/Register.vue'
import ForgotPassword from '../views/Login/ForgotPassword.vue'
import Logout from '../views/Login/Logout.vue'
import Dashboard from '../views/Dashboard/Dashboard.vue'


const routes = [
  {path: '/', name: 'Home', component: Home},
  {path: '/login', name: 'Login', component: Login},
  {path: '/register', name: 'Register', component: Register},
  {path: '/forgotPassword', name: 'ForgotPassword', component: ForgotPassword},
  {path: '/logout', name: 'Logout', component: Logout},
  {path: '/dashboard', name: 'Dashboard', component: Dashboard},

]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router

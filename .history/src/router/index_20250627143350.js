import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login/Login.vue'
import Resgister from '../views/Login/Register.vue'
import ForgotPassword from '../views/Login/ForgotPassword.vue'
import Logout from '../views/Login/Logout.vue'




const routes = [
  {path: '/', name: 'Home', component: Home},
  {path: '/login', name: 'Login', component: Login},
  {path: '/register', name: 'Resgister', component: Resgister},
  {path: '/forgotPassword', name: 'ForgotPassword', component: ForgotPassword},
  {path: '/logout', name: 'Logout', component: Logout},


]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router

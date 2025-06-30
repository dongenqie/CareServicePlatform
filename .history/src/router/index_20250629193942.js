import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login/Login.vue'
import Register from '../views/Login/Register.vue'
import ForgotPassword from '../views/Login/ForgotPassword.vue'
import Logout from '../views/Login/Logout.vue'
import Dashboard from '../views/Dashboard/Dashboard.vue'
import Calendar from '../views/Dashboard/Calendar/Calendar.vue'
import CreateAnEvent from '../views/Dashboard/Calendar/CreateAnEvent.vue'
import EventDetail from '../views/Dashboard/Calendar/EventDetail.vue'
import EventList from '../views/Dashboard/Calendar/EventList.vue'
import Logs from '../views/LogsAndMonitor/Logs.vue'
import Monitor from '../views/LogsAndMonitor/Monitor.vue'
import Chat from '../views/Chat/Chat.vue'
import OperationReview from '../views/Review/OperationReview.vue'
import UserReview from '../views/Review/UserReview.vue'

const routes = [
  {path: '/', name: 'Home', component: Home},
  {path: '/login', name: 'Login', component: Login},
  {path: '/register', name: 'Register', component: Register},
  {path: '/forgotPassword', name: 'ForgotPassword', component: ForgotPassword},
  {path: '/logout', name: 'Logout', component: Logout},
  {path: '/dashboard', name: 'Dashboard', component: Dashboard},
  {path: '/calendar', name: 'Calendar', component: Calendar},
  {path: '/createAnEvent', name: 'CreateAnEvent', component: CreateAnEvent},
  {path: '/eventDetail', name: 'EventDetail', component: EventDetail},
  {path: '/eventList', name: 'EventList', component: EventList},
  {path: '/logs', name: 'Logs', component: Logs},
  {path: '/monitor', name: 'Monitor', component: Monitor},
  {path: '/chat', name: 'Chat', component: Chat},
  {path: '/operationReview', name: 'OperationReviewat', component: OperationReview},
  {path: '/userReview', name: 'UserReview', component: UserReview},

]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router

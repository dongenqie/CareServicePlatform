import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login/Login.vue'
import Register from '../views/Login/Register.vue'
import ForgotPassword from '../views/Login/ForgotPassword.vue'
import Logout from '../views/Login/Logout.vue'
import Dashboard from '../views/Dashboard/Dashboard.vue'
import UserDefined from '../views/Dashboard/UserDefined.vue'
import Drap from '../views/Dashboard/Drap.vue'
import Institution from '../views/Dashboard/Institution.vue'
import HospitalType from '../views/Dashboard/HospitalType.vue'
import HospitalGrade from '../views/Dashboard/HospitalGrade.vue'
import MedicalExpenses from '../views/Dashboard/MedicalExpenses.vue'
import HospitalNumber from '../views/Dashboard/HospitalNumber.vue'

import Calendar from '../views/Calendar/Calendar.vue'
import CreateAnEvent from '../views/Calendar/CreateAnEvent.vue'
import EventDetail from '../views/Calendar/EventDetail.vue'
import EventList from '../views/Calendar/EventList.vue'
import Logs from '../views/LogsAndMonitor/Logs.vue'
import Monitor from '../views/LogsAndMonitor/Monitor.vue'
import Chat from '../views/Chat/Chat.vue'
import OperationReview from '../views/Review/OperationReview.vue'
import UserReview from '../views/Review/UserReview.vue'
import DescriptiveStatistics from '../views/Analysis/DescriptiveStatistics.vue'
import ComparativeAnalysis from '../views/Analysis/ComparativeAnalysis.vue'
import CorrelationAnalysis from '../views/Analysis/CorrelationAnalysis.vue'
import TrendAnalysis from '../views/Analysis/TrendAnalysis.vue'



const routes = [
  {path: '/', name: 'Home', component: Home},
  {path: '/login', name: 'Login', component: Login},
  {path: '/register', name: 'Register', component: Register},
  {path: '/forgotPassword', name: 'ForgotPassword', component: ForgotPassword},
  {path: '/logout', name: 'Logout', component: Logout},
  {path: '/dashboard', name: 'Dashboard', component: Dashboard},
  {path: '/userDefined', name: 'UserDefined', component: UserDefined},
  {path: '/drap', name: 'Drap', component: Drap},
  {path: '/institution', name: 'Institution', component: Institution},
  {path: '/hospitalType', name: 'HospitalType', component: HospitalType},
  {path: '/hospitalGrade', name: 'HospitalGrade', component: HospitalGrade},
  {path: '/medicalExpenses', name: 'MedicalExpenses', component: MedicalExpenses},
  {path: '/hospitalNumber', name: 'HospitalNumber', component: HospitalNumber},
  {path: '/calendar', name: 'Calendar', component: Calendar},
  {path: '/createAnEvent', name: 'CreateAnEvent', component: CreateAnEvent},
  {path: '/eventDetail', name: 'EventDetail', component: EventDetail},
  {path: '/eventList', name: 'EventList', component: EventList},
  {path: '/logs', name: 'Logs', component: Logs},
  {path: '/monitor', name: 'Monitor', component: Monitor},
  {path: '/chat', name: 'Chat', component: Chat},
  {path: '/operationReview', name: 'OperationReviewat', component: OperationReview},
  {path: '/userReview', name: 'UserReview', component: UserReview},
  {path: '/descriptiveStatistics', name: 'DescriptiveStatistics', component: DescriptiveStatistics},
  {path: '/comparativeAnalysis', name: 'ComparativeAnalysis', component: ComparativeAnalysis},
  {path: '/correlationAnalysis', name: 'CorrelationAnalysis', component: CorrelationAnalysis},
  {path: '/trendAnalysis', name: 'TrendAnalysis', component: TrendAnalysis},

]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router

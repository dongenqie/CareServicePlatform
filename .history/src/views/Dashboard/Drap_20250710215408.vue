<script setup>
import { onMounted, ref,computed } from 'vue'
import { useRouter } from 'vue-router'
import { defineOptions } from 'vue'
import { sendMessageToDeepSeek } from '@/api/deepseek'

// 声明组件名
defineOptions({ name: 'Drap' })

// 从 localStorage 取得当前用户角色
const role = ref(localStorage.getItem('userRole') || '')

// 路由跳转方法
const router = useRouter()
function goToDashboard()               { router.push({ name: 'Dashboard' }) }
function goToUserDefined()             { router.push({ name: 'UserDefined' }) }
function goToDrap()                    { router.push({ name: 'Drap' }) }
function goToInstitution()             { router.push({ name: 'Institution' }) }
function goToHospitalType()            { router.push({ name: 'HospitalType' }) }
function goToHospitalGrade()           { router.push({ name: 'HospitalGrade' }) }
function goToMedicalExpenses()         { router.push({ name: 'MedicalExpenses' }) }
function goToHospitalNumber()          { router.push({ name: 'HospitalNumber' }) }
function goToLogout()                  { router.push({ name: 'Logout' }) }
function goToPersonalCenter()          { router.push({ name: 'PersonalCenter' }) }

// —— AI 辅助相关状态
const aiInput = ref('')
const aiResponse = ref('')
const isChatLoading = ref(false)

// 发送消息到 DeepSeek
async function sendMessage() {
  if (!aiInput.value.trim()) return;
  isChatLoading.value = true;
  try {
    const reply = await sendMessageToDeepSeek(aiInput.value);
    aiResponse.value = reply;
  } catch (e) {
    aiResponse.value = `错误：${e.message}`;
  } finally {
    isChatLoading.value = false;
  }
}

onMounted(() => {
  // 1. RTL
  const isRTL = JSON.parse(localStorage.getItem('isRTL'))
  if (isRTL) {
    const linkDefault   = document.getElementById('style-default')
    const userLinkDefault = document.getElementById('user-style-default')
    if (linkDefault)   linkDefault.disabled = true
    if (userLinkDefault) userLinkDefault.disabled = true
    document.documentElement.setAttribute('dir', 'rtl')
  } else {
    const linkRTL       = document.getElementById('style-rtl')
    const userLinkRTL   = document.getElementById('user-style-rtl')
    if (linkRTL)       linkRTL.disabled = true
    if (userLinkRTL)   userLinkRTL.disabled = true
  }

  // 2. Fluid 布局
  const isFluid = JSON.parse(localStorage.getItem('isFluid'))
  if (isFluid) {
    const container = document.querySelector('[data-layout]')
    if (container) {
      container.classList.remove('container')
      container.classList.add('container-fluid')
    }
  }

  // 3. Navbar 风格
  const navbarStyle = localStorage.getItem('navbarStyle')
  if (navbarStyle && navbarStyle !== 'transparent') {
    const navVert = document.querySelector('.navbar-vertical')
    if (navVert) navVert.classList.add(`navbar-${navbarStyle}`)
  }

  // 4. Navbar 位置
  const navbarPosition = localStorage.getItem('navbarPosition') || ''
  const navVertical    = document.querySelector('.navbar-vertical')
  const navTopVertical = document.querySelector('.content .navbar-top')
  const navTop         = document.querySelector('[data-layout] .navbar-top:not([data-double-top-nav])')
  const navDoubleTop   = document.querySelector('[data-double-top-nav]')
  const navTopCombo    = document.querySelector('.content [data-navbar-top="combo"]')

  if (navbarPosition === 'double-top') {
    document.documentElement.classList.add('double-top-nav-layout')
  }

  const safeRemove = el => el && el.remove()
  const safeShow   = el => el && el.removeAttribute('style')

  if (navbarPosition === 'top') {
    safeShow(navTop)
    safeRemove(navTopVertical)
    safeRemove(navVertical)
    safeRemove(navTopCombo)
    safeRemove(navDoubleTop)
  } else if (navbarPosition === 'combo') {
    safeShow(navVertical)
    safeShow(navTopCombo)
    safeRemove(navTop)
    safeRemove(navTopVertical)
    safeRemove(navDoubleTop)
  } else if (navbarPosition === 'double-top') {
    safeShow(navDoubleTop)
    safeRemove(navTop)
    safeRemove(navTopVertical)
    safeRemove(navVertical)
    safeRemove(navTopCombo)
  } else {
    // 默认 vertical
    safeShow(navVertical)
    safeShow(navTopVertical)
    safeRemove(navTop)
    safeRemove(navDoubleTop)
    safeRemove(navTopCombo)
  }
})
</script>
<template>
  <!-- ===============================================--><!--    Main Content--><!-- ===============================================-->
  <main class="main" id="top">
    <div class="container" data-layout="container">
      <!--左边侧边栏-->
      <nav class="navbar navbar-light navbar-vertical navbar-expand-xl" style="display: none;">
        <!--侧边栏上部-->
        <div class="d-flex align-items-center">
          <div class="toggle-icon-wrapper">
            <button class="btn navbar-toggler-humburger-icon navbar-vertical-toggle" data-bs-toggle="tooltip" data-bs-placement="left" title="Toggle Navigation"><span class="navbar-toggle-icon"><span class="toggle-line"></span></span></button>
          </div><a class="navbar-brand" href="">
            <div class="d-flex align-items-center py-3">
              <img class="me-2" src="../../assets/img/logo.png" alt="" width="40" />
              <span class="font-sans-serif text-primary">数据中心</span></div>
          </a>
        </div>
        <!--侧边导航栏-->
        <div class="collapse navbar-collapse" id="navbarVerticalCollapse">
          <div class="navbar-vertical-content scrollbar">
            <ul class="navbar-nav flex-column mb-3" id="navbarVerticalNav">
              <!--数据展示-->
              <li class="nav-item">
                  <!-- parent pages-->
                  <a class="nav-link dropdown-indicator" href="" role="button" data-bs-toggle="collapse" aria-expanded="true" aria-controls="dashboard">
                      <div class="d-flex align-items-center"><span class="nav-link-icon"><span class="fas fa-chart-pie"></span></span><span class="nav-link-text ps-1">数据展示</span></div>
                  </a>
                  <ul class="nav collapse show" id="dashboard">
                    <li class="nav-item">
                      <a class="nav-link active" @click="goToDashboard" href="">
                          <div class="d-flex align-items-center"><span class="nav-link-text ps-1">默认首页</span></div>
                      </a><!-- more inner pages-->
                    </li>
                    <li class="nav-item"><a class="nav-link" @click="goToUserDefined" href="">
                          <div class="d-flex align-items-center"><span class="nav-link-text ps-1">用户自定义仪表盘</span></div>
                      </a><!-- more inner pages-->
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" @click="goToDrap" href="">
                          <div class="d-flex align-items-center"><span class="nav-link-text ps-1">组件拖拽演示</span></div>
                      </a><!-- more inner pages-->
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" @click="goToInstitution" href="">
                          <div class="d-flex align-items-center"><span class="nav-link-text ps-1">全国医疗卫生机构</span></div>
                      </a><!-- more inner pages-->
                    </li>
                      <li class="nav-item"><a class="nav-link" @click="goToHospitalType" href="">
                          <div class="d-flex align-items-center"><span class="nav-link-text ps-1">医院类型</span></div>
                      </a><!-- more inner pages--></li>
                      <li class="nav-item"><a class="nav-link" @click="goToHospitalGrade" href="">
                          <div class="d-flex align-items-center"><span class="nav-link-text ps-1">医院等级</span></div>
                      </a><!-- more inner pages--></li>
                      <li class="nav-item"><a class="nav-link" @click="goToMedicalExpenses" href="">
                          <div class="d-flex align-items-center"><span class="nav-link-text ps-1">医疗费用</span></div>
                      </a><!-- more inner pages--></li>
                      <li class="nav-item"><a class="nav-link" @click="goToHospitalNumber" href="">
                          <div class="d-flex align-items-center"><span class="nav-link-text ps-1">各省医院总数量</span><span class="badge rounded-pill ms-2 badge-subtle-success">New</span></div>
                      </a><!-- more inner pages--></li>
                      <li class="nav-item"><a class="nav-link" @click="goToPersonalCenter" href="">
                          <div class="d-flex align-items-center"><span class="nav-link-text ps-1">个人中心</span></div>
                      </a><!-- more inner pages--></li>
                  </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <!--右边内容区上部-->
      <nav class="navbar navbar-light navbar-glass navbar-top navbar-expand-lg" style="display: none;">
        <button class="btn navbar-toggler-humburger-icon navbar-toggler me-1 me-sm-3" type="button" data-bs-toggle="collapse" data-bs-target="#navbarStandard" aria-controls="navbarStandard" aria-expanded="false" aria-label="Toggle Navigation"><span class="navbar-toggle-icon"><span class="toggle-line"></span></span></button>
        <a class="navbar-brand me-1 me-sm-3" href="">
          <div class="d-flex align-items-center"><img class="me-2" src="" alt="" width="40" /><span class="font-sans-serif text-primary">falcon</span></div>
        </a>
        <div class="collapse navbar-collapse scrollbar" id="navbarStandard">
          <ul class="navbar-nav" data-top-nav-dropdowns="data-top-nav-dropdowns">
            <li class="nav-item dropdown"><a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" id="dashboards">Dashboard</a>
              <div class="dropdown-menu dropdown-caret dropdown-menu-card border-0 mt-0" aria-labelledby="dashboards">
                <div class="bg-white dark__bg-1000 rounded-3 py-2">
                  <a class="dropdown-item link-600 fw-medium" href="">Default</a><a class="dropdown-item link-600 fw-medium" href="dashboard/analytics.html">Analytics</a>
                  <a class="dropdown-item link-600 fw-medium" href="">CRM</a>
                  <a class="dropdown-item link-600 fw-medium" href="">E commerce</a>
                  <a class="dropdown-item link-600 fw-medium" href="">LMS</a>
                  <a class="dropdown-item link-600 fw-medium" href="">Management</a>
                  <a class="dropdown-item link-600 fw-medium" href="">SaaS</a>
                  <a class="dropdown-item link-600 fw-medium" href="">Support desk</a></div>
              </div>
            </li>
            <li class="nav-item dropdown"><a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" id="apps">App</a>
              <div class="dropdown-menu dropdown-caret dropdown-menu-card border-0 mt-0" aria-labelledby="apps">
                <div class="card navbar-card-app shadow-none dark__bg-1000">
                  <div class="card-body scrollbar max-h-dropdown"><img class="img-dropdown" src="" width="130" alt="" />
                    <div class="row">
                      <div class="col-6 col-md-4">
                        <div class="nav flex-column"><a class="nav-link py-1 link-600 fw-medium" href="app/calendar.html">Calendar</a><a class="nav-link py-1 link-600 fw-medium" href="app/chat.html">Chat</a><a class="nav-link py-1 link-600 fw-medium" href="app/kanban.html">Kanban</a>
                          <p class="nav-link text-700 mb-0 fw-bold">Social</p><a class="nav-link py-1 link-600 fw-medium" href="app/social/feed.html">Feed</a><a class="nav-link py-1 link-600 fw-medium" href="app/social/activity-log.html">Activity log</a><a class="nav-link py-1 link-600 fw-medium" href="app/social/notifications.html">Notifications</a><a class="nav-link py-1 link-600 fw-medium" href="app/social/followers.html">Followers</a>
                          <p class="nav-link text-700 mb-0 fw-bold">Support Desk</p><a class="nav-link py-1 link-600 fw-medium" href="app/support-desk/table-view.html">Table view</a><a class="nav-link py-1 link-600 fw-medium" href="app/support-desk/card-view.html">Card view</a><a class="nav-link py-1 link-600 fw-medium" href="app/support-desk/contacts.html">Contacts</a><a class="nav-link py-1 link-600 fw-medium" href="app/support-desk/contact-details.html">Contact details</a><a class="nav-link py-1 link-600 fw-medium" href="app/support-desk/tickets-preview.html">Tickets preview</a><a class="nav-link py-1 link-600 fw-medium" href="app/support-desk/quick-links.html">Quick links</a>
                        </div>
                      </div>
                      <div class="col-6 col-md-4">
                        <div class="nav flex-column">
                          <p class="nav-link text-700 mb-0 fw-bold">E-Learning</p><a class="nav-link py-1 link-600 fw-medium" href="app/e-learning/course/course-list.html">Course list</a><a class="nav-link py-1 link-600 fw-medium" href="app/e-learning/course/course-grid.html">Course grid</a><a class="nav-link py-1 link-600 fw-medium" href="app/e-learning/course/course-details.html">Course details</a><a class="nav-link py-1 link-600 fw-medium" href="app/e-learning/course/create-a-course.html">Create a course</a><a class="nav-link py-1 link-600 fw-medium" href="app/e-learning/student-overview.html">Student overview</a><a class="nav-link py-1 link-600 fw-medium" href="app/e-learning/trainer-profile.html">Trainer profile</a>
                          <p class="nav-link text-700 mb-0 fw-bold">Events</p><a class="nav-link py-1 link-600 fw-medium" href="app/events/create-an-event.html">Create an event</a><a class="nav-link py-1 link-600 fw-medium" href="app/events/event-detail.html">Event detail</a><a class="nav-link py-1 link-600 fw-medium" href="app/events/event-list.html">Event list</a>
                          <p class="nav-link text-700 mb-0 fw-bold">Email</p><a class="nav-link py-1 link-600 fw-medium" href="app/email/inbox.html">Inbox</a><a class="nav-link py-1 link-600 fw-medium" href="app/email/email-detail.html">Email detail</a><a class="nav-link py-1 link-600 fw-medium" href="app/email/compose.html">Compose</a>
                        </div>
                      </div>
                      <div class="col-6 col-md-4">
                        <div class="nav flex-column">
                          <p class="nav-link text-700 mb-0 fw-bold">E-Commerce</p><a class="nav-link py-1 link-600 fw-medium" href="app/e-commerce/product/product-list.html">Product list</a><a class="nav-link py-1 link-600 fw-medium" href="app/e-commerce/product/product-grid.html">Product grid</a><a class="nav-link py-1 link-600 fw-medium" href="app/e-commerce/product/product-details.html">Product details</a><a class="nav-link py-1 link-600 fw-medium" href="app/e-commerce/product/add-product.html">Add product</a><a class="nav-link py-1 link-600 fw-medium" href="app/e-commerce/orders/order-list.html">Order list</a><a class="nav-link py-1 link-600 fw-medium" href="app/e-commerce/orders/order-details.html">Order details</a><a class="nav-link py-1 link-600 fw-medium" href="app/e-commerce/customers.html">Customers</a><a class="nav-link py-1 link-600 fw-medium" href="app/e-commerce/customer-details.html">Customer details</a><a class="nav-link py-1 link-600 fw-medium" href="app/e-commerce/shopping-cart.html">Shopping cart</a><a class="nav-link py-1 link-600 fw-medium" href="app/e-commerce/checkout.html">Checkout</a><a class="nav-link py-1 link-600 fw-medium" href="app/e-commerce/billing.html">Billing</a><a class="nav-link py-1 link-600 fw-medium" href="app/e-commerce/invoice.html">Invoice</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li class="nav-item dropdown"><a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" id="pagess">Pages</a>
              <div class="dropdown-menu dropdown-caret dropdown-menu-card border-0 mt-0" aria-labelledby="pagess">
                <div class="card navbar-card-pages shadow-none dark__bg-1000">
                  <div class="card-body scrollbar max-h-dropdown"><img class="img-dropdown" src="" width="130" alt="" />
                    <div class="row">
                      <div class="col-6 col-xxl-3">
                        <div class="nav flex-column">
                          <p class="nav-link text-700 mb-0 fw-bold">Simple Auth</p><a class="nav-link py-1 link-600 fw-medium" href="pages/authentication/simple/login.html">Login</a><a class="nav-link py-1 link-600 fw-medium" @click="goToLogout">Logout</a><a class="nav-link py-1 link-600 fw-medium" href="pages/authentication/simple/register.html">Register</a><a class="nav-link py-1 link-600 fw-medium" href="pages/authentication/simple/forgot-password.html">Forgot password</a><a class="nav-link py-1 link-600 fw-medium" href="pages/authentication/simple/confirm-mail.html">Confirm mail</a><a class="nav-link py-1 link-600 fw-medium" href="pages/authentication/simple/reset-password.html">Reset password</a><a class="nav-link py-1 link-600 fw-medium" href="pages/authentication/simple/lock-screen.html">Lock screen</a>
                        </div>
                      </div>
                      <div class="col-6 col-xxl-3">
                        <div class="nav flex-column">
                          <p class="nav-link text-700 mb-0 fw-bold">Card Auth</p><a class="nav-link py-1 link-600 fw-medium" href="pages/authentication/card/login.html">Login</a><a class="nav-link py-1 link-600 fw-medium" @click="goToLogout">Logout</a><a class="nav-link py-1 link-600 fw-medium" href="pages/authentication/card/register.html">Register</a><a class="nav-link py-1 link-600 fw-medium" href="pages/authentication/card/forgot-password.html">Forgot password</a><a class="nav-link py-1 link-600 fw-medium" href="pages/authentication/card/confirm-mail.html">Confirm mail</a><a class="nav-link py-1 link-600 fw-medium" href="pages/authentication/card/reset-password.html">Reset password</a><a class="nav-link py-1 link-600 fw-medium" href="pages/authentication/card/lock-screen.html">Lock screen</a>
                        </div>
                      </div>
                      <div class="col-6 col-xxl-3">
                        <div class="nav flex-column">
                          <p class="nav-link text-700 mb-0 fw-bold">Split Auth</p><a class="nav-link py-1 link-600 fw-medium" href="pages/authentication/split/login.html">Login</a><a class="nav-link py-1 link-600 fw-medium" @click="goToLogout">Logout</a><a class="nav-link py-1 link-600 fw-medium" href="pages/authentication/split/register.html">Register</a><a class="nav-link py-1 link-600 fw-medium" href="pages/authentication/split/forgot-password.html">Forgot password</a><a class="nav-link py-1 link-600 fw-medium" href="pages/authentication/split/confirm-mail.html">Confirm mail</a><a class="nav-link py-1 link-600 fw-medium" href="pages/authentication/split/reset-password.html">Reset password</a><a class="nav-link py-1 link-600 fw-medium" href="pages/authentication/split/lock-screen.html">Lock screen</a>
                        </div>
                      </div>
                      <div class="col-6 col-xxl-3">
                        <div class="nav flex-column">
                          <p class="nav-link text-700 mb-0 fw-bold">Layouts</p><a class="nav-link py-1 link-600 fw-medium" href="">Navbar vertical</a>
                          <a class="nav-link py-1 link-600 fw-medium" href="demo/navbar-top.html">Top nav</a><a class="nav-link py-1 link-600 fw-medium" href="">Double top</a>
                          <a class="nav-link py-1 link-600 fw-medium" href="">Combo nav</a>
                          <p class="nav-link text-700 mb-0 fw-bold">Others</p><a class="nav-link py-1 link-600 fw-medium" href="">Starter</a><a class="nav-link py-1 link-600 fw-medium" href="pages/landing.html">Landing</a>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-6 col-xxl-3">
                        <div class="nav flex-column">
                          <p class="nav-link text-700 mb-0 fw-bold">User</p><a class="nav-link py-1 link-600 fw-medium" href="">Profile</a><a class="nav-link py-1 link-600 fw-medium" href="pages/user/settings.html">Settings</a>
                        </div>
                      </div>
                      <div class="col-6 col-xxl-3">
                        <div class="nav flex-column">
                          <p class="nav-link text-700 mb-0 fw-bold">Pricing</p><a class="nav-link py-1 link-600 fw-medium" href="">Pricing default</a><a class="nav-link py-1 link-600 fw-medium" href="pages/pricing/pricing-alt.html">Pricing alt</a>
                        </div>
                      </div>
                      <div class="col-6 col-xxl-3">
                        <div class="nav flex-column">
                          <p class="nav-link text-700 mb-0 fw-bold">Errors</p><a class="nav-link py-1 link-600 fw-medium" href="">404</a><a class="nav-link py-1 link-600 fw-medium" href="pages/errors/500.html">500</a>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-6 col-xxl-3">
                        <div class="nav flex-column">
                          <p class="nav-link text-700 mb-0 fw-bold">Miscellaneous</p><a class="nav-link py-1 link-600 fw-medium" href="">Associations</a>
                          <a class="nav-link py-1 link-600 fw-medium" href="">Invite people</a><a class="nav-link py-1 link-600 fw-medium" href="">Privacy policy</a>
                        </div>
                      </div>
                      <div class="col-6 col-xxl-3">
                        <div class="nav flex-column">
                          <p class="nav-link text-700 mb-0 fw-bold">FAQ</p><a class="nav-link py-1 link-600 fw-medium" href="">Faq basic</a><a class="nav-link py-1 link-600 fw-medium" href="">Faq alt</a><a class="nav-link py-1 link-600 fw-medium" href="pages/faq/faq-accordion.html">Faq accordion</a>
                        </div>
                      </div>
                      <div class="col-6 col-xxl-3">
                        <div class="nav flex-column">
                          <p class="nav-link text-700 mb-0 fw-bold">Other Auth</p><a class="nav-link py-1 link-600 fw-medium" href="">Wizard</a><a class="nav-link py-1 link-600 fw-medium" href="#authentication-modal" data-bs-toggle="modal">Modal</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li class="nav-item dropdown"><a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" id="moduless">Modules</a>
              <div class="dropdown-menu dropdown-caret dropdown-menu-card border-0 mt-0" aria-labelledby="moduless">
                <div class="card navbar-card-components shadow-none dark__bg-1000">
                  <div class="card-body scrollbar max-h-dropdown"><img class="img-dropdown" src="" width="130" alt="" />
                    <div class="row">
                      <div class="col-6 col-xxl-3">
                        <div class="nav flex-column">
                          <p class="nav-link text-700 mb-0 fw-bold">Components</p>
                          <a class="nav-link py-1 link-600 fw-medium" href="">Accordion</a>
                          <a class="nav-link py-1 link-600 fw-medium" href="">Alerts</a>
                          <a class="nav-link py-1 link-600 fw-medium" href="">Anchor</a>
                          <a class="nav-link py-1 link-600 fw-medium" href="">Animated icons</a>
                          <a class="nav-link py-1 link-600 fw-medium" href="">Background</a>
                          <a class="nav-link py-1 link-600 fw-medium" href="">Badges</a>
                          <a class="nav-link py-1 link-600 fw-medium" href="">Bottom bar</a>
                          <a class="nav-link py-1 link-600 fw-medium" href="">Breadcrumbs</a>
                          <a class="nav-link py-1 link-600 fw-medium" href="">Buttons</a>
                          <a class="nav-link py-1 link-600 fw-medium" href="">Calendar</a>
                          <a class="nav-link py-1 link-600 fw-medium" href="">Cards</a>
                          <a class="nav-link py-1 link-600 fw-medium" href="">Bootstrap carousel</a>
                        </div>
                      </div>
                      <div class="col-6 col-xxl-3">
                        <div class="nav flex-column mt-md-4 pt-md-1"><a class="nav-link py-1 link-600 fw-medium" href="modules/components/carousel/swiper.html">Swiper</a><a class="nav-link py-1 link-600 fw-medium" href="modules/components/collapse.html">Collapse</a><a class="nav-link py-1 link-600 fw-medium" href="modules/components/cookie-notice.html">Cookie notice</a><a class="nav-link py-1 link-600 fw-medium" href="modules/components/countup.html">Countup</a><a class="nav-link py-1 link-600 fw-medium" href="modules/components/dropdowns.html">Dropdowns</a><a class="nav-link py-1 link-600 fw-medium" href="modules/components/jquery-components.html">Jquery<span class="badge rounded-pill ms-2 badge-subtle-success">New</span></a><a class="nav-link py-1 link-600 fw-medium" href="modules/components/list-group.html">List group</a><a class="nav-link py-1 link-600 fw-medium" href="modules/components/modals.html">Modals</a><a class="nav-link py-1 link-600 fw-medium" href="modules/components/navs-and-tabs/navs.html">Navs</a><a class="nav-link py-1 link-600 fw-medium" href="modules/components/navs-and-tabs/navbar.html">Navbar</a><a class="nav-link py-1 link-600 fw-medium" href="modules/components/navs-and-tabs/vertical-navbar.html">Navbar vertical</a><a class="nav-link py-1 link-600 fw-medium" href="modules/components/navs-and-tabs/top-navbar.html">Top nav</a></div>
                      </div>
                      <div class="col-6 col-xxl-3">
                        <div class="nav flex-column mt-xxl-4 pt-xxl-1"><a class="nav-link py-1 link-600 fw-medium" href="modules/components/navs-and-tabs/double-top-navbar.html">Double top<span class="badge rounded-pill ms-2 badge-subtle-success">New</span></a><a class="nav-link py-1 link-600 fw-medium" href="modules/components/navs-and-tabs/combo-navbar.html">Combo nav</a><a class="nav-link py-1 link-600 fw-medium" href="modules/components/navs-and-tabs/tabs.html">Tabs</a><a class="nav-link py-1 link-600 fw-medium" href="modules/components/offcanvas.html">Offcanvas</a><a class="nav-link py-1 link-600 fw-medium" href="modules/components/pictures/avatar.html">Avatar</a><a class="nav-link py-1 link-600 fw-medium" href="modules/components/pictures/images.html">Images</a><a class="nav-link py-1 link-600 fw-medium" href="modules/components/pictures/figures.html">Figures</a><a class="nav-link py-1 link-600 fw-medium" href="modules/components/pictures/hoverbox.html">Hoverbox</a><a class="nav-link py-1 link-600 fw-medium" href="modules/components/pictures/lightbox.html">Lightbox</a><a class="nav-link py-1 link-600 fw-medium" href="modules/components/progress-bar.html">Progress bar</a><a class="nav-link py-1 link-600 fw-medium" href="modules/components/placeholder.html">Placeholder</a><a class="nav-link py-1 link-600 fw-medium" href="modules/components/pagination.html">Pagination</a></div>
                      </div>
                      <div class="col-6 col-xxl-3">
                        <div class="nav flex-column mt-xxl-4 pt-xxl-1"><a class="nav-link py-1 link-600 fw-medium" href="modules/components/popovers.html">Popovers</a><a class="nav-link py-1 link-600 fw-medium" href="modules/components/scrollspy.html">Scrollspy</a><a class="nav-link py-1 link-600 fw-medium" href="modules/components/search.html">Search</a><a class="nav-link py-1 link-600 fw-medium" href="modules/components/sortable.html">Sortable</a><a class="nav-link py-1 link-600 fw-medium" href="modules/components/spinners.html">Spinners</a><a class="nav-link py-1 link-600 fw-medium" href="modules/components/timeline.html">Timeline</a><a class="nav-link py-1 link-600 fw-medium" href="modules/components/toasts.html">Toasts</a><a class="nav-link py-1 link-600 fw-medium" href="modules/components/tooltips.html">Tooltips</a><a class="nav-link py-1 link-600 fw-medium" href="modules/components/treeview.html">Treeview</a><a class="nav-link py-1 link-600 fw-medium" href="modules/components/typed-text.html">Typed text</a><a class="nav-link py-1 link-600 fw-medium" href="modules/components/videos/embed.html">Embed</a><a class="nav-link py-1 link-600 fw-medium" href="modules/components/videos/plyr.html">Plyr</a></div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-6 col-xxl-3">
                        <div class="nav flex-column">
                          <p class="nav-link text-700 mb-0 fw-bold">Utilities</p><a class="nav-link py-1 link-600 fw-medium" href="modules/utilities/background.html">Background</a><a class="nav-link py-1 link-600 fw-medium" href="modules/utilities/borders.html">Borders</a><a class="nav-link py-1 link-600 fw-medium" href="modules/utilities/clearfix.html">Clearfix</a><a class="nav-link py-1 link-600 fw-medium" href="modules/utilities/colors.html">Colors</a><a class="nav-link py-1 link-600 fw-medium" href="modules/utilities/colored-links.html">Colored links</a><a class="nav-link py-1 link-600 fw-medium" href="modules/utilities/display.html">Display</a><a class="nav-link py-1 link-600 fw-medium" href="modules/utilities/flex.html">Flex</a><a class="nav-link py-1 link-600 fw-medium" href="modules/utilities/float.html">Float</a><a class="nav-link py-1 link-600 fw-medium" href="modules/utilities/focus-ring.html">Focus ring</a><a class="nav-link py-1 link-600 fw-medium" href="modules/utilities/grid.html">Grid</a><a class="nav-link py-1 link-600 fw-medium" href="modules/utilities/icon-link.html">Icon link</a><a class="nav-link py-1 link-600 fw-medium" href="modules/utilities/overlayscrollbar.html">Overlay scrollbar</a><a class="nav-link py-1 link-600 fw-medium" href="modules/utilities/position.html">Position</a><a class="nav-link py-1 link-600 fw-medium" href="modules/utilities/ratio.html">Ratio</a><a class="nav-link py-1 link-600 fw-medium" href="modules/utilities/spacing.html">Spacing</a><a class="nav-link py-1 link-600 fw-medium" href="modules/utilities/sizing.html">Sizing</a><a class="nav-link py-1 link-600 fw-medium" href="modules/utilities/stretched-link.html">Stretched link</a><a class="nav-link py-1 link-600 fw-medium" href="modules/utilities/text-truncation.html">Text truncation</a><a class="nav-link py-1 link-600 fw-medium" href="modules/utilities/typography.html">Typography</a><a class="nav-link py-1 link-600 fw-medium" href="modules/utilities/vertical-align.html">Vertical align</a><a class="nav-link py-1 link-600 fw-medium" href="modules/utilities/vertical-rule.html">Vertical rule</a><a class="nav-link py-1 link-600 fw-medium" href="modules/utilities/visibility.html">Visibility</a>
                        </div>
                      </div>
                      <div class="col-6 col-xxl-3">
                        <div class="nav flex-column">
                          <p class="nav-link text-700 mb-0 fw-bold">Tables</p><a class="nav-link py-1 link-600 fw-medium" href="modules/tables/basic-tables.html">Basic tables</a><a class="nav-link py-1 link-600 fw-medium" href="modules/tables/advance-tables.html">Advance tables</a><a class="nav-link py-1 link-600 fw-medium" href="modules/tables/bulk-select.html">Bulk select</a>
                          <p class="nav-link text-700 mb-0 fw-bold">Charts</p><a class="nav-link py-1 link-600 fw-medium" href="modules/charts/chartjs.html">Chartjs</a><a class="nav-link py-1 link-600 fw-medium" href="modules/charts/d3js.html">D3js<span class="badge rounded-pill ms-2 badge-subtle-success">New</span></a>
                          <p class="nav-link text-700 mb-0 fw-bold">ECharts</p><a class="nav-link py-1 link-600 fw-medium" href="modules/charts/echarts/line-charts.html">Line charts</a><a class="nav-link py-1 link-600 fw-medium" href="modules/charts/echarts/bar-charts.html">Bar charts</a><a class="nav-link py-1 link-600 fw-medium" href="modules/charts/echarts/candlestick-charts.html">Candlestick charts</a><a class="nav-link py-1 link-600 fw-medium" href="modules/charts/echarts/geo-map.html">Geo map</a><a class="nav-link py-1 link-600 fw-medium" href="modules/charts/echarts/scatter-charts.html">Scatter charts</a><a class="nav-link py-1 link-600 fw-medium" href="modules/charts/echarts/pie-charts.html">Pie charts</a><a class="nav-link py-1 link-600 fw-medium" href="modules/charts/echarts/gauge-charts.html">Gauge charts</a><a class="nav-link py-1 link-600 fw-medium" href="modules/charts/echarts/radar-charts.html">Radar charts</a><a class="nav-link py-1 link-600 fw-medium" href="modules/charts/echarts/heatmap-charts.html">Heatmap charts</a><a class="nav-link py-1 link-600 fw-medium" href="modules/charts/echarts/how-to-use.html">How to use</a>
                        </div>
                      </div>
                      <div class="col-6 col-xxl-3">
                        <div class="nav flex-column">
                          <p class="nav-link text-700 mb-0 fw-bold">Forms</p><a class="nav-link py-1 link-600 fw-medium" href="modules/forms/basic/form-control.html">Form control</a><a class="nav-link py-1 link-600 fw-medium" href="modules/forms/basic/input-group.html">Input group</a><a class="nav-link py-1 link-600 fw-medium" href="modules/forms/basic/select.html">Select</a><a class="nav-link py-1 link-600 fw-medium" href="modules/forms/basic/checks.html">Checks</a><a class="nav-link py-1 link-600 fw-medium" href="modules/forms/basic/range.html">Range</a><a class="nav-link py-1 link-600 fw-medium" href="modules/forms/basic/layout.html">Layout</a><a class="nav-link py-1 link-600 fw-medium" href="modules/forms/advance/advance-select.html">Advance select</a><a class="nav-link py-1 link-600 fw-medium" href="modules/forms/advance/date-picker.html">Date picker</a><a class="nav-link py-1 link-600 fw-medium" href="modules/forms/advance/editor.html">Editor</a><a class="nav-link py-1 link-600 fw-medium" href="modules/forms/advance/emoji-button.html">Emoji button</a><a class="nav-link py-1 link-600 fw-medium" href="modules/forms/advance/file-uploader.html">File uploader</a><a class="nav-link py-1 link-600 fw-medium" href="modules/forms/advance/input-mask.html">Input mask</a><a class="nav-link py-1 link-600 fw-medium" href="modules/forms/advance/range-slider.html">Range slider</a><a class="nav-link py-1 link-600 fw-medium" href="modules/forms/advance/rating.html">Rating</a><a class="nav-link py-1 link-600 fw-medium" href="modules/forms/floating-labels.html">Floating labels</a><a class="nav-link py-1 link-600 fw-medium" href="modules/forms/wizard.html">Wizard</a><a class="nav-link py-1 link-600 fw-medium" href="modules/forms/validation.html">Validation</a>
                        </div>
                      </div>
                      <div class="col-6 col-xxl-3">
                        <div class="nav flex-column pt-xxl-1">
                          <p class="nav-link text-700 mb-0 fw-bold">Icons</p><a class="nav-link py-1 link-600 fw-medium" href="modules/icons/font-awesome.html">Font awesome</a><a class="nav-link py-1 link-600 fw-medium" href="modules/icons/bootstrap-icons.html">Bootstrap icons</a><a class="nav-link py-1 link-600 fw-medium" href="modules/icons/feather.html">Feather</a><a class="nav-link py-1 link-600 fw-medium" href="modules/icons/material-icons.html">Material icons</a>
                          <p class="nav-link text-700 mb-0 fw-bold">Maps</p><a class="nav-link py-1 link-600 fw-medium" href="modules/maps/google-map.html">Google map</a><a class="nav-link py-1 link-600 fw-medium" href="modules/maps/leaflet-map.html">Leaflet map</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li class="nav-item dropdown"><a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" id="documentations">Documentation</a>
              <div class="dropdown-menu dropdown-caret dropdown-menu-card border-0 mt-0" aria-labelledby="documentations">
                <div class="bg-white dark__bg-1000 rounded-3 py-2"><a class="dropdown-item link-600 fw-medium" href="documentation/getting-started.html">Getting started</a><a class="dropdown-item link-600 fw-medium" href="documentation/customization/configuration.html">Configuration</a><a class="dropdown-item link-600 fw-medium" href="documentation/customization/styling.html">Styling<span class="badge rounded-pill ms-2 badge-subtle-success">Updated</span></a><a class="dropdown-item link-600 fw-medium" href="documentation/customization/dark-mode.html">Dark mode</a><a class="dropdown-item link-600 fw-medium" href="documentation/customization/plugin.html">Plugin</a><a class="dropdown-item link-600 fw-medium" href="documentation/faq.html">Faq</a><a class="dropdown-item link-600 fw-medium" href="documentation/gulp.html">Gulp</a><a class="dropdown-item link-600 fw-medium" href="documentation/design-file.html">Design file</a><a class="dropdown-item link-600 fw-medium" href="changelog.html">Changelog</a></div>
              </div>
            </li>
          </ul>
        </div>
      </nav>
      <!--右边内容区（右边导航栏在这）-->
      <div class="content">
        <nav class="navbar navbar-light navbar-glass navbar-top navbar-expand" style="display: none;">
          <button class="btn navbar-toggler-humburger-icon navbar-toggler me-1 me-sm-3" type="button" data-bs-toggle="collapse" data-bs-target="#navbarVerticalCollapse" aria-controls="navbarVerticalCollapse" aria-expanded="false" aria-label="Toggle Navigation"><span class="navbar-toggle-icon"><span class="toggle-line"></span></span></button>
          <a class="navbar-brand me-1 me-sm-3" href="">
            <div class="d-flex align-items-center"><img class="me-2" src="" alt="" width="40" /><span class="font-sans-serif text-primary">falcon</span></div>
          </a>
          <ul class="navbar-nav align-items-center d-none d-lg-block">
            <li class="nav-item">
              <div class="search-box" data-list='{"valueNames":["title"]}'>
                <form class="position-relative" data-bs-toggle="search" data-bs-display="static"><input class="form-control search-input fuzzy-search" type="search" placeholder="Search..." aria-label="Search" />
                  <span class="fas fa-search search-box-icon"></span>
                </form>
                <div class="btn-close-falcon-container position-absolute end-0 top-50 translate-middle shadow-none" data-bs-dismiss="search"><button class="btn btn-link btn-close-falcon p-0" aria-label="Close"></button></div>
                <div class="dropdown-menu border font-base start-0 mt-2 py-0 overflow-hidden w-100">
                  <div class="scrollbar list py-3" style="max-height: 24rem;">
                    <h6 class="dropdown-header fw-medium text-uppercase px-x1 fs-11 pt-0 pb-2">Recently Browsed</h6><a class="dropdown-item fs-10 px-x1 py-1 hover-primary" href="app/events/event-detail.html">
                      <div class="d-flex align-items-center">
                        <span class="fas fa-circle me-2 text-300 fs-11"></span>
                        <div class="fw-normal title">Pages <span class="fas fa-chevron-right mx-1 text-500 fs-11" data-fa-transform="shrink-2"></span> Events</div>
                      </div>
                    </a>
                    <a class="dropdown-item fs-10 px-x1 py-1 hover-primary" href="app/e-commerce/customers.html">
                      <div class="d-flex align-items-center">
                        <span class="fas fa-circle me-2 text-300 fs-11"></span>
                        <div class="fw-normal title">E-commerce <span class="fas fa-chevron-right mx-1 text-500 fs-11" data-fa-transform="shrink-2"></span> Customers</div>
                      </div>
                    </a>
                    <hr class="text-200 dark__text-900" />
                    <h6 class="dropdown-header fw-medium text-uppercase px-x1 fs-11 pt-0 pb-2">Suggested Filter</h6><a class="dropdown-item px-x1 py-1 fs-9" href="app/e-commerce/customers.html">
                      <div class="d-flex align-items-center"><span class="badge fw-medium text-decoration-none me-2 badge-subtle-warning">customers:</span>
                        <div class="flex-1 fs-10 title">All customers list</div>
                      </div>
                    </a>
                    <a class="dropdown-item px-x1 py-1 fs-9" href="app/events/event-detail.html">
                      <div class="d-flex align-items-center"><span class="badge fw-medium text-decoration-none me-2 badge-subtle-success">events:</span>
                        <div class="flex-1 fs-10 title">Latest events in current month</div>
                      </div>
                    </a>
                    <a class="dropdown-item px-x1 py-1 fs-9" href="app/e-commerce/product/product-grid.html">
                      <div class="d-flex align-items-center"><span class="badge fw-medium text-decoration-none me-2 badge-subtle-info">products:</span>
                        <div class="flex-1 fs-10 title">Most popular products</div>
                      </div>
                    </a>
                    <hr class="text-200 dark__text-900" />
                    <h6 class="dropdown-header fw-medium text-uppercase px-x1 fs-11 pt-0 pb-2">Files</h6><a class="dropdown-item px-x1 py-2" href="#!">
                      <div class="d-flex align-items-center">
                        <div class="file-thumbnail me-2"><img class="border h-100 w-100 object-fit-cover rounded-3" src="" alt="" /></div>
                        <div class="flex-1">
                          <h6 class="mb-0 title">iPhone</h6>
                          <p class="fs-11 mb-0 d-flex"><span class="fw-semi-bold">Antony</span><span class="fw-medium text-600 ms-2">27 Sep at 10:30 AM</span></p>
                        </div>
                      </div>
                    </a>
                    <a class="dropdown-item px-x1 py-2" href="#!">
                      <div class="d-flex align-items-center">
                        <div class="file-thumbnail me-2"><img class="img-fluid" src="" alt="" /></div>
                        <div class="flex-1">
                          <h6 class="mb-0 title">Falcon v1.8.2</h6>
                          <p class="fs-11 mb-0 d-flex"><span class="fw-semi-bold">John</span><span class="fw-medium text-600 ms-2">30 Sep at 12:30 PM</span></p>
                        </div>
                      </div>
                    </a>
                    <hr class="text-200 dark__text-900" />
                    <h6 class="dropdown-header fw-medium text-uppercase px-x1 fs-11 pt-0 pb-2">Members</h6><a class="dropdown-item px-x1 py-2" href="pages/user/profile.html">
                      <div class="d-flex align-items-center">
                        <div class="avatar avatar-l status-online me-2">
                          <img class="rounded-circle" src="" alt="" />
                        </div>
                        <div class="flex-1">
                          <h6 class="mb-0 title">Anna Karinina</h6>
                          <p class="fs-11 mb-0 d-flex">Technext Limited</p>
                        </div>
                      </div>
                    </a>
                    <a class="dropdown-item px-x1 py-2" href="pages/user/profile.html">
                      <div class="d-flex align-items-center">
                        <div class="avatar avatar-l me-2">
                          <img class="rounded-circle" src="" alt="" />
                        </div>
                        <div class="flex-1">
                          <h6 class="mb-0 title">Antony Hopkins</h6>
                          <p class="fs-11 mb-0 d-flex">Brain Trust</p>
                        </div>
                      </div>
                    </a>
                    <a class="dropdown-item px-x1 py-2" href="pages/user/profile.html">
                      <div class="d-flex align-items-center">
                        <div class="avatar avatar-l me-2">
                          <img class="rounded-circle" src="" alt="" />
                        </div>
                        <div class="flex-1">
                          <h6 class="mb-0 title">Emma Watson</h6>
                          <p class="fs-11 mb-0 d-flex">Google</p>
                        </div>
                      </div>
                    </a>
                  </div>
                  <div class="text-center mt-n3">
                    <p class="fallback fw-bold fs-8 d-none">No Result Found.</p>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <ul class="navbar-nav navbar-nav-icons ms-auto flex-row align-items-center">
            <li class="nav-item ps-2 pe-0">
              <div class="dropdown theme-control-dropdown"><a class="nav-link d-flex align-items-center dropdown-toggle fa-icon-wait fs-9 pe-1 py-0" href="#" role="button" id="themeSwitchDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span class="fas fa-sun fs-7" data-fa-transform="shrink-2" data-theme-dropdown-toggle-icon="light"></span><span class="fas fa-moon fs-7" data-fa-transform="shrink-3" data-theme-dropdown-toggle-icon="dark"></span><span class="fas fa-adjust fs-7" data-fa-transform="shrink-2" data-theme-dropdown-toggle-icon="auto"></span></a>
                <div class="dropdown-menu dropdown-menu-end dropdown-caret border py-0 mt-3" aria-labelledby="themeSwitchDropdown">
                  <div class="bg-white dark__bg-1000 rounded-2 py-2"><button class="dropdown-item d-flex align-items-center gap-2" type="button" value="light" data-theme-control="theme"><span class="fas fa-sun"></span>Light<span class="fas fa-check dropdown-check-icon ms-auto text-600"></span></button><button class="dropdown-item d-flex align-items-center gap-2" type="button" value="dark" data-theme-control="theme"><span class="fas fa-moon" data-fa-transform=""></span>Dark<span class="fas fa-check dropdown-check-icon ms-auto text-600"></span></button><button class="dropdown-item d-flex align-items-center gap-2" type="button" value="auto" data-theme-control="theme"><span class="fas fa-adjust" data-fa-transform=""></span>Auto<span class="fas fa-check dropdown-check-icon ms-auto text-600"></span></button></div>
                </div>
              </div>
            </li>
            <!--消息通知-->
            <li class="nav-item dropdown">
              <a class="nav-link notification-indicator notification-indicator-primary px-0 fa-icon-wait" id="navbarDropdownNotification" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-hide-on-body-scroll="data-hide-on-body-scroll">
                <span class="fas fa-bell" data-fa-transform="shrink-6" style="font-size: 33px;"></span>
              </a>
              <div class="dropdown-menu dropdown-caret dropdown-caret dropdown-menu-end dropdown-menu-card dropdown-menu-notification dropdown-caret-bg" aria-labelledby="navbarDropdownNotification">
                <div class="card card-notification shadow-none">
                  <div class="card-header">
                    <div class="row justify-content-between align-items-center">
                      <div class="col-auto">
                        <h6 class="card-header-title mb-0">通知</h6>
                      </div>
                      <div class="col-auto ps-0 ps-sm-3"><a class="card-link fw-normal" href="#">标为已读</a></div>
                    </div>
                  </div>
                  <div class="scrollbar-overlay" style="max-height:19rem">
                    <div class="list-group list-group-flush fw-normal fs-10">
                      <div class="list-group-title border-bottom">NEW</div>
                      <div class="list-group-item">
                        <a class="notification notification-flush notification-unread" href="#!">
                          <div class="notification-avatar">
                            <div class="avatar avatar-2xl me-3">
                              <img class="rounded-circle" src="../../assets/img/profile/1.jpg" alt="" />
                            </div>
                          </div>
                          <div class="notification-body">
                            <p class="mb-1"><strong>泽泽</strong> 咨询了管理员 : "数据展示能否自定义仪表盘？"</p>
                            <span class="notification-time"><span class="me-2" role="img" aria-label="Emoji">💬</span>2025/6/29 15:38</span>
                          </div>
                        </a>
                      </div>
                      <div class="list-group-item">
                        <a class="notification notification-flush notification-unread" href="#!">
                          <div class="notification-avatar">
                            <div class="avatar avatar-2xl me-3">
                              <div class="avatar-name rounded-circle"><span>AB</span></div>
                            </div>
                          </div>
                          <div class="notification-body">
                            <p class="mb-1"><strong>Albert Brooks</strong> reacted to <strong>Mia Khalifa's</strong> status</p>
                            <span class="notification-time"><span class="me-2 fab fa-gratipay text-danger"></span>9hr</span>
                          </div>
                        </a>
                      </div>
                      <div class="list-group-title border-bottom">EARLIER</div>
                      <div class="list-group-item">
                        <a class="notification notification-flush" href="#!">
                          <div class="notification-avatar">
                            <div class="avatar avatar-2xl me-3">
                              <img class="rounded-circle" src="../../assets/img/profile/2.jpg" alt="" />
                            </div>
                          </div>
                          <div class="notification-body">
                            <p class="mb-1">The forecast today shows a low of 20&#8451; in California. See today's weather.</p>
                            <span class="notification-time"><span class="me-2" role="img" aria-label="Emoji">🌤️</span>1d</span>
                          </div>
                        </a>
                      </div>
                      <div class="list-group-item">
                        <a class="border-bottom-0 notification-unread  notification notification-flush" href="#!">
                          <div class="notification-avatar">
                            <div class="avatar avatar-xl me-3">
                              <img class="rounded-circle" src="../../assets/img/profile/3.jpg" alt="" />
                            </div>
                          </div>
                          <div class="notification-body">
                            <p class="mb-1"><strong>University of Oxford</strong> created an event : "Causal Inference Hilary 2019"</p>
                            <span class="notification-time"><span class="me-2" role="img" aria-label="Emoji">✌️</span>1w</span>
                          </div>
                        </a>
                      </div>
                      <div class="list-group-item">
                        <a class="border-bottom-0 notification notification-flush" href="#!">
                          <div class="notification-avatar">
                            <div class="avatar avatar-xl me-3">
                              <img class="rounded-circle" src="../../assets/img/profile/4.jpg" alt="" />
                            </div>
                          </div>
                          <div class="notification-body">
                            <p class="mb-1"><strong>James Cameron</strong> invited to join the group: United Nations International Children's Fund</p>
                            <span class="notification-time"><span class="me-2" role="img" aria-label="Emoji">🙋‍</span>2d</span>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div class="card-footer text-center border-top"><a class="card-link d-block" href="app/social/notifications.html">View all</a></div>
                </div>
              </div>
            </li>
            <!--社交网络-->
            <li class="nav-item dropdown ">
              <a class="nav-link fa-icon-wait nine-dots p-1" id="navbarDropdownMenu" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-hide-on-body-scroll="data-hide-on-body-scroll">
                <svg class="svg-inline--fa fa-comments fa-w-18" data-fa-transform="shrink-6" style="font-size: 33px;transform-origin: 0.5625em 0.5em;" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="comments" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg="">
                  <g transform="translate(288 256)">
                    <g transform="translate(0, 0)  scale(0.625, 0.625)  rotate(0 0 0)"><path fill="currentColor" d="M416 192c0-88.4-93.1-160-208-160S0 103.6 0 192c0 34.3 14.1 65.9 38 92-13.4 30.2-35.5 54.2-35.8 54.5-2.2 2.3-2.8 5.7-1.5 8.7S4.8 352 8 352c36.6 0 66.9-12.3 88.7-25 32.2 15.7 70.3 25 111.3 25 114.9 0 208-71.6 208-160zm122 220c23.9-26 38-57.7 38-92 0-66.9-53.5-124.2-129.3-148.1.9 6.6 1.3 13.3 1.3 20.1 0 105.9-107.7 192-240 192-10.8 0-21.3-.8-31.7-1.9C207.8 439.6 281.8 480 368 480c41 0 79.1-9.2 111.3-25 21.8 12.7 52.1 25 88.7 25 3.2 0 6.1-1.9 7.3-4.8 1.3-2.9.7-6.3-1.5-8.7-.3-.3-22.4-24.2-35.8-54.5z" transform="translate(-288 -256)"></path>
                    </g>
                  </g>
                </svg>
              </a>
              <div class="dropdown-menu dropdown-caret dropdown-caret dropdown-menu-end dropdown-menu-card dropdown-caret-bg" aria-labelledby="navbarDropdownMenu">
                <div class="card shadow-none">
                  <div class="scrollbar-overlay nine-dots-dropdown">
                    <div class="card-body px-3">
                      <div class="row text-center gx-0 gy-0">
                        <div class="col-4"><a class="d-block hover-bg-200 px-2 py-3 rounded-3 text-center text-decoration-none" href="pages/user/profile.html" target="_blank">
                            <div class="avatar avatar-2xl"> <img class="rounded-circle" src="" alt="" /></div>
                            <p class="mb-0 fw-medium text-800 text-truncate fs-11">Account</p>
                          </a></div>
                        <div class="col-4"><a class="d-block hover-bg-200 px-2 py-3 rounded-3 text-center text-decoration-none" href="https://themewagon.com/" target="_blank"><img class="rounded" src="" alt="" width="40" height="40" />
                            <p class="mb-0 fw-medium text-800 text-truncate fs-11 pt-1">Themewagon</p>
                          </a></div>
                        <div class="col-4"><a class="d-block hover-bg-200 px-2 py-3 rounded-3 text-center text-decoration-none" href="https://mailbluster.com/" target="_blank"><img class="rounded" src="" alt="" width="40" height="40" />
                            <p class="mb-0 fw-medium text-800 text-truncate fs-11 pt-1">Mailbluster</p>
                          </a></div>
                        <div class="col-4"><a class="d-block hover-bg-200 px-2 py-3 rounded-3 text-center text-decoration-none" href="#!" target="_blank"><img class="rounded" src="" alt="" width="40" height="40" />
                            <p class="mb-0 fw-medium text-800 text-truncate fs-11 pt-1">Google</p>
                          </a></div>
                        <div class="col-4"><a class="d-block hover-bg-200 px-2 py-3 rounded-3 text-center text-decoration-none" href="#!" target="_blank"><img class="rounded" src="" alt="" width="40" height="40" />
                            <p class="mb-0 fw-medium text-800 text-truncate fs-11 pt-1">Spotify</p>
                          </a></div>
                        <div class="col-4"><a class="d-block hover-bg-200 px-2 py-3 rounded-3 text-center text-decoration-none" href="#!" target="_blank"><img class="rounded" src="" alt="" width="40" height="40" />
                            <p class="mb-0 fw-medium text-800 text-truncate fs-11 pt-1">Steam</p>
                          </a></div>
                        <div class="col-4"><a class="d-block hover-bg-200 px-2 py-3 rounded-3 text-center text-decoration-none" href="#!" target="_blank"><img class="rounded" src="" alt="" width="40" height="40" />
                            <p class="mb-0 fw-medium text-800 text-truncate fs-11 pt-1">Github</p>
                          </a></div>
                        <div class="col-4"><a class="d-block hover-bg-200 px-2 py-3 rounded-3 text-center text-decoration-none" href="#!" target="_blank"><img class="rounded" src="" alt="" width="40" height="40" />
                            <p class="mb-0 fw-medium text-800 text-truncate fs-11 pt-1">Discord</p>
                          </a></div>
                        <div class="col-4"><a class="d-block hover-bg-200 px-2 py-3 rounded-3 text-center text-decoration-none" href="#!" target="_blank"><img class="rounded" src="" alt="" width="40" height="40" />
                            <p class="mb-0 fw-medium text-800 text-truncate fs-11 pt-1">xbox</p>
                          </a></div>
                        <div class="col-4"><a class="d-block hover-bg-200 px-2 py-3 rounded-3 text-center text-decoration-none" href="#!" target="_blank"><img class="rounded" src="" alt="" width="40" height="40" />
                            <p class="mb-0 fw-medium text-800 text-truncate fs-11 pt-1">Kanban</p>
                          </a></div>
                        <div class="col-4"><a class="d-block hover-bg-200 px-2 py-3 rounded-3 text-center text-decoration-none" href="#!" target="_blank"><img class="rounded" src="" alt="" width="40" height="40" />
                            <p class="mb-0 fw-medium text-800 text-truncate fs-11 pt-1">Hp</p>
                          </a></div>
                        <div class="col-12">
                          <hr class="my-3 mx-n3 bg-200" />
                        </div>
                        <div class="col-4"><a class="d-block hover-bg-200 px-2 py-3 rounded-3 text-center text-decoration-none" href="#!" target="_blank"><img class="rounded" src="" alt="" width="40" height="40" />
                            <p class="mb-0 fw-medium text-800 text-truncate fs-11 pt-1">Linkedin</p>
                          </a></div>
                        <div class="col-4"><a class="d-block hover-bg-200 px-2 py-3 rounded-3 text-center text-decoration-none" href="#!" target="_blank"><img class="rounded" src="" alt="" width="40" height="40" />
                            <p class="mb-0 fw-medium text-800 text-truncate fs-11 pt-1">Twitter</p>
                          </a></div>
                        <div class="col-4"><a class="d-block hover-bg-200 px-2 py-3 rounded-3 text-center text-decoration-none" href="#!" target="_blank"><img class="rounded" src="" alt="" width="40" height="40" />
                            <p class="mb-0 fw-medium text-800 text-truncate fs-11 pt-1">Facebook</p>
                          </a></div>
                        <div class="col-4"><a class="d-block hover-bg-200 px-2 py-3 rounded-3 text-center text-decoration-none" href="#!" target="_blank"><img class="rounded" src="" alt="" width="40" height="40" />
                            <p class="mb-0 fw-medium text-800 text-truncate fs-11 pt-1">Instagram</p>
                          </a></div>
                        <div class="col-4"><a class="d-block hover-bg-200 px-2 py-3 rounded-3 text-center text-decoration-none" href="#!" target="_blank"><img class="rounded" src="" alt="" width="40" height="40" />
                            <p class="mb-0 fw-medium text-800 text-truncate fs-11 pt-1">Pinterest</p>
                          </a></div>
                        <div class="col-4"><a class="d-block hover-bg-200 px-2 py-3 rounded-3 text-center text-decoration-none" href="#!" target="_blank"><img class="rounded" src="" alt="" width="40" height="40" />
                            <p class="mb-0 fw-medium text-800 text-truncate fs-11 pt-1">Slack</p>
                          </a></div>
                        <div class="col-4"><a class="d-block hover-bg-200 px-2 py-3 rounded-3 text-center text-decoration-none" href="#!" target="_blank"><img class="rounded" src="" alt="" width="40" height="40" />
                            <p class="mb-0 fw-medium text-800 text-truncate fs-11 pt-1">Deviantart</p>
                          </a></div>
                        <div class="col-4"><a class="d-block hover-bg-200 px-2 py-3 rounded-3 text-center text-decoration-none" href="app/events/event-detail.html" target="_blank">
                            <div class="avatar avatar-2xl">
                              <div class="avatar-name rounded-circle bg-primary-subtle text-primary"><span class="fs-7">E</span></div>
                            </div>
                            <p class="mb-0 fw-medium text-800 text-truncate fs-11">Events</p>
                          </a></div>
                        <div class="col-12"><a class="btn btn-outline-primary btn-sm mt-4" href="#!">Show more</a></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <!--个人信息-->
            <li class="nav-item dropdown">
              <a class="nav-link pe-0 ps-2" id="navbarDropdownUser" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <div class="avatar avatar-xl">
                  <img class="rounded-circle" src="../../assets/img/profile/5.jpg" alt="" />
                </div>
              </a>
              <div class="dropdown-menu border font-base mt-2 py-0 overflow-hidden dropdown-caret dropdown-caret dropdown-menu-end py-0" aria-labelledby="navbarDropdownUser">
                <div class="scrollbar list py-3" style="max-height: 24rem;">
                  <!--用户个人信息-->
                  <h6 class="dropdown-header fw-medium text-uppercase px-x1 fs-11 pt-0 pb-2">Files</h6>
                  <a class="dropdown-item px-x1 py-2" href="#!">
                    <div class="d-flex align-items-center">
                      <div class="file-thumbnail me-2"><img class="border h-100 w-100 object-fit-cover rounded-3" src="../../assets/img/profile/5.jpg" alt=""></div>
                      <div class="flex-1">
                        <h6 class="mb-0 title">用户名</h6>
                        <p class="fs-11 mb-0 d-flex"><span class="fw-semi-bold">用户角色（研究员/审核员/管理员）</span><span class="fw-medium text-600 ms-2">登录时间</span></p>
                      </div>
                    </div>
                  </a>
                  <hr class="text-200 dark__text-900">
                  <h6 class="dropdown-header fw-medium text-uppercase px-x1 fs-11 pt-0 pb-2">Recently Browsed</h6>
                  <a class="dropdown-item fs-10 px-x1 py-1 hover-primary" href="../../app/events/event-detail.html">
                    <div class="d-flex align-items-center">
                      <svg class="svg-inline--fa fa-circle fa-w-16 me-2 text-300 fs-11" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"></path></svg><!-- <span class="fas fa-circle me-2 text-300 fs-11"></span> Font Awesome fontawesome.com -->
                      <div class="fw-normal title">Pages <svg class="svg-inline--fa fa-chevron-right fa-w-10 mx-1 text-500 fs-11" data-fa-transform="shrink-2" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" data-fa-i2svg="" style="transform-origin: 0.3125em 0.5em;"><g transform="translate(160 256)"><g transform="translate(0, 0)  scale(0.875, 0.875)  rotate(0 0 0)"><path fill="currentColor" d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" transform="translate(-160 -256)"></path></g></g></svg><!-- <span class="fas fa-chevron-right mx-1 text-500 fs-11" data-fa-transform="shrink-2"></span> Font Awesome fontawesome.com --> Events</div>
                    </div>
                  </a><a class="dropdown-item fs-10 px-x1 py-1 hover-primary" href="../../app/e-commerce/customers.html">
                    <div class="d-flex align-items-center">
                      <svg class="svg-inline--fa fa-circle fa-w-16 me-2 text-300 fs-11" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"></path></svg><!-- <span class="fas fa-circle me-2 text-300 fs-11"></span> Font Awesome fontawesome.com -->
                      <div class="fw-normal title">E-commerce <svg class="svg-inline--fa fa-chevron-right fa-w-10 mx-1 text-500 fs-11" data-fa-transform="shrink-2" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" data-fa-i2svg="" style="transform-origin: 0.3125em 0.5em;"><g transform="translate(160 256)"><g transform="translate(0, 0)  scale(0.875, 0.875)  rotate(0 0 0)"><path fill="currentColor" d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" transform="translate(-160 -256)"></path></g></g></svg><!-- <span class="fas fa-chevron-right mx-1 text-500 fs-11" data-fa-transform="shrink-2"></span> Font Awesome fontawesome.com --> Customers</div>
                    </div>
                  </a><hr class="text-200 dark__text-900"><h6 class="dropdown-header fw-medium text-uppercase px-x1 fs-11 pt-0 pb-2">Suggested Filter</h6><a class="dropdown-item px-x1 py-1 fs-9" href="../../app/e-commerce/customers.html">
                    <div class="d-flex align-items-center"><span class="badge fw-medium text-decoration-none me-2 badge-subtle-warning">customers:</span>
                      <div class="flex-1 fs-10 title">All customers list</div>
                    </div>
                  </a><a class="dropdown-item px-x1 py-1 fs-9" href="../../app/events/event-detail.html">
                    <div class="d-flex align-items-center"><span class="badge fw-medium text-decoration-none me-2 badge-subtle-success">events:</span>
                      <div class="flex-1 fs-10 title">Latest events in current month</div>
                    </div>
                  </a><a class="dropdown-item px-x1 py-1 fs-9" href="../../app/e-commerce/product/product-grid.html">
                    <div class="d-flex align-items-center"><span class="badge fw-medium text-decoration-none me-2 badge-subtle-info">products:</span>
                      <div class="flex-1 fs-10 title">Most popular products</div>
                    </div>
                  </a><hr class="text-200 dark__text-900">
                  <h6 class="dropdown-header fw-medium text-uppercase px-x1 fs-11 pt-0 pb-2">Files</h6><a class="dropdown-item px-x1 py-2" href="#!">
                    <div class="d-flex align-items-center">
                      <div class="file-thumbnail me-2"><img class="border h-100 w-100 object-fit-cover rounded-3" src="../../assets/img/products/3-thumb.png" alt=""></div>
                      <div class="flex-1">
                        <h6 class="mb-0 title">iPhone</h6>
                        <p class="fs-11 mb-0 d-flex"><span class="fw-semi-bold">Antony</span><span class="fw-medium text-600 ms-2">27 Sep at 10:30 AM</span></p>
                      </div>
                    </div>
                  </a>
                  <a class="dropdown-item px-x1 py-2" href="#!">
                    <div class="d-flex align-items-center">
                      <div class="file-thumbnail me-2"><img class="img-fluid" src="../../assets/img/icons/zip.png" alt=""></div>
                      <div class="flex-1">
                        <h6 class="mb-0 title">Falcon v1.8.2</h6>
                        <p class="fs-11 mb-0 d-flex"><span class="fw-semi-bold">John</span><span class="fw-medium text-600 ms-2">30 Sep at 12:30 PM</span></p>
                      </div>
                    </div>
                  </a>
                  <hr class="text-200 dark__text-900">
                  <h6 class="dropdown-header fw-medium text-uppercase px-x1 fs-11 pt-0 pb-2">Members</h6><a class="dropdown-item px-x1 py-2" href="../../pages/user/profile.html">
                    <div class="d-flex align-items-center">
                      <div class="avatar avatar-l status-online me-2">
                        <img class="rounded-circle" src="../../assets/img/team/1.jpg" alt="">
                      </div>
                      <div class="flex-1">
                        <h6 class="mb-0 title">Anna Karinina</h6>
                        <p class="fs-11 mb-0 d-flex">Technext Limited</p>
                      </div>
                    </div>
                  </a><a class="dropdown-item px-x1 py-2" href="../../pages/user/profile.html">
                    <div class="d-flex align-items-center">
                      <div class="avatar avatar-l me-2">
                        <img class="rounded-circle" src="../../assets/img/team/2.jpg" alt="">
                      </div>
                      <div class="flex-1">
                        <h6 class="mb-0 title">Antony Hopkins</h6>
                        <p class="fs-11 mb-0 d-flex">Brain Trust</p>
                      </div>
                    </div>
                  </a><a class="dropdown-item px-x1 py-2" href="../../pages/user/profile.html">
                    <div class="d-flex align-items-center">
                      <div class="avatar avatar-l me-2">
                        <img class="rounded-circle" src="../../assets/img/team/3.jpg" alt="">
                      </div>
                      <div class="flex-1">
                        <h6 class="mb-0 title">Emma Watson</h6>
                        <p class="fs-11 mb-0 d-flex">Google</p>
                      </div>
                    </div>
                  </a>
                </div>
                <div class="text-center mt-n3">
                  <p class="fallback fw-bold fs-8 d-none">No Result Found.</p>
                </div>
              </div>
            </li>
          </ul>
        </nav>
        <!-- —— 这里开始插入 DeepSeek AI 辅助区 —— -->
        <section class="my-4 p-3 border rounded">
          <h5>AI 辅助问答</h5>
          <textarea
            v-model="aiInput"
            class="form-control mb-2"
            rows="3"
            placeholder="在此输入你的问题…"
          ></textarea>
          <button
            class="btn btn-primary mb-2"
            @click="sendMessage"
            :disabled="isChatLoading"
          >
            {{ isChatLoading ? '加载中…' : '发送' }}
          </button>
          <div v-if="aiResponse" class="alert alert-secondary">
            <strong>AI 回复：</strong><br />
            <p class="mb-0">{{ aiResponse }}</p>
          </div>
        </section>
        <!-- —— AI 区结束 —— -->
      </div>
    </div>
  </main>

    <!-- AI 辅助数据分析助手 侧边栏部分 -->
    <div class="offcanvas offcanvas-end settings-panel border-0" id="settings-offcanvas" tabindex="-1" aria-labelledby="settings-offcanvas">
      <div class="offcanvas-header settings-panel-header justify-content-between bg-shape">
        <div class="z-1 py-1">
          <div class="d-flex justify-content-between align-items-center mb-1">
            <h5 class="text-white mb-0 me-2"><span class="fas fa-palette me-2 fs-9"></span>AI 数据分析助手</h5>
            <button class="btn btn-primary btn-sm rounded-pill mt-0 mb-0" data-theme-control="reset" style="font-size:12px"> 
              <span class="fas fa-redo-alt me-1" data-fa-transform="shrink-3"></span>重置
            </button>
          </div>
          <p class="mb-0 fs-10 text-white opacity-75">与 DeepSeek 聊天，进行数据分析。</p>
        </div>
        <div class="z-1" data-bs-theme="dark">
          <button class="btn-close z-1 mt-0" type="button" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
      </div>
      <div class="offcanvas-body scrollbar-overlay px-x1 h-100" id="themeController">
        <div class="tab-content card-chat-content">
          <div class="tab-pane card-chat-pane active" id="chat-0" role="tabpanel" aria-labelledby="chat-link-0">
            <div class="chat-content-body" style="display: inherit;">
              <div class="conversation-info" data-index="0">
                <div class="h-100 overflow-auto scrollbar">
                  <div class="d-flex position-relative align-items-center p-3 border-bottom">
                    <div class="avatar avatar-xl status-online">
                      <img class="rounded-circle" src="../assets/img/team/2.jpg" alt="">
                    </div>
                    <div class="flex-1 ms-2 d-flex flex-between-center">
                      <h6 class="mb-0"><a class="text-decoration-none stretched-link text-700" href="../pages/user/profile.html">Antony Hopkins</a></h6>
                      <div class="dropdown z-1"><button class="btn btn-link btn-sm text-400 dropdown-toggle dropdown-caret-none me-n3" type="button" id="profile-dropdown-0" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><svg class="svg-inline--fa fa-cog fa-w-16" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="cog" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M487.4 315.7l-42.6-24.6c4.3-23.2 4.3-47 0-70.2l42.6-24.6c4.9-2.8 7.1-8.6 5.5-14-11.1-35.6-30-67.8-54.7-94.6-3.8-4.1-10-5.1-14.8-2.3L380.8 110c-17.9-15.4-38.5-27.3-60.8-35.1V25.8c0-5.6-3.9-10.5-9.4-11.7-36.7-8.2-74.3-7.8-109.2 0-5.5 1.2-9.4 6.1-9.4 11.7V75c-22.2 7.9-42.8 19.8-60.8 35.1L88.7 85.5c-4.9-2.8-11-1.9-14.8 2.3-24.7 26.7-43.6 58.9-54.7 94.6-1.7 5.4.6 11.2 5.5 14L67.3 221c-4.3 23.2-4.3 47 0 70.2l-42.6 24.6c-4.9 2.8-7.1 8.6-5.5 14 11.1 35.6 30 67.8 54.7 94.6 3.8 4.1 10 5.1 14.8 2.3l42.6-24.6c17.9 15.4 38.5 27.3 60.8 35.1v49.2c0 5.6 3.9 10.5 9.4 11.7 36.7 8.2 74.3 7.8 109.2 0 5.5-1.2 9.4-6.1 9.4-11.7v-49.2c22.2-7.9 42.8-19.8 60.8-35.1l42.6 24.6c4.9 2.8 11 1.9 14.8-2.3 24.7-26.7 43.6-58.9 54.7-94.6 1.5-5.5-.7-11.3-5.6-14.1zM256 336c-44.1 0-80-35.9-80-80s35.9-80 80-80 80 35.9 80 80-35.9 80-80 80z"></path></svg><!-- <span class="fas fa-cog"></span> Font Awesome fontawesome.com --></button>
                        <div class="dropdown-menu dropdown-menu-end border py-2" aria-labelledby="profile-dropdown-0"><a class="dropdown-item" href="#!">Mute</a>
                          <div class="dropdown-divider"></div><a class="dropdown-item" href="#!">Archive</a><a class="dropdown-item text-danger" href="#!">Delete</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="px-3 pt-2">
                    <div class="nav flex-column font-sans-serif fw-medium"><a class="nav-link d-flex align-items-center py-1 px-0 text-600" href="#!"><span class="conversation-info-icon"><svg class="svg-inline--fa fa-search fa-w-16 me-1" data-fa-transform="shrink-1 down-3" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" style="transform-origin: 0.5em 0.6875em;"><g transform="translate(256 256)"><g transform="translate(0, 96)  scale(0.9375, 0.9375)  rotate(0 0 0)"><path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z" transform="translate(-256 -256)"></path></g></g></svg><!-- <span class="fas fa-search me-1" data-fa-transform="shrink-1 down-3"></span> Font Awesome fontawesome.com --></span>Search in Conversation</a><a class="nav-link d-flex align-items-center py-1 px-0 text-600" href="#!"><span class="conversation-info-icon"><svg class="svg-inline--fa fa-pencil-alt fa-w-16 me-1" data-fa-transform="shrink-1" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pencil-alt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" style="transform-origin: 0.5em 0.5em;"><g transform="translate(256 256)"><g transform="translate(0, 0)  scale(0.9375, 0.9375)  rotate(0 0 0)"><path fill="currentColor" d="M497.9 142.1l-46.1 46.1c-4.7 4.7-12.3 4.7-17 0l-111-111c-4.7-4.7-4.7-12.3 0-17l46.1-46.1c18.7-18.7 49.1-18.7 67.9 0l60.1 60.1c18.8 18.7 18.8 49.1 0 67.9zM284.2 99.8L21.6 362.4.4 483.9c-2.9 16.4 11.4 30.6 27.8 27.8l121.5-21.3 262.6-262.6c4.7-4.7 4.7-12.3 0-17l-111-111c-4.8-4.7-12.4-4.7-17.1 0zM124.1 339.9c-5.5-5.5-5.5-14.3 0-19.8l154-154c5.5-5.5 14.3-5.5 19.8 0s5.5 14.3 0 19.8l-154 154c-5.5 5.5-14.3 5.5-19.8 0zM88 424h48v36.3l-64.5 11.3-31.1-31.1L51.7 376H88v48z" transform="translate(-256 -256)"></path></g></g></svg><!-- <span class="fas fa-pencil-alt me-1" data-fa-transform="shrink-1"></span> Font Awesome fontawesome.com --></span>Edit Nicknames</a><a class="nav-link d-flex align-items-center py-1 px-0 text-600" href="#!"><span class="conversation-info-icon"><svg class="svg-inline--fa fa-palette fa-w-16 me-1" data-fa-transform="shrink-1" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="palette" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" style="transform-origin: 0.5em 0.5em;"><g transform="translate(256 256)"><g transform="translate(0, 0)  scale(0.9375, 0.9375)  rotate(0 0 0)"><path fill="currentColor" d="M204.3 5C104.9 24.4 24.8 104.3 5.2 203.4c-37 187 131.7 326.4 258.8 306.7 41.2-6.4 61.4-54.6 42.5-91.7-23.1-45.4 9.9-98.4 60.9-98.4h79.7c35.8 0 64.8-29.6 64.9-65.3C511.5 97.1 368.1-26.9 204.3 5zM96 320c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm32-128c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm128-64c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zm128 64c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32z" transform="translate(-256 -256)"></path></g></g></svg><!-- <span class="fas fa-palette me-1" data-fa-transform="shrink-1"></span> Font Awesome fontawesome.com --></span><span>Change Color</span></a><a class="nav-link d-flex align-items-center py-1 px-0 text-600" href="#!"><span class="conversation-info-icon"><svg class="svg-inline--fa fa-thumbs-up fa-w-16 me-1" data-fa-transform="shrink-1" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="thumbs-up" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="" style="transform-origin: 0.5em 0.5em;"><g transform="translate(256 256)"><g transform="translate(0, 0)  scale(0.9375, 0.9375)  rotate(0 0 0)"><path fill="currentColor" d="M104 224H24c-13.255 0-24 10.745-24 24v240c0 13.255 10.745 24 24 24h80c13.255 0 24-10.745 24-24V248c0-13.255-10.745-24-24-24zM64 472c-13.255 0-24-10.745-24-24s10.745-24 24-24 24 10.745 24 24-10.745 24-24 24zM384 81.452c0 42.416-25.97 66.208-33.277 94.548h101.723c33.397 0 59.397 27.746 59.553 58.098.084 17.938-7.546 37.249-19.439 49.197l-.11.11c9.836 23.337 8.237 56.037-9.308 79.469 8.681 25.895-.069 57.704-16.382 74.757 4.298 17.598 2.244 32.575-6.148 44.632C440.202 511.587 389.616 512 346.839 512l-2.845-.001c-48.287-.017-87.806-17.598-119.56-31.725-15.957-7.099-36.821-15.887-52.651-16.178-6.54-.12-11.783-5.457-11.783-11.998v-213.77c0-3.2 1.282-6.271 3.558-8.521 39.614-39.144 56.648-80.587 89.117-113.111 14.804-14.832 20.188-37.236 25.393-58.902C282.515 39.293 291.817 0 312 0c24 0 72 8 72 81.452z" transform="translate(-256 -256)"></path></g></g></svg><!-- <span class="fas fa-thumbs-up me-1" data-fa-transform="shrink-1"></span> Font Awesome fontawesome.com --></span>Change Emoji</a><a class="nav-link d-flex align-items-center py-1 px-0 text-600" href="#!"><span class="conversation-info-icon"><svg class="svg-inline--fa fa-bell fa-w-14 me-1" data-fa-transform="shrink-1" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bell" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg="" style="transform-origin: 0.4375em 0.5em;"><g transform="translate(224 256)"><g transform="translate(0, 0)  scale(0.9375, 0.9375)  rotate(0 0 0)"><path fill="currentColor" d="M224 512c35.32 0 63.97-28.65 63.97-64H160.03c0 35.35 28.65 64 63.97 64zm215.39-149.71c-19.32-20.76-55.47-51.99-55.47-154.29 0-77.7-54.48-139.9-127.94-155.16V32c0-17.67-14.32-32-31.98-32s-31.98 14.33-31.98 32v20.84C118.56 68.1 64.08 130.3 64.08 208c0 102.3-36.15 133.53-55.47 154.29-6 6.45-8.66 14.16-8.61 21.71.11 16.4 12.98 32 32.1 32h383.8c19.12 0 32-15.6 32.1-32 .05-7.55-2.61-15.27-8.61-21.71z" transform="translate(-224 -256)"></path></g></g></svg><!-- <span class="fas fa-bell me-1" data-fa-transform="shrink-1"></span> Font Awesome fontawesome.com --></span>Notifications</a></div>
                  </div>
                  <hr class="my-2">
                  <div class="px-3" id="others-info-0">
                    <div class="title" id="shared-media-title-0"><a class="btn btn-link btn-accordion hover-text-decoration-none dropdown-indicator" href="#shared-media-0" data-bs-toggle="collapse" aria-expanded="false" aria-controls="shared-media-0">Shared media</a></div>
                    <div class="collapse" id="shared-media-0" aria-labelledby="shared-media-title-0" data-parent="#others-info-0">
                      <div class="row mx-n1">
                        <div class="col-6 col-md-4 px-1"><a href="../assets/img/chat/1.jpg" data-gallery="images-1"><img class="img-fluid rounded-1 mb-2" src="../assets/img/chat/1.jpg" alt=""></a></div>
                        <div class="col-6 col-md-4 px-1"><a href="../assets/img/chat/2.jpg" data-gallery="images-1"><img class="img-fluid rounded-1 mb-2" src="../assets/img/chat/2.jpg" alt=""></a></div>
                        <div class="col-6 col-md-4 px-1"> <a href="../assets/img/chat/3.jpg" data-gallery="images-1"><img class="img-fluid rounded-1 mb-2" src="../assets/img/chat/3.jpg" alt=""></a></div>
                        <div class="col-6 col-md-4 px-1"> <a href="../assets/img/chat/4.jpg" data-gallery="images-1"><img class="img-fluid rounded-1 mb-2" src="../assets/img/chat/4.jpg" alt=""></a></div>
                        <div class="col-6 col-md-4 px-1"> <a href="../assets/img/chat/5.jpg" data-gallery="images-1"><img class="img-fluid rounded-1 mb-2" src="../assets/img/chat/5.jpg" alt=""></a></div>
                        <div class="col-6 col-md-4 px-1"> <a href="../assets/img/chat/6.jpg" data-gallery="images-1"><img class="img-fluid rounded-1 mb-2" src="../assets/img/chat/6.jpg" alt=""></a></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="chat-content-scroll-area scrollbar">
                <div class="text-center fs-11 text-500">
                <span>2025/7/10, 18:59</span></div>
                <!--AI的回答样式样例-->
                <div class="d-flex p-3">
                  <div class="avatar avatar-l me-2">
                    <img class="rounded-circle" src="../assets/img/team/2.jpg" alt="">
                  </div>
                  <div class="flex-1">
                    <div class="w-xxl-75">
                      <div class="hover-actions-trigger d-flex align-items-center">
                        <div class="chat-message bg-200 p-2 rounded-2">What are you doing?</div>
                      </div>
                      <div class="text-400 fs-11"><span>18:59</span></div>
                    </div>
                  </div>
                </div>
                <!--我的提问样式样例-->
                <div class="d-flex p-3">
                  <div class="flex-1 d-flex justify-content-end">
                    <div class="w-100 w-xxl-75">
                      <div class="hover-actions-trigger d-flex flex-end-center">
                        <div class="bg-primary text-white p-2 rounded-2 chat-message" data-bs-theme="light">
                          <p class="mb-0">I took this pic </p>
                        </div>
                      </div>
                      <div class="text-400 fs-11 text-end">11:54 am<svg class="svg-inline--fa fa-check fa-w-16 ms-2 text-success" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path></svg><!-- <span class="fas fa-check ms-2 text-success"></span> Font Awesome fontawesome.com --></div>
                    </div>
                  </div>
                </div>
                <div class="text-center fs-11 text-500"><span>2025/7/10, 19:59</span></div>
                <div class="d-flex p-3">
                  <div class="avatar avatar-l me-2">
                    <img class="rounded-circle" src="../assets/img/team/2.jpg" alt="">
                  </div>
                  <div class="flex-1">
                    <div class="w-xxl-75">
                      <div class="hover-actions-trigger d-flex align-items-center">
                        <div class="chat-message bg-200 p-2 rounded-2">How are you?</div>
                      </div>
                      <div class="text-400 fs-11"><span>11:54 am</span></div>
                    </div>
                  </div>
                </div>
                <div class="d-flex p-3">
                  <div class="flex-1 d-flex justify-content-end">
                    <div class="w-100 w-xxl-75">
                      <div class="hover-actions-trigger d-flex flex-end-center">
                        <div class="bg-primary text-white p-2 rounded-2 chat-message" data-bs-theme="light">Fine</div>
                      </div>
                      <div class="text-400 fs-11 text-end">11:54 am<svg class="svg-inline--fa fa-check-double fa-w-16 ms-2" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check-double" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M505 174.8l-39.6-39.6c-9.4-9.4-24.6-9.4-33.9 0L192 374.7 80.6 263.2c-9.4-9.4-24.6-9.4-33.9 0L7 302.9c-9.4 9.4-9.4 24.6 0 34L175 505c9.4 9.4 24.6 9.4 33.9 0l296-296.2c9.4-9.5 9.4-24.7.1-34zm-324.3 106c6.2 6.3 16.4 6.3 22.6 0l208-208.2c6.2-6.3 6.2-16.4 0-22.6L366.1 4.7c-6.2-6.3-16.4-6.3-22.6 0L192 156.2l-55.4-55.5c-6.2-6.3-16.4-6.3-22.6 0L68.7 146c-6.2 6.3-6.2 16.4 0 22.6l112 112.2z"></path></svg><!-- <span class="fas fa-check-double ms-2"></span> Font Awesome fontawesome.com --></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--发送消息区域-->
          <form class="chat-editor-area">
            <textarea
              v-model="aiInput"
              class="form-control mb-2"
              rows="3"
              placeholder="在此输入你的问题…"
            ></textarea>
            <button
              class="btn btn-primary mb-2"
              @click="sendMessage"
              :disabled="isChatLoading"
            >
              {{ isChatLoading ? '加载中…' : '发送' }}
            </button>
          </form>
        </div>
      </div>
    </div>

    <a class="card setting-toggle" href="#settings-offcanvas" data-bs-toggle="offcanvas">
      <div class="card-body d-flex align-items-center py-md-2 px-2 py-1">
        <div class="bg-primary-subtle position-relative rounded-start" style="height:34px;width:28px">
          <div class="settings-popover"><span class="ripple"><span class="fa-spin position-absolute all-0 d-flex flex-center"><span class="icon-spin position-absolute all-0 d-flex flex-center"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19.7369 12.3941L19.1989 12.1065C18.4459 11.7041 18.0843 10.8487 18.0843 9.99495C18.0843 9.14118 18.4459 8.28582 19.1989 7.88336L19.7369 7.59581C19.9474 7.47484 20.0316 7.23291 19.9474 7.03131C19.4842 5.57973 18.6843 4.28943 17.6738 3.20075C17.5053 3.03946 17.2527 2.99914 17.0422 3.12011L16.393 3.46714C15.6883 3.84379 14.8377 3.74529 14.1476 3.3427C14.0988 3.31422 14.0496 3.28621 14.0002 3.25868C13.2568 2.84453 12.7055 2.10629 12.7055 1.25525V0.70081C12.7055 0.499202 12.5371 0.297594 12.2845 0.257272C10.7266 -0.105622 9.16879 -0.0653007 7.69516 0.257272C7.44254 0.297594 7.31623 0.499202 7.31623 0.70081V1.23474C7.31623 2.09575 6.74999 2.8362 5.99824 3.25599C5.95774 3.27861 5.91747 3.30159 5.87744 3.32493C5.15643 3.74527 4.26453 3.85902 3.53534 3.45302L2.93743 3.12011C2.72691 2.99914 2.47429 3.03946 2.30587 3.20075C1.29538 4.28943 0.495411 5.57973 0.0322686 7.03131C-0.051939 7.23291 0.0322686 7.47484 0.242788 7.59581L0.784376 7.8853C1.54166 8.29007 1.92694 9.13627 1.92694 9.99495C1.92694 10.8536 1.54166 11.6998 0.784375 12.1046L0.242788 12.3941C0.0322686 12.515 -0.051939 12.757 0.0322686 12.9586C0.495411 14.4102 1.29538 15.7005 2.30587 16.7891C2.47429 16.9504 2.72691 16.9907 2.93743 16.8698L3.58669 16.5227C4.29133 16.1461 5.14131 16.2457 5.8331 16.6455C5.88713 16.6767 5.94159 16.7074 5.99648 16.7375C6.75162 17.1511 7.31623 17.8941 7.31623 18.7552V19.2891C7.31623 19.4425 7.41373 19.5959 7.55309 19.696C7.64066 19.7589 7.74815 19.7843 7.85406 19.8046C9.35884 20.0925 10.8609 20.0456 12.2845 19.7729C12.5371 19.6923 12.7055 19.4907 12.7055 19.2891V18.7346C12.7055 17.8836 13.2568 17.1454 14.0002 16.7312C14.0496 16.7037 14.0988 16.6757 14.1476 16.6472C14.8377 16.2446 15.6883 16.1461 16.393 16.5227L17.0422 16.8698C17.2527 16.9907 17.5053 16.9504 17.6738 16.7891C18.7264 15.7005 19.4842 14.4102 19.9895 12.9586C20.0316 12.757 19.9474 12.515 19.7369 12.3941ZM10.0109 13.2005C8.1162 13.2005 6.64257 11.7893 6.64257 9.97478C6.64257 8.20063 8.1162 6.74905 10.0109 6.74905C11.8634 6.74905 13.3792 8.20063 13.3792 9.97478C13.3792 11.7893 11.8634 13.2005 10.0109 13.2005Z" fill="#2A7BE4"></path></svg></span></span></span></div>
        </div><small class="text-uppercase text-primary fw-bold bg-primary-subtle py-2 pe-2 ps-1 rounded-end">customize</small>
      </div>
    </a>
</template>

<style>

</style>
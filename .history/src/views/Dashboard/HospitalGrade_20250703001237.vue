<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { defineOptions } from 'vue'

// 声明组件名
defineOptions({ name: 'HospitalGrade' })

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
function goToCalendar()                { router.push({ name: 'Calendar' }) }
function goToCreateAnEvent()           { router.push({ name: 'CreateAnEvent' }) }
function goToEventDetail()             { router.push({ name: 'EventDetail' }) }
function goToEventList()               { router.push({ name: 'EventList' }) }
function goToLogs()                    { router.push({ name: 'Logs' }) }
function goToMonitor()                 { router.push({ name: 'Monitor' }) }
function goToChat()                    { router.push({ name: 'Chat' }) }
function goToUserReview()              { router.push({ name: 'UserReview' }) }
function goToOperationReview()         { router.push({ name: 'OperationReview' }) }
function goToDescriptiveStatistics()   { router.push({ name: 'DescriptiveStatistics' }) }
function goToComparativeAnalysis()     { router.push({ name: 'ComparativeAnalysis' }) }
function goToCorrelationAnalysis()     { router.push({ name: 'CorrelationAnalysis' }) }
function goToTrendAnalysis()           { router.push({ name: 'TrendAnalysis' }) }

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
              <!--通用功能-->
              <li class="nav-item">
                  <!-- parent pages-->
                  <a class="nav-link dropdown-indicator" href="" role="button" data-bs-toggle="collapse" aria-expanded="true" aria-controls="dashboard">
                      <div class="d-flex align-items-center"><span class="nav-link-icon"><span class="fas fa-chart-pie"></span></span><span class="nav-link-text ps-1">通用模块</span></div>
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
                          <div class="d-flex align-items-center"><span class="nav-link-text ps-1">医院类型</span><span class="badge rounded-pill ms-2 badge-subtle-success">New</span></div>
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
                  </ul>
              </li>
              <!--管理员功能-->
              <li class="nav-item"><!-- label-->
                <div class="row navbar-vertical-label-wrapper mt-3 mb-2">
                  <div class="col-auto navbar-vertical-label">管理员</div>
                  <div class="col ps-0">
                    <hr class="mb-0 navbar-vertical-divider" />
                  </div>
                </div>
                <!-- parent pages:Calendar-->
                <a class="nav-link dropdown-indicator" href="#calendar" role="button" data-bs-toggle="collapse" aria-expanded="false" aria-controls="calendar">
                  <div class="d-flex align-items-center"><span class="nav-link-icon"><span class="fas fa-calendar-alt"></span></span><span class="nav-link-text ps-1">Calendar</span></div>
                </a>
                <ul class="nav collapse" id="calendar">
                  <li class="nav-item">
                    <a class="nav-link " @click="goToCalendar" href="">
                      <div class="d-flex align-items-center"><span class="nav-link-text ps-1">工作日历</span></div>
                    </a><!-- more inner pages-->
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" @click="goToCreateAnEvent" href="">
                      <div class="d-flex align-items-center"><span class="nav-link-text ps-1">Create an event</span></div>
                    </a><!-- more inner pages-->
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" @click="goToEventDetail" href="">
                      <div class="d-flex align-items-center"><span class="nav-link-text ps-1">Event detail</span></div>
                    </a><!-- more inner pages-->
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" @click="goToEventList" href="">
                      <div class="d-flex align-items-center"><span class="nav-link-text ps-1">Event list</span></div>
                    </a><!-- more inner pages-->
                  </li>
                </ul>
                <!-- parent pages:日志与监控-->
                  <a class="nav-link dropdown-indicator" href="#LogsAndMonitor" role="button" data-bs-toggle="collapse" aria-expanded="false" aria-controls="logsAndMonitor">
                  <div class="d-flex align-items-center"><span class="nav-link-icon"><span class="fas fa-wrench"></span></span><span class="nav-link-text ps-1">日志与监控</span></div>
                </a>
                <ul class="nav collapse" id="LogsAndMonitor">
                  <li class="nav-item">
                    <a class="nav-link" @click="goToLogs" href="">
                      <div class="d-flex align-items-center"><span class="nav-link-text ps-1">操作日志记录</span></div>
                    </a><!-- more inner pages-->
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" @click="goToMonitor" href="">
                      <div class="d-flex align-items-center"><span class="nav-link-text ps-1">系统日志监控</span><span class="badge rounded-pill ms-2 badge-subtle-success">Updated</span></div>
                    </a><!-- more inner pages-->
                  </li>
                </ul>
                <!-- parent pages:用户反馈留言-->
                <a class="nav-link" @click="goToChat" href="" role="button">
                  <div class="d-flex align-items-center"><span class="nav-link-icon"><span class="fas fa-comments"></span></span><span class="nav-link-text ps-1">用户反馈留言</span></div>
                </a>
              </li>
              <!--审核员功能-->
              <li class="nav-item"><!-- label-->
                <div class="row navbar-vertical-label-wrapper mt-3 mb-2">
                  <div class="col-auto navbar-vertical-label">审核员</div>
                  <div class="col ps-0">
                    <hr class="mb-0 navbar-vertical-divider" />
                  </div>
                </div>
                <!-- parent pages:操作审核-->
                <a class="nav-link" @click="goToOperationReview" href="" role="button" data-bs-toggle="collapse" aria-expanded="false" aria-controls="pricing">
                  <div class="d-flex align-items-center"><span class="nav-link-icon"><span class="fas fa-tags"></span></span><span class="nav-link-text ps-1">操作审核</span></div>
                </a>
                <!-- parent pages:用户审核-->
                <a class="nav-link" @click="goToUserReview" href="" role="button" data-bs-toggle="collapse" aria-expanded="false" aria-controls="user">
                  <div class="d-flex align-items-center"><span class="nav-link-icon"><span class="fas fa-user"></span></span><span class="nav-link-text ps-1">用户审核</span></div>
                </a>
              </li>
              <!--研究员功能-->
              <li class="nav-item"><!-- label-->
                <div class="row navbar-vertical-label-wrapper mt-3 mb-2">
                  <div class="col-auto navbar-vertical-label">研究员</div>
                  <div class="col ps-0">
                    <hr class="mb-0 navbar-vertical-divider" />
                  </div>
                </div>
                <!-- parent pages:统计分析-->
                <a class="nav-link dropdown-indicator" href="#Analysis" role="button" data-bs-toggle="collapse" aria-expanded="false" aria-controls="Analysis">
                  <div class="d-flex align-items-center"><span class="nav-link-icon"><span class="fas fa-chart-line"></span></span><span class="nav-link-text ps-1">统计分析</span></div>
                </a>
                <ul class="nav collapse " id="Analysis">
                  <li class="nav-item"><a class="nav-link" @click="goToDescriptiveStatistics" href="">
                      <div class="d-flex align-items-center"><span class="nav-link-text ps-1">描述性统计</span></div>
                    </a><!-- more inner pages--></li>
                  <li class="nav-item">
                    <a class="nav-link" @click="goToCorrelationAnalysis" href="">
                      <div class="d-flex align-items-center"><span class="nav-link-text ps-1">相关性分析</span><span class="badge rounded-pill ms-2 badge-subtle-success">New</span></div>
                    </a><!-- more inner pages-->
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" @click="goToTrendAnalysis" href="" data-bs-toggle="collapse" aria-expanded="false" aria-controls="charts">
                      <div class="d-flex align-items-center"><span class="nav-link-text ps-1">趋势分析</span></div>
                    </a><!-- more inner pages-->
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" @click="goToComparativeAnalysis" href="">
                      <div class="d-flex align-items-center"><span class="nav-link-text ps-1">对比分析</span><span class="badge rounded-pill ms-2 badge-subtle-success">New</span></div>
                    </a><!-- more inner pages-->
                  </li>
                </ul>
                <!-- parent pages:数据处理-->
                <a class="nav-link" href="" role="button" data-bs-toggle="collapse" aria-expanded="false" aria-controls="tables">
                  <div class="d-flex align-items-center"><span class="nav-link-icon"><span class="fas fa-table"></span></span><span class="nav-link-text ps-1">数据处理</span></div>
                </a>
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
                <div class="bg-white dark__bg-1000 rounded-3 py-2"><a class="dropdown-item link-600 fw-medium" href="">Default</a><a class="dropdown-item link-600 fw-medium" href="dashboard/analytics.html">Analytics</a><a class="dropdown-item link-600 fw-medium" href="dashboard/crm.html">CRM</a><a class="dropdown-item link-600 fw-medium" href="dashboard/e-commerce.html">E commerce</a><a class="dropdown-item link-600 fw-medium" href="dashboard/lms.html">LMS<span class="badge rounded-pill ms-2 badge-subtle-success">New</span></a><a class="dropdown-item link-600 fw-medium" href="dashboard/project-management.html">Management</a><a class="dropdown-item link-600 fw-medium" href="dashboard/saas.html">SaaS</a><a class="dropdown-item link-600 fw-medium" href="dashboard/support-desk.html">Support desk<span class="badge rounded-pill ms-2 badge-subtle-success">New</span></a></div>
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
                          <p class="nav-link text-700 mb-0 fw-bold">Layouts</p><a class="nav-link py-1 link-600 fw-medium" href="demo/navbar-vertical.html">Navbar vertical</a><a class="nav-link py-1 link-600 fw-medium" href="demo/navbar-top.html">Top nav</a><a class="nav-link py-1 link-600 fw-medium" href="demo/navbar-double-top.html">Double top<span class="badge rounded-pill ms-2 badge-subtle-success">New</span></a><a class="nav-link py-1 link-600 fw-medium" href="demo/combo-nav.html">Combo nav</a>
                          <p class="nav-link text-700 mb-0 fw-bold">Others</p><a class="nav-link py-1 link-600 fw-medium" href="pages/starter.html">Starter</a><a class="nav-link py-1 link-600 fw-medium" href="pages/landing.html">Landing</a>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-6 col-xxl-3">
                        <div class="nav flex-column">
                          <p class="nav-link text-700 mb-0 fw-bold">User</p><a class="nav-link py-1 link-600 fw-medium" href="pages/user/profile.html">Profile</a><a class="nav-link py-1 link-600 fw-medium" href="pages/user/settings.html">Settings</a>
                        </div>
                      </div>
                      <div class="col-6 col-xxl-3">
                        <div class="nav flex-column">
                          <p class="nav-link text-700 mb-0 fw-bold">Pricing</p><a class="nav-link py-1 link-600 fw-medium" href="pages/pricing/pricing-default.html">Pricing default</a><a class="nav-link py-1 link-600 fw-medium" href="pages/pricing/pricing-alt.html">Pricing alt</a>
                        </div>
                      </div>
                      <div class="col-6 col-xxl-3">
                        <div class="nav flex-column">
                          <p class="nav-link text-700 mb-0 fw-bold">Errors</p><a class="nav-link py-1 link-600 fw-medium" href="pages/errors/404.html">404</a><a class="nav-link py-1 link-600 fw-medium" href="pages/errors/500.html">500</a>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-6 col-xxl-3">
                        <div class="nav flex-column">
                          <p class="nav-link text-700 mb-0 fw-bold">Miscellaneous</p><a class="nav-link py-1 link-600 fw-medium" href="pages/miscellaneous/associations.html">Associations</a><a class="nav-link py-1 link-600 fw-medium" href="pages/miscellaneous/invite-people.html">Invite people</a><a class="nav-link py-1 link-600 fw-medium" href="pages/miscellaneous/privacy-policy.html">Privacy policy</a>
                        </div>
                      </div>
                      <div class="col-6 col-xxl-3">
                        <div class="nav flex-column">
                          <p class="nav-link text-700 mb-0 fw-bold">FAQ</p><a class="nav-link py-1 link-600 fw-medium" href="pages/faq/faq-basic.html">Faq basic</a><a class="nav-link py-1 link-600 fw-medium" href="pages/faq/faq-alt.html">Faq alt</a><a class="nav-link py-1 link-600 fw-medium" href="pages/faq/faq-accordion.html">Faq accordion</a>
                        </div>
                      </div>
                      <div class="col-6 col-xxl-3">
                        <div class="nav flex-column">
                          <p class="nav-link text-700 mb-0 fw-bold">Other Auth</p><a class="nav-link py-1 link-600 fw-medium" href="pages/authentication/wizard.html">Wizard</a><a class="nav-link py-1 link-600 fw-medium" href="#authentication-modal" data-bs-toggle="modal">Modal</a>
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
                          <p class="nav-link text-700 mb-0 fw-bold">Components</p><a class="nav-link py-1 link-600 fw-medium" href="modules/components/accordion.html">Accordion</a><a class="nav-link py-1 link-600 fw-medium" href="modules/components/alerts.html">Alerts</a><a class="nav-link py-1 link-600 fw-medium" href="modules/components/anchor.html">Anchor</a><a class="nav-link py-1 link-600 fw-medium" href="modules/components/animated-icons.html">Animated icons</a><a class="nav-link py-1 link-600 fw-medium" href="modules/components/background.html">Background</a><a class="nav-link py-1 link-600 fw-medium" href="modules/components/badges.html">Badges</a><a class="nav-link py-1 link-600 fw-medium" href="modules/components/bottom-bar.html">Bottom bar<span class="badge rounded-pill ms-2 badge-subtle-success">New</span></a><a class="nav-link py-1 link-600 fw-medium" href="modules/components/breadcrumbs.html">Breadcrumbs</a><a class="nav-link py-1 link-600 fw-medium" href="modules/components/buttons.html">Buttons</a><a class="nav-link py-1 link-600 fw-medium" href="modules/components/calendar.html">Calendar</a><a class="nav-link py-1 link-600 fw-medium" href="modules/components/cards.html">Cards</a><a class="nav-link py-1 link-600 fw-medium" href="modules/components/carousel/bootstrap.html">Bootstrap carousel</a>
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
              <div class="dropdown-menu dropdown-caret dropdown-caret dropdown-menu-end py-0" aria-labelledby="navbarDropdownUser">
                <div class="bg-white dark__bg-1000 rounded-2 py-2">
                  <a class="dropdown-item fw-bold text-warning" href="#!"><span class="fas fa-crown me-1"></span><span>Go Pro</span></a>
                  <div class="dropdown-divider"></div>
                  <a class="dropdown-item" href="#!">Set status</a>
                  <a class="dropdown-item" href="pages/user/profile.html">Profile &amp; account</a>
                  <a class="dropdown-item" href="#!">Feedback</a>
                  <div class="dropdown-divider"></div>
                  <a class="dropdown-item" href="pages/user/settings.html">Settings</a>
                  <a class="dropdown-item" @click="goToLogout">Logout</a>
                </div>
              </div>
            </li>
          </ul>
        </nav>
        <div class="card mb-3">
          <div class="card-body px-xxl-0 pt-4">
            <div class="row g-0">
              <div class="col-xxl-3 col-md-6 px-3 text-center border-end-md border-bottom border-bottom-xxl-0 pb-3 p-xxl-0 ps-md-0">
                <div class="icon-circle icon-circle-primary"><span class="fs-7 fas fa-user-graduate text-primary"></span></div>
                <h4 class="mb-1 font-sans-serif"><span class="text-700 mx-2" data-countup='{"endValue":"4968"}'>0</span><span class="fw-normal text-600">New Learners</span></h4>
                <p class="fs-10 fw-semi-bold mb-0">4203 <span class="text-600 fw-normal">last month</span></p>
              </div>
              <div class="col-xxl-3 col-md-6 px-3 text-center border-end-xxl border-bottom border-bottom-xxl-0 pb-3 pt-4 pt-md-0 pe-md-0 p-xxl-0">
                <div class="icon-circle icon-circle-info"><span class="fs-7 fas fa-chalkboard-teacher text-info"></span></div>
                <h4 class="mb-1 font-sans-serif"><span class="text-700 mx-2" data-countup='{"endValue":"324"}'>0</span><span class="fw-normal text-600">New Trainers</span></h4>
                <p class="fs-10 fw-semi-bold mb-0">301 <span class="text-600 fw-normal">last month</span></p>
              </div>
              <div class="col-xxl-3 col-md-6 px-3 text-center border-end-md border-bottom border-bottom-md-0 pb-3 pt-4 p-xxl-0 pb-md-0 ps-md-0">
                <div class="icon-circle icon-circle-success"><span class="fs-7 fas fa-book-open text-success"></span></div>
                <h4 class="mb-1 font-sans-serif"><span class="text-700 mx-2" data-countup='{"endValue":"3712"}'>0</span><span class="fw-normal text-600">New Courses</span></h4>
                <p class="fs-10 fw-semi-bold mb-0">2779 <span class="text-600 fw-normal">last month</span></p>
              </div>
              <div class="col-xxl-3 col-md-6 px-3 text-center pt-4 p-xxl-0 pb-0 pe-md-0">
                <div class="icon-circle icon-circle-warning"><span class="fs-7 fas fa-dollar-sign text-warning"></span></div>
                <h4 class="mb-1 font-sans-serif"><span class="text-700 mx-2" data-countup='{"endValue":"1054"}'>0</span><span class="fw-normal text-600">Refunds</span></h4>
                <p class="fs-10 fw-semi-bold mb-0">1201 <span class="text-600 fw-normal">last month</span></p>
              </div>
            </div>
          </div>
        </div>
        <div class="row g-3 mb-3">
          <div class="col-xxl-4">
            <div class="card h-100">
              <div class="card-header bg-body-tertiary d-flex flex-between-center py-2">
                <h6 class="mb-0">Trending Keywords</h6>
                <div class="dropdown font-sans-serif btn-reveal-trigger"><button class="btn btn-link text-600 btn-sm dropdown-toggle dropdown-caret-none btn-reveal" type="button" id="dropdown-trending-keywords" data-bs-toggle="dropdown" data-boundary="viewport" aria-haspopup="true" aria-expanded="false"><span class="fas fa-ellipsis-h fs-11"></span></button>
                  <div class="dropdown-menu dropdown-menu-end border py-2" aria-labelledby="dropdown-trending-keywords"><a class="dropdown-item" href="#!">View</a><a class="dropdown-item" href="#!">Export</a>
                    <div class="dropdown-divider"></div><a class="dropdown-item text-danger" href="#!">Remove</a>
                  </div>
                </div>
              </div>
              <div class="card-body p-2 d-flex flex-center"><!-- Find the JS file for the following chart at: src/js/charts/d3/trending-keywords.js--><!-- If you are not using gulp based workflow, you can find the transpiled code at: public/assets/js/theme.js-->
                <div class="d3-trending-keywords position-relative w-100"><svg class="d3-trending-keywords-svg h-100 w-100"></svg>
                  <div class="d3-trending-keywords-tooltip pe-none position-fixed py-1 px-2 rounded">
                    <div class="d-flex align-items-center fs-10"><span class="dot d3-tooltip-dot"></span><span class="fw-semi-bold d3-tooltip-name pe-2"></span><span class="fw-semi-bold d3-tooltip-value"></span></div>
                  </div>
                </div>
              </div>
              <div class="card-footer bg-body-tertiary py-2">
                <div class="row justify-content-between">
                  <div class="col-auto"><select class="form-select form-select-sm">
                      <option value="week" selected="selected">Last 7 days</option>
                      <option value="month">Last month</option>
                      <option value="year">Last year</option>
                    </select></div>
                  <div class="col-auto"><a class="btn btn-sm btn-falcon-default" href="#!">View All</a></div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xxl-8">
            <div class="row g-3 h-100">
              <div class="col-md-6">
                <div class="card font-sans-serif h-100">
                  <div class="card-header pb-0">
                    <h6 class="mb-0"> Monthly Revenue Target</h6>
                  </div>
                  <div class="card-body pt-0">
                    <div class="row align-items-end h-100 mb-n1">
                      <div class="col-6 col-sm-5 pe-md-0 pe-lg-3">
                        <div class="row g-0">
                          <div class="col-7">
                            <h6 class="text-600">Target:</h6>
                          </div>
                          <div class="col-5">
                            <h6 class="text-800">$1.2M</h6>
                          </div>
                        </div>
                        <div class="row g-0">
                          <div class="col-7">
                            <h6 class="mb-0 text-600">Reached:</h6>
                          </div>
                          <div class="col-5">
                            <h6 class="mb-0 text-800">$823K</h6>
                          </div>
                        </div>
                      </div>
                      <div class="col-6 col-sm-7">
                        <div class="lms-half-doughnut ms-auto mt-n4">
                          <div class="position-relative"><canvas class="pe-none" data-half-doughnut='{"data":{"labels":["Target","Reached"],"datasets":[{"data":[1200000,823000],"backgroundColor":["primary","gray-300"]}]}}'></canvas>
                            <p class="mt-n4 mb-0 position-absolute start-50 translate-middle-x fs-8 fw-medium" data-countup='{"endValue":"69","suffix":"%"}'>0</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="card font-sans-serif h-100">
                  <div class="card-header pb-0">
                    <h6 class="mb-0">Monthly Visitor Target</h6>
                  </div>
                  <div class="card-body pt-0">
                    <div class="row align-items-end h-100 mb-n1">
                      <div class="col-6 col-sm-5 pe-md-0 pe-lg-3">
                        <div class="row g-0">
                          <div class="col-7">
                            <h6 class="text-600">Target:</h6>
                          </div>
                          <div class="col-5">
                            <h6 class="text-800">$7.5M</h6>
                          </div>
                        </div>
                        <div class="row g-0">
                          <div class="col-7">
                            <h6 class="mb-0 text-600">Reached:</h6>
                          </div>
                          <div class="col-5">
                            <h6 class="mb-0 text-800">$4.8M</h6>
                          </div>
                        </div>
                      </div>
                      <div class="col-6 col-sm-7">
                        <div class="lms-half-doughnut ms-auto mt-n4">
                          <div class="position-relative"><canvas class="pe-none" data-half-doughnut='{"data":{"labels":["Target","Reached"],"datasets":[{"data":[7500000,4800000],"backgroundColor":["info","gray-300"]}]}}'></canvas>
                            <p class="mt-n4 mb-0 position-absolute start-50 translate-middle-x fs-8 fw-medium" data-countup='{"endValue":"64","suffix":"%"}'>0</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-12">
                <div class="card h-100">
                  <div class="card-header py-2">
                    <div class="row flex-between-center g-0">
                      <div class="col-auto">
                        <h6 class="mb-0">Avarage Enrollment Rate</h6>
                      </div>
                      <div class="col-12 col-md-auto order-3 order-md-2">
                        <div class="d-flex flex-wrap gap-md-2"><button class="btn btn-link text-decoration-none text-600 fs-11 px-0 me-2" id="onSaleCourse"><span class="fas fa-circle text-primary me-1" data-fa-transform="shrink-3"></span>On Sale Course</button><button class="btn btn-link text-decoration-none text-600 fs-11 px-0" id="regularPaidCourse"><span class="fas fa-circle text-warning me-1" data-fa-transform="shrink-3"></span>Regular Paid Course</button></div>
                      </div>
                      <div class="col-auto order-2 order-md-3">
                        <div class="dropdown font-sans-serif btn-reveal-trigger"><button class="btn btn-link text-600 btn-sm dropdown-toggle dropdown-caret-none btn-reveal" type="button" id="dropdown-avg-enrollment-lms" data-bs-toggle="dropdown" data-boundary="viewport" aria-haspopup="true" aria-expanded="false"><span class="fas fa-ellipsis-h fs-11"></span></button>
                          <div class="dropdown-menu dropdown-menu-end border py-2" aria-labelledby="dropdown-avg-enrollment-lms"><a class="dropdown-item" href="#!">View</a><a class="dropdown-item" href="#!">Export</a>
                            <div class="dropdown-divider"></div><a class="dropdown-item text-danger" href="#!">Remove</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="card-body pb-0"><!-- Find the JS file for the following chart at: src/js/charts/echarts/average-enrollment-rate.js--><!-- If you are not using gulp based workflow, you can find the transpiled code at: public/assets/js/theme.js-->
                    <div class="echart-avg-enrollment-rate" data-echart-responsive="true" data-options='{"optionOne":"onSaleCourse","optionTwo":"regularPaidCourse"}'></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card overflow-hidden mb-3">
          <div class="card-header p-0 scrollbar">
            <ul class="nav nav-tabs border-0 top-courses-tab flex-nowrap" role="tablist">
              <li class="nav-item" role="presentation"><a class="nav-link p-x1 mb-0 active" role="tab" id="popularPaid-tab" data-bs-toggle="tab" href="#popularPaid" aria-controls="popularPaid" aria-selected="false">
                  <div class="d-flex gap-1 py-1 pe-3">
                    <div class="d-flex flex-column flex-between-center"><span class="fas fa-crown fs-11 text-warning" data-fa-transform="shrink-4"></span><span class="mt-auto fas fa-fire fs-7"></span></div>
                    <div class="ms-2">
                      <h6 class="mb-1 text-700 fs-11 text-nowrap">Most Popular</h6>
                      <h5 class="mb-0 lh-1">Paid</h5>
                    </div>
                  </div>
                </a></li>
              <li class="nav-item" role="presentation"><a class="nav-link p-x1 mb-0 false" role="tab" id="popularFree-tab" data-bs-toggle="tab" href="#popularFree" aria-controls="popularFree" aria-selected="true">
                  <div class="d-flex gap-1 py-1 pe-3">
                    <div class="d-flex flex-column flex-between-center"><span class="mt-auto fas fa-fire fs-7"></span></div>
                    <div class="ms-2">
                      <h6 class="mb-1 text-700 fs-11 text-nowrap">Most Popular</h6>
                      <h5 class="mb-0 lh-1">Free</h5>
                    </div>
                  </div>
                </a></li>
              <li class="nav-item" role="presentation"><a class="nav-link p-x1 mb-0 false" role="tab" id="topPaid-tab" data-bs-toggle="tab" href="#topPaid" aria-controls="topPaid" aria-selected="false">
                  <div class="d-flex gap-1 py-1 pe-3">
                    <div class="d-flex flex-column flex-between-center"><span class="fas fa-crown fs-11 text-warning" data-fa-transform="shrink-4"></span><span class="mt-auto fas fa-star fs-7"></span></div>
                    <div class="ms-2">
                      <h6 class="mb-1 text-700 fs-11 text-nowrap">Top Rated</h6>
                      <h5 class="mb-0 lh-1">Paid</h5>
                    </div>
                  </div>
                </a></li>
              <li class="nav-item" role="presentation"><a class="nav-link p-x1 mb-0 false" role="tab" id="topFree-tab" data-bs-toggle="tab" href="#topFree" aria-controls="topFree" aria-selected="false">
                  <div class="d-flex gap-1 py-1 pe-3">
                    <div class="d-flex flex-column flex-between-center"><span class="mt-auto fas fa-star fs-7"></span></div>
                    <div class="ms-2">
                      <h6 class="mb-1 text-700 fs-11 text-nowrap">Top Rated</h6>
                      <h5 class="mb-0 lh-1">Free</h5>
                    </div>
                  </div>
                </a></li>
            </ul>
          </div>
          <div class="card-body p-0">
            <div class="tab-content">
              <div class="tab-pane active" id="popularPaid" role="tabpanel" aria-labelledby="popularPaid-tab">
                <div class="z-1" id="popularPaidCourses" data-list='{"valueNames":["title","name","published","enrolled","price"],"page":4}'>
                  <div class="px-0 py-0">
                    <div class="table-responsive scrollbar">
                      <table class="table fs-10 mb-0 overflow-hidden">
                        <thead class="bg-body-tertiary">
                          <tr class="font-sans-serif">
                            <th class="text-900 fw-medium sort pe-1 align-middle" data-sort="title">Course Title</th>
                            <th class="text-900 fw-medium sort pe-1 align-middle" data-sort="name">Trainer</th>
                            <th class="text-900 fw-medium sort pe-1 align-middle text-end" data-sort="published">Published on</th>
                            <th class="text-900 fw-medium sort pe-1 align-middle text-end" data-sort="enrolled">Enrolled</th>
                            <th class="text-900 fw-medium sort pe-1 align-middle text-end text-end" data-sort="price">Price</th>
                            <th class="text-900 fw-medium no-sort pe-1 align-middle data-table-row-action"></th>
                          </tr>
                        </thead>
                        <tbody class="list">
                          <tr class="btn-reveal-trigger fw-semi-bold">
                            <td class="align-middle white-space-nowrap title"><a href="../app/e-learning/course/course-details.html">Advanced Design Tools for Modern Designs</a></td>
                            <td class="align-middle text-nowrap name"><a class="text-800" href="../app/e-learning/trainer-profile.html">Bill finger</a></td>
                            <td class="align-middle white-space-nowrap text-end published">01/10/21</td>
                            <td class="align-middle text-end enrolled">47,726</td>
                            <td class="align-middle text-end price">$39.99</td>
                            <td class="align-middle white-space-nowrap text-end">
                              <div class="dropstart font-sans-serif position-static d-inline-block"><button class="btn btn-link text-600 btn-sm dropdown-toggle btn-reveal float-end" type="button" id="dropdown-popularPaidCourses-1" data-bs-toggle="dropdown" data-boundary="window" aria-haspopup="true" aria-expanded="false" data-bs-reference="parent"><span class="fas fa-ellipsis-h fs-10"></span></button>
                                <div class="dropdown-menu dropdown-menu-end border py-2" aria-labelledby="dropdown-popularPaidCourses-1"><a class="dropdown-item" href="#!">View</a><a class="dropdown-item" href="#!">Edit</a><a class="dropdown-item" href="#!">Refund</a>
                                  <div class="dropdown-divider"></div><a class="dropdown-item text-warning" href="#!">Archive</a><a class="dropdown-item text-danger" href="#!">Delete</a>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr class="btn-reveal-trigger fw-semi-bold">
                            <td class="align-middle white-space-nowrap title"><a href="../app/e-learning/course/course-details.html">Photograpy Basics: Get Familiar Standing Behind Lens</a></td>
                            <td class="align-middle text-nowrap name"><a class="text-800" href="../app/e-learning/trainer-profile.html">Bruce Timm</a></td>
                            <td class="align-middle white-space-nowrap text-end published">11/12/21</td>
                            <td class="align-middle text-end enrolled">38,541</td>
                            <td class="align-middle text-end price">$19.99</td>
                            <td class="align-middle white-space-nowrap text-end">
                              <div class="dropstart font-sans-serif position-static d-inline-block"><button class="btn btn-link text-600 btn-sm dropdown-toggle btn-reveal float-end" type="button" id="dropdown-popularPaidCourses-2" data-bs-toggle="dropdown" data-boundary="window" aria-haspopup="true" aria-expanded="false" data-bs-reference="parent"><span class="fas fa-ellipsis-h fs-10"></span></button>
                                <div class="dropdown-menu dropdown-menu-end border py-2" aria-labelledby="dropdown-popularPaidCourses-2"><a class="dropdown-item" href="#!">View</a><a class="dropdown-item" href="#!">Edit</a><a class="dropdown-item" href="#!">Refund</a>
                                  <div class="dropdown-divider"></div><a class="dropdown-item text-warning" href="#!">Archive</a><a class="dropdown-item text-danger" href="#!">Delete</a>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr class="btn-reveal-trigger fw-semi-bold">
                            <td class="align-middle white-space-nowrap title"><a href="../app/e-learning/course/course-details.html">Abstract Painting: Zero to Mastery in Traditional Medium</a></td>
                            <td class="align-middle text-nowrap name"><a class="text-800" href="../app/e-learning/trainer-profile.html">J. H. Williams III</a></td>
                            <td class="align-middle white-space-nowrap text-end published">03/09/21</td>
                            <td class="align-middle text-end enrolled">35,666</td>
                            <td class="align-middle text-end price">$45.49</td>
                            <td class="align-middle white-space-nowrap text-end">
                              <div class="dropstart font-sans-serif position-static d-inline-block"><button class="btn btn-link text-600 btn-sm dropdown-toggle btn-reveal float-end" type="button" id="dropdown-popularPaidCourses-3" data-bs-toggle="dropdown" data-boundary="window" aria-haspopup="true" aria-expanded="false" data-bs-reference="parent"><span class="fas fa-ellipsis-h fs-10"></span></button>
                                <div class="dropdown-menu dropdown-menu-end border py-2" aria-labelledby="dropdown-popularPaidCourses-3"><a class="dropdown-item" href="#!">View</a><a class="dropdown-item" href="#!">Edit</a><a class="dropdown-item" href="#!">Refund</a>
                                  <div class="dropdown-divider"></div><a class="dropdown-item text-warning" href="#!">Archive</a><a class="dropdown-item text-danger" href="#!">Delete</a>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr class="btn-reveal-trigger fw-semi-bold">
                            <td class="align-middle white-space-nowrap title"><a href="../app/e-learning/course/course-details.html">Character Design Masterclass: Your First Supervillain</a></td>
                            <td class="align-middle text-nowrap name"><a class="text-800" href="../app/e-learning/trainer-profile.html">Bill finger</a></td>
                            <td class="align-middle white-space-nowrap text-end published">31/12/21</td>
                            <td class="align-middle text-end enrolled">29,988</td>
                            <td class="align-middle text-end price">$99.99</td>
                            <td class="align-middle white-space-nowrap text-end">
                              <div class="dropstart font-sans-serif position-static d-inline-block"><button class="btn btn-link text-600 btn-sm dropdown-toggle btn-reveal float-end" type="button" id="dropdown-popularPaidCourses-4" data-bs-toggle="dropdown" data-boundary="window" aria-haspopup="true" aria-expanded="false" data-bs-reference="parent"><span class="fas fa-ellipsis-h fs-10"></span></button>
                                <div class="dropdown-menu dropdown-menu-end border py-2" aria-labelledby="dropdown-popularPaidCourses-4"><a class="dropdown-item" href="#!">View</a><a class="dropdown-item" href="#!">Edit</a><a class="dropdown-item" href="#!">Refund</a>
                                  <div class="dropdown-divider"></div><a class="dropdown-item text-warning" href="#!">Archive</a><a class="dropdown-item text-danger" href="#!">Delete</a>
                                </div>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div class="tab-pane" id="popularFree" role="tabpanel" aria-labelledby="popularFree-tab">
                <div class="z-1" id="popularFreeCourses" data-list='{"valueNames":["title","name","published","enrolled","price"],"page":4}'>
                  <div class="px-0 py-0">
                    <div class="table-responsive scrollbar">
                      <table class="table fs-10 mb-0 overflow-hidden">
                        <thead class="bg-body-tertiary">
                          <tr class="font-sans-serif">
                            <th class="text-900 fw-medium sort pe-1 align-middle" data-sort="title">Course Title</th>
                            <th class="text-900 fw-medium sort pe-1 align-middle" data-sort="name">Trainer</th>
                            <th class="text-900 fw-medium sort pe-1 align-middle text-end" data-sort="published">Published on</th>
                            <th class="text-900 fw-medium sort pe-1 align-middle text-end" data-sort="enrolled">Enrolled</th>
                            <th class="text-900 fw-medium sort pe-1 align-middle text-end text-end" data-sort="price">Price</th>
                            <th class="text-900 fw-medium no-sort pe-1 align-middle data-table-row-action"></th>
                          </tr>
                        </thead>
                        <tbody class="list">
                          <tr class="btn-reveal-trigger fw-semi-bold">
                            <td class="align-middle white-space-nowrap title"><a href="../app/e-learning/course/course-details.html">Script Writing Masterclass: Introdution to Industry Cliches</a></td>
                            <td class="align-middle text-nowrap name"><a class="text-800" href="../app/e-learning/trainer-profile.html">Bill finger</a></td>
                            <td class="align-middle white-space-nowrap text-end published">31/08/21</td>
                            <td class="align-middle text-end enrolled">92,632</td>
                            <td class="align-middle text-end price">$69.50</td>
                            <td class="align-middle white-space-nowrap text-end">
                              <div class="dropstart font-sans-serif position-static d-inline-block"><button class="btn btn-link text-600 btn-sm dropdown-toggle btn-reveal float-end" type="button" id="dropdown-popularFreeCourses-1" data-bs-toggle="dropdown" data-boundary="window" aria-haspopup="true" aria-expanded="false" data-bs-reference="parent"><span class="fas fa-ellipsis-h fs-10"></span></button>
                                <div class="dropdown-menu dropdown-menu-end border py-2" aria-labelledby="dropdown-popularFreeCourses-1"><a class="dropdown-item" href="#!">View</a><a class="dropdown-item" href="#!">Edit</a><a class="dropdown-item" href="#!">Refund</a>
                                  <div class="dropdown-divider"></div><a class="dropdown-item text-warning" href="#!">Archive</a><a class="dropdown-item text-danger" href="#!">Delete</a>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr class="btn-reveal-trigger fw-semi-bold">
                            <td class="align-middle white-space-nowrap title"><a href="../app/e-learning/course/course-details.html">Composition in Comics: Easy to Read Between Panels</a></td>
                            <td class="align-middle text-nowrap name"><a class="text-800" href="../app/e-learning/trainer-profile.html">Bill finger</a></td>
                            <td class="align-middle white-space-nowrap text-end published">14/05/21</td>
                            <td class="align-middle text-end enrolled">92,603</td>
                            <td class="align-middle text-end price">$39.50</td>
                            <td class="align-middle white-space-nowrap text-end">
                              <div class="dropstart font-sans-serif position-static d-inline-block"><button class="btn btn-link text-600 btn-sm dropdown-toggle btn-reveal float-end" type="button" id="dropdown-popularFreeCourses-2" data-bs-toggle="dropdown" data-boundary="window" aria-haspopup="true" aria-expanded="false" data-bs-reference="parent"><span class="fas fa-ellipsis-h fs-10"></span></button>
                                <div class="dropdown-menu dropdown-menu-end border py-2" aria-labelledby="dropdown-popularFreeCourses-2"><a class="dropdown-item" href="#!">View</a><a class="dropdown-item" href="#!">Edit</a><a class="dropdown-item" href="#!">Refund</a>
                                  <div class="dropdown-divider"></div><a class="dropdown-item text-warning" href="#!">Archive</a><a class="dropdown-item text-danger" href="#!">Delete</a>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr class="btn-reveal-trigger fw-semi-bold">
                            <td class="align-middle white-space-nowrap title"><a href="../app/e-learning/course/course-details.html">Comic Page Layout: Analysing The Classics</a></td>
                            <td class="align-middle text-nowrap name"><a class="text-800" href="../app/e-learning/trainer-profile.html">Bill finger</a></td>
                            <td class="align-middle white-space-nowrap text-end published">09/06/21</td>
                            <td class="align-middle text-end enrolled">32,106</td>
                            <td class="align-middle text-end price">$49.50</td>
                            <td class="align-middle white-space-nowrap text-end">
                              <div class="dropstart font-sans-serif position-static d-inline-block"><button class="btn btn-link text-600 btn-sm dropdown-toggle btn-reveal float-end" type="button" id="dropdown-popularFreeCourses-3" data-bs-toggle="dropdown" data-boundary="window" aria-haspopup="true" aria-expanded="false" data-bs-reference="parent"><span class="fas fa-ellipsis-h fs-10"></span></button>
                                <div class="dropdown-menu dropdown-menu-end border py-2" aria-labelledby="dropdown-popularFreeCourses-3"><a class="dropdown-item" href="#!">View</a><a class="dropdown-item" href="#!">Edit</a><a class="dropdown-item" href="#!">Refund</a>
                                  <div class="dropdown-divider"></div><a class="dropdown-item text-warning" href="#!">Archive</a><a class="dropdown-item text-danger" href="#!">Delete</a>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr class="btn-reveal-trigger fw-semi-bold">
                            <td class="align-middle white-space-nowrap title"><a href="../app/e-learning/course/course-details.html">Inking: Choosing Between Analog vs Digital</a></td>
                            <td class="align-middle text-nowrap name"><a class="text-800" href="../app/e-learning/trainer-profile.html">Bill finger</a></td>
                            <td class="align-middle white-space-nowrap text-end published">09/06/21</td>
                            <td class="align-middle text-end enrolled">9,312</td>
                            <td class="align-middle text-end price">$39.99</td>
                            <td class="align-middle white-space-nowrap text-end">
                              <div class="dropstart font-sans-serif position-static d-inline-block"><button class="btn btn-link text-600 btn-sm dropdown-toggle btn-reveal float-end" type="button" id="dropdown-popularFreeCourses-4" data-bs-toggle="dropdown" data-boundary="window" aria-haspopup="true" aria-expanded="false" data-bs-reference="parent"><span class="fas fa-ellipsis-h fs-10"></span></button>
                                <div class="dropdown-menu dropdown-menu-end border py-2" aria-labelledby="dropdown-popularFreeCourses-4"><a class="dropdown-item" href="#!">View</a><a class="dropdown-item" href="#!">Edit</a><a class="dropdown-item" href="#!">Refund</a>
                                  <div class="dropdown-divider"></div><a class="dropdown-item text-warning" href="#!">Archive</a><a class="dropdown-item text-danger" href="#!">Delete</a>
                                </div>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div class="tab-pane" id="topPaid" role="tabpanel" aria-labelledby="topPaid-tab">
                <div class="z-1" id="topPaidCourses" data-list='{"valueNames":["title","name","published","enrolled","price"],"page":4}'>
                  <div class="px-0 py-0">
                    <div class="table-responsive scrollbar">
                      <table class="table fs-10 mb-0 overflow-hidden">
                        <thead class="bg-body-tertiary">
                          <tr class="font-sans-serif">
                            <th class="text-900 fw-medium sort pe-1 align-middle" data-sort="title">Course Title</th>
                            <th class="text-900 fw-medium sort pe-1 align-middle" data-sort="name">Trainer</th>
                            <th class="text-900 fw-medium sort pe-1 align-middle text-end" data-sort="published">Published on</th>
                            <th class="text-900 fw-medium sort pe-1 align-middle text-end" data-sort="enrolled">Enrolled</th>
                            <th class="text-900 fw-medium sort pe-1 align-middle text-end text-end" data-sort="price">Price</th>
                            <th class="text-900 fw-medium no-sort pe-1 align-middle data-table-row-action"></th>
                          </tr>
                        </thead>
                        <tbody class="list">
                          <tr class="btn-reveal-trigger fw-semi-bold">
                            <td class="align-middle white-space-nowrap title"><a href="../app/e-learning/course/course-details.html">Character Art School: Character Drawing Course</a></td>
                            <td class="align-middle text-nowrap name"><a class="text-800" href="../app/e-learning/trainer-profile.html">Bruce Timm</a></td>
                            <td class="align-middle white-space-nowrap text-end published">01/09/21</td>
                            <td class="align-middle text-end enrolled">3,625</td>
                            <td class="align-middle text-end price">$65.99</td>
                            <td class="align-middle white-space-nowrap text-end">
                              <div class="dropstart font-sans-serif position-static d-inline-block"><button class="btn btn-link text-600 btn-sm dropdown-toggle btn-reveal float-end" type="button" id="dropdown-topPaidCourses-1" data-bs-toggle="dropdown" data-boundary="window" aria-haspopup="true" aria-expanded="false" data-bs-reference="parent"><span class="fas fa-ellipsis-h fs-10"></span></button>
                                <div class="dropdown-menu dropdown-menu-end border py-2" aria-labelledby="dropdown-topPaidCourses-1"><a class="dropdown-item" href="#!">View</a><a class="dropdown-item" href="#!">Edit</a><a class="dropdown-item" href="#!">Refund</a>
                                  <div class="dropdown-divider"></div><a class="dropdown-item text-warning" href="#!">Archive</a><a class="dropdown-item text-danger" href="#!">Delete</a>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr class="btn-reveal-trigger fw-semi-bold">
                            <td class="align-middle white-space-nowrap title"><a href="../app/e-learning/course/course-details.html">User Experience Design Essentials</a></td>
                            <td class="align-middle text-nowrap name"><a class="text-800" href="../app/e-learning/trainer-profile.html">Bill finger</a></td>
                            <td class="align-middle white-space-nowrap text-end published">15/12/21</td>
                            <td class="align-middle text-end enrolled">1,202</td>
                            <td class="align-middle text-end price">$25.20</td>
                            <td class="align-middle white-space-nowrap text-end">
                              <div class="dropstart font-sans-serif position-static d-inline-block"><button class="btn btn-link text-600 btn-sm dropdown-toggle btn-reveal float-end" type="button" id="dropdown-topPaidCourses-2" data-bs-toggle="dropdown" data-boundary="window" aria-haspopup="true" aria-expanded="false" data-bs-reference="parent"><span class="fas fa-ellipsis-h fs-10"></span></button>
                                <div class="dropdown-menu dropdown-menu-end border py-2" aria-labelledby="dropdown-topPaidCourses-2"><a class="dropdown-item" href="#!">View</a><a class="dropdown-item" href="#!">Edit</a><a class="dropdown-item" href="#!">Refund</a>
                                  <div class="dropdown-divider"></div><a class="dropdown-item text-warning" href="#!">Archive</a><a class="dropdown-item text-danger" href="#!">Delete</a>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr class="btn-reveal-trigger fw-semi-bold">
                            <td class="align-middle white-space-nowrap title"><a href="../app/e-learning/course/course-details.html">The Art &amp; Science of Drawing</a></td>
                            <td class="align-middle text-nowrap name"><a class="text-800" href="../app/e-learning/trainer-profile.html">J. H. Williams III</a></td>
                            <td class="align-middle white-space-nowrap text-end published">03/09/21</td>
                            <td class="align-middle text-end enrolled">35,666</td>
                            <td class="align-middle text-end price">$45.49</td>
                            <td class="align-middle white-space-nowrap text-end">
                              <div class="dropstart font-sans-serif position-static d-inline-block"><button class="btn btn-link text-600 btn-sm dropdown-toggle btn-reveal float-end" type="button" id="dropdown-topPaidCourses-3" data-bs-toggle="dropdown" data-boundary="window" aria-haspopup="true" aria-expanded="false" data-bs-reference="parent"><span class="fas fa-ellipsis-h fs-10"></span></button>
                                <div class="dropdown-menu dropdown-menu-end border py-2" aria-labelledby="dropdown-topPaidCourses-3"><a class="dropdown-item" href="#!">View</a><a class="dropdown-item" href="#!">Edit</a><a class="dropdown-item" href="#!">Refund</a>
                                  <div class="dropdown-divider"></div><a class="dropdown-item text-warning" href="#!">Archive</a><a class="dropdown-item text-danger" href="#!">Delete</a>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr class="btn-reveal-trigger fw-semi-bold">
                            <td class="align-middle white-space-nowrap title"><a href="../app/e-learning/course/course-details.html">Abstract Painting: One-to-One</a></td>
                            <td class="align-middle text-nowrap name"><a class="text-800" href="../app/e-learning/trainer-profile.html">Bill finger</a></td>
                            <td class="align-middle white-space-nowrap text-end published">03/09/21</td>
                            <td class="align-middle text-end enrolled">6,356</td>
                            <td class="align-middle text-end price">$20.49</td>
                            <td class="align-middle white-space-nowrap text-end">
                              <div class="dropstart font-sans-serif position-static d-inline-block"><button class="btn btn-link text-600 btn-sm dropdown-toggle btn-reveal float-end" type="button" id="dropdown-topPaidCourses-4" data-bs-toggle="dropdown" data-boundary="window" aria-haspopup="true" aria-expanded="false" data-bs-reference="parent"><span class="fas fa-ellipsis-h fs-10"></span></button>
                                <div class="dropdown-menu dropdown-menu-end border py-2" aria-labelledby="dropdown-topPaidCourses-4"><a class="dropdown-item" href="#!">View</a><a class="dropdown-item" href="#!">Edit</a><a class="dropdown-item" href="#!">Refund</a>
                                  <div class="dropdown-divider"></div><a class="dropdown-item text-warning" href="#!">Archive</a><a class="dropdown-item text-danger" href="#!">Delete</a>
                                </div>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div class="tab-pane" id="topFree" role="tabpanel" aria-labelledby="topFree-tab">
                <div class="z-1" id="topFreeCourses" data-list='{"valueNames":["title","name","published","enrolled","price"],"page":4}'>
                  <div class="px-0 py-0">
                    <div class="table-responsive scrollbar">
                      <table class="table fs-10 mb-0 overflow-hidden">
                        <thead class="bg-body-tertiary">
                          <tr class="font-sans-serif">
                            <th class="text-900 fw-medium sort pe-1 align-middle" data-sort="title">Course Title</th>
                            <th class="text-900 fw-medium sort pe-1 align-middle" data-sort="name">Trainer</th>
                            <th class="text-900 fw-medium sort pe-1 align-middle text-end" data-sort="published">Published on</th>
                            <th class="text-900 fw-medium sort pe-1 align-middle text-end" data-sort="enrolled">Enrolled</th>
                            <th class="text-900 fw-medium sort pe-1 align-middle text-end text-end" data-sort="price">Price</th>
                            <th class="text-900 fw-medium no-sort pe-1 align-middle data-table-row-action"></th>
                          </tr>
                        </thead>
                        <tbody class="list">
                          <tr class="btn-reveal-trigger fw-semi-bold">
                            <td class="align-middle white-space-nowrap title"><a href="../app/e-learning/course/course-details.html">Portrait Drawing Fundamentals Made Simple</a></td>
                            <td class="align-middle text-nowrap name"><a class="text-800" href="../app/e-learning/trainer-profile.html">Bill finger</a></td>
                            <td class="align-middle white-space-nowrap text-end published">05/10/20</td>
                            <td class="align-middle text-end enrolled">10,356</td>
                            <td class="align-middle text-end price">$36.49</td>
                            <td class="align-middle white-space-nowrap text-end">
                              <div class="dropstart font-sans-serif position-static d-inline-block"><button class="btn btn-link text-600 btn-sm dropdown-toggle btn-reveal float-end" type="button" id="dropdown-topFreeCourses-1" data-bs-toggle="dropdown" data-boundary="window" aria-haspopup="true" aria-expanded="false" data-bs-reference="parent"><span class="fas fa-ellipsis-h fs-10"></span></button>
                                <div class="dropdown-menu dropdown-menu-end border py-2" aria-labelledby="dropdown-topFreeCourses-1"><a class="dropdown-item" href="#!">View</a><a class="dropdown-item" href="#!">Edit</a><a class="dropdown-item" href="#!">Refund</a>
                                  <div class="dropdown-divider"></div><a class="dropdown-item text-warning" href="#!">Archive</a><a class="dropdown-item text-danger" href="#!">Delete</a>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr class="btn-reveal-trigger fw-semi-bold">
                            <td class="align-middle white-space-nowrap title"><a href="../app/e-learning/course/course-details.html">Anatomy for Figure Drawing</a></td>
                            <td class="align-middle text-nowrap name"><a class="text-800" href="../app/e-learning/trainer-profile.html">J. H. Williams</a></td>
                            <td class="align-middle white-space-nowrap text-end published">26/10/20</td>
                            <td class="align-middle text-end enrolled">12,386</td>
                            <td class="align-middle text-end price">$30.99</td>
                            <td class="align-middle white-space-nowrap text-end">
                              <div class="dropstart font-sans-serif position-static d-inline-block"><button class="btn btn-link text-600 btn-sm dropdown-toggle btn-reveal float-end" type="button" id="dropdown-topFreeCourses-2" data-bs-toggle="dropdown" data-boundary="window" aria-haspopup="true" aria-expanded="false" data-bs-reference="parent"><span class="fas fa-ellipsis-h fs-10"></span></button>
                                <div class="dropdown-menu dropdown-menu-end border py-2" aria-labelledby="dropdown-topFreeCourses-2"><a class="dropdown-item" href="#!">View</a><a class="dropdown-item" href="#!">Edit</a><a class="dropdown-item" href="#!">Refund</a>
                                  <div class="dropdown-divider"></div><a class="dropdown-item text-warning" href="#!">Archive</a><a class="dropdown-item text-danger" href="#!">Delete</a>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr class="btn-reveal-trigger fw-semi-bold">
                            <td class="align-middle white-space-nowrap title"><a href="../app/e-learning/course/course-details.html">Complete Perspective Drawing Course</a></td>
                            <td class="align-middle text-nowrap name"><a class="text-800" href="../app/e-learning/trainer-profile.html">Bruce Timm</a></td>
                            <td class="align-middle white-space-nowrap text-end published">26/09/21</td>
                            <td class="align-middle text-end enrolled">6,757</td>
                            <td class="align-middle text-end price">$23.99</td>
                            <td class="align-middle white-space-nowrap text-end">
                              <div class="dropstart font-sans-serif position-static d-inline-block"><button class="btn btn-link text-600 btn-sm dropdown-toggle btn-reveal float-end" type="button" id="dropdown-topFreeCourses-3" data-bs-toggle="dropdown" data-boundary="window" aria-haspopup="true" aria-expanded="false" data-bs-reference="parent"><span class="fas fa-ellipsis-h fs-10"></span></button>
                                <div class="dropdown-menu dropdown-menu-end border py-2" aria-labelledby="dropdown-topFreeCourses-3"><a class="dropdown-item" href="#!">View</a><a class="dropdown-item" href="#!">Edit</a><a class="dropdown-item" href="#!">Refund</a>
                                  <div class="dropdown-divider"></div><a class="dropdown-item text-warning" href="#!">Archive</a><a class="dropdown-item text-danger" href="#!">Delete</a>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr class="btn-reveal-trigger fw-semi-bold">
                            <td class="align-middle white-space-nowrap title"><a href="../app/e-learning/course/course-details.html">The Ultimate Animal Drawing Course</a></td>
                            <td class="align-middle text-nowrap name"><a class="text-800" href="../app/e-learning/trainer-profile.html">Bruce Timm</a></td>
                            <td class="align-middle white-space-nowrap text-end published">06/12/21</td>
                            <td class="align-middle text-end enrolled">7,658</td>
                            <td class="align-middle text-end price">$19.99</td>
                            <td class="align-middle white-space-nowrap text-end">
                              <div class="dropstart font-sans-serif position-static d-inline-block"><button class="btn btn-link text-600 btn-sm dropdown-toggle btn-reveal float-end" type="button" id="dropdown-topFreeCourses-4" data-bs-toggle="dropdown" data-boundary="window" aria-haspopup="true" aria-expanded="false" data-bs-reference="parent"><span class="fas fa-ellipsis-h fs-10"></span></button>
                                <div class="dropdown-menu dropdown-menu-end border py-2" aria-labelledby="dropdown-topFreeCourses-4"><a class="dropdown-item" href="#!">View</a><a class="dropdown-item" href="#!">Edit</a><a class="dropdown-item" href="#!">Refund</a>
                                  <div class="dropdown-divider"></div><a class="dropdown-item text-warning" href="#!">Archive</a><a class="dropdown-item text-danger" href="#!">Delete</a>
                                </div>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="card-footer bg-body-tertiary py-2">
            <div class="row flex-between-center g-0">
              <div class="col-auto"><select class="form-select form-select-sm">
                  <option value="week" selected="selected">Last 7 days</option>
                  <option value="month">Last month</option>
                </select></div>
              <div class="col-auto"><a class="btn btn-link btn-sm px-0 fw-medium" href="../app/e-learning/course/course-list.html">All Courses<span class="fas fa-chevron-right ms-1 fs-11"></span></a></div>
            </div>
          </div>
        </div>
        <div class="row g-3 mb-3">
          <div class="col-lg-6 col-xxl-7">
            <div class="card" id="LmsUserByLocationTable" data-list='{"valueNames":["country","users","revenue","native-support"],"page":4}'>
              <div class="card-header d-flex flex-between-center bg-body-tertiary py-2">
                <h6 class="mb-0">User Location</h6>
                <div class="dropdown font-sans-serif btn-reveal-trigger"><button class="btn btn-link text-600 btn-sm dropdown-toggle dropdown-caret-none btn-reveal" type="button" id="lms-user-by-location" data-bs-toggle="dropdown" data-boundary="viewport" aria-haspopup="true" aria-expanded="false"><span class="fas fa-ellipsis-h fs-11"></span></button>
                  <div class="dropdown-menu dropdown-menu-end border py-2" aria-labelledby="lms-user-by-location"><a class="dropdown-item" href="#!">View</a><a class="dropdown-item" href="#!">Export</a>
                    <div class="dropdown-divider"></div><a class="dropdown-item text-danger" href="#!">Remove</a>
                  </div>
                </div>
              </div>
              <div class="card-body pb-0 position-relative"><!-- Find the JS file for the following chart at: src/js/charts/echarts/user-by-location-lms.js--><!-- If you are not using gulp based workflow, you can find the transpiled code at: public/assets/js/theme.js-->
                <div class="echart-user-by-location-map" data-echart-responsive="true" style="height:302px;"></div>
                <div class="position-absolute top-0 border mt-3 border-200 rounded-3 bg-body-tertiary"><button class="btn btn-link btn-sm bg-100 rounded-bottom-0 px-2 user-by-location-map-zoom text-700" type="button"><span class="fas fa-plus fs-10"></span></button>
                  <hr class="text-200 m-0" /><button class="btn btn-link btn-sm bg-100 rounded-top-0 px-2 user-by-location-map-zoomOut text-700" type="button"><span class="fas fa-minus fs-10"></span></button>
                </div>
                <div class="mt-3">
                  <div class="bar-indicator-gradient mb-1"></div>
                  <div class="d-flex flex-between-center fs-11">
                    <p class="mb-0">less than 1k</p>
                    <p class="mb-0">more than 100k</p>
                  </div>
                </div>
                <div class="table-responsive scrollbar mx-nx1 mt-3">
                  <table class="table fs-10 mb-0">
                    <thead class="bg-body-tertiary">
                      <tr class="font-sans-serif">
                        <th class="text-800 sort" data-sort="country" style="width: 40%">Country</th>
                        <th class="text-800 sort text-end" data-sort="users">User Count</th>
                        <th class="text-800 sort text-end" data-sort="revenue">Revenue</th>
                        <th class="text-800 sort text-end w-25" data-sort="native-support">Language Support</th>
                      </tr>
                    </thead>
                    <tbody class="list">
                      <tr class="fw-semi-bold">
                        <td class="align-middle py-3"><a href="#!">
                            <p class="mb-0 text-primary country">Bahrain</p>
                          </a></td>
                        <td class="align-middle text-end users">900</td>
                        <td class="align-middle text-end revenue">$3997</td>
                        <td class="align-middle pe-x1 text-end native-support"><span class="badge badge rounded-pill fw-medium fs-11 badge-subtle-danger">Unavailable</span></td>
                      </tr>
                      <tr class="fw-semi-bold">
                        <td class="align-middle py-3"><a href="#!">
                            <p class="mb-0 text-primary country">Bangladesh</p>
                          </a></td>
                        <td class="align-middle text-end users">123k</td>
                        <td class="align-middle text-end revenue">$6700</td>
                        <td class="align-middle pe-x1 text-end native-support"><span class="badge badge rounded-pill fw-medium fs-11 badge-subtle-warning">Early Beta</span></td>
                      </tr>
                      <tr class="fw-semi-bold">
                        <td class="align-middle py-3"><a href="#!">
                            <p class="mb-0 text-primary country">Belarus</p>
                          </a></td>
                        <td class="align-middle text-end users">6.5k</td>
                        <td class="align-middle text-end revenue">$5949</td>
                        <td class="align-middle pe-x1 text-end native-support"><span class="badge badge rounded-pill fw-medium fs-11 badge-subtle-danger">Unavailable</span></td>
                      </tr>
                      <tr class="fw-semi-bold">
                        <td class="align-middle py-3"><a href="#!">
                            <p class="mb-0 text-primary country">Belgium</p>
                          </a></td>
                        <td class="align-middle text-end users">27k</td>
                        <td class="align-middle text-end revenue">$73000</td>
                        <td class="align-middle pe-x1 text-end native-support"><span class="badge badge rounded-pill fw-medium fs-11 badge-subtle-success">Available</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="card-footer bg-body-tertiary text-end py-2"><a class="btn btn-link btn-sm px-0 fw-medium" href="#!">View all<span class="fas fa-chevron-right ms-1 fs-11"></span></a></div>
            </div>
          </div>
          <div class="col-lg-6 col-xxl-5">
            <div class="card h-100">
              <div class="card-header bg-body-tertiary d-flex flex-between-center py-2">
                <h6 class="mb-0">Marketing Expenses</h6>
                <div class="ms-auto"><a class="btn btn-link btn-sm px-0 fw-medium" href="#!">Full Report<span class="fas fa-external-link-alt ms-1 fs-11"></span></a></div>
              </div>
              <div class="card-body d-flex flex-column justify-content-between">
                <div class="position-relative"><!-- Find the JS file for the following chart at: src/js/charts/echarts/marketing-expenses.js--><!-- If you are not using gulp based workflow, you can find the transpiled code at: public/assets/js/theme.js-->
                  <div class="echart-marketing-expenses" data-echart-responsive="true"></div>
                  <div class="absolute-centered">
                    <div class="rounded-circle d-flex flex-center marketing-exp-circle">
                      <h4 class="mb-0 text-900">$1.1M</h4>
                    </div>
                  </div>
                </div>
                <div class="row g-3 font-sans-serif">
                  <div class="col-sm-6">
                    <div class="rounded-3 border p-3">
                      <div class="d-flex align-items-center mb-4"><span class="dot bg-info bg-opacity-25"></span>
                        <h6 class="mb-0 fw-bold">Digital Marketing</h6>
                      </div>
                      <ul class="list-unstyled mb-0">
                        <li class="d-flex align-items-center fs-11 fw-medium pt-1 mb-3"><span class="dot bg-info bg-opacity-100"></span>
                          <p class="lh-sm mb-0 text-700">Generate Backlinks<span class="text-900 ps-2">$91.6k</span></p>
                        </li>
                        <li class="d-flex align-items-center fs-11 fw-medium pt-1 mb-3"><span class="dot bg-info bg-opacity-75"></span>
                          <p class="lh-sm mb-0 text-700">Email Marketing<span class="text-900 ps-2">$183k</span></p>
                        </li>
                        <li class="d-flex align-items-center fs-11 fw-medium pt-1 mb-3"><span class="dot bg-info bg-opacity-50"></span>
                          <p class="lh-sm mb-0 text-700">Influencer Marketing<span class="text-900 ps-2">$138k</span></p>
                        </li>
                        <li class="d-flex align-items-center fs-11 fw-medium pt-1 mb-3"><span class="dot bg-info bg-opacity-25"></span>
                          <p class="lh-sm mb-0 text-700">Google Ads<span class="text-900 ps-2">$45.9k</span></p>
                        </li>
                        <li class="d-flex align-items-center fs-11 fw-medium pt-1 false"><span class="dot bg-info bg-opacity-10"></span>
                          <p class="lh-sm mb-0 text-700">Social Media<span class="text-900 ps-2">$183k</span></p>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <div class="rounded-3 border p-3 h-100">
                      <div class="d-flex align-items-center mb-4"><span class="dot bg-primary"></span>
                        <h6 class="mb-0 fw-bold">Offline Marketing</h6>
                      </div>
                      <ul class="list-unstyled mb-0">
                        <li class="d-flex align-items-center fs-11 fw-medium pt-1 mb-3"><span class="dot bg-primary bg-opacity-75"></span>
                          <p class="lh-sm mb-0 text-700">Event Sponsorship<span class="text-900 ps-2">$91.6k</span></p>
                        </li>
                        <li class="d-flex align-items-center fs-11 fw-medium pt-1 mb-3"><span class="dot bg-primary bg-opacity-50"></span>
                          <p class="lh-sm mb-0 text-700">Outrich Event<span class="text-900 ps-2">$183k</span></p>
                        </li>
                        <li class="d-flex align-items-center fs-11 fw-medium pt-1"><span class="dot bg-primary bg-opacity-25"></span>
                          <p class="lh-sm mb-0 text-700">Ad Campaign<span class="text-900 ps-2">$138k</span></p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-footer bg-body-tertiary py-2 d-flex">
                <div class="ms-auto"><select class="form-select form-select-sm">
                    <option value="3months" selected="selected">Last 3 months</option>
                    <option value="1month">Last month</option>
                  </select></div>
              </div>
            </div>
          </div>
        </div>
        <div class="row g-3">
          <div class="col-lg-6 col-xxl-5">
            <div class="card h-100">
              <div class="card-header bg-body-tertiary d-flex flex-between-center py-2">
                <h6 class="mb-0">Weekly Goal</h6>
                <div class="dropdown font-sans-serif btn-reveal-trigger"><button class="btn btn-link text-600 btn-sm dropdown-toggle dropdown-caret-none btn-reveal" type="button" id="lms-weekly-goal" data-bs-toggle="dropdown" data-boundary="viewport" aria-haspopup="true" aria-expanded="false"><span class="fas fa-ellipsis-h fs-11"></span></button>
                  <div class="dropdown-menu dropdown-menu-end border py-2" aria-labelledby="lms-weekly-goal"><a class="dropdown-item" href="#!">View</a><a class="dropdown-item" href="#!">Export</a>
                    <div class="dropdown-divider"></div><a class="dropdown-item text-danger" href="#!">Remove</a>
                  </div>
                </div>
              </div>
              <div class="card-body">
                <div class="row align-items-center">
                  <div class="col-sm-4">
                    <div class="pb-3 mb-3 border-bottom border-200">
                      <div class="position-relative ps-3">
                        <div class="position-absolute h-100 start-0 rounded bg-info" style="width: 4px;"></div>
                        <h6 class="fs-11 text-600 mb-1">Site Visit</h6>
                        <div class="d-flex align-items-center">
                          <h5 class="fs-7 text-700 mb-0 me-2" data-countup='{"endValue":79,"suffix":"%"}'>0</h5><span class="badge rounded-pill fs-11 fw-medium badge-subtle-success"><span class="fas fa-check"></span> On par</span>
                        </div>
                      </div>
                    </div>
                    <div class="pb-3 mb-3 border-bottom border-200">
                      <div class="position-relative ps-3">
                        <div class="position-absolute h-100 start-0 rounded bg-primary" style="width: 4px;"></div>
                        <h6 class="fs-11 text-600 mb-1">Support</h6>
                        <div class="d-flex align-items-center">
                          <h5 class="fs-7 text-700 mb-0 me-2" data-countup='{"endValue":85,"suffix":"%"}'>0</h5><span class="badge rounded-pill fs-11 fw-medium badge-subtle-primary"><span class="fas fa-caret-up"></span> Ahead</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="position-relative ps-3">
                        <div class="position-absolute h-100 start-0 rounded bg-success" style="width: 4px;"></div>
                        <h6 class="fs-11 text-600 mb-1">Revenue</h6>
                        <div class="d-flex align-items-center">
                          <h5 class="fs-7 text-700 mb-0 me-2" data-countup='{"endValue":70,"suffix":"%"}'>0</h5><span class="badge rounded-pill fs-11 fw-medium badge-subtle-danger"><span class="fas fa-caret-down"></span> Behind</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-8 h-100"><!-- Find the JS file for the following chart at: src/js/charts/echarts/weekly-goals-lms.js--><!-- If you are not using gulp based workflow, you can find the transpiled code at: public/assets/js/theme.js-->
                    <div class="echart-weekly-goals-lms" data-echart-responsive="true"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-6 col-xxl-7">
            <div class="card h-100">
              <div class="card-header bg-body-tertiary d-flex flex-between-center py-2">
                <h6 class="mb-0">Course Enrollment</h6>
                <div class="ms-auto"><select class="form-select form-select-sm">
                    <option value="week" selected="selected">Last 7 days</option>
                    <option value="month">Last month</option>
                  </select></div>
              </div>
              <div class="card-body"><!-- Find the JS file for the following chart at: src/js/charts/echarts/course-enrollments.js--><!-- If you are not using gulp based workflow, you can find the transpiled code at: public/assets/js/theme.js-->
                <div class="echart-bar-course-enrollments" data-echart-responsive="true"></div>
              </div>
            </div>
          </div>
        </div>
        <footer class="footer">
          <div class="row g-0 justify-content-between fs-10 mt-4 mb-3">
            <div class="col-12 col-sm-auto text-center">
              <p class="mb-0 text-600">Thank you for creating with Falcon <span class="d-none d-sm-inline-block">| </span><br class="d-sm-none" /> 2025 &copy; <a href="https://themewagon.com">Themewagon</a></p>
            </div>
            <div class="col-12 col-sm-auto text-center">
              <p class="mb-0 text-600">v3.24.0</p>
            </div>
          </div>
        </footer>
      </div>
      <div class="modal fade" id="authentication-modal" tabindex="-1" role="dialog" aria-labelledby="authentication-modal-label" aria-hidden="true">
        <div class="modal-dialog mt-6" role="document">
          <div class="modal-content border-0">
            <div class="modal-header px-5 position-relative modal-shape-header bg-shape">
              <div class="position-relative z-1">
                <h4 class="mb-0 text-white" id="authentication-modal-label">Register</h4>
                <p class="fs-10 mb-0 text-white">Please create your free Falcon account</p>
              </div>
              <div data-bs-theme="dark"><button class="btn-close position-absolute top-0 end-0 mt-2 me-2" data-bs-dismiss="modal" aria-label="Close"></button></div>
            </div>
            <div class="modal-body py-4 px-5">
              <form>
                <div class="mb-3"><label class="form-label" for="modal-auth-name">Name</label><input class="form-control" type="text" autocomplete="on" id="modal-auth-name" /></div>
                <div class="mb-3"><label class="form-label" for="modal-auth-email">Email address</label><input class="form-control" type="email" autocomplete="on" id="modal-auth-email" /></div>
                <div class="row gx-2">
                  <div class="mb-3 col-sm-6"><label class="form-label" for="modal-auth-password">Password</label><input class="form-control" type="password" autocomplete="on" id="modal-auth-password" /></div>
                  <div class="mb-3 col-sm-6"><label class="form-label" for="modal-auth-confirm-password">Confirm Password</label><input class="form-control" type="password" autocomplete="on" id="modal-auth-confirm-password" /></div>
                </div>
                <div class="form-check"><input class="form-check-input" type="checkbox" id="modal-auth-register-checkbox" /><label class="form-label" for="modal-auth-register-checkbox">I accept the <a href="#!">terms </a>and <a class="white-space-nowrap" href="#!">privacy policy</a></label></div>
                <div class="mb-3"><button class="btn btn-primary d-block w-100 mt-3" type="submit" name="submit">Register</button></div>
              </form>
              <div class="position-relative mt-5">
                <hr />
                <div class="divider-content-center">or register with</div>
              </div>
              <div class="row g-2 mt-2">
                <div class="col-sm-6"><a class="btn btn-outline-google-plus btn-sm d-block w-100" href="#"><span class="fab fa-google-plus-g me-2" data-fa-transform="grow-8"></span> google</a></div>
                <div class="col-sm-6"><a class="btn btn-outline-facebook btn-sm d-block w-100" href="#"><span class="fab fa-facebook-square me-2" data-fa-transform="grow-8"></span> facebook</a></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main><!-- ===============================================--><!--    End of Main Content--><!-- ===============================================-->

  <div class="offcanvas offcanvas-end settings-panel border-0" id="settings-offcanvas" tabindex="-1" aria-labelledby="settings-offcanvas">
    <div class="offcanvas-header settings-panel-header justify-content-between bg-shape">
      <div class="z-1 py-1">
        <div class="d-flex justify-content-between align-items-center mb-1">
          <h5 class="text-white mb-0 me-2"><span class="fas fa-palette me-2 fs-9"></span>Settings</h5><button class="btn btn-primary btn-sm rounded-pill mt-0 mb-0" data-theme-control="reset" style="font-size:12px"> <span class="fas fa-redo-alt me-1" data-fa-transform="shrink-3"></span>Reset</button>
        </div>
        <p class="mb-0 fs-10 text-white opacity-75"> Set your own customized style</p>
      </div>
      <div class="z-1" data-bs-theme="dark"><button class="btn-close z-1 mt-0" type="button" data-bs-dismiss="offcanvas" aria-label="Close"></button></div>
    </div>
    <div class="offcanvas-body scrollbar-overlay px-x1 h-100" id="themeController">
      <h5 class="fs-9">Color Scheme</h5>
      <p class="fs-10">Choose the perfect color mode for your app.</p>
      <div class="btn-group d-block w-100 btn-group-navbar-style">
        <div class="row gx-2">
          <div class="col-4"><input class="btn-check" id="themeSwitcherLight" name="theme-color" type="radio" value="light" data-theme-control="theme" /><label class="btn d-inline-block btn-navbar-style fs-10" for="themeSwitcherLight"> <span class="hover-overlay mb-2 rounded d-block"><img class="img-fluid img-prototype mb-0" src="../assets/img/generic/falcon-mode-default.jpg" alt=""/></span><span class="label-text">Light</span></label></div>
          <div class="col-4"><input class="btn-check" id="themeSwitcherDark" name="theme-color" type="radio" value="dark" data-theme-control="theme" /><label class="btn d-inline-block btn-navbar-style fs-10" for="themeSwitcherDark"> <span class="hover-overlay mb-2 rounded d-block"><img class="img-fluid img-prototype mb-0" src="../assets/img/generic/falcon-mode-dark.jpg" alt=""/></span><span class="label-text"> Dark</span></label></div>
          <div class="col-4"><input class="btn-check" id="themeSwitcherAuto" name="theme-color" type="radio" value="auto" data-theme-control="theme" /><label class="btn d-inline-block btn-navbar-style fs-10" for="themeSwitcherAuto"> <span class="hover-overlay mb-2 rounded d-block"><img class="img-fluid img-prototype mb-0" src="../assets/img/generic/falcon-mode-auto.jpg" alt=""/></span><span class="label-text"> Auto</span></label></div>
        </div>
      </div>
      <hr />
      <div class="d-flex justify-content-between">
        <div class="d-flex align-items-start"><img class="me-2" src="../assets/img/icons/left-arrow-from-left.svg" width="20" alt="" />
          <div class="flex-1">
            <h5 class="fs-9">RTL Mode</h5>
            <p class="fs-10 mb-0">Switch your language direction </p><a class="fs-10" href="../documentation/customization/configuration.html">RTL Documentation</a>
          </div>
        </div>
        <div class="form-check form-switch"><input class="form-check-input ms-0" id="mode-rtl" type="checkbox" data-theme-control="isRTL" /></div>
      </div>
      <hr />
      <div class="d-flex justify-content-between">
        <div class="d-flex align-items-start"><img class="me-2" src="../assets/img/icons/arrows-h.svg" width="20" alt="" />
          <div class="flex-1">
            <h5 class="fs-9">Fluid Layout</h5>
            <p class="fs-10 mb-0">Toggle container layout system </p><a class="fs-10" href="../documentation/customization/configuration.html">Fluid Documentation</a>
          </div>
        </div>
        <div class="form-check form-switch"><input class="form-check-input ms-0" id="mode-fluid" type="checkbox" data-theme-control="isFluid" /></div>
      </div>
      <hr />
      <div class="d-flex align-items-start"><img class="me-2" src="../assets/img/icons/paragraph.svg" width="20" alt="" />
        <div class="flex-1">
          <h5 class="fs-9 d-flex align-items-center">Navigation Position</h5>
          <p class="fs-10 mb-2">Select a suitable navigation system for your web application </p>
          <div><select class="form-select form-select-sm" aria-label="Navbar position" data-theme-control="navbarPosition">
              <option value="vertical">Vertical</option>
              <option value="top">Top</option>
              <option value="combo">Combo</option>
              <option value="double-top">Double Top</option>
            </select></div>
        </div>
      </div>
      <hr />
      <h5 class="fs-9 d-flex align-items-center">Vertical Navbar Style</h5>
      <p class="fs-10 mb-0">Switch between styles for your vertical navbar </p>
      <p> <a class="fs-10" href="../modules/components/navs-and-tabs/vertical-navbar.html#navbar-styles">See Documentation</a></p>
      <div class="btn-group d-block w-100 btn-group-navbar-style">
        <div class="row gx-2">
          <div class="col-6"><input class="btn-check" id="navbar-style-transparent" type="radio" name="navbarStyle" value="transparent" data-theme-control="navbarStyle" /><label class="btn d-block w-100 btn-navbar-style fs-10" for="navbar-style-transparent"> <img class="img-fluid img-prototype" src="../assets/img/generic/default.png" alt="" /><span class="label-text"> Transparent</span></label></div>
          <div class="col-6"><input class="btn-check" id="navbar-style-inverted" type="radio" name="navbarStyle" value="inverted" data-theme-control="navbarStyle" /><label class="btn d-block w-100 btn-navbar-style fs-10" for="navbar-style-inverted"> <img class="img-fluid img-prototype" src="../assets/img/generic/inverted.png" alt="" /><span class="label-text"> Inverted</span></label></div>
          <div class="col-6"><input class="btn-check" id="navbar-style-card" type="radio" name="navbarStyle" value="card" data-theme-control="navbarStyle" /><label class="btn d-block w-100 btn-navbar-style fs-10" for="navbar-style-card"> <img class="img-fluid img-prototype" src="../assets/img/generic/card.png" alt="" /><span class="label-text"> Card</span></label></div>
          <div class="col-6"><input class="btn-check" id="navbar-style-vibrant" type="radio" name="navbarStyle" value="vibrant" data-theme-control="navbarStyle" /><label class="btn d-block w-100 btn-navbar-style fs-10" for="navbar-style-vibrant"> <img class="img-fluid img-prototype" src="../assets/img/generic/vibrant.png" alt="" /><span class="label-text"> Vibrant</span></label></div>
        </div>
      </div>
      <div class="text-center mt-5"><img class="mb-4" src="../assets/img/icons/spot-illustrations/47.png" alt="" width="120" />
        <h5>Like What You See?</h5>
        <p class="fs-10">Get Falcon now and create beautiful dashboards with hundreds of widgets.</p><a class="mb-3 btn btn-primary" href="https://themes.getbootstrap.com/product/falcon-admin-dashboard-webapp-template/" target="_blank">Purchase</a>
      </div>
    </div>
  </div><a class="card setting-toggle" href="#settings-offcanvas" data-bs-toggle="offcanvas">
    <div class="card-body d-flex align-items-center py-md-2 px-2 py-1">
      <div class="bg-primary-subtle position-relative rounded-start" style="height:34px;width:28px">
        <div class="settings-popover"><span class="ripple"><span class="fa-spin position-absolute all-0 d-flex flex-center"><span class="icon-spin position-absolute all-0 d-flex flex-center"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19.7369 12.3941L19.1989 12.1065C18.4459 11.7041 18.0843 10.8487 18.0843 9.99495C18.0843 9.14118 18.4459 8.28582 19.1989 7.88336L19.7369 7.59581C19.9474 7.47484 20.0316 7.23291 19.9474 7.03131C19.4842 5.57973 18.6843 4.28943 17.6738 3.20075C17.5053 3.03946 17.2527 2.99914 17.0422 3.12011L16.393 3.46714C15.6883 3.84379 14.8377 3.74529 14.1476 3.3427C14.0988 3.31422 14.0496 3.28621 14.0002 3.25868C13.2568 2.84453 12.7055 2.10629 12.7055 1.25525V0.70081C12.7055 0.499202 12.5371 0.297594 12.2845 0.257272C10.7266 -0.105622 9.16879 -0.0653007 7.69516 0.257272C7.44254 0.297594 7.31623 0.499202 7.31623 0.70081V1.23474C7.31623 2.09575 6.74999 2.8362 5.99824 3.25599C5.95774 3.27861 5.91747 3.30159 5.87744 3.32493C5.15643 3.74527 4.26453 3.85902 3.53534 3.45302L2.93743 3.12011C2.72691 2.99914 2.47429 3.03946 2.30587 3.20075C1.29538 4.28943 0.495411 5.57973 0.0322686 7.03131C-0.051939 7.23291 0.0322686 7.47484 0.242788 7.59581L0.784376 7.8853C1.54166 8.29007 1.92694 9.13627 1.92694 9.99495C1.92694 10.8536 1.54166 11.6998 0.784375 12.1046L0.242788 12.3941C0.0322686 12.515 -0.051939 12.757 0.0322686 12.9586C0.495411 14.4102 1.29538 15.7005 2.30587 16.7891C2.47429 16.9504 2.72691 16.9907 2.93743 16.8698L3.58669 16.5227C4.29133 16.1461 5.14131 16.2457 5.8331 16.6455C5.88713 16.6767 5.94159 16.7074 5.99648 16.7375C6.75162 17.1511 7.31623 17.8941 7.31623 18.7552V19.2891C7.31623 19.4425 7.41373 19.5959 7.55309 19.696C7.64066 19.7589 7.74815 19.7843 7.85406 19.8046C9.35884 20.0925 10.8609 20.0456 12.2845 19.7729C12.5371 19.6923 12.7055 19.4907 12.7055 19.2891V18.7346C12.7055 17.8836 13.2568 17.1454 14.0002 16.7312C14.0496 16.7037 14.0988 16.6757 14.1476 16.6472C14.8377 16.2446 15.6883 16.1461 16.393 16.5227L17.0422 16.8698C17.2527 16.9907 17.5053 16.9504 17.6738 16.7891C18.7264 15.7005 19.4842 14.4102 19.9895 12.9586C20.0316 12.757 19.9474 12.515 19.7369 12.3941ZM10.0109 13.2005C8.1162 13.2005 6.64257 11.7893 6.64257 9.97478C6.64257 8.20063 8.1162 6.74905 10.0109 6.74905C11.8634 6.74905 13.3792 8.20063 13.3792 9.97478C13.3792 11.7893 11.8634 13.2005 10.0109 13.2005Z" fill="#2A7BE4"></path></svg></span></span></span></div>
      </div><small class="text-uppercase text-primary fw-bold bg-primary-subtle py-2 pe-2 ps-1 rounded-end">customize</small>
    </div>
  </a>
</template>
<style>

</style>
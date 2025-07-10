<script setup>
import { onMounted,computed } from 'vue'
import { useRouter } from 'vue-router'
import { defineOptions } from 'vue'

// 声明组件名
defineOptions({ name: 'Institution' })

// 从 localStorage 取得当前用户角色
const role = ref(localStorage.getItem('userRole') || '')
const username = ref(localStorage.getItem('username') || '')

// 为模板写几个快捷 computed（可选）
const isAdmin      = computed(() => role.value === 'ADMIN')
const isAuditor    = computed(() => role.value === 'AUDITOR')
const isResearcher = computed(() => role.value === 'RESEARCHER')

// 路由跳转方法
const router = useRouter()
function goToDashboard()               { router.push({ name: 'Dashboard' }) }
function goToInstitution()             { router.push({ name: 'Institution' }) }
function goToHospitalType()            { router.push({ name: 'HospitalType' }) }
function goToHospitalGrade()           { router.push({ name: 'HospitalGrade' }) }
function goToMedicalExpenses()         { router.push({ name: 'MedicalExpenses' }) }
function goToHospitalNumber()          { router.push({ name: 'HospitalNumber' }) }
function goToLogout()                  { router.push({ name: 'Logout' }) }
function goToLogs()                    { router.push({ name: 'Logs' }) }
function goToMonitor()                 { router.push({ name: 'Monitor' }) }
function goToChat()                    { router.push({ name: 'Chat' }) }
function goToUserReview()              { router.push({ name: 'UserReview' }) }
function goToOperationReview()         { router.push({ name: 'OperationReview' }) }
function goToDescriptiveStatistics()   { router.push({ name: 'DescriptiveStatistics' }) }
function goToComparativeAnalysis()     { router.push({ name: 'ComparativeAnalysis' }) }
function goToCorrelationAnalysis()     { router.push({ name: 'CorrelationAnalysis' }) }
function goToTrendAnalysis()           { router.push({ name: 'TrendAnalysis' }) }
function goToDataProcess()             { router.push({ name: 'DataProcess' }) }
function goToPersonalCenter()          { router.push({ name: 'PersonalCenter' }) }
function goToResearcherApplication()   { router.push({ name: 'ResearcherApplication' }) }

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
                    <li class="nav-item">
                      <a class="nav-link" @click="goToInstitution" href="">
                          <div class="d-flex align-items-center"><span class="nav-link-text ps-1">全国医疗卫生机构</span></div>
                      </a><!-- more inner pages-->
                    </li>
                    <li class="nav-item"><a class="nav-link" @click="goToHospitalType" href="">
                          <div class="d-flex align-items-center"><span class="nav-link-text ps-1">医院类型</span></div>
                      </a><!-- more inner pages-->
                    </li>
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
              <!--管理员功能-->
              <li v-if="isAdmin" class="nav-item"><!-- label-->
                <div class="row navbar-vertical-label-wrapper mt-3 mb-2">
                  <div class="col-auto navbar-vertical-label">管理员</div>
                  <div class="col ps-0">
                    <hr class="mb-0 navbar-vertical-divider" />
                  </div>
                </div>
                <!-- parent pages:日志与监控-->
                  <a class="nav-link dropdown-indicator" href="#LogsAndMonitor" role="button" data-bs-toggle="collapse" aria-expanded="false" aria-controls="logsAndMonitor">
                  <div class="d-flex align-items-center"><span class="nav-link-icon"><span class="fas fa-wrench"></span></span><span class="nav-link-text ps-1">日志与监控</span></div>
                </a>
                <ul class="nav collapse show" id="LogsAndMonitor">
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
              <li v-if="isAuditor" class="nav-item"><!-- label-->
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
              <li v-if="isResearcher" class="nav-item"><!-- label-->
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
                <ul class="nav collapse show" id="Analysis">
                  <li class="nav-item"><a class="nav-link" @click="goToDescriptiveStatistics" href="">
                      <div class="d-flex align-items-center"><span class="nav-link-text ps-1">描述性统计</span></div>
                    </a><!-- more inner pages--></li>
                  <li class="nav-item">
                    <a class="nav-link" @click="goToCorrelationAnalysis" href="">
                      <div class="d-flex align-items-center"><span class="nav-link-text ps-1">相关性分析</span></div>
                    </a><!-- more inner pages-->
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" @click="goToTrendAnalysis" href="" data-bs-toggle="collapse" aria-expanded="false" aria-controls="charts">
                      <div class="d-flex align-items-center"><span class="nav-link-text ps-1">趋势分析</span></div>
                    </a><!-- more inner pages-->
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" @click="goToComparativeAnalysis" href="">
                      <div class="d-flex align-items-center"><span class="nav-link-text ps-1">对比分析</span></div>
                    </a><!-- more inner pages-->
                  </li>
                </ul>
                <!-- parent pages:数据处理-->
                <a class="nav-link" @click="goToDataProcess" href="" role="button" data-bs-toggle="collapse" aria-expanded="false" aria-controls="tables">
                  <div class="d-flex align-items-center"><span class="nav-link-icon"><span class="fas fa-table"></span></span><span class="nav-link-text ps-1">数据处理</span></div>
                </a>
                <!-- parent pages:反馈申请-->
                <a class="nav-link" @click="goToResearcherApplication" href="" role="button" data-bs-toggle="collapse" aria-expanded="false" aria-controls="tables">
                  <div class="d-flex align-items-center"><span class="nav-link-icon"><span class="fas fa-table"></span></span><span class="nav-link-text ps-1">反馈申请</span></div>
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
        <div class="row g-3 mb-3">
          <div class="col-xxl-6">
            <div class="row g-0 h-100">
              <div class="col-12">
                <div class="card bg-body-tertiary dark__bg-opacity-50 shadow-none">
                  <div class="bg-holder bg-card d-none d-sm-block" style="background-image:url(../../assets/img/illustrations/ticket-bg.png);"></div><!--/.bg-holder-->
                  <div class="d-flex align-items-center z-1 p-0">
                    <img src="../../assets/img/illustrations/crm-bar-chart.png" alt="" width="96" />
                    <div class="ms-n3">
                      <h6 class="mb-1 text-primary">欢迎来到</h6>
                      <h4 class="mb-0 text-primary fw-bold">健康大数据中心<span class="text-info fw-medium">   基于3万+健康数据，提供分析与建议</span></h4>
                    </div>
                    <img src="../../assets/img/illustrations/crm-line-chart.png" alt="" width="96" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row g-3 mb-3">
          <div class="col-xxl-8">
            <div class="card overflow-hidden mb-3">
              <div class="card-header audience-chart-header p-0 bg-body-tertiary scrollbar-overlay">
                <ul class="nav nav-tabs border-0 chart-tab flex-nowrap" id="audience-chart-tab" role="tablist">
                  <li class="nav-item" role="presentation"><a class="nav-link mb-0 active" id="users-tab" data-bs-toggle="tab" href="#users" role="tab" aria-controls="users" aria-selected="true">
                      <div class="audience-tab-item p-2 pe-4">
                        <h6 class="text-800 fs-11 text-nowrap">数据</h6>
                        <h5 class="text-800">583</h5>
                        <div class="d-flex align-items-center"><span class="fas fa-caret-up text-success"></span>
                          <h6 class="fs-11 mb-0 ms-2 text-success">62.0%</h6>
                        </div>
                      </div>
                    </a></li>
                  <li class="nav-item" role="presentation"><a class="nav-link mb-0" id="sessions-tab" data-bs-toggle="tab" href="#sessions" role="tab" aria-controls="sessions" aria-selected="false">
                      <div class="audience-tab-item p-2 pe-4">
                        <h6 class="text-800 fs-11 text-nowrap">危险记录</h6>
                        <h5 class="text-800">27</h5>
                        <div class="d-flex align-items-center"><span class="fas fa-caret-up text-success"></span>
                          <h6 class="fs-11 mb-0 ms-2 text-success">46.2%</h6>
                        </div>
                      </div>
                    </a></li>
                </ul>
              </div>
              <div class="card-body">
                <div class="tab-content">
                  <div class="tab-pane active" id="users" role="tabpanel" aria-labelledby="users-tab"><!-- Find the JS file for the following chart at: src/js/charts/echarts/audience.js-->
                    <!-- If you are not using gulp based workflow, you can find the transpiled code at: public/assets/js/theme.js-->
                    <div class="echart-audience" data-echart-responsive="true" style="height:320px;"></div>
                  </div>
                  <div class="tab-pane" id="sessions" role="tabpanel" aria-labelledby="sessions-tab">
                    <div class="echart-audience" data-echart-responsive="true" style="height:320px;"></div>
                  </div>
                  <div class="tab-pane" id="rate" role="tabpanel" aria-labelledby="rate-tab">
                    <div class="echart-audience" data-echart-responsive="true" style="height:320px;"></div>
                  </div>
                  <div class="tab-pane" id="duration" role="tabpanel" aria-labelledby="duration-tab">
                    <div class="echart-audience" data-echart-responsive="true" style="height:320px;"></div>
                  </div>
                </div>
              </div>
              <div class="card-footer bg-body-tertiary py-2">
                <div class="row flex-between-center g-0">
                  <div class="col-auto"><select class="form-select form-select-sm audience-select-menu">
                      <option value="week" selected="selected">过去7天</option>
                      <option value="month">过去一个月</option>
                    </select></div>
                  <div class="col-auto"><a class="btn btn-link btn-sm px-0 fw-medium" href="#!">查看<span class="fas fa-chevron-right ms-1 fs-11"></span></a></div>
                </div>
              </div>
            </div>
            <div class="card">
              <div class="bg-holder bg-card" style="background-image:url(../assets/img/icons/spot-illustrations/corner-5.png);"></div><!--/.bg-holder-->
              <div class="card-body position-relative">
                <div class="row g-2 align-items-sm-center">
                  <div class="col-auto"><img src="../assets/img/icons/connect-circle.png" alt="" height="55" /></div>
                  <div class="col">
                    <div class="row align-items-center">
                      <div class="col col-lg-8">
                        <h5 class="fs-9 mb-3 mb-sm-0 text-primary">多方卫生数据统计和预测分析</h5>
                      </div>
                      <div class="col-12 col-sm-auto ms-auto"><button class="btn btn-falcon-primary" type="button">连接</button></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-xxl-4">
            <div class="card h-100 bg-line-chart-gradient">
              <div class="card-header bg-transparent" data-bs-theme="light">
                <h5 class="text-white">实时更新数据</h5>
                <div class="real-time-user display-1 fw-normal text-white" data-countup='{"endValue":119}'>0</div>
              </div>
              <div class="card-body text-white fs-10 pb-0" data-bs-theme="light">
                <p class="border-bottom pb-2" style="border-color: rgba(255, 255, 255, 0.15) !important">数据更新量 / 秒</p><!-- Find the JS file for the following chart at: src/js/charts/echarts/real-time-users.js--><!-- If you are not using gulp based workflow, you can find the transpiled code at: public/assets/js/theme.js-->
                <div class="echart-real-time-users" style="height:150px" data-echart-responsive="true"></div>
                <div class="list-group-flush mt-4">
                  <div class="rounded-2" style="border:1px solid rgba(255, 255, 255, 0.15)">
                    <div class="px-3 bg-transparent text-white d-flex justify-content-between px-0 py-1 fw-semi-bold border-top-0" style="border-bottom:1px solid rgba(255, 255, 255, 0.15)">
                      <p class="mb-0">地区</p>
                      <p class="mb-0">数据量</p>
                    </div>
                    <div class="px-3 bg-transparent text-white d-flex justify-content-between px-0 py-1" style="border-bottom:1px solid rgba(255, 255, 255, 0.05)">
                      <p class="mb-0">美国</p>
                      <p class="mb-0">39</p>
                    </div>
                    <div class="px-3 bg-transparent text-white d-flex justify-content-between px-0 py-1" style="border-bottom:1px solid rgba(255, 255, 255, 0.05)">
                      <p class="mb-0">日本</p>
                      <p class="mb-0">31</p>
                    </div>
                    <div class="px-3 bg-transparent text-white d-xxl-flex justify-content-between px-0 py-1 d-none" style="border-bottom:1px solid rgba(255, 255, 255, 0.05)">
                      <p class="mb-0">意大利</p>
                      <p class="mb-0">26</p>
                    </div>
                    <div class="px-3 bg-transparent text-white d-xxl-flex justify-content-between px-0 py-1 d-none" style="border-bottom:1px solid rgba(255, 255, 255, 0.05)">
                      <p class="mb-0">英国</p>
                      <p class="mb-0">2</p>
                    </div>
                    <div class="px-3 bg-transparent text-white d-flex justify-content-between px-0 py-1" style="border-bottom:1px solid rgba(255, 255, 255, 0.05)">
                      <p class="mb-0">英国</p>
                      <p class="mb-0">21</p>
                    </div>
                    <div class="px-3 bg-transparent text-white d-flex justify-content-between px-0 py-1" style="border-bottom:1px solid rgba(255, 255, 255, 0.05)">
                      <p class="mb-0">澳大利亚</p>
                      <p class="mb-0">17</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-footer text-end bg-transparent" data-bs-theme="light"><a class="text-white" href="#!">实时数据<span class="fa fa-chevron-right ms-1 fs-10"></span></a></div>
            </div>
          </div>
          <div class="col-md-6 col-xxl-4">
            <div class="card echart-session-by-browser-card h-100">
              <div class="card-header d-flex flex-between-center bg-body-tertiary py-2">
                <h6 class="mb-0">数据来源</h6>
                <div class="dropdown font-sans-serif btn-reveal-trigger"><button class="btn btn-link text-600 btn-sm dropdown-toggle dropdown-caret-none btn-reveal" type="button" id="dropdown-session-by-browser" data-bs-toggle="dropdown" data-boundary="viewport" aria-haspopup="true" aria-expanded="false"><span class="fas fa-ellipsis-h fs-11"></span></button>
                  <div class="dropdown-menu dropdown-menu-end border py-2" aria-labelledby="dropdown-session-by-browser"><a class="dropdown-item" href="#!">View</a><a class="dropdown-item" href="#!">Export</a>
                    <div class="dropdown-divider"></div><a class="dropdown-item text-danger" href="#!">Remove</a>
                  </div>
                </div>
              </div>
              <div class="card-body d-flex flex-column justify-content-between py-0">
                <div class="my-auto py-5 py-md-0"><!-- Find the JS file for the following chart at: src/js/charts/echarts/session-by-browser.js--><!-- If you are not using gulp based workflow, you can find the transpiled code at: public/assets/js/theme.js-->
                  <div class="echart-session-by-browser h-100" data-echart-responsive="true"></div>
                </div>
                <div class="border-top">
                  <table class="table table-sm mb-0">
                    <tbody>
                      <tr>
                        <td class="py-3">
                          <div class="d-flex align-items-center"><img src="../assets/img/icons/chrome-logo.png" alt="" width="16" />
                            <h6 class="text-600 mb-0 ms-2">Api 调用</h6>
                          </div>
                        </td>
                        <td class="py-3">
                          <div class="d-flex align-items-center"><span class="fas fa-circle fs-11 me-2 text-primary"></span>
                            <h6 class="fw-normal text-700 mb-0">50.3%</h6>
                          </div>
                        </td>
                        <td class="py-3">
                          <div class="d-flex align-items-center justify-content-end"><span class="fas fa-caret-down text-danger"></span>
                            <h6 class="fs-11 mb-0 ms-2 text-700">2.9%</h6>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td class="py-3">
                          <div class="d-flex align-items-center"><img src="../assets/img/icons/safari-logo.png" alt="" width="16" />
                            <h6 class="text-600 mb-0 ms-2">人工检索</h6>
                          </div>
                        </td>
                        <td class="py-3">
                          <div class="d-flex align-items-center"><span class="fas fa-circle fs-11 me-2 text-success"></span>
                            <h6 class="fw-normal text-700 mb-0">30.1%</h6>
                          </div>
                        </td>
                        <td class="py-3">
                          <div class="d-flex align-items-center justify-content-end"><span class="fas fa-caret-up text-success"></span>
                            <h6 class="fs-11 mb-0 ms-2 text-700">29.4%</h6>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td class="py-3">
                          <div class="d-flex align-items-center"><img src="../assets/img/icons/firefox-logo.png" alt="" width="16" />
                            <h6 class="text-600 mb-0 ms-2">爬虫</h6>
                          </div>
                        </td>
                        <td class="py-3">
                          <div class="d-flex align-items-center"><span class="fas fa-circle fs-11 me-2 text-info"></span>
                            <h6 class="fw-normal text-700 mb-0">20.6%</h6>
                          </div>
                        </td>
                        <td class="py-3">
                          <div class="d-flex align-items-center justify-content-end"><span class="fas fa-caret-up text-success"></span>
                            <h6 class="fs-11 mb-0 ms-2 text-700">220.7%</h6>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="card-footer bg-body-tertiary py-2">
                <div class="row flex-between-center g-0">
                  <div class="col-auto"><select class="form-select form-select-sm" data-target=".echart-session-by-browser">
                      <option value="week" selected="selected">过去7天</option>
                      <option value="month">过去6个月</option>
                      <option value="year">过去1年</option>
                    </select></div>
                  <div class="col-auto"><a class="btn btn-link btn-sm px-0 fw-medium" href="#!">overview<span class="fas fa-chevron-right ms-1 fs-11"></span></a></div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-xxl-4">
            <div class="card">
              <div class="card-header d-flex align-items-center bg-body-tertiary py-2">
                <h6 class="mb-0 flex-1">区域数据</h6>
                <div class="btn-reveal-trigger"><button class="btn btn-link btn-reveal btn-sm session-by-country-map-reset" type="button"><span class="fas fa-sync-alt fs-10"></span></button></div>
                <div class="dropdown font-sans-serif btn-reveal-trigger"><button class="btn btn-link text-600 btn-sm dropdown-toggle dropdown-caret-none btn-reveal" type="button" id="dropdown-session-by-country" data-bs-toggle="dropdown" data-boundary="viewport" aria-haspopup="true" aria-expanded="false"><span class="fas fa-ellipsis-h fs-11"></span></button>
                  <div class="dropdown-menu dropdown-menu-end border py-2" aria-labelledby="dropdown-session-by-country"><a class="dropdown-item" href="#!">View</a><a class="dropdown-item" href="#!">Export</a>
                    <div class="dropdown-divider"></div><a class="dropdown-item text-danger" href="#!">Remove</a>
                  </div>
                </div>
              </div>
              <div class="card-body">
                <div class="echart-session-by-country-map w-100 h-100" data-echart-responsive="true"></div>
                <div class="echart-session-by-country h-100" data-echart-responsive="true"></div>
              </div>
              <div class="card-footer bg-body-tertiary py-2">
                <div class="row flex-between-center g-0">
                  <div class="col-auto"><select class="form-select form-select-sm audience-select-menu">
                      <option value="week" selected="selected">过去7天</option>
                      <option value="month">过去一个月</option>
                      <option value="year">过去1年</option>
                    </select></div>
                  <div class="col-auto"><a class="btn btn-link btn-sm px-0 fw-medium" href="#!">国家概况<span class="fas fa-chevron-right ms-1 fs-11"></span></a></div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-xxl-4">
            <div class="card h-100">
              <div class="card-header">
                <div class="d-flex align-items-center"><img class="me-2" src="../assets/img/icons/signal.png" alt="" height="35" />
                  <h5 class="fs-9 fw-normal text-800 mb-0">情报数据查询</h5>
                </div>
              </div>
              <div class="card-body p-0">
                <div class="scrollbar-overlay pt-0 px-x1 ask-analytics">
                  <div class="border border-1 border-300 rounded-2 p-3 ask-analytics-item position-relative mb-3">
                    <div class="d-flex align-items-center mb-3"><span class="fas fa-code-branch text-primary"></span><a class="stretched-link text-decoration-none" href="#!">
                        <h5 class="fs-10 text-600 mb-0 ps-3">内容分析</h5>
                      </a></div>
                    <h5 class="fs-10 text-800">这个系统可以帮助我分析数据吗？</h5>
                  </div>
                  <div class="border border-1 border-300 rounded-2 p-3 ask-analytics-item position-relative mb-3">
                    <div class="d-flex align-items-center mb-3"><span class="fas fa-bug text-primary"></span><a class="stretched-link text-decoration-none" href="#!">
                        <h5 class="fs-10 text-600 mb-0 ps-3">可靠性</h5>
                      </a></div>
                    <h5 class="fs-10 text-800">健康数据分析的基础是什么？它可靠吗？</h5>
                  </div>
                  <div class="border border-1 border-300 rounded-2 p-3 ask-analytics-item position-relative mb-3">
                    <div class="d-flex align-items-center mb-3"><span class="fas fa-project-diagram text-primary"></span><a class="stretched-link text-decoration-none" href="#!">
                        <h5 class="fs-10 text-600 mb-0 ps-3">数据获取</h5>
                      </a></div>
                    <h5 class="fs-10 text-800">我能通过该系统能否获得某一地区居民的整体健康状况吗？</h5>
                  </div>
                  <div class="border border-1 border-300 rounded-2 p-3 ask-analytics-item position-relative mb-3">
                    <div class="d-flex align-items-center mb-3"><span class="fas fa-map-marker-alt text-primary"></span><a class="stretched-link text-decoration-none" href="#!">
                        <h5 class="fs-10 text-600 mb-0 ps-3">系统警示</h5>
                      </a></div>
                    <h5 class="fs-10 text-800">当我的健康数据出现异常的时候，系统会发出警示吗？</h5>
                  </div>
                </div>
              </div>
              <div class="card-footer bg-body-tertiary text-end py-2"><a class="btn btn-link btn-sm px-0 fw-medium" href="#!">更多<span class="fas fa-chevron-right ms-1 fs-11"></span></a></div>
            </div>
          </div>
        </div>
        <div class="row g-3 mb-3">
          <div class="col-lg-7 d-flex flex-column align-items-stretch">
            <div class="card mb-3 h-100">
              <div class="card-header d-flex flex-between-center bg-body-tertiary py-2">
                <h6 class="mb-0">用户使用意愿</h6>
                <div class="dropdown font-sans-serif btn-reveal-trigger"><button class="btn btn-link text-600 btn-sm dropdown-toggle dropdown-caret-none btn-reveal" type="button" id="dropdown-active-user-report" data-bs-toggle="dropdown" data-boundary="viewport" aria-haspopup="true" aria-expanded="false"><span class="fas fa-ellipsis-h fs-11"></span></button>
                  <div class="dropdown-menu dropdown-menu-end border py-2" aria-labelledby="dropdown-active-user-report"><a class="dropdown-item" href="#!">View</a><a class="dropdown-item" href="#!">Export</a>
                    <div class="dropdown-divider"></div><a class="dropdown-item text-danger" href="#!">Remove</a>
                  </div>
                </div>
              </div>
              <div class="card-body">
                <div class="row">
                  <div class="col-md-auto mt-md-0">
                    <div class="row flex-md-column justify-content-between h-md-100 ms-0">
                      <div class="col border-end border-end-md-0 border-bottom-md pt-3">
                        <h6 class="fs-11 text-700"><span class="fas fa-circle text-primary me-2"></span>总计</h6>
                        <h5 class="text-700 fs-9">580</h5>
                      </div>
                      <div class="col border-end border-end-md-0 border-bottom-md pt-3 pt-md-4">
                        <h6 class="fs-11 text-700"><span class="fas fa-circle text-success me-2"></span>移动终端</h6>
                        <h5 class="text-700 fs-9">4,23</h5>
                      </div>
                      <div class="col pt-3 pt-md-4">
                        <h6 class="fs-11 text-700"><span class="fas fa-circle text-info me-2"></span>网页端</h6>
                        <h5 class="text-700 fs-9">1,57</h5>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-auto echart-active-users-report-container"><!-- Find the JS file for the following chart at: src/js/charts/echarts/active-users-report.js--><!-- If you are not using gulp based workflow, you can find the transpiled code at: public/assets/js/theme.js-->
                    <div class="echart-active-users-report h-100" data-echart-responsive="true"></div>
                  </div>
                </div>
              </div>
              <div class="card-footer bg-body-tertiary py-2">
                <div class="row flex-between-center g-0">
                  <div class="col-auto"><select class="form-select form-select-sm audience-select-menu">
                      <option value="week" selected="selected">过去7天</option>
                      <option value="month">过去1个月</option>
                      <option value="year">过去6个月</option>
                    </select></div>
                  <div class="col-auto">
                    <h6 class="mb-0"><a class="py-2" href="#!">活跃用户报道<span class="fas fa-chevron-right ms-1 fs-11"></span></a></h6>
                  </div>
                </div>
              </div>
            </div>
            <div class="card">
              <div class="card-body py-5 py-sm-3">
                <div class="row g-5 g-sm-0">
                  <div class="col-sm-4">
                    <div class="border-end-sm border-300">
                      <div class="text-center">
                        <h6 class="text-700">目标完成</h6>
                        <h3 class="fw-normal text-700">1727</h3>
                      </div>
                      <div class="echart-goal-charts" data-echart-responsive="true" data-echarts='{"tooltip":{"show":false},"series":[{"type":"bar","data":[172,129,123,158,196,106,187,198,152,175,178,165,188,139,115,131,143,140,112,167,180,156,121,190,100],"symbol":"none","itemStyle":{"barBorderRadius":[5,5,0,0]}}],"grid":{"right":"16px","left":"0","bottom":"0","top":"0"}}'></div>
                    </div>
                  </div>
                  <div class="col-sm-4">
                    <div class="border-end-sm border-300">
                      <div class="text-center">
                        <h6 class="text-700">价值</h6>
                        <h3 class="fw-normal text-700">$34.2M</h3>
                      </div>
                      <div class="echart-goal-charts" data-echart-responsive="true" data-echarts='{"tooltip":{"show":false},"series":[{"type":"bar","data":[170,156,171,193,108,178,163,175,117,123,174,199,122,111,113,140,192,167,186,172,131,187,135,115,118],"symbol":"none","itemStyle":{"barBorderRadius":[5,5,0,0]}}],"grid":{"right":"16px","left":"16px","bottom":"0","top":"0"}}'></div>
                    </div>
                  </div>
                  <div class="col-sm-4">
                    <div>
                      <div class="text-center">
                        <h6 class="text-700">转化率</h6>
                        <h3 class="fw-normal text-700">19.67%</h3>
                      </div>
                      <div class="echart-goal-charts" data-echart-responsive="true" data-echarts='{"tooltip":{"show":false},"series":[{"type":"bar","data":[199,181,155,164,108,158,117,148,121,152,189,116,111,130,113,171,193,104,110,153,190,162,180,114,183],"symbol":"none","itemStyle":{"barBorderRadius":[5,5,0,0]}}],"grid":{"right":"0","left":"16px","bottom":"0","top":"0"}}'></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-5">
            <div class="card h-100">
              <div class="card-header d-flex flex-between-center bg-body-tertiary py-2">
                <h6 class="mb-0">健康干预措施的效果</h6>
                <div class="dropdown font-sans-serif btn-reveal-trigger"><button class="btn btn-link text-600 btn-sm dropdown-toggle dropdown-caret-none btn-reveal" type="button" id="dropdown-campaign-perfomance" data-bs-toggle="dropdown" data-boundary="viewport" aria-haspopup="true" aria-expanded="false"><span class="fas fa-ellipsis-h fs-11"></span></button>
                  <div class="dropdown-menu dropdown-menu-end border py-2" aria-labelledby="dropdown-campaign-perfomance"><a class="dropdown-item" href="#!">View</a><a class="dropdown-item" href="#!">Export</a>
                    <div class="dropdown-divider"></div><a class="dropdown-item text-danger" href="#!">Remove</a>
                  </div>
                </div>
              </div>
              <div class="card-body pb-0">
                <div class="row">
                  <div class="col-6">
                    <div>
                      <h6 class="text-700">用户覆盖</h6>
                      <h3 class="fw-normal text-700">10.87k</h3>
                    </div>
                    <div class="w-100" style="min-height:50px;" data-echart-responsive="true" data-echarts='{"series":[{"type":"line","data":[101,165,140,162,121,190,139],"symbol":"none","color":"#f5803e","areaStyle":{"color":{"type":"linear","x":0,"y":0,"x2":0,"y2":1,"colorStops":[{"offset":0,"color":"rgba(245, 128, 62, .25)"},{"offset":1,"color":"rgba(245, 128, 62, 0)"}]}}}],"xAxis":{"boundaryGap":false},"grid":{"right":"20px","left":"0","bottom":"0","top":"20px"}}'></div>
                  </div>
                  <div class="col-6">
                    <div>
                      <h6 class="text-700">点击</h6>
                      <h3 class="fw-normal text-700">3.8k</h3>
                    </div>
                    <div class="w-100" style="min-height:50px;" data-echart-responsive="true" data-echarts='{"series":[{"type":"line","data":[119,199,195,101,155,131,180],"symbol":"none"}],"xAxis":{"boundaryGap":false},"grid":{"right":"20px","left":"0","bottom":"0","top":"20px"}}'></div>
                  </div>
                </div>
                <div class="mx-nx1">
                  <div class="table-responsive scrollbar">
                    <table class="table fs-10 mb-0 overflow-hidden">
                      <thead class="bg-100">
                        <tr>
                          <th class="text-800 text-nowrap">干预措施</th>
                          <th class="text-800 text-nowrap text-end">参与者</th>
                          <th class="text-800 text-nowrap text-end">提升率</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td class="text-truncate">有氧运动</td>
                          <td class="text-truncate text-end">1,840</td>
                          <td class="text-truncate text-end">78.3%</td>
                        </tr>
                        <tr>
                          <td class="text-truncate">低盐饮食</td>
                          <td class="text-truncate text-end">1,250</td>
                          <td class="text-truncate text-end">65.2%</td>
                        </tr>
                        <tr>
                          <td class="text-truncate">颈椎防护</td>
                          <td class="text-truncate text-end">2,820</td>
                          <td class="text-truncate text-end">52.1%</td>
                        </tr>
                        <tr>
                          <td class="text-truncate">每日1.5升水</td>
                          <td class="text-truncate text-end">3,145</td>
                          <td class="text-truncate text-end">48.5%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div class="card-footer bg-body-tertiary py-2">
                <div class="row flex-between-center">
                  <div class="col-auto"><select class="form-select form-select-sm audience-select-menu">
                      <option value="week" selected="selected">最近七天</option>
                      <option value="month">最近一个月</option>
                      <option value="year">最近一年</option>
                    </select></div>
                  <div class="col-auto"><a class="btn btn-link btn-sm px-0 fw-medium" href="#!">广告活动<span class="fas fa-chevron-right ms-1 fs-11"></span></a></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer class="footer">
          <div class="row g-0 justify-content-between fs-10 mt-0 mb-4">
            <div class="col-12 col-sm-auto text-center">
              <p class="mb-0 text-600">感谢您对我们健康大数据研究中心的支持<span class="d-none d-sm-inline-block">| </span><br class="d-sm-none" /> 2025 &copy; <a href="https://themewagon.com">网页参考bootstrap-falcon</a></p>
            </div>
            <div class="col-12 col-sm-auto text-center">
              <p class="mb-0 text-600">v1.15.3</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  </main><!-- ===============================================--><!--    End of Main Content--><!-- ===============================================-->

    <!--右边侧边栏-->
    <div class="offcanvas offcanvas-end settings-panel border-0" id="settings-offcanvas" tabindex="-1" aria-labelledby="settings-offcanvas">
      <div class="offcanvas-header settings-panel-header justify-content-between bg-shape">
        <div class="z-1 py-1">
          <div class="d-flex justify-content-between align-items-center mb-1">
            <h5 class="text-white mb-0 me-2"><span class="fas fa-palette me-2 fs-9"></span>设置</h5><button class="btn btn-primary btn-sm rounded-pill mt-0 mb-0" data-theme-control="reset" style="font-size:12px"> <span class="fas fa-redo-alt me-1" data-fa-transform="shrink-3"></span>Reset</button>
          </div>
          <p class="mb-0 fs-10 text-white opacity-75">设置你喜欢的风格！</p>
        </div>
        <div class="z-1" data-bs-theme="dark">
          <button class="btn-close z-1 mt-0" type="button" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
      </div>
      <div class="offcanvas-body scrollbar-overlay px-x1 h-100" id="themeController">
        <h5 class="fs-9">颜色主题</h5>
        <p class="fs-10">请挑选你最喜欢的主题</p>
        <div class="btn-group d-block w-100 btn-group-navbar-style">
          <div class="row gx-2">
            <div class="col-4"><input class="btn-check" id="themeSwitcherLight" name="theme-color" type="radio" value="light" data-theme-control="theme" /><label class="btn d-inline-block btn-navbar-style fs-10" for="themeSwitcherLight"> <span class="hover-overlay mb-2 rounded d-block"><img class="img-fluid img-prototype mb-0" src="../../assets/img/generic/falcon-mode-auto.jpg" alt=""/></span><span class="label-text">Light</span></label></div>
            <div class="col-4"><input class="btn-check" id="themeSwitcherDark" name="theme-color" type="radio" value="dark" data-theme-control="theme" /><label class="btn d-inline-block btn-navbar-style fs-10" for="themeSwitcherDark"> <span class="hover-overlay mb-2 rounded d-block"><img class="img-fluid img-prototype mb-0" src="../../assets/img/generic/falcon-mode-dark.jpg" alt=""/></span><span class="label-text"> Dark</span></label></div>
            <div class="col-4"><input class="btn-check" id="themeSwitcherAuto" name="theme-color" type="radio" value="auto" data-theme-control="theme" /><label class="btn d-inline-block btn-navbar-style fs-10" for="themeSwitcherAuto"> <span class="hover-overlay mb-2 rounded d-block"><img class="img-fluid img-prototype mb-0" src="../../assets/img/generic/falcon-mode-default.jpg" alt=""/></span><span class="label-text"> Auto</span></label></div>
          </div>
        </div>
        <hr />
        <h5 class="fs-9 d-flex align-items-center">侧边栏风格</h5>
        <p class="fs-10 mb-0">请挑选你最喜欢的侧边栏风格</p>
        <div class="btn-group d-block w-100 btn-group-navbar-style">
          <div class="row gx-2">
            <div class="col-6"><input class="btn-check" id="navbar-style-transparent" type="radio" name="navbarStyle" value="transparent" data-theme-control="navbarStyle" /><label class="btn d-block w-100 btn-navbar-style fs-10" for="navbar-style-transparent"> <img class="img-fluid img-prototype" src="../../assets/img/generic/default.png" alt="" /><span class="label-text"> Transparent</span></label></div>
            <div class="col-6"><input class="btn-check" id="navbar-style-inverted" type="radio" name="navbarStyle" value="inverted" data-theme-control="navbarStyle" /><label class="btn d-block w-100 btn-navbar-style fs-10" for="navbar-style-inverted"> <img class="img-fluid img-prototype" src="../../assets/img/generic/inverted.png" alt="" /><span class="label-text"> Inverted</span></label></div>
            <div class="col-6"><input class="btn-check" id="navbar-style-card" type="radio" name="navbarStyle" value="card" data-theme-control="navbarStyle" /><label class="btn d-block w-100 btn-navbar-style fs-10" for="navbar-style-card"> <img class="img-fluid img-prototype" src="../../assets/img/generic/card.png" alt="" /><span class="label-text"> Card</span></label></div>
            <div class="col-6"><input class="btn-check" id="navbar-style-vibrant" type="radio" name="navbarStyle" value="vibrant" data-theme-control="navbarStyle" /><label class="btn d-block w-100 btn-navbar-style fs-10" for="navbar-style-vibrant"> <img class="img-fluid img-prototype" src="../../assets/img/generic/vibrant.png" alt="" /><span class="label-text"> Vibrant</span></label></div>
          </div>
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

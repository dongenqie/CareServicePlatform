<script setup>
import { onMounted, ref,computed } from 'vue'
import { useRouter } from 'vue-router'
import { defineOptions } from 'vue'
import { fetchHospitalData } from '../../api/level.js'
import { echartsNumberOfTicketsInit } from '../../js/echart-level.js'
import { fetchAllData } from '../../api/levelAll.js'

// 声明组件名
defineOptions({ name: 'HospitalGrade' })

const allDataRef = ref([]);

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

  //const allData = ref(null);

  const fetchDataAndRender = async () => {
  try {
    // 并行获取医院数据和所有数据
    // const hospitalData = await fetchHospitalData();
    // console.log(hospitalData);

    const [hospitalData, allData] = await Promise.all([fetchHospitalData(), fetchAllData()]);
    console.log('医院数据:', hospitalData);
    console.log('所有数据:', allData);

    allDataRef.value = allData.data.try;

    // 调用图表初始化函数
    echartsNumberOfTicketsInit(hospitalData);
  } catch (error) {
    console.error('发生错误:', error);
  }
};

fetchDataAndRender();


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
        <!--欢迎栏-->
        <div class="row g-3 mb-3">
          <div class="col-xxl-6">
            <div class="row g-0 h-100">
              <div class="col-12 mb-3">
                <div class="card bg-body-tertiary dark__bg-opacity-50 shadow-none">
                  <div class="bg-holder bg-card d-none d-sm-block" style="background-image:url(../../assets/img/illustrations/ticket-bg.png);"></div><!--/.bg-holder-->
                  <div class="d-flex align-items-center z-1 p-0">
                    <img src="../../assets/img/illustrations/crm-bar-chart.png" alt="" width="96" />
                    <div class="ms-n3">
                      <h6 class="mb-1 text-primary">欢迎来到</h6>
                      <h4 class="mb-0 text-primary fw-bold">健康大数据中心<span class="text-info fw-medium">医院等级研究实验室</span></h4>
                    </div>
                    <img src="../../assets/img/illustrations/crm-line-chart.png" alt="" width="96" />
                  </div>
                </div>
              </div>
              <div class="col-12">
                <div class="card h-100">
                  <div class="card-body">
                    <div class="row g-0">
                      <div class="col-md-6 border-200 border-bottom border-end-md pb-x1 pe-md-x1">
                        <div class="row g-0">
                          <div class="col-6">                            
                            <img class="mt-1" src="../../assets/img/tickets/hold-tickets.png" alt="" width="39" />
                            <h2 class="mt-2 mb-1 text-700 fw-normal">25<span class="fas fa-caret-up ms-2 me-1 fs-10 text-primary"></span><span class="fs-10 fw-semi-bold text-primary">5.3%</span></h2>
                            <h6 class="mb-0">1级医院</h6>
                          </div>
                          <div class="col-6 d-flex align-items-center px-0">
                            <div class="h-50 w-100" data-echarts='{"tooltip":{"trigger":"axis","formatter":"{b0} : {c0}"},"xAxis":{"data":["Week 1","Week 2","Week 3","Week 4","Week 5","Week 6"]},"series":[{"type":"line","data":[10,40,30,35,20,40],"color":"#2c7be5","smooth":true,"lineStyle":{"width":2},"areaStyle":{"color":{"type":"linear","x":0,"y":0,"x2":0,"y2":1,"colorStops":[{"offset":0,"color":"rgba(44, 123, 229, .25)"},{"offset":1,"color":"rgba(44, 123, 229, 0)"}]}}}],"grid":{"bottom":"2%","top":"2%","right":"0","left":"0px"}}' data-echart-responsive="true"></div>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6 ps-md-x1 pb-x1 pt-x1 pt-md-0 border-bottom border-200">
                        <div class="row g-0">
                          <div class="col-6"><img class="mt-1" src="../../assets/img/tickets/open-tickets.png" alt="" width="39" />
                            <h2 class="mt-2 mb-1 text-700 fw-normal">05<span class="fas fa-caret-up ms-2 me-1 fs-10 text-success"></span><span class="fs-10 fw-semi-bold text-success">3.20%</span></h2>
                            <h6 class="mb-0">2级医院</h6>
                          </div>
                          <div class="col-6 d-flex align-items-center px-0">
                            <div class="h-50 w-100" data-echarts='{"tooltip":{"trigger":"axis","formatter":"{b0} : {c0}"},"xAxis":{"data":["Week 1","Week 2","Week 3","Week 4","Week 5","Week 6"]},"series":[{"type":"line","data":[10,12,16,14,20,25],"color":"#00d27a","smooth":true,"lineStyle":{"width":2},"areaStyle":{"color":{"type":"linear","x":0,"y":0,"x2":0,"y2":1,"colorStops":[{"offset":0,"color":"rgba(0, 210, 122, .25)"},{"offset":1,"color":"rgba(0, 210, 122, 0)"}]}}}],"grid":{"bottom":"2%","top":"2%","right":"0","left":"0px"}}' data-echart-responsive="true"></div>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6 border-200 border-bottom border-bottom-md-0 border-end-md pt-x1 pe-md-x1 pb-x1 pb-md-0">
                        <div class="row g-0">
                          <div class="col-6"><img class="mt-1" src="../../assets/img/tickets/due-tickets.png" alt="" width="39" />
                            <h2 class="mt-2 mb-1 text-700 fw-normal">02<span class="fas fa-caret-up ms-2 me-1 fs-10 text-info"></span><span class="fs-10 fw-semi-bold text-info">2.3%</span></h2>
                            <h6 class="mb-0">3级医院</h6>
                          </div>
                          <div class="col-6 d-flex align-items-center px-0">
                            <div class="h-50 w-100" data-echarts='{"tooltip":{"trigger":"axis","formatter":"{b0} : {c0}"},"xAxis":{"data":["Week 1","Week 2","Week 3","Week 4","Week 5","Week 6"]},"series":[{"type":"line","data":[15,10,15,10,12,10],"color":"#27bcfd","smooth":true,"lineStyle":{"width":2},"areaStyle":{"color":{"type":"linear","x":0,"y":0,"x2":0,"y2":1,"colorStops":[{"offset":0,"color":"rgba(39, 188, 253, .25)"},{"offset":1,"color":"rgba(39, 188, 253, 0)"}]}}}],"grid":{"bottom":"2%","top":"2%","right":"0","left":"0px"}}' data-echart-responsive="true"></div>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6 ps-md-x1 pt-x1">
                        <div class="row g-0">
                          <div class="col-6"><img class="mt-1" src="../../assets/img/tickets/unassigned.png" alt="" width="39" />
                            <h2 class="mt-2 mb-1 text-700 fw-normal">03<span class="fas fa-caret-up ms-2 me-1 fs-10 text-warning"></span><span class="fs-10 fw-semi-bold text-warning">3.12%</span></h2>
                            <h6 class="mb-0">未评级医院</h6>
                          </div>
                          <div class="col-6 d-flex align-items-center px-0">
                            <div class="h-50 w-100" data-echarts='{"tooltip":{"trigger":"axis","formatter":"{b0} : {c0}"},"xAxis":{"data":["Week 1","Week 2","Week 3","Week 4","Week 5","Week 6"]},"series":[{"type":"line","data":[10,15,12,11,14,12],"color":"#f5803e","smooth":true,"lineStyle":{"width":2},"areaStyle":{"color":{"type":"linear","x":0,"y":0,"x2":0,"y2":1,"colorStops":[{"offset":0,"color":"rgba(245, 128, 62, .25)"},{"offset":1,"color":"rgba(245, 128, 62, 0)"}]}}}],"grid":{"bottom":"2%","top":"2%","right":"0","left":"0px"}}' data-echart-responsive="true"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--不同年份医院等级图-->
        <div class="row g-3">
          <div class="col-xxl-8">
            <div class="card h-100">
              <div class="card-header d-md-flex justify-content-between border-bottom border-200 py-3 py-md-2">
                <h6 class="mb-2 mb-md-0 py-md-2">不同年份医院等级变化图</h6>
                <div class="row g-md-0">
                  <div class="col-auto d-md-flex">
                    <div class="d-flex align-items-center me-md-3 form-check mb-0"><input class="form-check-input dot mt-0 shadow-none remove-checked-icon rounded-circle cursor-pointer" type="checkbox" data-number-of-tickets="1级医院" value="" id="onHoldTickets" checked="checked" /><label class="form-check-label lh-base mb-0 fs-11 text-500 fw-semi-bold font-base cursor-pointer" for="onHoldTickets">1级医院</label></div>
                    <div class="d-flex align-items-center me-md-3 form-check mb-0 mt-n1 mt-md-0"><input class="form-check-input dot mt-0 shadow-none remove-checked-icon rounded-circle open-tickets cursor-pointer" type="checkbox" data-number-of-tickets="2级医院" value="" id="openTickets" checked="checked" /><label class="form-check-label lh-base mb-0 fs-11 text-500 fw-semi-bold font-base cursor-pointer" for="openTickets">2级医院</label></div>
                  </div>
                  <div class="col-auto d-md-flex">
                    <div class="d-flex align-items-center me-md-3 form-check mb-0"><input class="form-check-input dot mt-0 shadow-none remove-checked-icon rounded-circle due-tickets cursor-pointer" type="checkbox" data-number-of-tickets="3级医院" value="" id="dueTickets" checked="checked" /><label class="form-check-label lh-base mb-0 fs-11 text-500 fw-semi-bold font-base cursor-pointer" for="dueTickets">3级医院</label></div>
                    <div class="d-flex align-items-center form-check mb-0 mt-n1 mt-md-0"><input class="form-check-input dot mt-0 shadow-none remove-checked-icon rounded-circle unassigned-tickets cursor-pointer" type="checkbox" data-number-of-tickets="未评级医院" value="" id="unassignedTickets" checked="checked" /><label class="form-check-label lh-base mb-0 fs-11 text-500 fw-semi-bold font-base cursor-pointer" for="unassignedTickets">未评级医院</label></div>
                  </div>
                </div>
              </div>
              <div class="card-body scrollbar overflow-y-hidden">
                <div class="d-flex">
                  <div class="d-flex align-items-center">
                    <div>
                      <h6 class="fs-9 d-flex align-items-center text-700 mb-1">125<small class="badge text-success bg-transparent px-0"><span class="fas fa-caret-up fs-11 ms-2 me-1"></span><span>5.3%</span></small></h6>
                      <h6 class="text-600 mb-0 fs-11 text-nowrap">1级医院</h6>
                    </div>
                    <div class="bg-200 mx-3" style="height: 24px; width: 1px"></div>
                  </div>
                  <div class="d-flex align-items-center">
                    <div>
                      <h6 class="fs-9 d-flex align-items-center text-700 mb-1">100<small class="badge px-0 text-primary"><span class="fas fa-caret-up fs-11 ms-2 me-1"></span><span>3.20%</span></small></h6>
                      <h6 class="fs-11 text-600 mb-0 text-nowrap">2级医院</h6>
                    </div>
                    <div class="bg-200 mx-3" style="height: 24px; width: 1px"></div>
                  </div>
                  <div class="d-flex align-items-center">
                    <div>
                      <h6 class="fs-9 d-flex align-items-center text-700 mb-1">53<small class="badge px-0 text-warning"><span class="fas fa-caret-down fs-11 ms-2 me-1"></span><span>2.3%</span></small></h6>
                      <h6 class="fs-11 text-600 mb-0 text-nowrap">3级医院</h6>
                    </div>
                    <div class="bg-200 mx-3" style="height: 24px; width: 1px"></div>
                  </div>
                  <div>
                    <h6 class="fs-9 d-flex align-items-center text-700 mb-1">136<small class="badge px-0 text-danger"><span class="fas fa-caret-up fs-11 ms-2 me-1"></span><span>3.12%</span></small></h6>
                    <h6 class="fs-11 text-600 mb-0 text-nowrap">未评级医院</h6>
                  </div>
                </div>
                <div class="echart-number-of-tickets" data-echart-responsive="true"></div>
              </div>
              <div class="card-footer bg-body-tertiary py-2">
                <div class="row g-2 flex-between-center">
                  <div class="col-auto">
                    <select class="form-select form-select-sm">
                      <option selected="selected">2011~2015</option>
                      <option>2016~2020</option>
                    </select></div>
                  <div class="col-auto"><a class="btn btn-link btn-sm px-0" href="">导出数据<span class="fas fa-chevron-right ms-1 fs-11"></span></a></div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xxl-9">
            <div class="card" id="ticketsTable" :data-list="{ valueNames: ['client','subject','status','priority','agent'], page: 6, pagination: true}">
              <div class="card-header border-bottom border-200 px-0">
                <div class="d-lg-flex justify-content-between">
                  <div class="row flex-between-center gy-2 px-x1">
                    <div class="col-auto pe-0">
                      <h6 class="mb-0">各省医院等级表</h6>
                    </div>
                    <div class="col-auto">
                      <form>
                        <div class="input-group input-search-width">
                          <input class="form-control form-control-sm shadow-none" type="search" placeholder="搜索省份名称" aria-label="search" />
                          <button class="btn btn-sm btn-outline-secondary border-300 hover-border-secondary">
                            <span class="fa fa-search fs-10"></span>
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div class="border-bottom border-200 my-3"></div>
                  <div class="d-flex align-items-center justify-content-between justify-content-lg-end px-x1"><button class="btn btn-sm btn-falcon-default" type="button"><span class="fas fa-filter" data-fa-transform="shrink-4 down-1"></span><span class="ms-1 d-none d-sm-inline-block">Filter</span></button>
                    <div class="bg-300 mx-3 d-none d-lg-block" style="width:1px; height:29px"></div>
                    <div class="d-none" id="table-ticket-actions">
                      <div class="d-flex">
                        <select class="form-select form-select-sm" aria-label="Bulk actions">
                          <option selected="">请选择操作</option>
                          <option value="Refund">导出数据</option>
                          <option value="Delete">删除数据</option>
                        </select>
                        <button class="btn btn-falcon-default btn-sm ms-2" type="button">Apply</button>
                      </div>
                    </div>
                    <div class="d-flex align-items-center" id="table-ticket-replace-element">
                      <button class="btn btn-falcon-default btn-sm mx-2" type="button"><span class="fas fa-plus" data-fa-transform="shrink-3"></span><span class="d-none d-sm-inline-block d-xl-none d-xxl-inline-block ms-1">New</span></button><button class="btn btn-falcon-default btn-sm" type="button"><span class="fas fa-external-link-alt" data-fa-transform="shrink-3"></span><span class="d-none d-sm-inline-block d-xl-none d-xxl-inline-block ms-1">Export</span></button>
                      <div class="dropdown font-sans-serif ms-2"><button class="btn btn-falcon-default text-600 btn-sm dropdown-toggle dropdown-caret-none" type="button" id="preview-dropdown" data-bs-toggle="dropdown" data-boundary="viewport" aria-haspopup="true" aria-expanded="false"><span class="fas fa-ellipsis-h fs-11"></span></button>
                        <div class="dropdown-menu dropdown-menu-end border py-2" aria-labelledby="preview-dropdown"><a class="dropdown-item" href="#!">View</a><a class="dropdown-item" href="#!">Export</a>
                          <div class="dropdown-divider"></div><a class="dropdown-item text-danger" href="#!">Remove</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="tab-content" id="ticketViewContent">
                <div class="fade tab-pane active show" id="table-view" role="tabpanel" aria-labelledby="tableView" data-list='{"valueNames":["client","subject","status","priority","agent"],"page":6,"pagination":true}'>
                  <div class="card-body p-0">
                    <div class="table-responsive scrollbar">

                      <table class="table table-sm mb-0 fs-10 table-view-tickets">
                        <thead class="bg-body-tertiary">
                          <tr>
                            <th class="py-2 fs-9 pe-2" style="width: 28px;">
                              <div class="form-check d-flex align-items-center">
                                <input class="form-check-input" id="checkbox-bulk-table-tickets-select" type="checkbox" data-bulk-select='{"body":"table-ticket-body","actions":"table-ticket-actions","replacedElement":"table-ticket-replace-element"}' />
                              </div>
                            </th>
                            <th class="text-800 sort align-middle ps-2" data-sort="year">年份</th>
                            <th class="text-800 sort align-middle ps-2" data-sort="client" style="min-width:8.625rem">省份</th>
                            <th class="text-800 sort align-middle" data-sort="subject" style="min-width:5.625rem">医院总数</th>
                            <th class="text-800 sort align-middle" data-sort="status">1级医院</th>
                            <th class="text-800 sort align-middle" data-sort="priority">2级医院</th>
                            <th class="text-800 sort align-middle" data-sort="agent">3级医院</th>
                            <th class="text-800 sort align-middle" data-sort="unlevel">未评级医院</th>
                            <th class="text-800 sort align-middle" data-sort="status">状态</th>
                          </tr>
                        </thead>
                        <tbody class="list" id="table-ticket-body" v-if="allDataRef.length > 0">
                          <tr v-for="(item, index) in allDataRef" :key="index">
                            <td class="align-middle fs-9 py-3">
                              <div class="form-check mb-0"><input class="form-check-input" type="checkbox" id="table-view-tickets-1" data-bulk-select-row="data-bulk-select-row" /></div>
                            </td>
                            <td class="align-middle status fs-9 pe-4">{{ item.year }}</td>
                            <td class="align-middle client white-space-nowrap pe-3 pe-xxl-4 ps-2">
                              <div class="d-flex align-items-center gap-2 position-relative">
                                <h6 class="mb-0"><a class="stretched-link text-900" href="">{{ item.region }}</a></h6>
                              </div>
                            </td>
                            <td class="align-middle subject py-2 pe-4">
                              <a class="fw-semi-bold" href="">{{ item.total }}</a></td>
                            <td class="align-middle status fs-9 pe-4">{{ item.level4Count }}</td>
                            <td class="align-middle status fs-9 pe-4">{{ item.level1Count }}</td>
                            <td class="align-middle status fs-9 pe-4">{{ item.level2Count }}</td>
                            <td class="align-middle status fs-9 pe-4">{{ item.level3Count }}</td>
                            <td class="align-middle priority pe-4">
                              <div class="d-flex align-items-center gap-2">
                                <div style="--falcon-circle-progress-bar:75"><svg class="circle-progress-svg" width="26" height="26" viewBox="0 0 120 120">
                                    <circle class="progress-bar-rail" cx="60" cy="60" r="54" fill="none" stroke-linecap="round" stroke-width="12"></circle>
                                    <circle class="progress-bar-top" cx="60" cy="60" r="54" fill="none" stroke-linecap="round" stroke="#F68F57" stroke-width="12"></circle>
                                  </svg></div>
                                <h6 class="mb-0 text-700">High</h6>
                              </div>
                            </td>
                          </tr>
                          <!-- <tr>
                            <td class="align-middle fs-9 py-3">
                              <div class="form-check mb-0"><input class="form-check-input" type="checkbox" id="table-view-tickets-2" data-bulk-select-row="data-bulk-select-row" /></div>
                            </td>
                            <td class="align-middle status fs-9 pe-4">2011</td>
                            <td class="align-middle client white-space-nowrap pe-3 pe-xxl-4 ps-2">
                              <div class="d-flex align-items-center gap-2 position-relative">
                                <h6 class="mb-0"><a class="stretched-link text-900" href="">广西壮族自治区</a></h6>
                              </div>
                            </td>
                            <td class="align-middle subject py-2 pe-4">
                              <a class="fw-semi-bold" href="">1323435</a>
                            </td>
                            <td class="align-middle status fs-9 pe-4">123</td>
                            <td class="align-middle status fs-9 pe-4">123</td>
                            <td class="align-middle status fs-9 pe-4">123</td>
                            <td class="align-middle status fs-9 pe-4">123</td>
                            <td class="align-middle priority pe-4">
                              <div class="d-flex align-items-center gap-2">
                                <div style="--falcon-circle-progress-bar:50"><svg class="circle-progress-svg" width="26" height="26" viewBox="0 0 120 120">
                                    <circle class="progress-bar-rail" cx="60" cy="60" r="54" fill="none" stroke-linecap="round" stroke-width="12"></circle>
                                    <circle class="progress-bar-top" cx="60" cy="60" r="54" fill="none" stroke-linecap="round" stroke="#2A7BE4" stroke-width="12"></circle>
                                  </svg></div>
                                <h6 class="mb-0 text-700">Medium</h6>
                              </div>
                            </td>
                          </tr> -->
                          <!-- <tr>
                            <td class="align-middle fs-9 py-3">
                              <div class="form-check mb-0"><input class="form-check-input" type="checkbox" id="table-view-tickets-2" data-bulk-select-row="data-bulk-select-row" /></div>
                            </td>
                            <td class="align-middle status fs-9 pe-4">2015</td>
                            <td class="align-middle client white-space-nowrap pe-3 pe-xxl-4 ps-2">
                              <div class="d-flex align-items-center gap-2 position-relative">
                                <h6 class="mb-0"><a class="stretched-link text-900" href="">广西壮族自治区</a></h6>
                              </div>
                            </td>
                            <td class="align-middle subject py-2 pe-4">
                              <a class="fw-semi-bold" href="">1323435</a>
                            </td>
                            <td class="align-middle status fs-9 pe-4">123</td>
                            <td class="align-middle status fs-9 pe-4">123</td>
                            <td class="align-middle status fs-9 pe-4">123</td>
                            <td class="align-middle status fs-9 pe-4">123</td>
                            <td class="align-middle priority pe-4">
                              <div class="d-flex align-items-center gap-2">
                                <div style="--falcon-circle-progress-bar:25"><svg class="circle-progress-svg" width="26" height="26" viewBox="0 0 120 120">
                                    <circle class="progress-bar-rail" cx="60" cy="60" r="54" fill="none" stroke-linecap="round" stroke-width="12"></circle>
                                    <circle class="progress-bar-top" cx="60" cy="60" r="54" fill="none" stroke-linecap="round" stroke="#00D27B" stroke-width="12"></circle>
                                  </svg></div>
                                <h6 class="mb-0 text-700">Low</h6>
                              </div>
                            </td>
                          </tr> -->
                          <!-- <tr>
                            <td class="align-middle fs-9 py-3">
                              <div class="form-check mb-0"><input class="form-check-input" type="checkbox" id="table-view-tickets-2" data-bulk-select-row="data-bulk-select-row" /></div>
                            </td>
                            <td class="align-middle status fs-9 pe-4">2020</td>
                            <td class="align-middle client white-space-nowrap pe-3 pe-xxl-4 ps-2">
                              <div class="d-flex align-items-center gap-2 position-relative">
                                <h6 class="mb-0"><a class="stretched-link text-900" href="">广西壮族自治区</a></h6>
                              </div>
                            </td>
                            <td class="align-middle subject py-2 pe-4">
                              <a class="fw-semi-bold" href="">1323435</a>
                            </td>
                            <td class="align-middle status fs-9 pe-4">123</td>
                            <td class="align-middle status fs-9 pe-4">123</td>
                            <td class="align-middle status fs-9 pe-4">123</td>
                            <td class="align-middle status fs-9 pe-4">123</td>
                            <td class="align-middle priority pe-4">
                              <div class="d-flex align-items-center gap-2">
                                <div style="--falcon-circle-progress-bar:100"><svg class="circle-progress-svg" width="26" height="26" viewBox="0 0 120 120">
                                    <circle class="progress-bar-rail" cx="60" cy="60" r="54" fill="none" stroke-linecap="round" stroke-width="12"></circle>
                                    <circle class="progress-bar-top" cx="60" cy="60" r="54" fill="none" stroke-linecap="round" stroke="#e63757" stroke-width="12"></circle>
                                  </svg></div>
                                <h6 class="mb-0 text-700">Urgent</h6>
                              </div>
                            </td>
                          </tr> -->
                        </tbody>
                      </table>
                      <div class="text-center d-none" id="tickets-table-fallback">
                        <p class="fw-bold fs-8 mt-3">No ticket found</p>
                      </div>
                    </div>
                  </div>
                  <div class="card-footer">
                    <div class="row align-items-center">
                      <div class="pagination d-none"></div>
                      <div class="col"><span class="d-none d-sm-inline-block me-2 fs-10" data-list-info="data-list-info"></span></div>
                      <div class="col-auto d-flex"><button class="btn btn-sm btn-primary" type="button" data-list-pagination="prev"><span>Previous</span></button>
                        <button class="btn btn-sm btn-primary px-4 ms-2" type="button" data-list-pagination="next"><span>Next</span></button></div>
                    </div>
                  </div>
                </div>
                <div class="fade tab-pane" id="card-view" role="tabpanel" aria-labelledby="cardView" data-list='{"valueNames":["client","subject","status","priority","agent"],"page":4,"pagination":true}'>
                  <div class="card-body p-0">
                    <div class="form-check d-none"><input class="form-check-input" id="checkbox-bulk-card-tickets-select" type="checkbox" data-bulk-select='{"body":"card-ticket-body","actions":"table-ticket-actions","replacedElement":"table-ticket-replace-element"}' /></div>
                    <div class="list bg-body-tertiary p-x1 d-flex flex-column gap-3" id="card-ticket-body">
                      <div class="bg-white dark__bg-1100 d-md-flex d-xl-inline-block d-xxl-flex align-items-center p-x1 rounded-3 shadow-sm card-view-height">
                        <div class="d-flex align-items-start align-items-sm-center">
                          <div class="form-check me-2 me-xxl-3 mb-0"><input class="form-check-input" type="checkbox" id="card-view-tickets-0" data-bulk-select-row="data-bulk-select-row" /></div><a class="d-none d-sm-block" href="../app/support-desk/contact-details.html">
                            <div class="avatar avatar-xl avatar-3xl">
                              <div class="avatar-name rounded-circle"><span>EW</span></div>
                            </div>
                          </a>
                          <div class="ms-1 ms-sm-3">
                            <p class="fw-semi-bold mb-3 mb-sm-2"><a href="../app/support-desk/tickets-preview.html">Synapse Design #1125</a></p>
                            <div class="row align-items-center gx-0 gy-2">
                              <div class="col-auto me-2">
                                <h6 class="client mb-0"><a class="text-800 d-flex align-items-center gap-1" href="../app/support-desk/contact-details.html"><span class="fas fa-user" data-fa-transform="shrink-3 up-1"></span><span>Emma Watson</span></a></h6>
                              </div>
                              <div class="col-auto lh-1 me-3"><small class="badge rounded badge-subtle-success false">Recent</small></div>
                              <div class="col-auto">
                                <h6 class="mb-0 text-500">2d ago</h6>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="border-bottom mt-4 mb-x1"></div>
                        <div class="d-flex justify-content-between ms-auto">
                          <div class="d-flex align-items-center gap-2 ms-md-4 ms-xl-0" style="width:7.5rem;">
                            <div style="--falcon-circle-progress-bar:100"><svg class="circle-progress-svg" width="26" height="26" viewBox="0 0 120 120">
                                <circle class="progress-bar-rail" cx="60" cy="60" r="54" fill="none" stroke-linecap="round" stroke-width="12"></circle>
                                <circle class="progress-bar-top" cx="60" cy="60" r="54" fill="none" stroke-linecap="round" stroke="#e63757" stroke-width="12"></circle>
                              </svg></div>
                            <h6 class="mb-0 text-700">Urgent</h6>
                          </div><select class="form-select form-select-sm" aria-label="agents actions" style="width:9.375rem;">
                            <option>Select Agent</option>
                            <option selected="selected">Anindya</option>
                            <option>Nowrin</option>
                            <option>Khalid</option>
                          </select>
                        </div>
                      </div>
                      <div class="bg-white dark__bg-1100 d-md-flex d-xl-inline-block d-xxl-flex align-items-center p-x1 rounded-3 shadow-sm card-view-height">
                        <div class="d-flex align-items-start align-items-sm-center">
                          <div class="form-check me-2 me-xxl-3 mb-0"><input class="form-check-input" type="checkbox" id="card-view-tickets-1" data-bulk-select-row="data-bulk-select-row" /></div><a class="d-none d-sm-block" href="../app/support-desk/contact-details.html">
                            <div class="avatar avatar-xl avatar-3xl">
                              <div class="avatar-name rounded-circle"><span>L</span></div>
                            </div>
                          </a>
                          <div class="ms-1 ms-sm-3">
                            <p class="fw-semi-bold mb-3 mb-sm-2"><a href="../app/support-desk/tickets-preview.html">Change of refund my last buy | Order #125631</a></p>
                            <div class="row align-items-center gx-0 gy-2">
                              <div class="col-auto me-2">
                                <h6 class="client mb-0"><a class="text-800 d-flex align-items-center gap-1" href="../app/support-desk/contact-details.html"><span class="fas fa-user" data-fa-transform="shrink-3 up-1"></span><span>Luke</span></a></h6>
                              </div>
                              <div class="col-auto lh-1 me-3"><small class="badge rounded badge-subtle-danger false">Overdue</small></div>
                              <div class="col-auto">
                                <h6 class="mb-0 text-500">2d ago</h6>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="border-bottom mt-4 mb-x1"></div>
                        <div class="d-flex justify-content-between ms-auto">
                          <div class="d-flex align-items-center gap-2 ms-md-4 ms-xl-0" style="width:7.5rem;">
                            <div style="--falcon-circle-progress-bar:75"><svg class="circle-progress-svg" width="26" height="26" viewBox="0 0 120 120">
                                <circle class="progress-bar-rail" cx="60" cy="60" r="54" fill="none" stroke-linecap="round" stroke-width="12"></circle>
                                <circle class="progress-bar-top" cx="60" cy="60" r="54" fill="none" stroke-linecap="round" stroke="#F68F57" stroke-width="12"></circle>
                              </svg></div>
                            <h6 class="mb-0 text-700">High</h6>
                          </div><select class="form-select form-select-sm" aria-label="agents actions" style="width:9.375rem;">
                            <option>Select Agent</option>
                            <option selected="selected">Anindya</option>
                            <option>Nowrin</option>
                            <option>Khalid</option>
                          </select>
                        </div>
                      </div>
                      <div class="bg-white dark__bg-1100 d-md-flex d-xl-inline-block d-xxl-flex align-items-center p-x1 rounded-3 shadow-sm card-view-height">
                        <div class="d-flex align-items-start align-items-sm-center">
                          <div class="form-check me-2 me-xxl-3 mb-0"><input class="form-check-input" type="checkbox" id="card-view-tickets-2" data-bulk-select-row="data-bulk-select-row" /></div><a class="d-none d-sm-block" href="../app/support-desk/contact-details.html">
                            <div class="avatar avatar-xl avatar-3xl">
                              <img class="rounded-circle" src="../assets/img/team/1-thumb.png" alt="" />
                            </div>
                          </a>
                          <div class="ms-1 ms-sm-3">
                            <p class="fw-semi-bold mb-3 mb-sm-2"><a href="../app/support-desk/tickets-preview.html">I need your help #2256</a></p>
                            <div class="row align-items-center gx-0 gy-2">
                              <div class="col-auto me-2">
                                <h6 class="client mb-0"><a class="text-800 d-flex align-items-center gap-1" href="../app/support-desk/contact-details.html"><span class="fas fa-user" data-fa-transform="shrink-3 up-1"></span><span>Finley</span></a></h6>
                              </div>
                              <div class="col-auto lh-1 me-3"><small class="badge rounded badge-subtle-warning false">Remaining</small></div>
                              <div class="col-auto">
                                <h6 class="mb-0 text-500">2d ago</h6>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="border-bottom mt-4 mb-x1"></div>
                        <div class="d-flex justify-content-between ms-auto">
                          <div class="d-flex align-items-center gap-2 ms-md-4 ms-xl-0" style="width:7.5rem;">
                            <div style="--falcon-circle-progress-bar:50"><svg class="circle-progress-svg" width="26" height="26" viewBox="0 0 120 120">
                                <circle class="progress-bar-rail" cx="60" cy="60" r="54" fill="none" stroke-linecap="round" stroke-width="12"></circle>
                                <circle class="progress-bar-top" cx="60" cy="60" r="54" fill="none" stroke-linecap="round" stroke="#2A7BE4" stroke-width="12"></circle>
                              </svg></div>
                            <h6 class="mb-0 text-700">Medium</h6>
                          </div><select class="form-select form-select-sm" aria-label="agents actions" style="width:9.375rem;">
                            <option>Select Agent</option>
                            <option>Anindya</option>
                            <option selected="selected">Nowrin</option>
                            <option>Khalid</option>
                          </select>
                        </div>
                      </div>
                      <div class="bg-white dark__bg-1100 d-md-flex d-xl-inline-block d-xxl-flex align-items-center p-x1 rounded-3 shadow-sm card-view-height">
                        <div class="d-flex align-items-start align-items-sm-center">
                          <div class="form-check me-2 me-xxl-3 mb-0"><input class="form-check-input" type="checkbox" id="card-view-tickets-3" data-bulk-select-row="data-bulk-select-row" /></div><a class="d-none d-sm-block" href="../app/support-desk/contact-details.html">
                            <div class="avatar avatar-xl avatar-3xl">
                              <div class="avatar-name rounded-circle"><span>PG</span></div>
                            </div>
                          </a>
                          <div class="ms-1 ms-sm-3">
                            <p class="fw-semi-bold mb-3 mb-sm-2"><a href="../app/support-desk/tickets-preview.html">I need your help #2256</a></p>
                            <div class="row align-items-center gx-0 gy-2">
                              <div class="col-auto me-2">
                                <h6 class="client mb-0"><a class="text-800 d-flex align-items-center gap-1" href="../app/support-desk/contact-details.html"><span class="fas fa-user" data-fa-transform="shrink-3 up-1"></span><span>Peter Gill</span></a></h6>
                              </div>
                              <div class="col-auto lh-1 me-3"><small class="badge rounded badge-subtle-info false">Responded</small></div>
                              <div class="col-auto">
                                <h6 class="mb-0 text-500">2d ago</h6>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="border-bottom mt-4 mb-x1"></div>
                        <div class="d-flex justify-content-between ms-auto">
                          <div class="d-flex align-items-center gap-2 ms-md-4 ms-xl-0" style="width:7.5rem;">
                            <div style="--falcon-circle-progress-bar:25"><svg class="circle-progress-svg" width="26" height="26" viewBox="0 0 120 120">
                                <circle class="progress-bar-rail" cx="60" cy="60" r="54" fill="none" stroke-linecap="round" stroke-width="12"></circle>
                                <circle class="progress-bar-top" cx="60" cy="60" r="54" fill="none" stroke-linecap="round" stroke="#00D27B" stroke-width="12"></circle>
                              </svg></div>
                            <h6 class="mb-0 text-700">Low</h6>
                          </div><select class="form-select form-select-sm" aria-label="agents actions" style="width:9.375rem;">
                            <option>Select Agent</option>
                            <option>Anindya</option>
                            <option selected="selected">Nowrin</option>
                            <option>Khalid</option>
                          </select>
                        </div>
                      </div>
                      <div class="bg-white dark__bg-1100 d-md-flex d-xl-inline-block d-xxl-flex align-items-center p-x1 rounded-3 shadow-sm card-view-height">
                        <div class="d-flex align-items-start align-items-sm-center">
                          <div class="form-check me-2 me-xxl-3 mb-0"><input class="form-check-input" type="checkbox" id="card-view-tickets-4" data-bulk-select-row="data-bulk-select-row" /></div><a class="d-none d-sm-block" href="../app/support-desk/contact-details.html">
                            <div class="avatar avatar-xl avatar-3xl">
                              <img class="rounded-circle" src="../assets/img/team/25-thumb.png" alt="" />
                            </div>
                          </a>
                          <div class="ms-1 ms-sm-3">
                            <p class="fw-semi-bold mb-3 mb-sm-2"><a href="../app/support-desk/tickets-preview.html">Contact Froms #3264</a></p>
                            <div class="row align-items-center gx-0 gy-2">
                              <div class="col-auto me-2">
                                <h6 class="client mb-0"><a class="text-800 d-flex align-items-center gap-1" href="../app/support-desk/contact-details.html"><span class="fas fa-user" data-fa-transform="shrink-3 up-1"></span><span>Freya</span></a></h6>
                              </div>
                              <div class="col-auto lh-1 me-3"><small class="badge rounded badge-subtle-secondary dark__bg-1000">Closed</small></div>
                              <div class="col-auto">
                                <h6 class="mb-0 text-500">2d ago</h6>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="border-bottom mt-4 mb-x1"></div>
                        <div class="d-flex justify-content-between ms-auto">
                          <div class="d-flex align-items-center gap-2 ms-md-4 ms-xl-0" style="width:7.5rem;">
                            <div style="--falcon-circle-progress-bar:50"><svg class="circle-progress-svg" width="26" height="26" viewBox="0 0 120 120">
                                <circle class="progress-bar-rail" cx="60" cy="60" r="54" fill="none" stroke-linecap="round" stroke-width="12"></circle>
                                <circle class="progress-bar-top" cx="60" cy="60" r="54" fill="none" stroke-linecap="round" stroke="#2A7BE4" stroke-width="12"></circle>
                              </svg></div>
                            <h6 class="mb-0 text-700">Medium</h6>
                          </div><select class="form-select form-select-sm" aria-label="agents actions" style="width:9.375rem;">
                            <option>Select Agent</option>
                            <option>Anindya</option>
                            <option>Nowrin</option>
                            <option selected="selected">Khalid</option>
                          </select>
                        </div>
                      </div>
                      <div class="bg-white dark__bg-1100 d-md-flex d-xl-inline-block d-xxl-flex align-items-center p-x1 rounded-3 shadow-sm card-view-height">
                        <div class="d-flex align-items-start align-items-sm-center">
                          <div class="form-check me-2 me-xxl-3 mb-0"><input class="form-check-input" type="checkbox" id="card-view-tickets-5" data-bulk-select-row="data-bulk-select-row" /></div><a class="d-none d-sm-block" href="../app/support-desk/contact-details.html">
                            <div class="avatar avatar-xl avatar-3xl">
                              <div class="avatar-name rounded-circle"><span>M</span></div>
                            </div>
                          </a>
                          <div class="ms-1 ms-sm-3">
                            <p class="fw-semi-bold mb-3 mb-sm-2"><a href="../app/support-desk/tickets-preview.html">I need your help #2256</a></p>
                            <div class="row align-items-center gx-0 gy-2">
                              <div class="col-auto me-2">
                                <h6 class="client mb-0"><a class="text-800 d-flex align-items-center gap-1" href="../app/support-desk/contact-details.html"><span class="fas fa-user" data-fa-transform="shrink-3 up-1"></span><span>Morrison</span></a></h6>
                              </div>
                              <div class="col-auto lh-1 me-3"><small class="badge rounded badge-subtle-info false">Responded</small></div>
                              <div class="col-auto">
                                <h6 class="mb-0 text-500">2d ago</h6>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="border-bottom mt-4 mb-x1"></div>
                        <div class="d-flex justify-content-between ms-auto">
                          <div class="d-flex align-items-center gap-2 ms-md-4 ms-xl-0" style="width:7.5rem;">
                            <div style="--falcon-circle-progress-bar:50"><svg class="circle-progress-svg" width="26" height="26" viewBox="0 0 120 120">
                                <circle class="progress-bar-rail" cx="60" cy="60" r="54" fill="none" stroke-linecap="round" stroke-width="12"></circle>
                                <circle class="progress-bar-top" cx="60" cy="60" r="54" fill="none" stroke-linecap="round" stroke="#2A7BE4" stroke-width="12"></circle>
                              </svg></div>
                            <h6 class="mb-0 text-700">Medium</h6>
                          </div><select class="form-select form-select-sm" aria-label="agents actions" style="width:9.375rem;">
                            <option>Select Agent</option>
                            <option>Anindya</option>
                            <option>Nowrin</option>
                            <option selected="selected">Khalid</option>
                          </select>
                        </div>
                      </div>
                      <div class="bg-white dark__bg-1100 d-md-flex d-xl-inline-block d-xxl-flex align-items-center p-x1 rounded-3 shadow-sm card-view-height">
                        <div class="d-flex align-items-start align-items-sm-center">
                          <div class="form-check me-2 me-xxl-3 mb-0"><input class="form-check-input" type="checkbox" id="card-view-tickets-6" data-bulk-select-row="data-bulk-select-row" /></div><a class="d-none d-sm-block" href="../app/support-desk/contact-details.html">
                            <div class="avatar avatar-xl avatar-3xl">
                              <div class="avatar-name rounded-circle"><span>MB</span></div>
                            </div>
                          </a>
                          <div class="ms-1 ms-sm-3">
                            <p class="fw-semi-bold mb-3 mb-sm-2"><a href="../app/support-desk/tickets-preview.html">I need your help #2256</a></p>
                            <div class="row align-items-center gx-0 gy-2">
                              <div class="col-auto me-2">
                                <h6 class="client mb-0"><a class="text-800 d-flex align-items-center gap-1" href="../app/support-desk/contact-details.html"><span class="fas fa-user" data-fa-transform="shrink-3 up-1"></span><span>Morrison Banneker</span></a></h6>
                              </div>
                              <div class="col-auto lh-1 me-3"><small class="badge rounded badge-subtle-secondary dark__bg-1000">Closed</small></div>
                              <div class="col-auto">
                                <h6 class="mb-0 text-500">2d ago</h6>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="border-bottom mt-4 mb-x1"></div>
                        <div class="d-flex justify-content-between ms-auto">
                          <div class="d-flex align-items-center gap-2 ms-md-4 ms-xl-0" style="width:7.5rem;">
                            <div style="--falcon-circle-progress-bar:50"><svg class="circle-progress-svg" width="26" height="26" viewBox="0 0 120 120">
                                <circle class="progress-bar-rail" cx="60" cy="60" r="54" fill="none" stroke-linecap="round" stroke-width="12"></circle>
                                <circle class="progress-bar-top" cx="60" cy="60" r="54" fill="none" stroke-linecap="round" stroke="#2A7BE4" stroke-width="12"></circle>
                              </svg></div>
                            <h6 class="mb-0 text-700">Medium</h6>
                          </div><select class="form-select form-select-sm" aria-label="agents actions" style="width:9.375rem;">
                            <option>Select Agent</option>
                            <option>Anindya</option>
                            <option>Nowrin</option>
                            <option selected="selected">Khalid</option>
                          </select>
                        </div>
                      </div>
                      <div class="bg-white dark__bg-1100 d-md-flex d-xl-inline-block d-xxl-flex align-items-center p-x1 rounded-3 shadow-sm card-view-height">
                        <div class="d-flex align-items-start align-items-sm-center">
                          <div class="form-check me-2 me-xxl-3 mb-0"><input class="form-check-input" type="checkbox" id="card-view-tickets-7" data-bulk-select-row="data-bulk-select-row" /></div><a class="d-none d-sm-block" href="../app/support-desk/contact-details.html">
                            <div class="avatar avatar-xl avatar-3xl">
                              <img class="rounded-circle" src="../assets/img/team/14-thumb.png" alt="" />
                            </div>
                          </a>
                          <div class="ms-1 ms-sm-3">
                            <p class="fw-semi-bold mb-3 mb-sm-2"><a href="../app/support-desk/tickets-preview.html">Regarding Falcon Theme #3262</a></p>
                            <div class="row align-items-center gx-0 gy-2">
                              <div class="col-auto me-2">
                                <h6 class="client mb-0"><a class="text-800 d-flex align-items-center gap-1" href="../app/support-desk/contact-details.html"><span class="fas fa-user" data-fa-transform="shrink-3 up-1"></span><span>Aar Kay</span></a></h6>
                              </div>
                              <div class="col-auto lh-1 me-3"><small class="badge rounded badge-subtle-success false">Recent</small></div>
                              <div class="col-auto">
                                <h6 class="mb-0 text-500">2d ago</h6>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="border-bottom mt-4 mb-x1"></div>
                        <div class="d-flex justify-content-between ms-auto">
                          <div class="d-flex align-items-center gap-2 ms-md-4 ms-xl-0" style="width:7.5rem;">
                            <div style="--falcon-circle-progress-bar:75"><svg class="circle-progress-svg" width="26" height="26" viewBox="0 0 120 120">
                                <circle class="progress-bar-rail" cx="60" cy="60" r="54" fill="none" stroke-linecap="round" stroke-width="12"></circle>
                                <circle class="progress-bar-top" cx="60" cy="60" r="54" fill="none" stroke-linecap="round" stroke="#F68F57" stroke-width="12"></circle>
                              </svg></div>
                            <h6 class="mb-0 text-700">High</h6>
                          </div><select class="form-select form-select-sm" aria-label="agents actions" style="width:9.375rem;">
                            <option>Select Agent</option>
                            <option>Anindya</option>
                            <option>Nowrin</option>
                            <option>Khalid</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="text-center d-none" id="tickets-card-fallback">
                      <p class="fw-bold fs-8 mt-3">No ticket found</p>
                    </div>
                  </div>
                  <div class="card-footer">
                    <div class="row align-items-center">
                      <div class="pagination d-none"></div>
                      <div class="col"><span class="d-none d-sm-inline-block me-2 fs-10" data-list-info="data-list-info"></span></div>
                      <div class="col-auto d-flex"><button class="btn btn-sm btn-primary" type="button" data-list-pagination="prev"><span>Previous</span></button><button class="btn btn-sm btn-primary px-4 ms-2" type="button" data-list-pagination="next"><span>Next</span></button></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--尾栏-->
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
<script setup>
import { onMounted, ref,computed } from 'vue'
import { useRouter } from 'vue-router'
import { defineOptions } from 'vue'

// 声明组件名
defineOptions({ name: 'Dashboard' })

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
            <button class="btn navbar-toggler-humburger-icon navbar-toggler me-1 me-sm-3" type="button" data-bs-toggle="collapse" data-bs-target="#navbarVerticalCollapse" aria-controls="navbarVerticalCollapse" aria-expanded="false" aria-label="Toggle Navigation">
              <span class="navbar-toggle-icon"><span class="toggle-line"></span></span></button>
            <a class="navbar-brand me-1 me-sm-3" href="">
              <div class="d-flex align-items-center"><img class="me-2" src="" alt="" width="40" /><span class="font-sans-serif text-primary">falcon</span></div>
            </a>
            <ul class="navbar-nav align-items-center d-none d-lg-block">
              <li class="nav-item">
                <div class="search-box" data-list='{"valueNames":["title"]}'>
                  <form class="position-relative" data-bs-toggle="search" data-bs-display="static"><input class="form-control search-input fuzzy-search" type="search" placeholder="搜索" aria-label="Search" />
                    <span class="fas fa-search search-box-icon"></span>
                  </form>
                  <div class="btn-close-falcon-container position-absolute end-0 top-50 translate-middle shadow-none" data-bs-dismiss="search"><button class="btn btn-link btn-close-falcon p-0" aria-label="Close"></button></div>
                  <div class="dropdown-menu border font-base start-0 mt-2 py-0 overflow-hidden w-100">
                    <div class="scrollbar list py-3" style="max-height: 24rem;">
                      <h6 class="dropdown-header fw-medium text-uppercase px-x1 fs-11 pt-0 pb-2">最近浏览</h6>
                      <a class="dropdown-item fs-10 px-x1 py-1 hover-primary" @click="goToMedicalExpenses" href="">
                        <div class="d-flex align-items-center">
                          <span class="fas fa-circle me-2 text-300 fs-11"></span>
                          <div class="fw-normal title">数据展示<span class="fas fa-chevron-right mx-1 text-500 fs-11" data-fa-transform="shrink-2"></span>医疗费用</div>
                        </div>
                      </a>
                      <a class="dropdown-item fs-10 px-x1 py-1 hover-primary" @click="goToPersonalCenter" href="">
                        <div class="d-flex align-items-center">
                          <span class="fas fa-circle me-2 text-300 fs-11"></span>
                          <div class="fw-normal title">通用功能<span class="fas fa-chevron-right mx-1 text-500 fs-11" data-fa-transform="shrink-2"></span>个人中心</div>
                        </div>
                      </a>
                    </div>
                    <div class="text-center mt-n3">
                      <p class="fallback fw-bold fs-8 d-none">没找到结果</p>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
            <ul class="navbar-nav navbar-nav-icons ms-auto flex-row align-items-center">
              <li class="nav-item ps-2 pe-0">
                <div class="dropdown theme-control-dropdown"><a class="nav-link d-flex align-items-center dropdown-toggle fa-icon-wait fs-9 pe-1 py-0" href="#" role="button" id="themeSwitchDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span class="fas fa-sun fs-7" data-fa-transform="shrink-2" data-theme-dropdown-toggle-icon="light"></span><span class="fas fa-moon fs-7" data-fa-transform="shrink-3" data-theme-dropdown-toggle-icon="dark"></span><span class="fas fa-adjust fs-7" data-fa-transform="shrink-2" data-theme-dropdown-toggle-icon="auto"></span></a>
                  <div class="dropdown-menu dropdown-menu-end dropdown-caret border py-0 mt-3" aria-labelledby="themeSwitchDropdown">
                    <div class="bg-white dark__bg-1000 rounded-2 py-2"><button class="dropdown-item d-flex align-items-center gap-2" type="button" value="light" data-theme-control="theme"><span class="fas fa-sun"></span>浅色<span class="fas fa-check dropdown-check-icon ms-auto text-600"></span></button><button class="dropdown-item d-flex align-items-center gap-2" type="button" value="dark" data-theme-control="theme"><span class="fas fa-moon" data-fa-transform=""></span>深色<span class="fas fa-check dropdown-check-icon ms-auto text-600"></span></button><button class="dropdown-item d-flex align-items-center gap-2" type="button" value="auto" data-theme-control="theme"><span class="fas fa-adjust" data-fa-transform=""></span>自动<span class="fas fa-check dropdown-check-icon ms-auto text-600"></span></button></div>
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
                    <h6 class="dropdown-header fw-medium text-uppercase px-x1 fs-11 pt-0 pb-2">个人信息</h6>
                    <a class="dropdown-item px-x1 py-2" href="#!">
                      <div class="d-flex align-items-center">
                        <div class="file-thumbnail me-2"><img class="border h-100 w-100 object-fit-cover rounded-3" src="../../assets/img/profile/5.jpg" alt=""></div>
                        <div class="flex-1">
                          <h6 class="mb-0 title">{{username}}</h6>
                          <p class="fs-11 mb-0 d-flex"><span class="fw-semi-bold">{{ role }}</span></p>
                        </div>
                      </div>
                    </a>
                    <hr class="text-200 dark__text-900">
                    <a class="dropdown-item px-x1 py-1 fs-9" @click="goToLogout">
                      <div class="d-flex align-items-center">
                        <div class="flex-1 fs-10 title">登出</div>
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
          <!--欢迎栏-->
          <div class="row g-3 mb-3">
            <div class="col-xxl-6">
              <div class="row g-0 h-100">
                <div class="col-12">
                  <div class="card bg-body-tertiary dark__bg-opacity-50 shadow-none">
                    <div class="bg-holder bg-card d-none d-sm-block" style="background-image:url(https://prium.github.io/falcon/v3.24.0/assets/img/illustrations/ticket-bg.png);"></div><!--/.bg-holder-->
                    <div class="d-flex align-items-center z-1 p-0">
                      <img src="../../assets/img/illustrations/crm-bar-chart.png" alt="" width="96" />
                      <div class="ms-n3">
                        <h6 class="mb-1 text-primary">欢迎来到</h6>
                        <h4 class="mb-0 text-primary fw-bold">健康大数据研究中心</h4>
                      </div>
                      <img src="../../assets/img/illustrations/crm-line-chart.png" alt="" width="96" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row g-3 mb-3">
            <div class="col-md-6 col-xxl-3">
              <div class="card h-md-100 ecommerce-card-min-width">
                <div class="card-header pb-0">
                  <h6 class="mb-0 mt-2 d-flex align-items-center">每周健康数据<span class="ms-1 text-400" data-bs-toggle="tooltip" data-bs-placement="top" title="Calculated according to last week's sales"><span class="far fa-question-circle" data-fa-transform="shrink-1"></span></span></h6>
                </div>
                <div class="card-body d-flex flex-column justify-content-end">
                  <div class="row">
                    <div class="col">
                      <p class="font-sans-serif lh-1 mb-1 fs-5">12.3K</p><span class="badge badge-subtle-success rounded-pill fs-11">+4.2%</span>
                    </div>
                    <div class="col-auto ps-0">
                      <div class="echart-bar-weekly-sales h-100"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-xxl-3">
              <div class="card h-md-100">
                <div class="card-header pb-0">
                  <h6 class="mb-0 mt-2">健康总数居</h6>
                </div>
                <div class="card-body d-flex flex-column justify-content-end">
                  <div class="row justify-content-between">
                    <div class="col-auto align-self-end">
                      <div class="fs-5 fw-normal font-sans-serif text-700 lh-1 mb-1">58.4K</div><span class="badge rounded-pill fs-11 bg-200 text-primary"><span class="fas fa-caret-up me-1"></span>11.6%</span>
                    </div>
                    <div class="col-auto ps-0 mt-n4">
                      <div class="echart-default-total-order" 
                      data-echarts='{"tooltip":{"trigger":"axis","formatter":"{b0} : {c0}"},"xAxis":{"data":["Week 4","Week 5","Week 6","Week 7"]},
                      "series":[{"type":"line","data":[20,40,100,120],"smooth":true,"lineStyle":{"width":3}}],"grid":{"bottom":"2%","top":"2%","right":"0","left":"10px"}}' 
                      data-echart-responsive="true"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-xxl-3">
              <div class="card h-md-100">
                <div class="card-body">
                  <div class="row h-100 justify-content-between g-0">
                    <div class="col-5 col-sm-6 col-xxl pe-2">
                      <h6 class="mt-1">疾病风险分布</h6>
                      <div class="fs-11 mt-3">
                        <div class="d-flex flex-between-center mb-1">
                          <div class="d-flex align-items-center"><span class="dot bg-primary"></span><span class="fw-semi-bold">高血压</span></div>
                          <div class="d-xxl-none">33%</div>
                        </div>
                        <div class="d-flex flex-between-center mb-1">
                          <div class="d-flex align-items-center"><span class="dot bg-info"></span><span class="fw-semi-bold">糖尿病</span></div>
                          <div class="d-xxl-none">29%</div>
                        </div>
                        <div class="d-flex flex-between-center mb-1">
                          <div class="d-flex align-items-center"><span class="dot bg-300"></span><span class="fw-semi-bold">颈椎病</span></div>
                          <div class="d-xxl-none">20%</div>
                        </div>
                      </div>
                    </div>
                    <div class="col-auto position-relative">
                      <div class="echart-market-share"></div>
                      <div class="position-absolute top-50 start-50 translate-middle text-1100 fs-7">26M</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-xxl-3">
              <div class="card h-md-100">
                <div class="card-header d-flex flex-between-center pb-0">
                  <h6 class="mb-0">天气</h6>
                  <div class="dropdown font-sans-serif btn-reveal-trigger"><button class="btn btn-link text-600 btn-sm dropdown-toggle dropdown-caret-none btn-reveal" type="button" id="dropdown-weather-update" data-bs-toggle="dropdown" data-boundary="viewport" aria-haspopup="true" aria-expanded="false"><span class="fas fa-ellipsis-h fs-11"></span></button>
                    <div class="dropdown-menu dropdown-menu-end border py-2" aria-labelledby="dropdown-weather-update"><a class="dropdown-item" href="#!">View</a><a class="dropdown-item" href="#!">Export</a>
                      <div class="dropdown-divider"></div><a class="dropdown-item text-danger" href="#!">Remove</a>
                    </div>
                  </div>
                </div>
                <div class="card-body pt-2">
                  <div class="row g-0 h-100 align-items-center">
                    <div class="col">
                      <div class="d-flex align-items-center"><img class="me-3" src="../../assets/img/icons/weather-icon.png" alt="" height="60" />
                        <div>
                          <h6 class="mb-2">成都</h6>
                          <div class="fs-11 fw-semi-bold">
                            <div class="text-warning">晴</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-auto text-center ps-2">
                      <div class="fs-5 fw-normal font-sans-serif text-primary mb-1 lh-1">31&deg;</div>
                      <div class="fs-10 text-800">32&deg; / 25&deg;</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row g-0">
            <div class="col-lg-6 pe-lg-2 mb-3">
              <div class="card h-lg-100 overflow-hidden">
                <div class="card-header bg-body-tertiary">
                  <div class="row align-items-center">
                    <div class="col">
                      <h6 class="mb-0">健康计划运行</h6>
                    </div>
                    <div class="col-auto text-center pe-x1"><select class="form-select form-select-sm">
                        <option>糖尿病管理</option>
                        <option>高血压管理</option>
                        <option>颈椎关护</option>
                      </select></div>
                  </div>
                </div>
                <div class="card-body p-0">
                  <div class="row g-0 align-items-center py-2 position-relative border-bottom border-200">
                    <div class="col ps-x1 py-1 position-static">
                      <div class="d-flex align-items-center">
                        <div class="avatar avatar-xl me-3">
                          <div class="avatar-name rounded-circle bg-primary-subtle text-dark"><span class="fs-9 text-primary">F</span></div>
                        </div>
                        <div class="flex-1">
                          <h6 class="mb-0 d-flex align-items-center"><a class="text-800 stretched-link" href="#!">糖尿病管理</a><span class="badge rounded-pill ms-2 bg-200 text-primary">38%</span></h6>
                        </div>
                      </div>
                    </div>
                    <div class="col py-1">
                      <div class="row flex-end-center g-0">
                        <div class="col-auto pe-2">
                          <div class="fs-10 fw-semi-bold">12:50:00</div>
                        </div>
                        <div class="col-5 pe-x1 ps-2">
                          <div class="progress bg-200 me-2" style="height: 5px;" role="progressbar" aria-valuenow="38" aria-valuemin="0" aria-valuemax="100">
                            <div class="progress-bar rounded-pill" style="width: 38%"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row g-0 align-items-center py-2 position-relative border-bottom border-200">
                    <div class="col ps-x1 py-1 position-static">
                      <div class="d-flex align-items-center">
                        <div class="avatar avatar-xl me-3">
                          <div class="avatar-name rounded-circle bg-success-subtle text-dark"><span class="fs-9 text-success">R</span></div>
                        </div>
                        <div class="flex-1">
                          <h6 class="mb-0 d-flex align-items-center"><a class="text-800 stretched-link" href="#!">高血压管理</a><span class="badge rounded-pill ms-2 bg-200 text-primary">79%</span></h6>
                        </div>
                      </div>
                    </div>
                    <div class="col py-1">
                      <div class="row flex-end-center g-0">
                        <div class="col-auto pe-2">
                          <div class="fs-10 fw-semi-bold">25:20:00</div>
                        </div>
                        <div class="col-5 pe-x1 ps-2">
                          <div class="progress bg-200 me-2" style="height: 5px;" role="progressbar" aria-valuenow="79" aria-valuemin="0" aria-valuemax="100">
                            <div class="progress-bar rounded-pill" style="width: 79%"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row g-0 align-items-center py-2 position-relative border-bottom border-200">
                    <div class="col ps-x1 py-1 position-static">
                      <div class="d-flex align-items-center">
                        <div class="avatar avatar-xl me-3">
                          <div class="avatar-name rounded-circle bg-info-subtle text-dark"><span class="fs-9 text-info">B</span></div>
                        </div>
                        <div class="flex-1">
                          <h6 class="mb-0 d-flex align-items-center"><a class="text-800 stretched-link" href="#!">肥胖干预</a><span class="badge rounded-pill ms-2 bg-200 text-primary">90%</span></h6>
                        </div>
                      </div>
                    </div>
                    <div class="col py-1">
                      <div class="row flex-end-center g-0">
                        <div class="col-auto pe-2">
                          <div class="fs-10 fw-semi-bold">58:20:00</div>
                        </div>
                        <div class="col-5 pe-x1 ps-2">
                          <div class="progress bg-200 me-2" style="height: 5px;" role="progressbar" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100">
                            <div class="progress-bar rounded-pill" style="width: 90%"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row g-0 align-items-center py-2 position-relative border-bottom border-200">
                    <div class="col ps-x1 py-1 position-static">
                      <div class="d-flex align-items-center">
                        <div class="avatar avatar-xl me-3">
                          <div class="avatar-name rounded-circle bg-warning-subtle text-dark"><span class="fs-9 text-warning">R</span></div>
                        </div>
                        <div class="flex-1">
                          <h6 class="mb-0 d-flex align-items-center"><a class="text-800 stretched-link" href="#!">脊椎关护</a><span class="badge rounded-pill ms-2 bg-200 text-primary">40%</span></h6>
                        </div>
                      </div>
                    </div>
                    <div class="col py-1">
                      <div class="row flex-end-center g-0">
                        <div class="col-auto pe-2">
                          <div class="fs-10 fw-semi-bold">21:20:00</div>
                        </div>
                        <div class="col-5 pe-x1 ps-2">
                          <div class="progress bg-200 me-2" style="height: 5px;" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100">
                            <div class="progress-bar rounded-pill" style="width: 40%"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row g-0 align-items-center py-2 position-relative">
                    <div class="col ps-x1 py-1 position-static">
                      <div class="d-flex align-items-center">
                        <div class="avatar avatar-xl me-3">
                          <div class="avatar-name rounded-circle bg-danger-subtle text-dark"><span class="fs-9 text-danger">S</span></div>
                        </div>
                        <div class="flex-1">
                          <h6 class="mb-0 d-flex align-items-center"><a class="text-800 stretched-link" href="#!">睡眠改善</a><span class="badge rounded-pill ms-2 bg-200 text-primary">70%</span></h6>
                        </div>
                      </div>
                    </div>
                    <div class="col py-1">
                      <div class="row flex-end-center g-0">
                        <div class="col-auto pe-2">
                          <div class="fs-10 fw-semi-bold">31:20:00</div>
                        </div>
                        <div class="col-5 pe-x1 ps-2">
                          <div class="progress bg-200 me-2" style="height: 5px;" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100">
                            <div class="progress-bar rounded-pill" style="width: 70%"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="card-footer bg-body-tertiary p-0"><a class="btn btn-sm btn-link d-block w-100 py-2" href="#!">展开<span class="fas fa-chevron-right ms-1 fs-11"></span></a></div>
              </div>
            </div>
            <div class="col-lg-6 ps-lg-2 mb-3">
              <div class="card h-lg-100">
                <div class="card-header">
                  <div class="row flex-between-center">
                    <div class="col-auto">
                      <h6 class="mb-0">月度健康序列</h6>
                    </div>
                    <div class="col-auto d-flex"><select class="form-select form-select-sm select-month me-2">
                        <option value="0">1月</option>
                        <option value="1">2月</option>
                        <option value="2">3月</option>
                        <option value="3">4月</option>
                        <option value="4">5月</option>
                        <option value="5">6月</option>
                        <option value="6">7月</option>
                        <option value="7">8月</option>
                        <option value="8">9月</option>
                        <option value="9">10月</option>
                        <option value="10">11月</option>
                        <option value="11">12月</option>
                      </select>
                      <div class="dropdown font-sans-serif btn-reveal-trigger"><button class="btn btn-link text-600 btn-sm dropdown-toggle dropdown-caret-none btn-reveal" type="button" id="dropdown-total-sales" data-bs-toggle="dropdown" data-boundary="viewport" aria-haspopup="true" aria-expanded="false"><span class="fas fa-ellipsis-h fs-11"></span></button>
                        <div class="dropdown-menu dropdown-menu-end border py-2" aria-labelledby="dropdown-total-sales"><a class="dropdown-item" href="#!">View</a><a class="dropdown-item" href="#!">Export</a>
                          <div class="dropdown-divider"></div><a class="dropdown-item text-danger" href="#!">Remove</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="card-body h-100 pe-0"><!-- Find the JS file for the following chart at: src\js\charts\echarts\total-sales.js--><!-- If you are not using gulp based workflow, you can find the transpiled code at: public\assets\js\theme.js-->
                  <div class="echart-line-total-sales h-100" data-echart-responsive="true"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="row g-0">
            <div class="col-lg-6 col-xl-7 col-xxl-8 mb-3 pe-lg-2 mb-3">
              <div class="card h-lg-100">
                <div class="card-body d-flex align-items-center">
                  <div class="w-100">
                    <h6 class="mb-3 text-800">健康数据存储 <strong class="text-1100">1775.06 MB </strong>of 2 GB</h6>
                    <div class="progress-stacked mb-3 rounded-3" style="height: 10px;">
                      <div class="progress" style="width: 43.72%;" role="progressbar" aria-valuenow="43.72" aria-valuemin="0" aria-valuemax="100">
                        <div class="progress-bar bg-progress-gradient border-end border-100 border-2"></div>
                      </div>
                      <div class="progress" style="width: 18.76%;" role="progressbar" aria-valuenow="18.76" aria-valuemin="0" aria-valuemax="100">
                        <div class="progress-bar bg-info border-end border-100 border-2"></div>
                      </div>
                      <div class="progress" style="width: 9.38%;" role="progressbar" aria-valuenow="9.38" aria-valuemin="0" aria-valuemax="100">
                        <div class="progress-bar bg-success border-end border-100 border-2"></div>
                      </div>
                      <div class="progress" style="width: 28.14%;" role="progressbar" aria-valuenow="28.14" aria-valuemin="0" aria-valuemax="100">
                        <div class="progress-bar bg-200"></div>
                      </div>
                    </div>
                    <div class="row fs-10 fw-semi-bold text-500 g-0">
                      <div class="col-auto d-flex align-items-center pe-3"><span class="dot bg-primary"></span><span>常规</span><span class="d-none d-md-inline-block d-lg-none d-xxl-inline-block">(895MB)</span></div>
                      <div class="col-auto d-flex align-items-center pe-3"><span class="dot bg-info"></span><span>系统</span><span class="d-none d-md-inline-block d-lg-none d-xxl-inline-block">(379MB)</span></div>
                      <div class="col-auto d-flex align-items-center pe-3"><span class="dot bg-success"></span><span>共享</span><span class="d-none d-md-inline-block d-lg-none d-xxl-inline-block">(192MB)</span></div>
                      <div class="col-auto d-flex align-items-center"><span class="dot bg-200"></span><span>空闲</span><span class="d-none d-md-inline-block d-lg-none d-xxl-inline-block">(576MB)</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-6 col-xl-5 col-xxl-4 mb-3 ps-lg-2">
              <div class="card h-lg-100">
                <div class="bg-holder bg-card" style="background-image:url(https://prium.github.io/falcon/v3.24.0/assets/img/icons/spot-illustrations/corner-1.png);"></div><!--/.bg-holder-->
                <div class="card-body position-relative">
                  <h5 class="text-warning">潜在健康风险检测</h5>
                  <p class="fs-10 mb-0">在3k以上的用户组中发现早期预警信号，深入分析，预防慢性疾病。</p><a class="btn btn-link fs-10 text-warning mt-lg-3 ps-0" href="#!">改善存储<span class="fas fa-chevron-right ms-1" data-fa-transform="shrink-4 down-1"></span></a>
                </div>
              </div>
            </div>
          </div>
          
          <div class="row g-0">
            <div class="col-md-6 col-xxl-3 pe-md-2 mb-3 mb-xxl-0">
              <div class="card">
                <div class="card-header d-flex flex-between-center bg-body-tertiary py-2">
                  <h6 class="mb-0">小组成员</h6>
                  <div class="dropdown font-sans-serif btn-reveal-trigger"><button class="btn btn-link text-600 btn-sm dropdown-toggle dropdown-caret-none btn-reveal" type="button" id="dropdown-active-user" data-bs-toggle="dropdown" data-boundary="viewport" aria-haspopup="true" aria-expanded="false"><span class="fas fa-ellipsis-h fs-11"></span></button>
                    <div class="dropdown-menu dropdown-menu-end border py-2" aria-labelledby="dropdown-active-user"><a class="dropdown-item" href="#!">View</a><a class="dropdown-item" href="#!">Export</a>
                      <div class="dropdown-divider"></div><a class="dropdown-item text-danger" href="#!">Remove</a>
                    </div>
                  </div>
                </div>
                <div class="card-body py-2">
                  <div class="d-flex align-items-center position-relative mb-3">
                    <div class="avatar avatar-2xl status-online">
                      <img class="rounded-circle" src="../../../public/img/head1.jpg" alt="" />
                    </div>
                    <div class="flex-1 ms-3">
                      <h6 class="mb-0 fw-semi-bold"><a class="stretched-link text-900" href="pages/user/profile.html">冯泽</a></h6>
                      <p class="text-500 fs-11 mb-0">项目经理r</p>
                    </div>
                  </div>
                  <div class="d-flex align-items-center position-relative mb-3">
                    <div class="avatar avatar-2xl status-online">
                      <img class="rounded-circle" src="../../../public/img/head2.jpg" alt="" />
                    </div>
                    <div class="flex-1 ms-3">
                      <h6 class="mb-0 fw-semi-bold"><a class="stretched-link text-900" href="pages/user/profile.html">林美茜</a></h6>
                      <p class="text-500 fs-11 mb-0">后端工程师</p>
                    </div>
                  </div>
                  <div class="d-flex align-items-center position-relative mb-3">
                    <div class="avatar avatar-2xl status-away">
                      <img class="rounded-circle" src="../../../public/img/head3.jpg" alt="" />
                    </div>
                    <div class="flex-1 ms-3">
                      <h6 class="mb-0 fw-semi-bold"><a class="stretched-link text-900" href="pages/user/profile.html">唐婷</a></h6>
                      <p class="text-500 fs-11 mb-0">后端工程师</p>
                    </div>
                  </div>
                  <div class="d-flex align-items-center position-relative mb-3">
                    <div class="avatar avatar-2xl status-offline">
                      <img class="rounded-circle" src="../../../public/img/head4.jpg" alt="" />
                    </div>
                    <div class="flex-1 ms-3">
                      <h6 class="mb-0 fw-semi-bold"><a class="stretched-link text-900" href="pages/user/profile.html">周怡婧</a></h6>
                      <p class="text-500 fs-11 mb-0">分析设计师</p>
                    </div>
                  </div>
                  <div class="d-flex align-items-center position-relative false">
                    <div class="avatar avatar-2xl status-offline">
                      <img class="rounded-circle" src="../../../public/img/head5.jpg" alt="" />
                    </div>
                    <div class="flex-1 ms-3">
                      <h6 class="mb-0 fw-semi-bold"><a class="stretched-link text-900" href="pages/user/profile.html">董恩琪</a></h6>
                      <p class="text-500 fs-11 mb-0">前端工程师</p>
                    </div>
                  </div>
                </div>
                <div class="card-footer bg-body-tertiary p-0"><a class="btn btn-sm btn-link d-block w-100 py-2" href="app/social/followers.html"><span class="fas fa-chevron-right ms-1 fs-11"></span></a></div>
              </div>
            </div>
            <div class="col-md-6 col-xxl-3 ps-md-2 order-xxl-1 mb-3 mb-xxl-0">
              <div class="card h-100">
                <div class="card-header bg-body-tertiary d-flex flex-between-center py-2">
                  <h6 class="mb-0">疾病预测精准率</h6>
                  <div class="dropdown font-sans-serif btn-reveal-trigger"><button class="btn btn-link text-600 btn-sm dropdown-toggle dropdown-caret-none btn-reveal" type="button" id="dropdown-bandwidth-saved" data-bs-toggle="dropdown" data-boundary="viewport" aria-haspopup="true" aria-expanded="false"><span class="fas fa-ellipsis-h fs-11"></span></button>
                    <div class="dropdown-menu dropdown-menu-end border py-2" aria-labelledby="dropdown-bandwidth-saved"><a class="dropdown-item" href="#!">View</a><a class="dropdown-item" href="#!">Export</a>
                      <div class="dropdown-divider"></div><a class="dropdown-item text-danger" href="#!">Remove</a>
                    </div>
                  </div>
                </div>
                <div class="card-body d-flex flex-center flex-column">
                  <div class="text-center mt-3">
                    <h6 class="fs-9 mb-1"><span class="fas fa-check text-success me-1" data-fa-transform="shrink-2"></span>35.75K 案例成功预测</h6>
                    <p class="fs-10 mb-0">共分析38.44K样例 </p>
                  </div>
                </div>
                <div class="card-footer bg-body-tertiary py-2">
                  <div class="row flex-between-center">
                    <div class="col-auto"><select class="form-select form-select-sm">
                        <option>过去6个月</option>
                        <option>去年</option>
                        <option>过去两年</option>
                      </select></div>
                    <div class="col-auto"><a class="fs-10 font-sans-serif" href="#!">Help</a></div>
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
    </main>
    
    <!-- ===============================================--><!--    End of Main Content--><!-- ===============================================-->

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
          <div class="settings-popover"><span class="ripple">
            <span class="fa-spin position-absolute all-0 d-flex flex-center">
              <span class="icon-spin position-absolute all-0 d-flex flex-center">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.7369 12.3941L19.1989 12.1065C18.4459 11.7041 18.0843 10.8487 18.0843 9.99495C18.0843 9.14118 18.4459 8.28582 19.1989 7.88336L19.7369 7.59581C19.9474 7.47484 20.0316 7.23291 19.9474 7.03131C19.4842 5.57973 18.6843 4.28943 17.6738 3.20075C17.5053 3.03946 17.2527 2.99914 17.0422 3.12011L16.393 3.46714C15.6883 3.84379 14.8377 3.74529 14.1476 3.3427C14.0988 3.31422 14.0496 3.28621 14.0002 3.25868C13.2568 2.84453 12.7055 2.10629 12.7055 1.25525V0.70081C12.7055 0.499202 12.5371 0.297594 12.2845 0.257272C10.7266 -0.105622 9.16879 -0.0653007 7.69516 0.257272C7.44254 0.297594 7.31623 0.499202 7.31623 0.70081V1.23474C7.31623 2.09575 6.74999 2.8362 5.99824 3.25599C5.95774 3.27861 5.91747 3.30159 5.87744 3.32493C5.15643 3.74527 4.26453 3.85902 3.53534 3.45302L2.93743 3.12011C2.72691 2.99914 2.47429 3.03946 2.30587 3.20075C1.29538 4.28943 0.495411 5.57973 0.0322686 7.03131C-0.051939 7.23291 0.0322686 7.47484 0.242788 7.59581L0.784376 7.8853C1.54166 8.29007 1.92694 9.13627 1.92694 9.99495C1.92694 10.8536 1.54166 11.6998 0.784375 12.1046L0.242788 12.3941C0.0322686 12.515 -0.051939 12.757 0.0322686 12.9586C0.495411 14.4102 1.29538 15.7005 2.30587 16.7891C2.47429 16.9504 2.72691 16.9907 2.93743 16.8698L3.58669 16.5227C4.29133 16.1461 5.14131 16.2457 5.8331 16.6455C5.88713 16.6767 5.94159 16.7074 5.99648 16.7375C6.75162 17.1511 7.31623 17.8941 7.31623 18.7552V19.2891C7.31623 19.4425 7.41373 19.5959 7.55309 19.696C7.64066 19.7589 7.74815 19.7843 7.85406 19.8046C9.35884 20.0925 10.8609 20.0456 12.2845 19.7729C12.5371 19.6923 12.7055 19.4907 12.7055 19.2891V18.7346C12.7055 17.8836 13.2568 17.1454 14.0002 16.7312C14.0496 16.7037 14.0988 16.6757 14.1476 16.6472C14.8377 16.2446 15.6883 16.1461 16.393 16.5227L17.0422 16.8698C17.2527 16.9907 17.5053 16.9504 17.6738 16.7891C18.7264 15.7005 19.4842 14.4102 19.9895 12.9586C20.0316 12.757 19.9474 12.515 19.7369 12.3941ZM10.0109 13.2005C8.1162 13.2005 6.64257 11.7893 6.64257 9.97478C6.64257 8.20063 8.1162 6.74905 10.0109 6.74905C11.8634 6.74905 13.3792 8.20063 13.3792 9.97478C13.3792 11.7893 11.8634 13.2005 10.0109 13.2005Z" fill="#2A7BE4"></path>
                </svg>
              </span>
            </span>
          </span>
        </div>
        </div>
        <small class="text-uppercase text-primary fw-bold bg-primary-subtle py-2 pe-2 ps-1 rounded-end">设置</small>
      </div>
    </a>
</template>

<style>
</style>
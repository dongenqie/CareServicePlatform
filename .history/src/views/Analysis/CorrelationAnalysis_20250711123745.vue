<script setup>
import { onMounted, ref, onUnmounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { defineOptions } from 'vue'
import Dropzone from 'dropzone';
import { getCorrelation } from '@/api/analysis'; // 引入相关性分析接口
import { correlationChartInit } from '@/js/echart-analysis.js';
import { sendMessageToDeepSeek } from '@/api/deepseek'

// —— AI 辅助相关状态
const aiInput = ref('')
const isChatLoading = ref(false)
// 保存整个对话历史
const messages = ref([])

// 辅助格式化时间
function formatDate(date) {
  const d = new Date(date)
  return `${d.getFullYear()}/${d.getMonth()+1}/${d.getDate()}`
}
function formatTime(date) {
  const d = new Date(date)
  const h = d.getHours().toString().padStart(2, '0')
  const m = d.getMinutes().toString().padStart(2, '0')
  return `${h}:${m}`
}

// 发送消息到 DeepSeek，并维护 messages
async function sendMessage() {
  const content = aiInput.value.trim()
  if (!content) return
  // 1) 推入用户消息
  messages.value.push({
    type: 'user',
    text: content,
    time: new Date()
  })
  aiInput.value = ''
  isChatLoading.value = true
  try {
    // 2) 调用 API
    const reply = await sendMessageToDeepSeek(content)
    // 3) 推入 AI 回复
    messages.value.push({
      type: 'ai',
      text: reply,
      time: new Date()
    })
  } catch (e) {
    messages.value.push({
      type: 'ai',
      text: `错误：${e.message}`,
      time: new Date()
    })
  } finally {
    isChatLoading.value = false
  }
}

// 声明组件名
defineOptions({ name: 'CorrelationAnalysis' })

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

// 禁用 Dropzone 的自动发现
Dropzone.autoDiscover = false;

// 存储 Dropzone 实例
let myDropzone = null;

const file = ref(null);
const attributeName1 = ref('');
const attributeName2 = ref('');
const correlationData = ref(null); // 存储后端返回的相关性数据
const scatterData = ref([]); // 存储散点图数据

// 文件改变处理
const handleFileChange = (event) => {
  file.value = event.target.files[0];
};

const analysisResults = ref(null); // 控制分析结果的显示
// 渐显过渡效果的钩子
const beforeEnter = (el) => {
  el.style.opacity = 0;
};
const enter = (el, done) => {
  el.offsetHeight; // 强制浏览器计算样式
  el.style.transition = 'opacity 1s ease';
  el.style.opacity = 1;
  done();
};
const leave = (el, done) => {
  el.style.transition = 'opacity 1s ease';
  el.style.opacity = 0;
  done();
};

const submitFile = async () => {
  if (!myDropzone || myDropzone.files.length === 0) {
    return alert('请先上传文件！');
  }

  try {
    const fileToUpload = myDropzone.files[0];  // 获取上传的文件
    const formData = new FormData();
    formData.append('file', fileToUpload);  // 添加文件到 FormData，确保字段名为 'file'
    formData.append('attributeName1', attributeName1.value);
    formData.append('attributeName2', attributeName2.value);

    const data = await getCorrelation(formData);  // 将 FormData 传递给后端
    console.log(data);
    
    if (data && data.scatterVO && data.scatterVO.data) {
      scatterData.value = data.scatterVO.data;  // 获取散点图数据
      correlationChartInit(scatterData.value);  // 调用图表初始化函数
      // 设置分析结果
      correlationData.value = {
        name1: data.correlationVO.name1,
        name2: data.correlationVO.name2,
        correlation: data.correlationVO.correlation,
        conform: data.conform // 假设返回的数据包含这些字段
      };
      console.log(data.name1,data.name2,data.correlation);
    // 设置分析结果可见
      analysisResults.value = true;  // 使分析结果可见
    } else {
      alert('返回的数据格式不正确');
    }
  } catch (error) {
    console.error('相关性分析失败:', error);
    alert('分析失败，请重试');
  }
};


// 组件销毁时清理 Dropzone 实例
onUnmounted(() => {
  if (myDropzone) {
    myDropzone.destroy(); // 销毁 Dropzone 实例
    myDropzone = null;    // 清空实例
  }
});

onMounted(() => {
  if (!myDropzone) {
     // 1) 找到页面上写好的 .dz-preview 区域，把它的 innerHTML 当模板读出来
     const previewNode = document.querySelector('#my-awesome-dropzone .dz-preview');
     const templateHTML = previewNode ? previewNode.innerHTML : '';
     // 2) 清空那片区域，留给 Dropzone 动态插入
     if (previewNode) previewNode.innerHTML = '';

     myDropzone = new Dropzone('#my-awesome-dropzone', {
       url: '#!',                   // 不实际上传
       autoProcessQueue: false,     // 手动提交
       maxFilesize: 20,
       acceptedFiles: '.csv,.json,.xlsx',
       addRemoveLinks: true,
       // 把上面读到的模板给它
       previewTemplate: templateHTML,
       // 指定它往哪个容器里插 preview DOM
       previewsContainer: '#my-awesome-dropzone .dz-preview'
     });

     // 3) 一进来就把任何全局 mockFile 都清掉
     myDropzone.removeAllFiles(true);
  }

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
                        <a class="nav-link" @click="goToDashboard" href="">
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
                      <a class="nav-link active" @click="goToCorrelationAnalysis" href="">
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
                        <h4 class="mb-0 text-primary fw-bold">健康大数据中心<span class="text-info fw-medium">相关性分析实验室</span></h4>
                      </div>
                      <img src="../../assets/img/illustrations/crm-line-chart.png" alt="" width="96" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--相关性分析展示图-->
          <div class="row g-3">
            <!--展示图表在此显示-->
            <div class="col-lg-8">
              <div class="card h-100">
                <div class="card-header">
                  <div class="row flex-between-end">
                    <div class="col-auto align-self-center">
                      <h5 class="mb-0" data-anchor="data-anchor">相关性分析展示图</h5>
                    </div>
                  </div>
                </div>
                <div class="card-body bg-body-tertiary">
                  <div class="row">
                    <div class="col-lg-8">
                      <div class="tab-content">
                        <div class="tab-pane preview-tab-pane active" role="tabpanel" aria-labelledby="tab-dom-ae60896f-e83f-4d14-9861-a8cd380680c1" id="dom-ae60896f-e83f-4d14-9861-a8cd380680c1">
                          <div class="echart-analysis-correlation" style="min-height: 450px;" data-echart-responsive="true"></div>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-4">
                      <div class="col-xxl-3">
                        <div class="card bg-line-chart-gradient">
                          <div class="card-header bg-transparent" data-bs-theme="light">
                            <p class="text-white">数据分析:</p>
                          </div>
                          <div class="card-body">
                            <transition name="fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
                              <div v-if="analysisResults" class="text-center">
                                <p class="text-white">经分析，自变量{{ correlationData.name1 }}与因变量{{ correlationData.name2 }}的相关系数为 <strong>{{ correlationData.correlation }}</strong>, <strong>{{ correlationData.conform ? '呈' : '非' }}</strong> 线性相关</p>
                              </div>
                            </transition>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
            <!--文件在此输入-->
            <div class="col-lg-4">
              <div class="row g-3">
                <div class="card mb-3">
                  <div class="card-header">
                    <h6 class="mb-0">文件上传
                        <span class="ms-1 text-400" data-bs-toggle="tooltip" data-bs-placement="top" title="用户您好，当前系统仅支持csv、json、xlsx文件哟~">
                        <span class="far fa-question-circle" data-fa-transform="shrink-1"></span>
                      </span>
                    </h6>
                  </div>
                  <div class="card-body bg-body-tertiary">
                    <form 
                      class="dropzone dropzone-multiple p-0" 
                      id="my-awesome-dropzone" 
                      data-dropzone="data-dropzone" 
                      data-no-init ="data-no-init"
                      action="#!">
                      <div class="fallback">
                        <input name="file" type="file" multiple="multiple" @change="handleFileChange" />
                      </div>
                      <div class="dz-message" data-dz-message="data-dz-message"> 
                        <img class="me-2" src="../../assets/img/icons/cloud-upload.svg" width="25" alt="" />请在此上传你需要描述性分析的文件</div>
                      <div class="dz-preview dz-preview-multiple m-0 d-flex flex-column">
                        <div class="d-flex media align-items-center mb-3 pb-3 border-bottom btn-reveal-trigger">
                          <img class="dz-image" src="../../assets/img/generic/image-file-2.png" alt="..." data-dz-thumbnail="data-dz-thumbnail" />
                          <div class="flex-1 d-flex flex-between-center">
                            <div>
                              <h6 data-dz-name="data-dz-name"></h6>
                              <div class="d-flex align-items-center">
                                <p class="mb-0 fs-10 text-400 lh-1" data-dz-size="data-dz-size"></p>                              
                              </div>
                            </div>
                            <div class="dropdown font-sans-serif">
                              <button class="btn btn-link text-600 btn-sm dropdown-toggle btn-reveal dropdown-caret-none" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span class="fas fa-ellipsis-h"></span>
                              </button>
                              <div class="dropdown-menu dropdown-menu-end border py-2">
                                <a class="dropdown-item" href="#!" data-dz-remove="data-dz-remove">删除</a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="row g-3">
                        <div class="col-sm-6">
                          <label class="form-label" for="attribute-Name1">自变量
                            <span class="ms-1 text-400" data-bs-toggle="tooltip" data-bs-placement="top" title="请在此输入数据的自变量，注意与文件中的字段保持一致哦~">
                              <span class="far fa-question-circle" data-fa-transform="shrink-1"></span>
                            </span>
                          </label>
                          <input class="form-control" id="attribute-Name1" v-model="attributeName1" type="text" placeholder="自变量">
                        </div>
                        <div class="col-sm-6">
                          <label class="form-label" for="attribute-Name2">因变量
                            <span class="ms-1 text-400" data-bs-toggle="tooltip" data-bs-placement="top" title="请在此输入数据的因变量，注意与文件中的字段保持一致哦~">
                              <span class="far fa-question-circle" data-fa-transform="shrink-1"></span>
                            </span>
                          </label>
                          <input class="form-control" id="attribute-Name2" v-model="attributeName2" type="text" placeholder="因变量">
                        </div>
                      </div>
                    </form>
                  </div>
                  <div class="card-bottom mt-2 mb-3">
                    <button class="btn btn-falcon-default btn-sm me-2 float-end" type="button" @click="submitFile">提交</button>
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

    <!-- AI 辅助数据分析助手 侧边栏部分 -->
    <div class="offcanvas offcanvas-end settings-panel border-0" id="settings-offcanvas" tabindex="-1" aria-labelledby="settings-offcanvas">
      <div class="offcanvas-header settings-panel-header justify-content-between bg-shape">
        <div class="z-1 py-1">
          <div class="d-flex justify-content-between align-items-center mb-1">
            <h5 class="text-white mb-0 me-2"><span class="fas fa-palette me-2 fs-9"></span>AI 数据分析助手</h5>
          </div>
          <p class="mb-0 fs-10 text-white opacity-75">与 DeepSeek 聊天，进行数据分析。</p>
        </div>
        <div class="z-1" data-bs-theme="dark">
          <button class="btn-close z-1 mt-0" type="button" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
      </div>
      <div class="offcanvas-body scrollbar-overlay px-x1 h-100" id="themeController">
        <div class="tab-content card-chat-content">
          <!--历史消息与回答区，历史消息在此显示，ai给出的新回答加载出来也在此显示-->
          <div class="tab-pane card-chat-pane active" id="chat-0" role="tabpanel" aria-labelledby="chat-link-0" style="min-height: 580px;">
            <div class="chat-content-body" style="display: inherit;">
              <div class="chat-content-scroll-area scrollbar">
                <!-- 用 v-for 渲染所有消息 -->
                <template v-for="(msg, idx) in messages" :key="idx">
                  <!-- 时间分隔 -->
                  <div class="text-center fs-11 text-500 my-2">
                    <span>{{ formatDate(msg.time) }}</span>
                  </div>
                  <!-- AI 消息 -->
                  <div v-if="msg.type === 'ai'" class="d-flex p-3">
                    <div class="avatar avatar-l me-2">
                      <img class="rounded-circle" src="../../assets/img/profile/DeepSeek.jpg" alt="">
                    </div>
                    <div class="flex-1">
                      <div class="w-xxl-75">
                        <div class="hover-actions-trigger d-flex align-items-center">
                          <div class="chat-message bg-200 p-2 rounded-2">
                            {{ msg.text }}
                          </div>
                        </div>
                        <div class="text-400 fs-11">
                          <span>{{ formatTime(msg.time) }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- 用户消息 -->
                  <div v-else class="d-flex p-3 justify-content-end">
                    <div class="w-100 w-xxl-75">
                      <div class="hover-actions-trigger d-flex flex-end-center">
                        <div class="bg-primary text-white p-2 rounded-2 chat-message">
                          {{ msg.text }}
                        </div>
                      </div>
                      <div class="text-400 fs-11 text-end">
                        {{ formatTime(msg.time) }}
                        <svg class="svg-inline--fa fa-check fa-w-16 ms-2 text-success" aria-hidden="true" focusable="false"
                          data-prefix="fas" data-icon="check" role="img" xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512" data-fa-i2svg>
                          <path fill="currentColor"
                            d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z">
                          </path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </div>
          <!--发送消息区域-->

          <form class="chat-editor-area" @submit.prevent="sendMessage">
            <textarea
              v-model="aiInput"
              class="form-control mb-2"
              rows="3"
              placeholder="在此输入你的问题…"
              style="max-width: 260px;"
            ></textarea>
            <button
              class="btn btn-primary mb-2 btn-sm"
              type="submit"
              :disabled="isChatLoading"
            >
              {{ isChatLoading ? '加载中' : '发送' }}
            </button>
          </form>
        </div>
      </div>
    </div>

    <a class="card setting-toggle" href="#settings-offcanvas" data-bs-toggle="offcanvas">
      <div class="card-body d-flex align-items-center py-md-2 px-2 py-1">
        <div class="bg-primary-subtle position-relative rounded-start" style="height:36px;width:40px">
          <div class="settings-popover"><span class="ripple"><span class="fa-spin position-absolute all-0 d-flex flex-center"><span class="icon-spin position-absolute all-0 d-flex flex-center"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19.7369 12.3941L19.1989 12.1065C18.4459 11.7041 18.0843 10.8487 18.0843 9.99495C18.0843 9.14118 18.4459 8.28582 19.1989 7.88336L19.7369 7.59581C19.9474 7.47484 20.0316 7.23291 19.9474 7.03131C19.4842 5.57973 18.6843 4.28943 17.6738 3.20075C17.5053 3.03946 17.2527 2.99914 17.0422 3.12011L16.393 3.46714C15.6883 3.84379 14.8377 3.74529 14.1476 3.3427C14.0988 3.31422 14.0496 3.28621 14.0002 3.25868C13.2568 2.84453 12.7055 2.10629 12.7055 1.25525V0.70081C12.7055 0.499202 12.5371 0.297594 12.2845 0.257272C10.7266 -0.105622 9.16879 -0.0653007 7.69516 0.257272C7.44254 0.297594 7.31623 0.499202 7.31623 0.70081V1.23474C7.31623 2.09575 6.74999 2.8362 5.99824 3.25599C5.95774 3.27861 5.91747 3.30159 5.87744 3.32493C5.15643 3.74527 4.26453 3.85902 3.53534 3.45302L2.93743 3.12011C2.72691 2.99914 2.47429 3.03946 2.30587 3.20075C1.29538 4.28943 0.495411 5.57973 0.0322686 7.03131C-0.051939 7.23291 0.0322686 7.47484 0.242788 7.59581L0.784376 7.8853C1.54166 8.29007 1.92694 9.13627 1.92694 9.99495C1.92694 10.8536 1.54166 11.6998 0.784375 12.1046L0.242788 12.3941C0.0322686 12.515 -0.051939 12.757 0.0322686 12.9586C0.495411 14.4102 1.29538 15.7005 2.30587 16.7891C2.47429 16.9504 2.72691 16.9907 2.93743 16.8698L3.58669 16.5227C4.29133 16.1461 5.14131 16.2457 5.8331 16.6455C5.88713 16.6767 5.94159 16.7074 5.99648 16.7375C6.75162 17.1511 7.31623 17.8941 7.31623 18.7552V19.2891C7.31623 19.4425 7.41373 19.5959 7.55309 19.696C7.64066 19.7589 7.74815 19.7843 7.85406 19.8046C9.35884 20.0925 10.8609 20.0456 12.2845 19.7729C12.5371 19.6923 12.7055 19.4907 12.7055 19.2891V18.7346C12.7055 17.8836 13.2568 17.1454 14.0002 16.7312C14.0496 16.7037 14.0988 16.6757 14.1476 16.6472C14.8377 16.2446 15.6883 16.1461 16.393 16.5227L17.0422 16.8698C17.2527 16.9907 17.5053 16.9504 17.6738 16.7891C18.7264 15.7005 19.4842 14.4102 19.9895 12.9586C20.0316 12.757 19.9474 12.515 19.7369 12.3941ZM10.0109 13.2005C8.1162 13.2005 6.64257 11.7893 6.64257 9.97478C6.64257 8.20063 8.1162 6.74905 10.0109 6.74905C11.8634 6.74905 13.3792 8.20063 13.3792 9.97478C13.3792 11.7893 11.8634 13.2005 10.0109 13.2005Z" fill="#2A7BE4"></path></svg></span></span></span></div>
        </div>
        <small class="text-uppercase text-primary fw-bold bg-primary-subtle py-2 pe-2 ps-1 rounded-end" style="height:36px;width:60px">AI助手</small>
      </div>
    </a>
</template>
<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 1s ease;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.settings-panel .offcanvas-body {
  display: flex;
  flex-direction: column;
  padding: 0; /* 根据需要微调 */
}

/* 2. 让 .card-chat-content 撑满 offcanvas-body */
.tab-content.card-chat-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

/* 3. 聊天历史区域占满剩余空间 */
.card-chat-pane {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden; /* 去掉自身滚动条，交给内部 .chat-content-scroll-area */
}

/* 4. 聊天记录区独立滚动 */
.chat-content-scroll-area {
  flex: 1;
  overflow-y: auto;
  /* 如需内边距或滚动条样式可在这里加 */
}

/* 5. 发送区域永远固定在底部，不随滚动 */
/* 保证发送框始终黏在底部 */
.chat-editor-area {
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff; /* 或者你侧边栏的背景色 */
  padding: .75rem;
  border-top: 1px solid #dee2e6;
  z-index: 10; /* 确保覆盖在滚动内容之上 */
}
.chat-editor-area .btn {
  align-self: flex-end;
}

/* 可选：让输入框和按钮更紧凑 */
.chat-editor-area textarea {
  margin-bottom: 0.5rem;
}
</style>
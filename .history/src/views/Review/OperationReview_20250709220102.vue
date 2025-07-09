<script setup>
import { onMounted,computed  } from 'vue'
import { useRouter } from 'vue-router'
import { defineOptions } from 'vue'
import { useAuditorApplication } from '@/api/auditorApplication.js'

// 声明组件名
defineOptions({ name: 'OperationReview' })

// 使用自定义hook
const {
  pendingApplications,
  selfApplications,
  paginationPending,
  paginationSelf,
  loading,
  activeTab,
  activeApplication,
  replyContent,
  isApproved,
  feedbackReason,
  showFeedbackModal,
  targetPagePending,
  targetPageSelf,
  fetchPendingApplications,
  fetchSelfApplications,
  handleApplication,
  submitFeedback,
  handlePendingPageChange,
  handleSelfPageChange,
  handlePendingSizeChange,
  handleSelfSizeChange,
  goToPendingPage,
  goToSelfPage,
  getPendingPaginationButtons,
  getSelfPaginationButtons,
  switchTab
} = useAuditorApplication()

// 为模板写几个快捷 computed（可选）
const isAdmin      = computed(() => role.value === 'ADMIN')
const isAuditor    = computed(() => role.value === 'AUDITOR')
const isResearcher = computed(() => role.value === 'RESEARCHER')

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
function goToDataProcess()             { router.push({ name: 'DataProcess' }) }
function goToPersonalCenter()          { router.push({ name: 'PersonalCenter' }) }
function goToResearcherApplication()   { router.push({ name: 'ResearcherApplication' }) }

// 初始化加载数据
onMounted(() => {
  fetchPendingApplications()
  
  // 原有布局代码保持不变
  const isRTL = JSON.parse(localStorage.getItem('isRTL'))
  if (isRTL) {
    const linkDefault = document.getElementById('style-default')
    const userLinkDefault = document.getElementById('user-style-default')
    if (linkDefault) linkDefault.disabled = true
    if (userLinkDefault) userLinkDefault.disabled = true
    document.documentElement.setAttribute('dir', 'rtl')
  } else {
    const linkRTL = document.getElementById('style-rtl')
    const userLinkRTL = document.getElementById('user-style-rtl')
    if (linkRTL) linkRTL.disabled = true
    if (userLinkRTL) userLinkRTL.disabled = true
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
  const navVertical = document.querySelector('.navbar-vertical')
  const navTopVertical = document.querySelector('.content .navbar-top')
  const navTop = document.querySelector('[data-layout] .navbar-top:not([data-double-top-nav])')
  const navDoubleTop = document.querySelector('[data-double-top-nav]')
  const navTopCombo = document.querySelector('.content [data-navbar-top="combo"]')

  if (navbarPosition === 'double-top') {
    document.documentElement.classList.add('double-top-nav-layout')
  }

  const safeRemove = el => el && el.remove()
  const safeShow = el => el && el.removeAttribute('style')

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
  <!-- 欢迎栏 -->
  <div class="row g-3 mb-3">
    <div class="col-xxl-6">
      <div class="row g-0 h-100">
        <div class="col-12">
          <div class="card bg-body-tertiary dark__bg-opacity-50 shadow-none">
            <div class="bg-holder bg-card d-none d-sm-block" style="background-image:url(https://prium.github.io/falcon/v3.24.0/assets/img/illustrations/ticket-bg.png);"></div>
            <div class="d-flex align-items-center z-1 p-0">
              <img src="../../assets/img/illustrations/crm-bar-chart.png" alt="" width="96" />
              <div class="ms-n3">
                <h6 class="mb-1 text-primary">欢迎来到</h6>
                <h4 class="mb-0 text-primary fw-bold">健康大数据中心<span class="text-info fw-medium">审核员申请管理中心</span></h4>
              </div>
              <img src="../../assets/img/illustrations/crm-line-chart.png" alt="" width="96" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 申请管理卡片 -->
  <div class="card">
    <div class="card-header d-flex justify-content-between align-items-center">
      <ul class="nav nav-tabs card-header-tabs">
        <li class="nav-item">
          <button 
            class="nav-link" 
            :class="{ active: activeTab === 'pending' }"
            @click="switchTab('pending')"
          >
            待处理申请
          </button>
        </li>
        <li class="nav-item">
          <button 
            class="nav-link" 
            :class="{ active: activeTab === 'self' }"
            @click="switchTab('self')"
          >
            我的反馈申请
          </button>
        </li>
      </ul>
      <button class="btn btn-primary btn-sm" @click="showFeedbackModal = true">
        <i class="fas fa-plus me-1"></i>向管理员反馈
      </button>
    </div>
    
    <!-- 待处理申请表格 -->
    <div class="card-body" v-if="activeTab === 'pending'">
      <!-- 分页信息和size选择器 -->
      <div class="d-flex align-items-center">
        <span class="me-2 text-muted">每页显示:</span>
        <select 
          v-model="paginationPending.size" 
          @change="handlePendingSizeChange(paginationPending.size)"
          class="form-select form-select-sm" 
          style="width: 80px;"
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </div>

      <div class="table-responsive">
        <table class="table table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>用户名</th>
              <th>申请内容</th>
              <th>状态</th>
              <th>申请时间</th>
              <th>处理时间</th>
              <th>回复内容</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody v-if="loading">
            <tr>
              <td colspan="8" class="text-center py-4">
                <div class="spinner-border text-primary" role="status">
                  <span class="visually-hidden">加载中...</span>
                </div>
              </td>
            </tr>
          </tbody>
          <tbody v-else-if="pendingApplications.length === 0">
            <tr>
              <td colspan="8" class="text-center py-4">暂无待处理申请</td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr 
              v-for="app in pendingApplications" 
              :key="app.id" 
              :class="{
                'table-primary': app.status === '未处理',
                'table-success': app.status === '已处理',
                'table-danger': app.status === '拒绝'
              }"
            >
              <td>{{ app.id }}</td>
              <td>{{ app.username }}</td>
              <td>{{ app.reason }}</td>
              <td>
                <span class="badge" :class="{
                  'bg-warning': app.status === '未处理',
                  'bg-success': app.status === '已处理',
                  'bg-danger': app.status === '拒绝'
                }">
                  {{ app.status }}
                </span>
              </td>
              <td>{{ new Date(app.applyTime).toLocaleString() }}</td>
              <td>{{ app.handleTime ? new Date(app.handleTime).toLocaleString() : '-' }}</td>
              <td>{{ app.adminReply || '-' }}</td>
              <td>
                <button 
                  class="btn btn-sm btn-primary me-2" 
                  @click="activeApplication = app; replyContent = ''"
                  :disabled="app.status !== '未处理'"
                >
                  处理
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 改进分页显示 -->
      <div class="d-flex justify-content-between align-items-center mt-3">
        <div class="text-muted">
          共 {{ paginationPending.total }} 条记录，当前显示 {{ (paginationPending.current - 1) * paginationPending.size + 1 }}-{{ 
            Math.min(paginationPending.current * paginationPending.size, paginationPending.total) 
          }} 条
          第 {{ paginationPending.current }} 页 / 共 {{ paginationPending.pages }} 页
        </div>
        <div class="d-flex align-items-center">
          <nav class="me-3">
            <ul class="pagination mb-0">
              <li class="page-item" :class="{ disabled: paginationPending.current === 1 }">
                <button class="page-link" @click="handlePendingPageChange(paginationPending.current - 1)">
                  <i class="fas fa-chevron-left"></i>
                </button>
              </li>
              
              <li 
                v-for="page in getPendingPaginationButtons" 
                :key="page" 
                class="page-item"
                :class="{ active: paginationPending.current === page }"
              >
                <button 
                  class="page-link" 
                  @click="handlePendingPageChange(page)"
                >
                  {{ page }}
                </button>
              </li>
              
              <li class="page-item" :class="{ disabled: paginationPending.current === paginationPending.pages }">
                <button class="page-link" @click="handlePendingPageChange(paginationPending.current + 1)">
                  <i class="fas fa-chevron-right"></i>
                </button>
              </li>
            </ul>
          </nav>
          
          <div class="d-flex align-items-center">
            <span class="text-muted me-2">前往:</span>
            <input 
              type="number" 
              v-model.number="targetPagePending" 
              min="1" 
              :max="paginationPending.pages" 
              class="form-control form-control-sm" 
              style="width: 60px; text-align: center;"
            >
            <button 
              class="btn btn-sm btn-outline-primary ms-2" 
              @click="goToPendingPage"
              :disabled="targetPagePending === paginationPending.current || targetPagePending < 1 || targetPagePending > paginationPending.pages"
            >
              确定
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 我的反馈申请表格 -->
    <div class="card-body" v-else>
      <div class="d-flex align-items-center">
        <span class="me-2 text-muted">每页显示:</span>
        <select 
          v-model="paginationSelf.size" 
          @change="handleSelfSizeChange(paginationSelf.size)"
          class="form-select form-select-sm" 
          style="width: 80px;"
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </div>

      <div class="table-responsive">
        <table class="table table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>申请内容</th>
              <th>状态</th>
              <th>申请时间</th>
              <th>处理时间</th>
              <th>管理员回复</th>
            </tr>
          </thead>
          <tbody v-if="loading">
            <tr>
              <td colspan="6" class="text-center py-4">
                <div class="spinner-border text-primary" role="status">
                  <span class="visually-hidden">加载中...</span>
                </div>
              </td>
            </tr>
          </tbody>
          <tbody v-else-if="selfApplications.length === 0">
            <tr>
              <td colspan="6" class="text-center py-4">暂无反馈申请</td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr 
              v-for="app in selfApplications" 
              :key="app.id" 
              :class="{
                'table-primary': app.status === '未处理',
                'table-success': app.status === '已处理',
                'table-danger': app.status === '拒绝'
              }"
            >
              <td>{{ app.id }}</td>
              <td>{{ app.reason }}</td>
              <td>
                <span class="badge" :class="{
                  'bg-warning': app.status === '未处理',
                  'bg-success': app.status === '已处理',
                  'bg-danger': app.status === '拒绝'
                }">
                  {{ app.status }}
                </span>
              </td>
              <td>{{ new Date(app.applyTime).toLocaleString() }}</td>
              <td>{{ app.handleTime ? new Date(app.handleTime).toLocaleString() : '-' }}</td>
              <td>{{ app.adminReply || '-' }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 改进分页显示 -->
      <div class="d-flex justify-content-between align-items-center mt-3">
        <div class="text-muted">
          共 {{ paginationSelf.total }} 条记录，当前显示 {{ (paginationSelf.current - 1) * paginationSelf.size + 1 }}-{{ 
            Math.min(paginationSelf.current * paginationSelf.size, paginationSelf.total) 
          }} 条
          第 {{ paginationSelf.current }} 页 / 共 {{ paginationSelf.pages }} 页
        </div>
        <div class="d-flex align-items-center">
          <nav class="me-3">
            <ul class="pagination mb-0">
              <li class="page-item" :class="{ disabled: paginationSelf.current === 1 }">
                <button class="page-link" @click="handleSelfPageChange(paginationSelf.current - 1)">
                  <i class="fas fa-chevron-left"></i>
                </button>
              </li>
              
              <li 
                v-for="page in getSelfPaginationButtons" 
                :key="page" 
                class="page-item"
                :class="{ active: paginationSelf.current === page }"
              >
                <button 
                  class="page-link" 
                  @click="handleSelfPageChange(page)"
                >
                  {{ page }}
                </button>
              </li>
              
              <li class="page-item" :class="{ disabled: paginationSelf.current === paginationSelf.pages }">
                <button class="page-link" @click="handleSelfPageChange(paginationSelf.current + 1)">
                  <i class="fas fa-chevron-right"></i>
                </button>
              </li>
            </ul>
          </nav>
          
          <div class="d-flex align-items-center">
            <span class="text-muted me-2">前往:</span>
            <input 
              type="number" 
              v-model.number="targetPageSelf" 
              min="1" 
              :max="paginationSelf.pages" 
              class="form-control form-control-sm" 
              style="width: 60px; text-align: center;"
            >
            <button 
              class="btn btn-sm btn-outline-primary ms-2" 
              @click="goToSelfPage"
              :disabled="targetPageSelf === paginationSelf.current || targetPageSelf < 1 || targetPageSelf > paginationSelf.pages"
            >
              确定
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 处理申请模态框 -->
  <div v-if="activeApplication" class="modal fade show d-block" tabindex="-1" style="background-color: rgba(0,0,0,0.5)">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">处理用户申请</h5>
          <button type="button" class="btn-close" @click="activeApplication = null"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label class="form-label">用户名</label>
            <input type="text" class="form-control" :value="activeApplication.username" readonly>
          </div>
          <div class="mb-3">
            <label class="form-label">申请内容</label>
            <textarea class="form-control" rows="3" :value="activeApplication.reason" readonly></textarea>
          </div>
          <div class="mb-3">
            <label class="form-label">处理结果</label>
            <div class="form-check">
              <input class="form-check-input" type="radio" id="approve" v-model="isApproved" :value="true">
              <label class="form-check-label" for="approve">解决</label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" id="reject" v-model="isApproved" :value="false">
              <label class="form-check-label" for="reject">拒绝</label>
            </div>
          </div>
          <div class="mb-3">
            <label class="form-label">回复内容</label>
            <textarea class="form-control" rows="3" v-model="replyContent" placeholder="请输入回复内容"></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="activeApplication = null">取消</button>
          <button type="button" class="btn btn-primary" @click="handleApplication">提交</button>
        </div>
      </div>
    </div>
  </div>

  <!-- 反馈给管理员模态框 -->
  <div v-if="showFeedbackModal" class="modal fade show d-block" tabindex="-1" style="background-color: rgba(0,0,0,0.5)">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">向管理员反馈</h5>
          <button type="button" class="btn-close" @click="showFeedbackModal = false"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label class="form-label">反馈原因</label>
            <textarea 
              class="form-control" 
              rows="5" 
              v-model="feedbackReason" 
              placeholder="请详细描述您要反馈的问题或建议"
            ></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="showFeedbackModal = false">取消</button>
          <button type="button" class="btn btn-primary" @click="submitFeedback">提交</button>
        </div>
      </div>
    </div>
  </div>

  <!-- 尾栏 -->
  <footer class="footer mt-5">
    <div class="row g-0 justify-content-between fs-10 mt-4 mb-3">
      <div class="col-12 col-sm-auto text-center">
        <p class="mb-0 text-600">感谢您对我们健康大数据研究中心的支持<span class="d-none d-sm-inline-block">| </span><br class="d-sm-none" /> 2025 &copy; <a href="https://themewagon.com">网页模板来源bootstrap-falcon</a></p>
      </div>
      <div class="col-12 col-sm-auto text-center">
        <p class="mb-0 text-600">v1.15.3</p>
      </div>
    </div>
  </footer>
</template>

<style>
/* 自定义样式 */
.table-hover tbody tr:hover {
  cursor: pointer;
}
.modal {
  z-index: 1050;
}
.badge {
  font-size: 0.85em;
  padding: 0.35em 0.65em;
}
.nav-tabs .nav-link {
  cursor: pointer;
}

/* 优化布局 */
.footer {
  position: sticky;
  bottom: 0;
  z-index: 100;
  min-height: 40px;
}

/* 确保内容区域有足够的底部空间 */
.content-wrapper {
  padding-bottom: 0px;
}

/* 优化分页控件样式 */
.pagination {
  margin-bottom: 0;
}

.page-item .page-link {
  padding: 0.375rem 0.75rem;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .footer {
    min-height: 50px;
  }
  
  .content-wrapper {
    padding-bottom: 70px;
  }
  
  .pagination {
    font-size: 0.875rem;
  }
  
  .page-item .page-link {
    padding: 0.25rem 0.5rem;
  }
}
</style>
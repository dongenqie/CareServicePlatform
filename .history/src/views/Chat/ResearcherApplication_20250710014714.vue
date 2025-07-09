<script setup>
import { onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { defineOptions } from 'vue'
import { useResearcherApplication } from '@/api/researcherApplication.js'

// 声明组件名
defineOptions({ name: 'ResearcherApplication' })

// 使用自定义hook
const {
  applications,
  pagination,
  loading,
  showApplyModal,
  formData,
  targetPage,
  submitLoading,
  formErrors,
  fetchApplications,
  submitApplication,
  handlePageChange,
  handleSizeChange,
  goToPage,
  getPaginationButtons,
  formatDate
} = useResearcherApplication()

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
  fetchApplications()

  // 布局初始化（根据实际项目布局需求调整）
  const isRTL = JSON.parse(localStorage.getItem('isRTL') || 'false')
  if (isRTL) {
    document.documentElement.setAttribute('dir', 'rtl')
  } else {
    document.documentElement.removeAttribute('dir')
  }
  
  // 流体布局设置（根据实际项目需求调整）
  const isFluid = JSON.parse(localStorage.getItem('isFluid') || 'false')
  const container = document.querySelector('[data-layout]')
  if (container) {
    if (isFluid) {
      container.classList.remove('container')
      container.classList.add('container-fluid')
    } else {
      container.classList.remove('container-fluid')
      container.classList.add('container')
    }
  }

})
</script>

<template>
  <div class="container-fluid content-wrapper">
    <!-- 页面标题 -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="h3 mb-0">申请管理</h1>
      <button 
        class="btn btn-primary" 
        @click="showApplyModal = true"
      >
        <i class="fas fa-plus me-1"></i>提交新申请
      </button>
    </div>
    
    <!-- 申请列表卡片 -->
    <div class="card">
      <div class="card-header">
        <h5 class="card-title mb-0">我的申请记录</h5>
      </div>
      
      <div class="card-body">
        <!-- 分页信息和size选择器 -->
        <div class="d-flex align-items-center mb-3">
          <span class="me-2 text-muted">每页显示:</span>
          <select 
            v-model="pagination.size" 
            @change="handleSizeChange(pagination.size)"
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
          <table class="table table-hover table-striped">
            <thead class="table-light">
              <tr>
                <th>反馈单ID</th>
                <th>申请内容</th>
                <th>发送对象</th>
                <th>状态</th>
                <th>申请时间</th>
                <th>处理时间</th>
                <th>回复内容</th>
              </tr>
            </thead>
            <tbody v-if="loading">
              <tr>
                <td colspan="7" class="text-center py-4">
                  <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">加载中...</span>
                  </div>
                </td>
              </tr>
            </tbody>
            <tbody v-else-if="applications.length === 0">
              <tr>
                <td colspan="7" class="text-center py-4">
                  <div class="text-muted">
                    <i class="fas fa-file-alt fa-2x mb-2 d-block"></i>
                    暂无申请记录，点击"提交新申请"按钮创建申请
                  </div>
                </td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr 
                v-for="app in applications" 
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
                    'bg-info': app.targetRole === 'AUDITOR',
                    'bg-secondary': app.targetRole === 'ADMIN'
                  }">
                    {{ app.targetRole === 'AUDITOR' ? '审核员' : '管理员' }}
                  </span>
                </td>
                <td>
                  <span class="badge" :class="{
                    'bg-warning': app.status === '未处理',
                    'bg-success': app.status === '已处理',
                    'bg-danger': app.status === '拒绝'
                  }">
                    {{ app.status }}
                  </span>
                </td>
                <td>{{ formatDate(app.applyTime) }}</td>
                <td>{{ app.handleTime ? formatDate(app.handleTime) : '-' }}</td>
                <td>{{ app.adminReply || '-' }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- 分页控件 -->
        <div class="d-flex flex-wrap justify-content-between align-items-center mt-3 gap-2">
          <div class="text-muted">
            共 {{ pagination.total }} 条记录，当前显示 {{ (pagination.current - 1) * pagination.size + 1 }}-{{ 
              Math.min(pagination.current * pagination.size, pagination.total) 
            }} 条
            第 {{ pagination.current }} 页 / 共 {{ pagination.pages }} 页
          </div>
          <div class="d-flex align-items-center gap-2">
            <nav>
              <ul class="pagination mb-0">
                <li class="page-item" :class="{ disabled: pagination.current === 1 }">
                  <button class="page-link" @click="handlePageChange(pagination.current - 1)">
                    <i class="fas fa-chevron-left"></i>
                  </button>
                </li>
                
                <li 
                  v-for="page in getPaginationButtons" 
                  :key="page" 
                  class="page-item"
                  :class="{ active: pagination.current === page }"
                >
                  <button 
                    class="page-link" 
                    @click="handlePageChange(page)"
                  >
                    {{ page }}
                  </button>
                </li>
                
                <li class="page-item" :class="{ disabled: pagination.current === pagination.pages }">
                  <button class="page-link" @click="handlePageChange(pagination.current + 1)">
                    <i class="fas fa-chevron-right"></i>
                  </button>
                </li>
              </ul>
            </nav>
            
            <div class="d-flex align-items-center gap-2">
              <span class="text-muted">前往:</span>
              <input 
                type="number" 
                v-model.number="targetPage" 
                min="1" 
                :max="pagination.pages" 
                class="form-control form-control-sm" 
                style="width: 70px; text-align: center;"
                @keyup.enter="goToPage"
              >
              <button 
                class="btn btn-sm btn-outline-primary" 
                @click="goToPage"
                :disabled="!targetPage || targetPage < 1 || targetPage > pagination.pages || targetPage === pagination.current"
              >
                确定
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 申请提交模态框 -->
  <div class="modal fade" :class="{ show: showApplyModal }" tabindex="-1" aria-hidden="true" @click="showApplyModal = false">
    <div class="modal-dialog modal-dialog-centered" @click.stop>
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">提交申请</h5>
          <button type="button" class="btn-close" @click="showApplyModal = false" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <label for="targetRole" class="form-label">发送对象 <span class="text-danger">*</span></label>
              <select 
                id="targetRole"
                v-model="formData.targetRole"
                class="form-select"
                @change="formErrors.targetRole = ''"
              >
                <option value="AUDITOR">审核员</option>
                <option value="ADMIN">管理员</option>
              </select>
              <div v-if="formErrors.targetRole" class="text-danger text-sm mt-1">{{ formErrors.targetRole }}</div>
            </div>
            
            <div class="mb-3">
              <label for="reason" class="form-label">申请原因 <span class="text-danger">*</span></label>
              <textarea 
                id="reason"
                v-model="formData.reason"
                class="form-control"
                rows="4"
                placeholder="请详细描述您的申请原因..."
                @input="formErrors.reason = ''"
              ></textarea>
              <div v-if="formErrors.reason" class="text-danger text-sm mt-1">{{ formErrors.reason }}</div>
              <div class="form-text">请清晰说明您的申请理由，以便审核人员评估</div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="showApplyModal = false">取消</button>
          <button 
            type="button" 
            class="btn btn-primary" 
            @click="submitApplication"
            :disabled="submitLoading"
          >
            <span v-if="submitLoading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            提交申请
          </button>
        </div>
      </div>
    </div>
  </div>
  
  <div 
    v-if="showApplyModal"
    class="modal fade show" 
    tabindex="-1" 
    aria-modal="true"
    role="dialog"
    style="display: block; background-color: rgba(0,0,0,0.5);"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">提交申请</h5>
          <button type="button" class="btn-close" @click="showApplyModal = false" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <label for="targetRole" class="form-label">发送对象 <span class="text-danger">*</span></label>
              <select 
                id="targetRole"
                v-model="formData.targetRole"
                class="form-select"
                @change="formErrors.targetRole = ''"
              >
                <option value="AUDITOR">审核员</option>
                <option value="ADMIN">管理员</option>
              </select>
              <div v-if="formErrors.targetRole" class="text-danger text-sm mt-1">{{ formErrors.targetRole }}</div>
            </div>
            
            <div class="mb-3">
              <label for="reason" class="form-label">申请原因 <span class="text-danger">*</span></label>
              <textarea 
                id="reason"
                v-model="formData.reason"
                class="form-control"
                rows="4"
                placeholder="请详细描述您的申请原因..."
                @input="formErrors.reason = ''"
              ></textarea>
              <div v-if="formErrors.reason" class="text-danger text-sm mt-1">{{ formErrors.reason }}</div>
              <div class="form-text">请清晰说明您的申请理由，以便接收方评估</div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="showApplyModal = false">取消</button>
          <button 
            type="button" 
            class="btn btn-primary" 
            @click="submitApplication"
            :disabled="submitLoading"
          >
            <span v-if="submitLoading" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            提交申请
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 自定义样式 */
.table-hover tbody tr {
  cursor: default;
  transition: background-color 0.2s;
}

.table-hover tbody tr:hover {
  background-color: rgba(0, 0, 0, 0.03);
}

.modal-backdrop.show {
  opacity: 0.5;
}

.modal {
  display: block !important;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.modal.show {
  opacity: 1;
  pointer-events: auto;
}

.badge {
  font-weight: 500;
  letter-spacing: 0.05em;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .d-flex {
    flex-direction: column;
    gap: 1rem;
  }
  
  .pagination {
    font-size: 0.875rem;
  }
  
  .page-item .page-link {
    padding: 0.25rem 0.5rem;
  }
  
  .modal-dialog {
    margin: 1rem;
  }
}
</style>
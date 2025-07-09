// src/api/researcherApplication.js
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

export function useResearcherApplication() {
  const router = useRouter()

  // 数据定义
  const applications = ref([])
  const pagination = ref({
    current: 1,
    size: 10,
    total: 0,
    pages: 0
  })
  const loading = ref(false)
  const showApplyModal = ref(false)
  const formData = ref({
    reason: '',
    targetRole: 'AUDITOR'
  })
  const targetPage = ref(1)
  const submitLoading = ref(false)
  const formErrors = ref({
    reason: '',
    targetRole: ''
  })

  // 获取研究员申请列表
  const fetchApplications = async () => {
    try {
      loading.value = true
      const response = await axios.get('http://localhost:8080/api/researcher/checkApplicationStatus', {
        params: {
          current: pagination.value.current,
          size: pagination.value.size
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      
      if (response.data.success) {
        if (response.data.data?.records) {
          applications.value = response.data.data.records
          pagination.value = {
            current: response.data.data.current,
            size: response.data.data.size,
            total: response.data.data.total,
            pages: response.data.data.pages
          }
        } else {
          applications.value = []
          pagination.value = {
            current: 1,
            size: 10,
            total: 0,
            pages: 0
          }
        }
        targetPage.value = pagination.value.current
      } else {
        alert(response.data.message || '获取申请列表失败')
      }
    } catch (error) {
      console.error('获取申请列表失败:', error)
      alert(error.response?.data?.message || '获取申请列表失败，请检查网络或Token有效性')
    } finally {
      loading.value = false
    }
  }

  // 提交申请
  const submitApplication = async () => {
    // 表单验证
    let isValid = true
    formErrors.value = { reason: '', targetRole: '' }
    
    if (!formData.value.reason.trim()) {
      formErrors.value.reason = '请输入申请原因'
      isValid = false
    }
    
    if (!['AUDITOR', 'ADMIN'].includes(formData.value.targetRole)) {
      formErrors.value.targetRole = '目标角色必须为审核员或管理员'
      isValid = false
    }
    
    if (!isValid) return
    
    try {
      submitLoading.value = true
      const response = await axios.post('http://localhost:8080/api/researcher/sendApplication', {
        reason: formData.value.reason,
        targetRole: formData.value.targetRole
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      
      if (response.data.success) {
        alert('申请提交成功')
        showApplyModal.value = false
        formData.value = {
          reason: '',
          targetRole: 'AUDITOR'
        }
        fetchApplications()
      } else {
        alert(response.data.message || '提交申请失败')
      }
    } catch (error) {
      console.error('提交申请失败:', error)
      const errorMsg = error.response?.data?.message || '提交申请失败'
      if (errorMsg.includes('Token 无效')) {
        alert('身份验证失败，请重新登录')
        router.push({ name: 'Login' })
      } else if (errorMsg.includes('目标角色必须为')) {
        formErrors.value.targetRole = errorMsg
      } else {
        alert(errorMsg)
      }
    } finally {
      submitLoading.value = false
    }
  }

  // 分页改变
  const handlePageChange = (page) => {
    if (page >= 1 && page <= pagination.value.pages) {
      pagination.value.current = page
      fetchApplications()
    }
  }

  // 切换每页显示数量
  const handleSizeChange = (size) => {
    pagination.value.size = size
    pagination.value.current = 1
    fetchApplications()
  }

  // 跳转到指定页
  const goToPage = () => {
    const page = parseInt(targetPage.value)
    if (page && page >= 1 && page <= pagination.value.pages) {
      pagination.value.current = page
      fetchApplications()
    } else {
      alert(`请输入1-${pagination.value.pages}之间的页码`)
    }
  }

  // 获取分页按钮数组
  const getPaginationButtons = computed(() => {
    const current = pagination.value.current
    const pages = pagination.value.pages
    const buttons = []
    
    if (pages <= 0) return buttons
    
    if (pages <= 7) {
      for (let i = 1; i <= pages; i++) {
        buttons.push(i)
      }
      return buttons
    }
    
    if (current <= 4) {
      return [1, 2, 3, 4, 5, 6, 7]
    }
    
    if (current >= pages - 3) {
      return [pages - 6, pages - 5, pages - 4, pages - 3, pages - 2, pages - 1, pages]
    }
    
    return [current - 3, current - 2, current - 1, current, current + 1, current + 2, current + 3]
  })

  // 格式化日期显示
  const formatDate = (dateString) => {
    if (!dateString) return '-'
    return new Date(dateString).toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  }

  // 初始化布局设置
  const initLayout = () => {
    const isRTL = JSON.parse(localStorage.getItem('isRTL') || 'false')
    if (isRTL) {
      document.documentElement.setAttribute('dir', 'rtl')
    } else {
      document.documentElement.removeAttribute('dir')
    }
    
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
  }

  // 初始化加载数据
  onMounted(() => {
    fetchApplications()
    initLayout()
  })

  return {
    // 数据
    applications,
    pagination,
    loading,
    showApplyModal,
    formData,
    targetPage,
    submitLoading,
    formErrors,
    
    // 方法
    fetchApplications,
    submitApplication,
    handlePageChange,
    handleSizeChange,
    goToPage,
    formatDate,
    
    // 计算属性
    getPaginationButtons
  }
}
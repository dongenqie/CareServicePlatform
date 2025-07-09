import { ref, computed } from 'vue'
import axios from 'axios'

export function useAuditorApplication() {
  // 数据定义
  const pendingApplications = ref([]) // 待处理申请列表
  const selfApplications = ref([]) // 自己的反馈申请列表
  const paginationPending = ref({
    current: 1,
    size: 10,
    total: 0,
    pages: 0
  })
  const paginationSelf = ref({
    current: 1,
    size: 10,
    total: 0,
    pages: 0
  })
  const loading = ref(false)
  const activeTab = ref('pending') // 当前激活的标签页
  const activeApplication = ref(null) // 当前处理的申请
  const replyContent = ref('') // 回复内容
  const isApproved = ref(true) // 是否通过
  const feedbackReason = ref('') // 反馈原因
  const showFeedbackModal = ref(false) // 是否显示反馈模态框
  const targetPagePending = ref(1) // 待处理申请目标页码
  const targetPageSelf = ref(1) // 我的申请目标页码

  // 获取待处理申请列表
  const fetchPendingApplications = async () => {
    try {
      loading.value = true
      const response = await axios.get('http://localhost:8080/api/auditor/applications', {
        params: {
          current: paginationPending.value.current,
          size: paginationPending.value.size
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      
      pendingApplications.value = response.data.data.records
      paginationPending.value = {
        current: response.data.data.current,
        size: response.data.data.size,
        total: response.data.data.total,
        pages: response.data.data.pages
      }
      targetPagePending.value = paginationPending.value.current // 更新目标页码
    } catch (error) {
      console.error('获取待处理申请列表失败:', error)
      alert(error.response?.data?.message || '获取申请列表失败')
    } finally {
      loading.value = false
    }
  }

  // 获取自己的反馈申请列表
  const fetchSelfApplications = async () => {
    try {
      loading.value = true
      const response = await axios.get('http://localhost:8080/api/auditor/checkSelfApplicationStatus', {
        params: {
          current: paginationSelf.value.current,
          size: paginationSelf.value.size
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      
      selfApplications.value = response.data.data.records
      paginationSelf.value = {
        current: response.data.data.current,
        size: response.data.data.size,
        total: response.data.data.total,
        pages: response.data.data.pages
      }
      targetPageSelf.value = paginationSelf.value.current // 更新目标页码
    } catch (error) {
      console.error('获取自己的反馈申请列表失败:', error)
      alert(error.response?.data?.message || '获取申请列表失败')
    } finally {
      loading.value = false
    }
  }

  // 处理申请
  const handleApplication = async () => {
    if (!activeApplication.value) return
    
    try {
      const response = await axios.post('http://localhost:8080/api/auditor/handleApplication', {
        applicationId: activeApplication.value.id,
        isApproved: isApproved.value,
        reply: replyContent.value
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      
      if (response.data.success) {
        // 更新本地数据
        const index = pendingApplications.value.findIndex(app => app.id === activeApplication.value.id)
        if (index !== -1) {
          pendingApplications.value[index].status = isApproved.value ? '已处理' : '拒绝'
          pendingApplications.value[index].adminReply = replyContent.value
          pendingApplications.value[index].handleTime = new Date().toISOString()
        }
        
        // 重置表单
        activeApplication.value = null
        replyContent.value = ''
        isApproved.value = true
        
        alert('处理成功')
        fetchPendingApplications() // 刷新列表
      } else {
        alert(response.data.message)
      }
    } catch (error) {
      console.error('处理申请失败:', error)
      alert(error.response?.data?.message || '处理申请失败')
    }
  }

  // 提交反馈给管理员
  const submitFeedback = async () => {
    if (!feedbackReason.value.trim()) {
      alert('请填写反馈原因')
      return
    }
    
    try {
      const response = await axios.post('/api/auditor/sendApplication', {
        reason: feedbackReason.value
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      
      if (response.data.success) {
        alert('反馈提交成功')
        showFeedbackModal.value = false
        feedbackReason.value = ''
        // 刷新自己的申请列表
        fetchSelfApplications()
      } else {
        alert(response.data.message)
      }
    } catch (error) {
      console.error('提交反馈失败:', error)
      alert(error.response?.data?.message || '提交反馈失败')
    }
  }

  // 分页改变
  const handlePendingPageChange = (page) => {
    paginationPending.value.current = page
    fetchPendingApplications()
  }

  const handleSelfPageChange = (page) => {
    paginationSelf.value.current = page
    fetchSelfApplications()
  }

  // 切换每页显示数量
  const handlePendingSizeChange = (size) => {
    paginationPending.value.size = size
    paginationPending.value.current = 1 // 重置到第一页
    fetchPendingApplications()
  }

  const handleSelfSizeChange = (size) => {
    paginationSelf.value.size = size
    paginationSelf.value.current = 1 // 重置到第一页
    fetchSelfApplications()
  }

  // 跳转到指定页
  const goToPendingPage = () => {
    const page = parseInt(targetPagePending.value)
    if (page && page >= 1 && page <= paginationPending.value.pages) {
      paginationPending.value.current = page
      fetchPendingApplications()
    } else {
      alert(`请输入1-${paginationPending.value.pages}之间的页码`)
    }
  }

  const goToSelfPage = () => {
    const page = parseInt(targetPageSelf.value)
    if (page && page >= 1 && page <= paginationSelf.value.pages) {
      paginationSelf.value.current = page
      fetchSelfApplications()
    } else {
      alert(`请输入1-${paginationSelf.value.pages}之间的页码`)
    }
  }

  // 获取分页按钮数组
  const getPendingPaginationButtons = computed(() => {
    return getPaginationButtons(paginationPending.value)
  })

  const getSelfPaginationButtons = computed(() => {
    return getPaginationButtons(paginationSelf.value)
  })

  // 分页按钮计算逻辑
  const getPaginationButtons = (pagination) => {
    const current = pagination.current
    const pages = pagination.pages
    const buttons = []
    
    // 总页数小于等于7，显示所有页码
    if (pages <= 7) {
      for (let i = 1; i <= pages; i++) {
        buttons.push(i)
      }
      return buttons
    }
    
    // 当前页在前4页，显示前7页
    if (current <= 4) {
      return [1, 2, 3, 4, 5, 6, 7]
    }
    
    // 当前页在后4页，显示最后7页
    if (current >= pages - 3) {
      return [pages - 6, pages - 5, pages - 4, pages - 3, pages - 2, pages - 1, pages]
    }
    
    // 当前页在中间，显示当前页前后各3页
    return [current - 3, current - 2, current - 1, current, current + 1, current + 2, current + 3]
  }

  // 切换标签页
  const switchTab = (tab) => {
    activeTab.value = tab
    if (tab === 'pending' && pendingApplications.value.length === 0) {
      fetchPendingApplications()
    } else if (tab === 'self' && selfApplications.value.length === 0) {
      fetchSelfApplications()
    }
  }

  return {
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
  }
}
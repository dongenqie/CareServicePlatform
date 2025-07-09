import { ref } from 'vue'
import axios from 'axios'

export function useChat() {
  // 反馈申请数据
  const applications = ref([])
  const pagination = ref({
    current: 1,
    size: 10,
    total: 0,
    pages: 0
  })
  const loading = ref(false)
  const activeApplication = ref(null)
  const replyContent = ref('')
  const isApproved = ref(true)

  // 获取反馈申请列表
  const fetchApplications = async () => {
    try {
      loading.value = true
      const response = await axios.get('http://localhost:8080/api/admin/applications', {
        params: {
          current: pagination.value.current,
          size: pagination.value.size
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      
      applications.value = response.data.data.records
      pagination.value = {
        current: response.data.data.current,
        size: response.data.data.size,
        total: response.data.data.total,
        pages: response.data.data.pages
      }
    } catch (error) {
      console.error('获取申请列表失败:', error)
    } finally {
      loading.value = false
    }
  }

  // 处理申请
  const handleApplication = async () => {
    if (!activeApplication.value) return
    
    try {
      const response = await axios.post('http://localhost:8080/api/admin/handleApplication', {
        applicationId: activeApplication.value.id,
        isApproved: isApproved.value,
        adminReply: replyContent.value
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      
      if (response.data.success) {
        // 更新本地数据
        const index = applications.value.findIndex(app => app.id === activeApplication.value.id)
        if (index !== -1) {
          applications.value[index].status = isApproved.value ? '已处理' : '拒绝'
          applications.value[index].adminReply = replyContent.value
          applications.value[index].handleTime = new Date().toISOString()
        }
        
        // 重置表单
        activeApplication.value = null
        replyContent.value = ''
        isApproved.value = true
        
        fetchApplications() // 刷新列表
        return { success: true }
      } else {
        return { success: false, message: response.data.message }
      }
    } catch (error) {
      console.error('处理申请失败:', error)
      return { 
        success: false, 
        message: error.response?.data?.message || '处理申请失败' 
      }
    }
  }

  // 分页改变
  const handlePageChange = (page) => {
    pagination.value.current = page
    fetchApplications()
  }

  // 获取分页按钮数组
  const getPaginationButtons = () => {
    const current = pagination.value.current
    const pages = pagination.value.pages
    const buttons = []
    
    // 总页数小于等于5，显示所有页码
    if (pages <= 5) {
      for (let i = 1; i <= pages; i++) {
        buttons.push(i)
      }
      return buttons
    }
    
    // 当前页在前3页，显示1-5页
    if (current <= 3) {
      return [1, 2, 3, 4, 5]
    }
    
    // 当前页在后3页，显示最后5页
    if (current >= pages - 2) {
      return [pages - 4, pages - 3, pages - 2, pages - 1, pages]
    }
    
    // 当前页在中间，显示当前页前后各2页
    return [current - 2, current - 1, current, current + 1, current + 2]
  }

  return {
    applications,
    pagination,
    loading,
    activeApplication,
    replyContent,
    isApproved,
    fetchApplications,
    handleApplication,
    handlePageChange,
    getPaginationButtons
  }
}
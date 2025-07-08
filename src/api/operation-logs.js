import { ref } from 'vue'
import axios from 'axios'

export function useOperationLogs() {
  // 定义响应式数据
  const logs = ref([]) // 操作日志列表
  const loading = ref(false) // 加载状态
  const error = ref(null) // 错误信息
  const pagination = ref({
    current: 1, // 当前页码
    size: 10, // 每页条数
    total: 0, // 总条数
    pages: 0 // 总页数
  })
  const searchParams = ref({
    username: '', // 用户名筛选
    operation: '', // 操作类型筛选
    role: '', // 角色筛选
    startDate: '', // 开始日期
    endDate: '' // 结束日期
  })

  // 获取当前用户信息
  const getCurrentUser = () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'))
      return user || {}
    } catch (e) {
      return {}
    }
  }

  // 获取操作日志
  const fetchOperationLogs = async () => {
    loading.value = true
    error.value = null
    
    try {
      const token = localStorage.getItem('token')
      const user = getCurrentUser()
      
      // 构建请求参数，过滤掉空值
      const requestParams = {
        current: pagination.value.current,
        size: pagination.value.size
      }
      
      // 只添加有值的搜索参数
      if (searchParams.value.username) requestParams.username = searchParams.value.username
      if (searchParams.value.operation) requestParams.operation = searchParams.value.operation
      if (searchParams.value.role) requestParams.role = searchParams.value.role
      if (searchParams.value.startDate) requestParams.startDate = searchParams.value.startDate
      if (searchParams.value.endDate) requestParams.endDate = searchParams.value.endDate
      
      // 如果未指定角色，使用当前用户角色作为默认值
      if (!requestParams.role && user.role) {
        requestParams.role = user.role
      }
      
      console.log('请求参数:', requestParams) // 调试用，可删除
      
      const response = await axios.get('http://localhost:8080/api/admin/operation-logs', {
        params: requestParams,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      
      if (response.data.success) {
        logs.value = response.data.data.records
        pagination.value = {
          current: response.data.data.current,
          size: response.data.data.size,
          total: response.data.data.total,
          pages: response.data.data.pages
        }
      } else {
        error.value = response.data.message || '获取操作日志失败'
      }
    } catch (err) {
      error.value = err.response?.data?.message || err.message || '请求失败'
    } finally {
      loading.value = false
    }
  }

  // 处理分页变化
  const handlePageChange = (page) => {
    pagination.value.current = page
    fetchOperationLogs()
  }

  // 搜索操作日志
  const searchLogs = () => {
    pagination.value.current = 1
    fetchOperationLogs()
  }

  // 重置搜索条件
  const resetSearch = () => {
    searchParams.value = {
      username: '',
      operation: '',
      role: '',
      startDate: '',
      endDate: ''
    }
    fetchOperationLogs()
  }

  // 格式化日期时间
  const formatDateTime = (dateTime) => {
    if (!dateTime) return ''
    const date = new Date(dateTime)
    return date.toLocaleString()
  }

  // 获取操作状态文本
  const getStatusText = (status) => {
    return status === 1 ? '成功' : '失败'
  }

  // 获取操作状态样式类
  const getStatusClass = (status) => {
    return status === 1 ? 'badge-subtle-success' : 'badge-subtle-danger'
  }

  // 生成分页按钮
  const getPaginationButtons = () => {
    const buttons = []
    const totalPages = pagination.value.pages
    const currentPage = pagination.value.current
    const maxVisibleButtons = 5

    if (totalPages <= maxVisibleButtons) {
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(i)
      }
    } else {
      const half = Math.floor(maxVisibleButtons / 2)
      let start = currentPage - half
      let end = currentPage + half

      if (start < 1) {
        start = 1
        end = maxVisibleButtons
      } else if (end > totalPages) {
        end = totalPages
        start = totalPages - maxVisibleButtons + 1
      }

      for (let i = start; i <= end; i++) {
        buttons.push(i)
      }
    }

    return buttons
  }

  return {
    logs,
    loading,
    error,
    pagination,
    searchParams,
    fetchOperationLogs,
    handlePageChange,
    searchLogs,
    resetSearch,
    formatDateTime,
    getStatusText,
    getStatusClass,
    getPaginationButtons
  }
}
import { ref } from 'vue'
import axios from 'axios'

// 导出所有响应式变量和函数
export function useSystemLogs() {
  // 定义响应式数据
  const logs = ref([]) // 日志列表
  const loading = ref(false) // 加载状态
  const error = ref(null) // 错误信息
  const pagination = ref({
    current: 1, // 当前页码
    size: 100, // 每页条数
    total: 0, // 总条数
    pages: 0 // 总页数
  })
  const searchParams = ref({
    keyword: '', // 搜索关键词
    date: '', // 搜索日期
    limit: 1000 // 搜索结果限制条数
  })
  const lines = ref(1000) // 普通查询时读取的行数

  // 获取系统日志
  const fetchSystemLogs = async () => {
    loading.value = true
    error.value = null
    
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get('http://localhost:8080/api/admin/system-logs/file', {
        params: {
          current: pagination.value.current,
          size: pagination.value.size,
          lines: lines.value
        },
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
        error.value = response.data.message || '获取日志失败'
      }
    } catch (err) {
      error.value = err.response?.data?.message || err.message || '请求失败'
    } finally {
      loading.value = false
    }
  }

  // 搜索系统日志
  const searchLogs = async () => {
    loading.value = true
    error.value = null
    
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get('http://localhost:8080/api/admin/system-logs/file/search', {
        params: {
          ...searchParams.value,
          current: pagination.value.current,
          size: pagination.value.size
        },
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
        error.value = response.data.message || '搜索日志失败'
      }
    } catch (err) {
      error.value = err.response?.data?.message || err.message || '搜索失败'
    } finally {
      loading.value = false
    }
  }

  // 处理分页变化
  const handlePageChange = (page) => {
    pagination.value.current = page
    if (searchParams.value.keyword || searchParams.value.date) {
      searchLogs()
    } else {
      fetchSystemLogs()
    }
  }

  // 解析日志级别
  const getLogLevel = (log) => {
    if (!log) return ''
    const levelMatch = log.match(/\[.*\]\s(DEBUG|INFO|WARN|ERROR|FATAL)/i)
    return levelMatch ? levelMatch[1] : ''
  }

  // 获取日志级别对应的样式类
  const getLogLevelClass = (log) => {
    const level = getLogLevel(log)
    switch (level.toUpperCase()) {
      case 'ERROR':
      case 'FATAL':
        return 'text-danger'
      case 'WARN':
        return 'text-warning'
      case 'INFO':
        return 'text-info'
      case 'DEBUG':
        return 'text-secondary'
      default:
        return 'text-body'
    }
  }

  // 格式化日志时间
  const formatLogTime = (log) => {
    if (!log) return ''
    const timeMatch = log.match(/\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}/)
    return timeMatch ? timeMatch[0] : ''
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
    lines,
    fetchSystemLogs,
    searchLogs,
    handlePageChange,
    getLogLevel,
    getLogLevelClass,
    formatLogTime,
    getPaginationButtons
  }
}
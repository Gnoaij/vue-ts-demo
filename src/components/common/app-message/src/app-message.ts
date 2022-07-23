import { ElMessage } from 'element-plus'

const AppMessage = {
  success: (message: string) => {
    ElMessage({
      type: 'success',
      center: true,
      showClose: true,
      message: message
    })
    return Promise.resolve(message)
  },
  error: (message: string) => {
    ElMessage({
      type: 'error',
      center: true,
      showClose: true,
      message: message
    })
    return Promise.reject(message)
  }
}

export default AppMessage

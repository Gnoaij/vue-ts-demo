import { ElLoading } from 'element-plus'

type AsyncCallback = () => Promise<any> | Promise<never>

async function AppLoading<T = any>(asyncCallback: AsyncCallback, loadingText = '') {
  const loadingInstance = ElLoading.service({ text: loadingText })
  try {
    const result: T = await asyncCallback()
    loadingInstance?.close()
    return Promise.resolve(result)
  } catch (error) {
    loadingInstance?.close()
    return Promise.reject(error)
  }
}

export default AppLoading

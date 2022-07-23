import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'

class Request {
  private instance: AxiosInstance

  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config)
  }

  useRequestHooks(
    onFulfilled?: (config: AxiosRequestConfig) => AxiosRequestConfig | Promise<AxiosRequestConfig>,
    onRejected?: (error: any) => any
  ): number {
    return this.instance.interceptors.request.use(onFulfilled, onRejected)
  }

  useResponseHooks(
    onFulfilled?: (value: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>,
    onRejected?: (error: any) => any
  ): number {
    return this.instance.interceptors.response.use(onFulfilled, onRejected)
  }

  ejectRequestHooks(hookId: number): void {
    return this.instance.interceptors.request.eject(hookId)
  }

  ejectResponseHooks(hookId: number): void {
    return this.instance.interceptors.response.eject(hookId)
  }

  request<T = AxiosResponse>(url: string, config: AxiosRequestConfig = {}): Promise<T> {
    config.url = url
    return this.instance.request<any, T>(config)
  }

  get<T = AxiosResponse>(url: string, config: AxiosRequestConfig = {}): Promise<T> {
    config.method = 'get'
    return this.request<T>(url, config)
  }

  post<T = AxiosResponse>(url: string, config: AxiosRequestConfig = {}): Promise<T> {
    config.method = 'post'
    return this.request<T>(url, config)
  }

  put<T = AxiosResponse>(url: string, config: AxiosRequestConfig = {}): Promise<T> {
    config.method = 'put'
    return this.request<T>(url, config)
  }

  patch<T = AxiosResponse>(url: string, config: AxiosRequestConfig = {}): Promise<T> {
    config.method = 'patch'
    return this.request<T>(url, config)
  }

  delete<T = AxiosResponse>(url: string, config: AxiosRequestConfig = {}): Promise<T> {
    config.method = 'delete'
    return this.request<T>(url, config)
  }
}

export default Request

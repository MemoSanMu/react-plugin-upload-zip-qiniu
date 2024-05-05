import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { isNumber } from 'lodash-es'

const baseURL = '//localhost:8000'

const errorHttpCodeMap: { [key: string]: string } = {
  401: '当前用户没有权限请重新登录',
  403: '拒绝访问',
  404: 'API 地址未找到',
  500: '服务器错误',
  502: '错误网关',
  504: '网关超时',
}

// axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

const service = axios.create({
  baseURL,
  timeout: 10 * 1000, // 10s
  // withCredentials: true,
})

interface CustomAxiosResponse<T> {
  success: true
  data: T
  response: AxiosResponse
}

interface CustomAxiosResponseErr {
  success: false
  isHttpError: boolean
}

export const request = async <T>(
  config: AxiosRequestConfig,
): Promise<CustomAxiosResponse<T> | CustomAxiosResponseErr> => {
  try {
    const response = await service.request(config)
    const data = config?.responseType === 'blob' ? response.data : response.data.data
    return {
      success: true,
      response,
      data,
    }
  } catch (e) {
    return {
      success: false,
      isHttpError: !isNumber(Number(e)),
    }
  }
}

export const get = async <T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<CustomAxiosResponse<T> | CustomAxiosResponseErr> => request({ method: 'get', url, ...config })

export const post = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<CustomAxiosResponse<T> | CustomAxiosResponseErr> => request({ method: 'post', url, data, ...config })

export const put = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<CustomAxiosResponse<T> | CustomAxiosResponseErr> => request({ method: 'put', url, data, ...config })

export const del = async <T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<CustomAxiosResponse<T> | CustomAxiosResponseErr> => request({ method: 'delete', url, ...config })

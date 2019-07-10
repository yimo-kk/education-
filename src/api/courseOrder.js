// 课程订单管理
import axios from '@/libs/api.request'
import { getToken } from '@/libs/util'

/**
 * 查看线上课程订单列表
 * @param body
 * @returns {*|void|AxiosPromise<any>|{responseURL}}
 */
export const getOnlineCourseOrderPage = (body) => {
  const token = getToken()
  return axios.request({
    url: '/courseOrder/orderSearch',
    data: body,
    headers: {
      'Authorization': `Bearer ${token}`
    },
    method: 'post'
  })
}

/**
 * 查看线上订单详情
 * @param id
 * @returns {*|void|AxiosPromise<any>|{responseURL}}
 */
export const getOnlineCourseOrderById = courseOrderId => {
  const token = getToken()
  return axios.request({
    url: `/courseOrder/getCourseOrderDetai/${courseOrderId}`,
    headers: {
      'Authorization': `Bearer ${token}`
    },
    method: 'get'
  })
}

/**
 * 线下课程订单列表分页
 * @param body
 * @returns {*|void|AxiosPromise<any>|{responseURL}}
 */
export const getOfflineCourseOrderPage = (body) => {
  const token = getToken()
  return axios.request({
    url: '/offlineOrder/orderSearch',
    data: body,
    headers: {
      'Authorization': `Bearer ${token}`
    },
    method: 'post'
  })
}

/**
 * 线下课程订单详情
 * @param courseOrderId
 * @returns {*|void|AxiosPromise<any>|{responseURL}}
 */
export const getOfflineCourseOrderById = courseOrderId => {
  const token = getToken()
  return axios.request({
    url: `/offlineOrder/getOfflineOrderDetai/${courseOrderId}`,
    headers: {
      'Authorization': `Bearer ${token}`
    },
    method: 'get'
  })
}

export const verification = courseOrderId => {
  const token = getToken()
  return axios.request({
    url: `/offlineOrder/verification/${courseOrderId}`,
    headers: {
      'Authorization': `Bearer ${token}`
    },
    method: 'put'
  })
}

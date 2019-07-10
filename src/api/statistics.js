import axios from '@/libs/api.request'
import {
  getToken
} from '@/libs/util'

/**
 * 获取统计关注量
 */
export const fetchCount = () => {
  const token = getToken()
  return axios.request({
    url: '/courseStatistic/getCount',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    method: 'get'
  })
}


/**
 * 获取订单数据总览
 */
export const fetchOrder = (body) => {
  const token = getToken()
  return axios.request({
    url: '/courseStatistic/getOrder',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    method: 'post',
    data: body
  })
}

/**
 * 获取线上课程数据总览
 */
export const fetchOnlineCourse = (body) => {
  const token = getToken()
  return axios.request({
    url: '/courseStatistic/getCourseData',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    method: 'post',
    data: body
  })
}

/**
 * 获取线下课程数据总览
 */
export const fetchOfflineCourse = (body) => {
  const token = getToken()
  return axios.request({
    url: '/courseStatistic/getOfflineData',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    method: 'post',
    data: body
  })
}
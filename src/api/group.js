import axios from '@/libs/api.request'
import { getToken } from '@/libs/util'

/**
 * 查看拼团列表
 * @param body
 * @returns {*|void|AxiosPromise<any>|{responseURL}}
 */
export const getGroupPage = (body) => {
  const token = getToken()
  return axios.request({
    url: '/educationGroup/getGroup',
    data: body,
    headers: {
      'Authorization': `Bearer ${token}`
    },
    method: 'post'
  })
}

/**
 * 添加拼团
 * @param body
 * @returns {*|void|AxiosPromise<any>|{responseURL}}
 */
export const getGroupAdd = (body) => {
  const token = getToken()
  return axios.request({
    url: '/educationGroup/getGroup',
    data: body,
    headers: {
      'Authorization': `Bearer ${token}`
    },
    method: 'post'
  })
}

/**
 * 编辑拼团
 * @param body
 * @returns {*|void|AxiosPromise<any>|{responseURL}}
 */
export const getGroupEdit = (body) => {
  const token = getToken()
  return axios.request({
    url: '/educationGroup/updateGroup',
    data: body,
    headers: {
      'Authorization': `Bearer ${token}`
    },
    method: 'post'
  })
}

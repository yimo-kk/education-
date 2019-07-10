import axios from '@/libs/api.request'
import { getToken } from '@/libs/util'

export const getPage = (expressName, body) => {
  const token = getToken()
  return axios.request({
    url: `/express/searchExpress?expressName=${expressName}`,
    headers: {
      'Authorization': `Bearer ${token}`
    },
    method: 'post',
    data: body
  })
}

/**
 * 新增物流模板
 * @param body
 * @returns {*|void|AxiosPromise<any>|{responseURL}}
 */
export const addExpress = (body) => {
  const token = getToken()
  return axios.request({
    url: '/StoreCouponSetting/addExpress',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    method: 'post',
    data: body
  })
}

/**
 * 编辑物流模板
 * @param body
 * @returns {*|void|AxiosPromise<any>|{responseURL}}
 */
export const updateExpress = (body) => {
  const token = getToken()
  return axios.request({
    url: '/StoreCouponSetting/addExpress',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    method: 'put',
    data: body
  })
}

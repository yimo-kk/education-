import axios from '@/libs/api.request'
import { getToken } from '@/libs/util'

/**
 * 获取订单分页
 * @param body
 * @returns {*|void|AxiosPromise<any>|{responseURL}}
 */
export const getPage = (body) => {
  const token = getToken()
  return axios.request({
    url: '/educationWithdraw/searchWithdraw',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    method: 'post',
    data: body
  })
}

export const getAccountPage = (body) => {
  const token = getToken()
  return axios.request({
    url: '/educationAccount/searchAccount',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    method: 'post',
    data: body
  })
}

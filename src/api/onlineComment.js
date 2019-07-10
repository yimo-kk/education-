import axios from '@/libs/api.request'
import { getToken } from '@/libs/util'
/**
 * 评价列表
 * @param body
 * @returns {*|void|AxiosPromise<any>|{responseURL}}
 */
export const getCommentPage = (body) => {
  const token = getToken()
  return axios.request({
    url: '/courseOrder/getCommentList',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    params: body,
    method: 'get'
  })
}

/**
 * 查看商品评论详情列表
 * @param goodsId
 * @returns {*|void|AxiosPromise<any>|{responseURL}}
 */
export const getCommentList = (goodsId, pageNum, pageSize) => {
  const token = getToken()
  return axios.request({
    url: `/courseOrder/getComment/${goodsId}?pageNum=${pageNum}&pageSize=${pageSize}`,
    headers: {
      'Authorization': `Bearer ${token}`
    },
    method: 'get'
  })
}

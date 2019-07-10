import axios from '@/libs/api.request'
import { getToken } from '@/libs/util'

/**
 * 获取订单分页
 * @param body
 * @returns {*|void|AxiosPromise<any>|{responseURL}}
 */
export const getOrderPage = (body) => {
  const token = getToken()
  return axios.request({
    url: '/storeOrder/orderSearch',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    method: 'post',
    data: body
  })
}
export const getStoreOrderDetail = (orderId) => {
  const token = getToken()
  return axios.request({
    url: `/storeOrder/getStoreOrderDetai/${orderId}`,
    headers: {
      'Authorization': `Bearer ${token}`
    },
    method: 'get'
  })
}

/**
 * 改价格
 * @param body
 * @returns {*|void|AxiosPromise<any>|{responseURL}}
 */
export const updateOrderPrice = (body) => {
  const token = getToken()
  return axios.request({
    url: '/storeOrder/updateOrderPrice',
    data: body,
    headers: {
      'Authorization': `Bearer ${token}`
    },
    method: 'put'
  })
}

/**
 * 发货
 * @param body
 * @returns {*|void|AxiosPromise<any>|{responseURL}}
 */
export const deliverGoods = (body) => {
  const token = getToken()
  return axios.request({
    url: '/storeOrder/deliverGoods',
    data: body,
    headers: {
      'Authorization': `Bearer ${token}`
    },
    method: 'put'
  })
}

/**
 * 厂家退单列表
 * @param body
 * @returns {*|void|AxiosPromise<any>|{responseURL}}
 */
export const getOrderRefundPage = (body) => {
  const token = getToken()
  return axios.request({
    url: '/storeOrderRefund/orderRefundSearch',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    method: 'post',
    data: body
  })
}

/**
 * 厂家退单详情
 * @param orderRefundId
 * @returns {*|void|AxiosPromise<any>|{responseURL}}
 */
export const getOrderRefundById = (orderRefundId) => {
  const token = getToken()
  return axios.request({
    url: `/storeOrderRefund/getStoreOrderRefund/${orderRefundId}`,
    headers: {
      'Authorization': `Bearer ${token}`
    },
    method: 'get'
  })
}

/**
 * 厂家退款同意/拒绝
 * @param orderRefundId
 * @param state
 * @returns {*|void|AxiosPromise<any>|{responseURL}}
 */
export const updateOrderRefundState = (orderRefundId, state) => {
  const token = getToken()
  return axios.request({
    url: `/setOrderRefundState/${orderRefundId}/${state}`,
    headers: {
      'Authorization': `Bearer ${token}`
    },
    method: 'put'
  })
}

/**
 * 评价列表
 * @param body
 * @returns {*|void|AxiosPromise<any>|{responseURL}}
 */
export const getCommentPage = (body) => {
  const token = getToken()
  return axios.request({
    url: '/storeOrder/getCommentList',
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
    url: `/storeOrder/getComment/${goodsId}?pageNum=${pageNum}&pageSize=${pageSize}`,
    headers: {
      'Authorization': `Bearer ${token}`
    },
    method: 'get'
  })
}

/**
 * 教育退单列表
 * @param body
 * @returns {*|void|AxiosPromise<any>|{responseURL}}
 */
export const educationOrderRefund = (body) => {
  const token = getToken()
  return axios.request({
    url: '/orderRefund/refund',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    method: 'post',
    data: body
  })
}
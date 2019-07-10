import axios from '@/libs/api.request'
import { getToken } from '@/libs/util'

/**
 * 查询优惠券列表分页
 * @param body
 * @returns {*|void|AxiosPromise<any>|{responseURL}}
 */
export const getPage = (body) => {
  const token = getToken()
  return axios.request({
    url: '/StoreCouponSetting/searchStoreCoupon',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    method: 'post',
    data: body
  })
}

/**
 * 新增优惠券
 * @param body
 * @returns {*|void|AxiosPromise<any>|{responseURL}}
 */
export const addStoreCoupon = (body) => {
  const token = getToken()
  return axios.request({
    url: '/StoreCouponSetting/addStoreCoupon',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    method: 'post',
    data: body
  })
}

/**
 * 修改优惠券状态
 * @param couponId
 * @param couponStatus
 * @returns {*|void|AxiosPromise<any>|{responseURL}}
 */
export const updateCouponStatus = (couponId, couponStatus) => {
  const token = getToken()
  return axios.request({
    url: `/StoreCouponSetting/updateCoupon/${couponId}/${couponStatus}`,
    data: body,
    headers: {
      'Authorization': `Bearer ${token}`
    },
    method: 'put'
  })
}

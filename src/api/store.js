import axios from '@/libs/api.request'
import { getToken } from '@/libs/util'

/**
 * 查看认证资料
 * @param id
 * @returns {*|void|AxiosPromise<any>|{responseURL}}
 */
export const getAuthorizedData = () => {
  const token = getToken()
  return axios.request({
    url: '/storeData/getStoreData',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    method: 'get'
  })
}

/**
 * 查看基本资料
 * @returns {*|void|AxiosPromise<any>|{responseURL}}
 */
export const getBasicData = () => {
  const token = getToken()
  return axios.request({
    url: '/storeData/getBasicData',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    method: 'get'
  })
}

/**
 * 修改基本资料
 * @param body
 * @returns {*|void|AxiosPromise<any>|{responseURL}}
 */
export const updateStoreDate = (body) => {
  const token = getToken()
  return axios.request({
    url: '/storeData/updateStoreDate',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    method: 'put',
    data: body
  })
}

export const getStoreGoodsCategoryList = () => {
  const token = getToken()
  return axios.request({
    url: '/storeClass/getStoreGoodsCategoryList',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    method: 'get'
  })
}
/**
 * 查询店铺分类列表
 * @returns {*|void|AxiosPromise<any>|{responseURL}}
 */
export const getStoreGoodsCategoryPage = (pageNum, pageSize) => {
  const token = getToken()
  return axios.request({
    url: '/storeClass/getProductList',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    params: {
      pageNum,
      pageSize
    },
    method: 'get'
  })
}

/**
 * 新增店铺分类
 * @param body
 * @returns {*|void|AxiosPromise<any>|{responseURL}}
 */
export const create = (body) => {
  const token = getToken()
  return axios.request({
    url: '/storeClass/addStoreClass',
    data: body,
    headers: {
      'Authorization': `Bearer ${token}`
    },
    method: 'post'
  })
}

/**
 * 修改店铺分类
 * @param body
 * @returns {*|void|AxiosPromise<any>|{responseURL}}
 */
export const update = (categoryId, name) => {
  const token = getToken()
  return axios.request({
    url: `/storeClass/updateStoreClass/${categoryId}/${name}`,
    headers: {
      'Authorization': `Bearer ${token}`
    },
    method: 'put'
  })
}

/**
 * 是否展示
 * @param categoryId
 * @param isShow
 * @returns {*|void|AxiosPromise<any>|{responseURL}}
 */
export const upAndDown = (categoryId, isShow) => {
  const token = getToken()
  return axios.request({
    url: `/storeClass/upAndDown?categoryId=${categoryId}&isShow=${isShow}`,
    headers: {
      'Authorization': `Bearer ${token}`
    },
    method: 'post'
  })
}

/**
 * 删除店铺分类
 * @param categoryId
 * @returns {*|void|AxiosPromise<any>|{responseURL}}
 */
export const del = (categoryId) => {
  const token = getToken()
  return axios.request({
    url: `/storeClass/delClass/${categoryId}`,
    headers: {
      'Authorization': `Bearer ${token}`
    },
    method: 'delete'
  })
}

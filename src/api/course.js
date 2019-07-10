import axios from '@/libs/api.request'
import { getToken } from '@/libs/util'

// 线上课程 ============================
/**
 * 课程分页列表
 * @param body
 * @returns {*|void|AxiosPromise<any>|{responseURL}}
 */
export const getOnlinePage = (body) => {
  const token = getToken()
  return axios.request({
    url: '/course/searchCourse',
    data: body,
    headers: {
      'Authorization': `Bearer ${token}`
    },
    method: 'post'
  })
}
/**
 * 线上课程详情
 * @param courseId
 * @returns {*|void|AxiosPromise<any>|{responseURL}}
 */
export const getOnlineCourse = (courseId) => {
  const token = getToken()
  return axios.request({
    url: `/course/getCourse/${courseId}`,
    headers: {
      'Authorization': `Bearer ${token}`
    },
    method: 'get'
  })
}

/**
 * 线上课程上架
 * @param courseIds
 * @returns {*|void|AxiosPromise<any>|{responseURL}}
 */
export const courseOnlineUp = (courseIds) => {
  const token = getToken()
  return axios.request({
    url: `/course/courseUp/${courseIds}`,
    headers: {
      'Authorization': `Bearer ${token}`
    },
    method: 'put'
  })
}

/**
 * 线上课程下架
 * @param courseIds
 * @returns {*|void|AxiosPromise<any>|{responseURL}}
 */
export const courseOnlineDown = (courseIds) => {
  const token = getToken()
  return axios.request({
    url: `/course/courseDown/${courseIds}`,
    headers: {
      'Authorization': `Bearer ${token}`
    },
    method: 'put'
  })
}

/**
 * 线上子课程分页
 * @param courseId
 * @param pageNum
 * @param pageSize
 * @returns {*|void|AxiosPromise<any>|{responseURL}}
 */
export const getSubOnlineCoursePage = (courseId, pageNum, pageSize) => {
  const token = getToken()
  return axios.request({
    url: `/course/getCourseVideoList/${courseId}`,
    params: {
      pageNum,
      pageSize
    },
    headers: {
      'Authorization': `Bearer ${token}`
    },
    method: 'get'
  })
}
export const addCourse = (body) => {
  const token = getToken()
  return axios.request({
    url: '/course/addCourse',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    data: body,
    method: 'post'
  })
}

// =====================================

// 线下课程 =============================

export const getOfflinePage = (body) => {
  const token = getToken()
  return axios.request({
    url: '/offline/searchOfflineCourse',
    data: body,
    headers: {
      'Authorization': `Bearer ${token}`
    },
    method: 'post'
  })
}
/**
 * 线下课程详情
 * @param courseId
 * @returns {*|void|AxiosPromise<any>|{responseURL}}
 */
export const getCourse = (courseId) => {
  const token = getToken()
  return axios.request({
    url: `/offline/getOfflineCourse/${courseId}`,
    headers: {
      'Authorization': `Bearer ${token}`
    },
    method: 'get'
  })
}

/**
 * 线下课程上架
 * @param courseIds
 * @returns {*|void|AxiosPromise<any>|{responseURL}}
 */
export const courseUp = (courseIds) => {
  const token = getToken()
  return axios.request({
    url: `/offline/offlineCourseUp/${courseIds}`,
    headers: {
      'Authorization': `Bearer ${token}`
    },
    method: 'put'
  })
}

/**
 * 线下课程下架
 * @param courseIds
 * @returns {*|void|AxiosPromise<any>|{responseURL}}
 */
export const courseDown = (courseIds) => {
  const token = getToken()
  return axios.request({
    url: `/offline/offlineCourseDown/${courseIds}`,
    headers: {
      'Authorization': `Bearer ${token}`
    },
    method: 'put'
  })
}

/**
 * 线下子课程分页
 * @param courseId
 * @param pageNum
 * @param pageSize
 * @returns {*|void|AxiosPromise<any>|{responseURL}}
 */
export const getSubCoursePage = (courseId, pageNum, pageSize) => {
  const token = getToken()
  return axios.request({
    url: `/offline/getOfflineCourseTermList/${courseId}`,
    params: {
      pageNum,
      pageSize
    },
    headers: {
      'Authorization': `Bearer ${token}`
    },
    method: 'get'
  })
}
/**
 * 上架线下子课程
 * @param courseTermId
 */
export const offlineTermUp = (courseTermId) => {
  const token = getToken()
  return axios.request({
    url: `/offline/offlineTermUp/${courseTermId}`,
    headers: {
      'Authorization': `Bearer ${token}`
    },
    method: 'get'
  })
}

/**
 * 下架线下子课程
 * @param courseTermId
 */
export const offlineTermDown = (courseTermId) => {
  const token = getToken()
  return axios.request({
    url: `/offline/offlineTermDown/${courseTermId}`,
    headers: {
      'Authorization': `Bearer ${token}`
    },
    method: 'get'
  })
}

/**
 * 新增线下课程
 * @param body
 * @returns {*|void|AxiosPromise<any>|{responseURL}}
 */
export const addOfflineCourse = (body) => {
  const token = getToken()
  return axios.request({
    url: '/offline/addOfflineCourse',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    data: body,
    method: 'post'
  })
}

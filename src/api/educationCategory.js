import axios from '@/libs/api.request'
import { getToken } from '@/libs/util'

export const getCategoryList = (catNo, level) => {
  const token = getToken()
  return axios.request({
    url: '/educationCategory/list',
    params: {
      catNo,
      level
    },
    headers: {
      'Authorization': `Bearer ${token}`
    },
    method: 'get'
  })
}

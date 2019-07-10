import axios from '@/libs/api.request'
import { getToken } from '@/libs/util'

export const getAllArea = () => {
  const token = getToken()
  return axios.request({
    url: '/main/getAllArea',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    method: 'get'
  })
}

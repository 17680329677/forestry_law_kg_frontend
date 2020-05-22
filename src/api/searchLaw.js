import request from '@/utils/request'

export function searchLaw(searchContent) {
  return request({
    url: '/forestry_law/search',
    method: 'get',
    params: {
      'searchContent': searchContent
    }
  })
}

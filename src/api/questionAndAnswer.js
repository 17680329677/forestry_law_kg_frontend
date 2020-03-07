import request from '@/utils/request'

export function test() {
  return request({
    url: '/forestry_law/test',
    method: 'get'
  })
}

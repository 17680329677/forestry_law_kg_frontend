import request from '@/utils/request'

export function getDrawInfo(entityName) {
  return request({
    url: '/forestry_law/draw',
    method: 'get',
    params: {
      'entityName': entityName
    }
  })
}

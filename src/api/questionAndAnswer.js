import request from '@/utils/request'

export function test() {
  return request({
    url: '/forestry_law/test',
    method: 'get'
  })
}


export function questionSubmit(question) {
  return request({
    url: '/forestry_law/question',
    method: 'get',
    params: {
      'question': question
    }
  })
}

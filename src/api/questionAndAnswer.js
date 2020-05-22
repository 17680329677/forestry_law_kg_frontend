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

export function get_law_info(law_name) {
  return request({
    url: '/forestry_law/law_info',
    method: 'get',
    params: {
      'law_name': law_name
    }
  })
}

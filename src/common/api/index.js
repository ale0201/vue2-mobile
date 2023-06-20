import http from '@/common/service/httpRequest'

export const getDictByType = (params) => http.get('/sys/dict/list/' + params)

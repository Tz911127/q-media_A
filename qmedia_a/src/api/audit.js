import axios from '@/libs/axios'
export const getCheckPage = (params) => {
    return axios.request({
        url: '/api/check/page',
        params: params,
        method: 'get'
    })
}
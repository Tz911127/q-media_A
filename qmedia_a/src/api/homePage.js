import axios from '@/libs/axios'
export const getReport = (params) => {
    return axios.request({
        url: '/api/report/first-page',
        params: params,
        method: 'get'
    })
}
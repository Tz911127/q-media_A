import axios from '@/libs/axios'

export const getProgramPage = (params) => {
    return axios.request({
        url: '/api/program/page',
        params: params,
        method: 'get'
    })
}
import axios from '@/libs/axios'

export const getProgramPage = (params) => {
    return axios.request({
        url: '/api/program/page',
        params: params,
        method: 'get'
    })
}
export const getProgramDetail = (params) => {
    return axios.request({
        url: '/api/program/' + params.id,
        params: {},
        method: 'get'
    })
}
export const getProgramPlay = (params) => {
    return axios.request({
        url: '/api/program/play/page',
        params: params,
        method: 'get'
    })
}
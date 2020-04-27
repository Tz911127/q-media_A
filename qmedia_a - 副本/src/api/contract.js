import axios from '@/libs/axios'
export const getContractPage = (params) => {
    return axios.request({
        url: '/api/contract/list',
        params: params,
        method: 'get'
    })
}
export const getContractDetail = (params) => {
    return axios.request({
        url: '/api/contract/' + params.id,
        params: {},
        method: 'get'
    })
}
export const patchContract = (data) => {
    return axios.request({
        url: '/api/contract/check',
        data: data,
        method: 'patch'
    })
}
export const getListOrder = (params) => {
    return axios.request({
        url: '/api/order/listOrderCount',
        params: params,
        method: 'get'
    })
}
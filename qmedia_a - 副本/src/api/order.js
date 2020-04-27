import axios from '@/libs/axios'
export const getorderPage = (params) => {
    return axios.request({
        url: '/api/order/page',
        params: params,
        method: 'get'
    })
}
export const getOrderDetail = (params) => {
    return axios.request({
        url: '/api/order/' + params,
        params: {},
        method: 'get'
    })
}
export const getListDevice = (params) => {
    return axios.request({
        url: 'api/order/listDeviceCount',
        params: params,
        method: 'get'
    })
}
export const getProgramReview = (params) => {
    return axios.request({
        url: '/api/program/' + params,
        params: {},
        method: 'get'
    })
}
export const getOrderCount = (params) => {
    return axios.request({
        url: '/api/order/listOrderCount',
        params: params,
        method: 'get'
    })
}

export const checkOrder = (data) => {
    return axios.request({
        url: "/api/order/check",
        data: data,
        method: 'patch'
    })
}
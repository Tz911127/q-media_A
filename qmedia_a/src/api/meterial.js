import axios from '@/libs/axios'

export const getMeterialPage = (params) => {
    return axios.request({
        url: '/api/material/page',
        params: params,
        method: "get"
    })
}

export const patchMaterial = (data) => {
    return axios.request({
        url: 'api/material/enable',
        data: data,
        method: 'patch'
    })
}
export const getMaterialDetail = (params) => {
    return axios.request({
        url: "/api/material/" + params.id,
        params: {},
        method: 'get'
    })
}
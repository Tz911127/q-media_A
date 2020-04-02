import axios from '@/libs/axios'
export const getCheckPage = (params) => {
    return axios.request({
        url: '/api/check/page',
        params: params,
        method: 'get'
    })
}

export const getCheckDetail = (params) => {
    return axios.request({
        url: '/api/check/' + params.id,
        params: {},
        method: 'get'
    })
}

export const patchCheck1 = (data) => {
    return axios.request({
        url: '/api/check/process1/',
        data: data,
        method: 'patch'
    })
}
export const patchCheck2 = (data) => {
    return axios.request({
        url: '/api/check/process2/',
        data: data,
        method: 'patch'
    })
}
export const patchCheck3 = (data) => {
    return axios.request({
        url: '/api/check/process3/',
        data: data,
        method: 'patch'
    })
}
export const patchCheck4 = (data) => {
    return axios.request({
        url: '/api/check/process4/',
        data: data,
        method: 'patch'
    })
}
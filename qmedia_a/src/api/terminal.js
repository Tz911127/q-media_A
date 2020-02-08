import axios from '@/libs/axios'
export const getDevicePage = (params) => {
    return axios.request({
        url: '/api/device/page',
        params: params,
        method: 'get'
    })
}
export const enableDevice = (data) => {
    return axios.request({
        url: '/api/device/enable',
        data: data,
        method: 'patch'
    })
}

export const deviceWorkCron = (data) => {
    return axios.request({
        url: '/api/device/' + data.idLists + '/work-cron/' + data.time,
        data: {},
        method: 'patch'
    })
}

export const setVolumes = (data) => {
    return axios.request({
        url: '/api/device/volume',
        data: data,
        method: 'patch'
    })
}
export const getVersionFile = (params) => {
    return axios.request({
        url: '/api/version-file/page',
        params: params,
        method: 'get'
    })
}
export const getDeviceVersion = (data) => {
    return axios.request({
        url: "/api/device/version",
        data: data,
        method: 'post'
    })
}
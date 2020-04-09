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
export const delDeviceFile = (params) => {
    return axios.request({
        url: '/api/device/' + params.id,
        params: {},
        method: 'delete'
    })
}
export const terminalDetail = (params) => {
    return axios.request({
        url: "/api/device/" + params.id,
        params: {},
        method: 'get'
    })
}
export const terminalOrder = (params) => {
    return axios.request({
        url: '/api/device/command/page',
        params: params,
        method: 'get'
    })
}
export const getDeviceProgram = (params) => {
    return axios.request({
        url: '/api/device/program/page',
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
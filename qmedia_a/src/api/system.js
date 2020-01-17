import axios from '@/libs/axios'

export const getSystemConfig = () => {
    return axios.request({
        url: '/api/system-config',
        data: {},
        method: 'get'
    })
}
export const patchSystemConfig = (data) => {
    return axios.request({
        url: '/api/system-config',
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

export const getVersionOss = params => {
    return axios.request({
        url: '/api/version-file/oss-signature',
        params: params,
        method: 'get'
    })
}
export const upload = (opts, data) => {
    let sendable = new FormData();
    for (var k in data) {
        if (data[k] !== '' && data[k] !== undefined) {
            sendable.append(k, data[k]);
        }
    }
    return axios.request({
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        url: opts.url,
        method: 'post',
        data: sendable
    })
}
export const delVersion = params => {
    return axios.request({
        url: "/api/version-file/" + params.id,
        params: {},
        method: 'delete'
    })
}
export const regionPage = params => {
    return axios.request({
        url: '/api/region/page',
        params: params,
        method: 'get'
    })
}
export const sortDevice = data => {
    return axios.request({
        url: '/api/device-download/adapter/sort',
        data: data,
        method: 'patch'
    })
}
export const postDevice = data => {
    return axios.request({
        url: '/api/device-download',
        data: data,
        method: 'post'
    })
}
export const delDevice = params => {
    return axios.request({
        url: '/api/device-download/' + params.id,
        params: {},
        method: 'delete'
    })
}
export const setDeviceSys = data => {
    return axios.request({
        url: '/api/device-download/system-config/main-version',
        data: data,
        method: 'post'
    })
}
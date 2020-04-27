import axios from '@/libs/axios'
export const getNoticePage = (params) => {
    return axios.request({
        url: '/api/urgent-notice/page',
        params: params,
        method: 'get'
    })
}
export const postNotice = (data) => {
    return axios.request({
        url: '/api/urgent-notice',
        data: data,
        method: 'post'
    })
}
export const getNoticeDevice = (params) => {
    return axios.request({
        url: 'api/urgent-notice/device/page',
        params: params,
        method: 'get'
    })
}
export const patchNoticePlay = (data) => {
    return axios.request({
        url: '/api/urgent-notice/play',
        data: data,
        method: 'patch'
    })
}
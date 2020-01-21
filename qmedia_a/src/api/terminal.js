import axios from '@/libs/axios'
export const getDevicePage = (params) => {
    return axios.request({
        url: '/api/device/page',
        params: params,
        method: 'get'
    })
}
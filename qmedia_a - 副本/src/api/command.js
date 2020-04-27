import axios from '@/libs/axios'
export const getCommandPage = (params) => {
    return axios.request({
        url: '/api/device-command/page',
        params: params,
        method: 'get'
    })
}
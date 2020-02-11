import axios from '@/libs/axios'

export const getMeterialPage = (params) => {
    return axios.request({
        url: '/api/material/page',
        params: params,
        method: "get"
    })
}
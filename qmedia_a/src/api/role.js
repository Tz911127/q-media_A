import axios from '@/libs/axios'

export const getRolePage = (params) => {
    return axios.request({
        url: '/api/role/page',
        params: params,
        method: 'get'
    })
}
export const getPermTree = (params) => {
    return axios.request({
        url: "/api/role/" + params + "/perm/tree",
        params: {},
        method: 'get'
    })
}

export const getUserPage = (params) => {
    return axios.request({
        url: '/api/user/page',
        params: params,
        method: 'get'
    })
}
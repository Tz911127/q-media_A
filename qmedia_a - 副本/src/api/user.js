import axios from '@/libs/axios'
export const login = (params) => {
    return axios.request({
        url: '/api/auth/login',
        params: params,
        method: 'post'
    })
}

export const logout = () => {
    return axios.request({
        url: '/api/auth/logout',
        params: {},
        method: 'post'
    })
}

export const updatePwd = (password, newPassword) => {
    return axios.request({
        url: '/api/user/password/' + password + '/' + newPassword,
        params: {},
        method: 'patch'
    })
}

export const getRegionTree = () => {
    return axios.request({
        url: '/api/region/tree',
        data: {},
        method: 'get'
    })
}

export const getUserInfo = () => {
    return axios.request({
        url: '/api/user/src',
        data: {},
        method: 'get'
    })
}
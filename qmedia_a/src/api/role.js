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

export const getRolePerm = (params) => {
    return axios.request({
        url: "/api/role/perm/tree",
        params: params,
        method: 'get'
    })
}
export const postRole = (data) => {
    return axios.request({
        url: '/api/role',
        data: data,
        method: 'post'
    })
}
export const delRole = (params) => {
    return axios.request({
        url: '/api/role/' + params.id,
        params: {},
        method: 'delete'
    })
}
export const getRolePermLeaf = (params) => {
    return axios.request({
        url: '/api/role/' + params.id + '/perm/leaf',
        params: {},
        method: 'get'
    })
}
export const patchRole = (data) => {
    return axios.request({
        url: "/api/role",
        data: data,
        method: 'patch'
    })
}
export const patchEnable = (data) => {
    return axios.request({
        url: '/api/user/' + data.id + '/enable/' + data.enable,
        data: {},
        method: 'patch'
    })
}
export const patchPassWord = (data) => {
    return axios.request({
        url: '/api/user/' + data.id + '/password/' + data.passWord,
        data: {},
        method: 'patch'
    })
}
export const getRoleList = (params) => {
    return axios.request({
        url: '/api/role/list',
        params: params,
        method: 'get'
    })
}
export const postUser = (data) => {
    return axios.request({
        url: "/api/user",
        data: data,
        method: 'post'
    })
}
export const getOrgList = (params) => {
    return axios.request({
        url: "/api/role/list",
        params: params,
        method: 'get'
    })
}
export const getListTree = (params) => {
    return axios.request({
        url: '/api/organization/listTree/' + params.ck,
        params: {},
        method: 'get'
    })
}
export const patchUser = (data) => {
    return axios.request({
        url: '/api/user',
        data: data,
        method: 'patch'
    })
}
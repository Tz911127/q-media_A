import axios from '@/libs/axios'

export const getCompanyPage = (params) => {
    return axios.request({
        url: '/api/company/page',
        params: params,
        method: 'get'
    })
}
export const patchEnable = (params) => {
    return axios.request({
        url: "/api/company/" + params.id + "/enable/" + params.enable,
        params: {},
        method: 'patch'
    })
}
export const getOrgList = (params) => {
    return axios.request({
        url: '/api/organization/listTree/' + params.key,
        params: {},
        method: 'get'
    })
}
export const postOrg = (data) => {
    return axios.request({
        url: "/api/organization",
        data: data,
        method: 'post'
    })
}
export const delOrg = (params) => {
    return axios.request({
        url: "/api/organization/" + params.id,
        params: {},
        method: "delete"
    })
}
export const editOrg = (data) => {
    return axios.request({
        url: "/api/organization",
        data: data,
        method: 'patch'
    })
}
export const sortOrg = (data) => {
    return axios.request({
        url: "/api/organization/" + data.ids + "/sort",
        data: {},
        method: 'patch'
    })
}
export const getCompanyFill = (params) => {
    return axios.request({
        url: "/api/company/" + params.id + "/fill",
        params: {},
        method: 'get'
    })
}
export const delCompanyFill = (params) => {
    return axios.request({
        url: '/api/company/' + params.id + '/fill/' + params.resolutionType,
        params: {},
        method: 'delete'
    })
}
export const getCompanyFillList = (params) => {
    return axios.request({
        url: '/api/company/fill/list',
        params: params,
        method: 'get'
    })
}
export const setCompanyFill = (params) => {
    return axios.request({
        url: '/api/company/' + params.id + '/fill/' + params.type,
        params: {},
        method: 'patch'
    })
}
export const postCompany = (data) => {
    return axios.request({
        url: '/api/company',
        data: data,
        method: 'post'
    })
}
export const patchCompany = (data) => {
    return axios.request({
        url: '/api/company',
        data: data,
        method: 'patch'
    })
}
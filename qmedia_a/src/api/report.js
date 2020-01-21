import axios from '@/libs/axios'

export const getReportJob = (params) => {
    return axios.request({
        url: '/api/report/job-page',
        params: params,
        method: 'get'
    })
}
export const delReportJob = (params) => {
    return axios.request({
        url: '/api/report/job/' + params.id,
        params: {},
        method: 'delete'
    })
}
//新增广告统计
export const getProgramIncrement = (params) => {
    return axios.request({
        url: "/api/program-stat/increment",
        params: params,
        method: 'get'
    })
}
//广告播放时长
export const getProgramDuration = (params) => {
    return axios.request({
        url: "/api/program-stat/play-duration",
        params: params,
        method: "get"
    })
}
//新增广告top10
export const getIncrementTop10 = (params) => {
    return axios.request({
        url: "/api/program-stat/increment-top10",
        params: params,
        method: "get"
    })
}

//终端时长排名
export const getDurationTop10 = (params) => {
    return axios.request({
        url: "/api/program-stat/play-duration-top10",
        params: params,
        method: 'get'
    })
}
//获取广告分页
export const getProgramPage = (params) => {
    return axios.request({
        url: "/api/program-stat/page",
        params: params,
        method: 'get'
    })
}
//详情
export const getProgramDetail = (params) => {
    return axios.request({
        url: '/api/program-stat/detail-page',
        params: params,
        method: 'get'
    })
}

//按月统计新增终端数据
export const getDeviceReport = (params) => {
    return axios.request({
        url: '/api/deviceReport/addDevice',
        params: params,
        method: 'get'
    })
}

//终端时长
export const getDeviceOnline = (params) => {
    return axios.request({
        url: '/api/deviceReport/deviceOnline',
        params: params,
        method: 'get'
    })
}
//终端播放时长
export const getDevicePlay = (params) => {
    return axios.request({
        url: "/api/deviceReport/devicePlayDuration",
        params: params,
        method: 'get'
    })
}
//top
export const getDeviceTop10 = (params) => {
    return axios.request({
        url: "/api/deviceReport/deviceTop10",
        params: params,
        method: 'get'
    })
}
//
export const getDevicePage = (params) => {
    return axios.request({
        url: '/api/deviceReport/deviceStatistic',
        params: params,
        method: 'get'
    })
}

//合同
///api/contractReport/increment
// 获取新增合同图表数据
export const getContractReport = (params) => {
    return axios.request({
        url: "/api/contractReport/increment",
        params: params,
        method: "get"
    })
}

export const getContractTop10 = (params) => {
    return axios.request({
        url: "/api/contractReport/paidMoneyTotalTop10",
        params: params,
        method: 'get'
    })
}
export const getOrderReportPage = (params) => {
    return axios.request({
        url: "/api/contractReport/contractStatisticMonth",
        params: params,
        method: 'get'
    })
}
export const getOrderReportDetail = (params) => {
    return axios.request({
        url: "/api/contractReport/listContractByMonthPage",
        params: params,
        method: 'get'
    })
}

export const postReportJob = (data) => {
    return axios.request({
        url: "/api/report/submit-job",
        data: data,
        method: 'post'
    })
}
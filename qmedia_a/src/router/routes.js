import Vue from 'vue'
import VueRouter from 'vue-router'

import login from '../views/login'
import Main from '@/components/layout'
import homePage from '../views/homePage.vue'
import system from '../views/system.vue'
import report from '../views/report.vue'
import business from '../views/business.vue'
import org from '../views/org.vue'
import terminal from '../views/terminal.vue'
import meterial from '../views/meterial.vue'
import program from '../views/program.vue'
import audit from '../views/audit.vue'
import order from '../views/order.vue'
import command from '../views/command.vue'
import role from '../views/role.vue'
import contract from '../views/contract.vue'
import dataSystem from '../components/sytemManage/dataSystem.vue'
import versionSystem from '../components/sytemManage/versionSystem.vue'
import ararManege from '../components/sytemManage/ararManege.vue'
import terminalUpload from '../components/sytemManage/terminalUpload.vue'
import programPage from '../components/program/programPage'
import notice from '../components/program/notice'
import terminalReport from '../components/report/termialReport.vue'
import adReport from '../components/report/adReport.vue'
import orderReport from '../components/report/orderReport'
import dataReport from '../components/report/dataReport'
import rolePage from '../components/role/role.vue'
import account from '../components/role/account.vue'
import addBusinessForm from '../components/form/addBusinessForm'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        redirect: '/login',
        component: Main,
        children: [{
                path: '/homePage',
                name: 'homePage',
                access: '-1',
                meta: {
                    title: '首页',
                    hideInMenu: false,
                    icon: 'el-icon-s-home',
                },
                component: homePage,
            },
            {
                path: '/system',
                name: 'system',
                access: '1',
                meta: {
                    title: '系统管理',
                    hideInMenu: false,
                    icon: 'el-icon-setting',
                },
                component: system,
                children: [{
                        path: 'dataSystem',
                        name: 'dataSystem',
                        access: '11',
                        meta: {
                            title: '数据配置',
                        },
                        component: dataSystem

                    },
                    {
                        path: 'versionSystem',
                        name: 'versionSystem',
                        access: '12',
                        meta: {
                            title: '版本管理',
                        },
                        component: versionSystem

                    },
                    {
                        path: 'ararManege',
                        name: 'ararManege',
                        access: '13',
                        meta: {
                            title: '地域管理',
                        },
                        component: ararManege

                    },
                    {
                        path: 'terminalUpload',
                        name: 'terminalUpload',
                        access: '14',
                        meta: {
                            title: '终端下载',
                        },
                        component: terminalUpload

                    },
                ]
            },
            {
                path: "/business",
                name: 'business',
                access: '2',
                meta: {
                    title: '企业管理',
                    hideInMenu: false,
                    icon: 'el-icon-office-building'
                },
                component: business
            },
            {
                path: '/terminal',
                name: 'terminal',
                access: '3',
                meta: {
                    title: '终端管理',
                    hideInMenu: false,
                    icon: 'el-icon-s-platform',
                },
                component: terminal,
            },
            {
                path: '/meterial',
                name: 'meterial',
                access: '4',
                meta: {
                    title: '素材管理',
                    hideInMenu: false,
                    icon: 'el-icon-s-management',
                },
                component: meterial,
            },
            {
                path: '/program',
                name: 'program',
                access: '5',
                meta: {
                    title: '广告管理',
                    hideInMenu: false,
                    icon: 'el-icon-s-finance',
                },
                component: program,
                children: [{
                    path: 'programPage',
                    name: 'programPage',
                    access: '51',
                    meta: {
                        title: '广告管理',
                    },
                    component: programPage
                }, {
                    path: 'notice',
                    name: 'notice',
                    access: '52',
                    meta: {
                        title: '紧急通知',
                    },
                    component: notice
                }, ]
            },
            {
                path: '/audit',
                name: 'audit',
                access: '6',
                meta: {
                    title: '审核管理',
                    hideInMenu: false,
                    icon: 'el-icon-film',
                },
                component: audit,
            },
            {
                path: '/contract',
                name: 'contract',
                access: '7',
                meta: {
                    title: '合同管理',
                    hideInMenu: false,
                    icon: 'el-icon-notebook-1',
                },
                component: contract,
            },
            {
                path: '/order',
                name: 'order',
                access: '8',
                meta: {
                    title: '订单管理',
                    hideInMenu: false,
                    icon: 'el-icon-s-operation',
                },
                component: order,
            },
            {
                path: '/report',
                name: 'report',
                access: '-1',
                meta: {
                    title: '数据统计',
                    hideInMenu: false,
                    icon: 'el-icon-s-data',
                },
                component: report,
                children: [{
                        path: 'terminalReport',
                        name: 'terminalReport',
                        access: '-1',
                        meta: {
                            title: '终端统计',
                        },
                        component: terminalReport
                    },
                    {
                        path: 'adReport',
                        name: 'adReport',
                        access: '-1',
                        meta: {
                            title: '广告统计',
                        },
                        component: adReport
                    },
                    {
                        path: 'orderReport',
                        name: 'orderReport',
                        access: '-1',
                        meta: {
                            title: '合同统计',
                        },
                        component: orderReport
                    },

                    {
                        path: 'dataReport',
                        name: 'dataReport',
                        access: '-1',
                        meta: {
                            title: '数据导出',
                        },
                        component: dataReport
                    }
                ]
            },
            {
                path: '/role',
                name: 'role',
                access: '9',
                meta: {
                    title: '账户中心',
                    hideInMenu: false,
                    icon: 'el-icon-user-solid',
                },
                component: role,
                children: [{
                    path: 'rolePage',
                    name: 'rolePage',
                    access: '-1',
                    meta: {
                        title: '角色管理',
                    },
                    component: rolePage
                }, {
                    path: 'account',
                    name: 'account',
                    access: '-1',
                    meta: {
                        title: '账户管理',
                    },
                    component: account
                }]
            },
            {
                path: '/command',
                name: 'command',
                access: 'a',
                meta: {
                    title: '日志记录',
                    hideInMenu: false,
                    icon: 'el-icon-s-order',
                },
                component: command,
            },
            {
                path: '/org',
                name: 'org',
                access: '-1',
                meta: {
                    title: '组织机构',
                    hideInMenu: true,
                },
                component: org,
            },
            {
                path: '/addBusinessForm',
                name: 'addBusinessForm',
                access: '2',
                meta: {
                    title: '企业',
                    hideInMenu: true,
                },
                component: addBusinessForm
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: login
    },
]

export default routes
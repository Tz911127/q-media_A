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
import dataSystem from '../components/sytemManage/dataSystem.vue'
import versionSystem from '../components/sytemManage/versionSystem.vue'
import ararManege from '../components/sytemManage/ararManege.vue'
import terminalUpload from '../components/sytemManage/terminalUpload.vue'
import terminalReport from '../components/report/termialReport.vue'
import adReport from '../components/report/adReport.vue'
import orderReport from '../components/report/orderReport'
import dataReport from '../components/report/dataReport'

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
                access: '-1',
                meta: {
                    title: '系统管理',
                    hideInMenu: false,
                    icon: 'el-icon-setting',
                },
                component: system,
                children: [{
                        path: 'dataSystem',
                        name: 'dataSystem',
                        meta: {
                            title: '数据配置',
                        },
                        component: dataSystem

                    },
                    {
                        path: 'versionSystem',
                        name: 'versionSystem',
                        meta: {
                            title: '版本管理',
                        },
                        component: versionSystem

                    },
                    {
                        path: 'ararManege',
                        name: 'ararManege',
                        meta: {
                            title: '地域管理',
                        },
                        component: ararManege

                    },
                    {
                        path: 'terminalUpload',
                        name: 'terminalUpload',
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
                access: '-1',
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
                access: '-1',
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
                access: '-1',
                meta: {
                    title: '素材管理',
                    hideInMenu: false,
                    icon: 'el-icon-s-management',
                },
                component: meterial,
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
                        meta: {
                            title: '终端统计',
                        },
                        component: terminalReport
                    },
                    {
                        path: 'adReport',
                        name: 'adReport',
                        meta: {
                            title: '广告统计',
                        },
                        component: adReport
                    },
                    {
                        path: 'orderReport',
                        name: 'orderReport',
                        meta: {
                            title: '合同统计',
                        },
                        component: orderReport
                    },
                    {
                        path: 'dataReport',
                        name: 'dataReport',
                        meta: {
                            title: '数据统计',
                        },
                        component: dataReport
                    }
                ]
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
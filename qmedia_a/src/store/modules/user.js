import routes from '@/router/routes'
import {
    setToken,
    sort
} from '@/libs/util'

import {
    login,
    logout,
    updatePwd,
    getRegionTree,
    getUserInfo
} from '@/api/user'
const user = {
    state: {
        logined: false,
        userInfo: {},
        access: [],
        regionTree: [],
        isCollapse: false
    },
    getters: {
        permission_routes: state => {
            let routeList = routes[0].children;
            let permission_routes = [];
            state.access.push("-1")
            for (let i = 0; i < routeList.length; i++) {
                // && state.access.indexOf(routeList[i].access) > -1
                if (!routeList[i].meta.hideInMenu) {
                    permission_routes.push(routeList[i]);
                }
            }
            return permission_routes;
        },
        logined: state => {
            return state.logined
        },
        userInfo: state => {
            return state.userInfo
        },
        regionTree: state => {
            return state.regionTree
        },
        isCollapse: state => {
            return state.isCollapse
        }
    },
    mutations: {
        SET_TOKEN: (state, token) => {
            setToken(token, 7)
        },
        LOGOUT: (state) => {
            state.logined = false;
            state.userInfo = {};
            state.access = [];
        },
        IS_COLLAPSE: (state, data) => {
            state.isCollapse = data;
        },
        SET_REGIONTREE: (state, data) => {
            localStorage.setItem("cities", JSON.stringify(sort(data)));
            localStorage.setItem("treeCities", JSON.stringify((data)));
        },
        SET_USERINFO: (state, data) => {
            state.logined = true;
            state.userInfo = data;
            state.access = data.functionIds;
        },
    },

    actions: {
        handleLogin: (o, loginParams) => {
            return new Promise((resolve, reject) => {
                login(loginParams).then(data => {
                    o.commit('SET_TOKEN', data.Authorization);
                    resolve();
                }).catch(err => {
                    reject(err);
                });
            })

        },
        handleLogout: (o) => {
            return new Promise((resolve, reject) => {
                logout().then(() => {
                    o.commit('LOGOUT');
                    resolve();
                }).catch(err => {
                    reject(err);
                })
            })

        },
        updatePwd: (o, data) => {
            return new Promise((resolve, reject) => {
                updatePwd(data.password, data.newPassword).then(() => {
                    o.commit('LOGOUT');
                    resolve();
                }).catch(err => {
                    reject(err);
                });
            })

        },
        isOpen: (o, data) => {
            return new Promise((resolve) => {
                o.commit('IS_COLLAPSE', data);
                resolve()
            })
        },
        getRegion: (o) => {
            return new Promise((resolve, reject) => {
                getRegionTree().then(data => {
                    o.commit('SET_REGIONTREE', data);
                    resolve();
                }).catch(err => {
                    reject(err);
                })
            })
        },
        getUserInfo: (o) => {
            return new Promise((resolve, reject) => {
                getUserInfo().then(data => {
                    o.commit('SET_USERINFO', data);
                    localStorage.setItem("userInfo", JSON.stringify(data));
                    resolve();
                }).catch(err => {
                    reject(err);
                });
            })
        }
    }
}
export default user;
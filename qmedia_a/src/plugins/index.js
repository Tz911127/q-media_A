import components from '../components/common/'
import * as filters from '@/filters' // global filters
import city from '../libs/city'
import {
    setCookie,
    getCookie,
    formatDuring,
    confirm,
    toast,
    sort
} from '@/libs/util'
import md5 from "js-md5";
import {
    mapGetters
} from "vuex";
export default {
    install(Vue) {
        Object.keys(components).forEach((key) => {
            var name = key.replace(/(\w)/, (v) => v.toUpperCase()) //首字母大写
            Vue.component(`v${name}`, components[key])
        })
        //注册过滤器
        Object.keys(filters).forEach(key => {
            Vue.filter(key, filters[key])
        })
        Vue.prototype.$filters = Vue.options.filters;
        Vue.prototype.city = city
        Vue.mixin({
            computed: {
                ...mapGetters(["userInfo"])
            },
            methods: {
                md5(pass) {
                    let salt = 'dmbd!@#$%^&*';
                    return md5(`${pass}${salt}`);
                },
                setCookie(key, value, cookieExpires) {
                    setCookie(key, value, cookieExpires)
                },
                getCookie(key) {
                    return getCookie(key);
                },
                formatDuring(mss) {
                    return formatDuring(mss)
                },
                toast(msg, type, opts) {
                    toast(msg, type, opts);
                },
                confirm(msg, title, opts) {
                    confirm(msg, title, opts);
                },
                sort(data) {
                    sort(data)
                },
                imgPathFormate(src) {
                    if (src) {
                        return this.userInfo.cdnImgUrl + src
                    }
                },
                getVideoPoster(src) {
                    return this.imgPathFormate(src) + '.jpg'
                },
                videoPathFormate(src) {
                    if (src) {
                        return this.userInfo.cdnVideoUrl + src
                    }
                },
                perms(access) {
                    if (this.$store.state.user.access.indexOf(access.toString()) > -1) {
                        return true;
                    } else {
                        return false;
                    }
                },
            }
        })
    }
}
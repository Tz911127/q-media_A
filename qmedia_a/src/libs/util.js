import Cookies from 'js-cookie'
import {
    Message,
    MessageBox
} from 'element-ui';

export const TOKEN_KEY = 'token'


export const setCookie = (key, value, cookieExpires) => {
    Cookies.set(key, value, {
        expires: cookieExpires || 1
    })

}
export const getCookie = (key) => {
    return Cookies.get(key)
}

export const setToken = (token, cookieExpires) => {
    Cookies.set(TOKEN_KEY, token, {
        expires: cookieExpires || 1
    })
}

export const getToken = () => {
    const token = Cookies.get(TOKEN_KEY)
    if (token) return token
    else return false
}

export const formatDuring = (mss) => {
    var days = parseInt(mss / (1000 * 60 * 60 * 24));
    var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) + 24 * (days)
    return hours
}

export const toast = (msg, type, opts) => {
    let options = {
        message: msg,
        type: type ? type : 'info'
    }
    if (opts) {
        options = Object.assign(options, opts)
    }
    Message(options);
}

export const confirm = (msg, title, opts) => {
    let options = {
        message: msg,
        title: title,
        showCancelButton: true,
        // center: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        confirmButtonClass: 'el-button--success',
        cancelButtonClass: 'btn-custom-cancel el-button--black',
        customClass: 'cctv-confirm',
        beforeClose(action, instance, done) {
            if (action === 'confirm' && opts.request) {
                instance.confirmButtonLoading = true;
                instance.confirmButtonText = '执行中...';
                opts.request().then(res => {
                    instance.confirmButtonText = '确定';
                    instance.confirmButtonLoading = false;
                    done();
                    if (opts.success) {
                        opts.success();
                    }
                }).catch(() => {
                    instance.confirmButtonText = '确定';
                    instance.confirmButtonLoading = false;
                    if (opts.fail) {
                        opts.fail();
                    }
                });

            } else {
                done();
            }
        }
    }
    if (opts) {
        options = Object.assign(options, opts);
    }
    MessageBox(options).catch(() => {});
}
export const sort = (data) => {
    let regionMap = {};
    let stack = [];
    let node;
    stack.unshift({
        id: "0",
        children: data
    });

    while (stack.length > 0) {
        node = stack.shift();
        if (node.children) {
            node.children.forEach(child => {
                stack.unshift(child);
            });
        }
        regionMap[node.id] = node.n;
    }
    delete regionMap["0"];
    return regionMap;
}
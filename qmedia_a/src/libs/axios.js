import HttpRequest from '@/libs/http.js'
import router from '@/router'
import {
    Message
} from 'element-ui'
class httpRequest {
    constructor() {
        this.axios = new HttpRequest();
    }
    request(options) {
        return new Promise((resolve, reject) => {
            this.axios.request(options).then(res => {
                switch (res.code) {
                    case 0:
                        Message({
                            type: 'error',
                            message: res.msg
                        })
                        reject(res.msg);
                        break;
                    case 1:
                        resolve(res.data);
                        break;
                    case 2:
                        if (document.getElementsByClassName('el-toast').length == 0) {
                            Message({
                                type: 'error',
                                message: res.msg,
                                customClass: 'el-toast'
                            })
                        }
                        router.push({
                            name: 'login'
                        });
                        reject()
                        break;
                }
            }).catch(err => {
                reject(err);
            })
        })
    }
}

const axios = new httpRequest();

export default axios
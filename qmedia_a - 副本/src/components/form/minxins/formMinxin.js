export default {
    data() {
        let validatorAccount = (rule, value, callback) => {
            let rex = this.regAccount.common;
            if (value == "") {
                callback(new Error("请输入登录账户"));
            } else if (!rex.test(value)) {
                callback(new Error("请输入3-16位数字、字母、汉字"));
            } else {
                callback();
            }
        };
        let validatorName = (rule, value, callback) => {
            let rex = this.regAccount.common;
            if (value == "") {
                callback(new Error("请输入登录账户"));
            } else if (!rex.test(value)) {
                callback(new Error("请输入2-10位数字、字母、汉字"));
            } else {
                callback();
            }
        };
        let validatorTit = (rule, value, callback) => {
            let rex = this.regNotice.regNick;
            if (value == "") {
                callback(new Error("请输入标题"));
            } else if (!rex.test(value)) {
                callback(new Error("请输入2-20位数字、字母、汉字"));
            } else {
                callback();
            }
        };
        let validatorNav = (rule, value, callback) => {
            let rex = this.regNotice.regText;
            if (value == "") {
                callback(new Error("请输入标题"));
            } else if (!rex.test(value)) {
                callback(new Error("请输入2-100位数字、字母、汉字"));
            } else {
                callback();
            }
        };
        let validatorPass = (rule, value, callback) => {
            let rex = this.regAccount.pwdWord;
            if (value == "") {
                callback(new Error("请输入登录密码"));
            } else if (!rexPwd.test(value)) {
                callback(new Error("请输入6-20位数字、字母组合"));
            } else {
                callback();
            }
        };
        let validatorPhone = (rule, value, callback) => {
            let rex = this.regAccount.phone;
            if (value == "") {
                callback(new Error("请输入联系人手机号"));
            } else if (!rex.test(value)) {
                callback(new Error("请输入正确手机号"));
            } else {
                callback();
            }
        };
        let validatorEmail = (rule, value, callback) => {
            let rex = this.regAccount.rexEmail;
            if (value == "") {
                callback(new Error("请输入联系人邮箱"));
            } else if (!rex.test(value)) {
                callback(new Error("请输入正确格式邮箱"));
            } else {
                callback();
            }
        };
        let validatorCode = (rule, value, callback) => {
            var rex = this.regForm.key;
            if (value == "") {
                callback(new Error("请输入企业代码"));
            } else if (!rex.test(value)) {
                callback(new Error("请输入3-16位小写字母"));
            } else {
                callback();
            }

        };

        return {
            regexSets: {
                passReg: /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{6,16}$/
            },
            regRole: {
                roleReg: /^[0-9a-zA-Z\u4e00-\u9fa5]{2,20}$/
            },
            regNotice: {
                regText: /^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[a-zA-Z0-9_-]|["',，.。/、\]\[【】\\n\s！!?？——_<>%;‘’；)^$￥……《（）》(&+=`“”·*#@@]){0,}$/,
                regNick: /^[0-9a-zA-Z\u4e00-\u9fa5]{2,20}$/
            },
            regAccount: {
                common: /^[0-9a-zA-Z\u4e00-\u9fa5]+$/,
                pwdWord: /^(?!([a-zA-Z]+|\d+)$)[a-zA-Z\d]{6,20}$/,
                phone: /^1[345789]\d{9}$/,
                rexEmail: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

            },
            regForm: {
                key: /^[a-z]{3,16}]?$/,

            }
        }

    },
    methods: {
        keyUpSubmit() {
            this.$emit('keyUpSubmit');
        },
        validate(cb) {
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    cb(this.$refs.ruleForm.model);
                } else {
                    return false;
                }
            });
        }
    }
}
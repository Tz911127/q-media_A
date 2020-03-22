export default {
    data() {
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
                pwdWord: /^(?!([a-zA-Z]+|\d+)$)[a-zA-Z\d]{6,20}$/
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
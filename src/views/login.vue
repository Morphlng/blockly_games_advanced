<template>
    <div class="login">
        <div class="logo">
            <img src="../common/img/d-login.png" alt="">
            <span>Blockly-Advanced</span>
        </div>
        <p>"block" toward future programmer</p>
        <div class="login-input">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm">
                <el-form-item label="" prop="email">
                    <el-input v-model="ruleForm.email" clearable placeholder="邮箱"></el-input>
                </el-form-item>
                <el-form-item label="" prop="pass">
                    <el-input type="password" v-model="ruleForm.pass" autocomplete="off" placeholder="密码" clearable>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">
                        <loading v-if="load"></loading>
                        <span v-else>登录</span>
                    </el-button>
                </el-form-item>
            </el-form>
            <p class='register'>
                <router-link to='/register'>还没有账号？注册</router-link>
            </p>
            <p class='register' @click="login()">
                <router-link to='/'>游客登陆</router-link>
            </p>
        </div>
    </div>
</template>

<script>
import loading from '@/components/loading'
export default {
    components: { loading },
    data() {
        var checkEmail = (rule, value, callback) => {
            var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
            if (!value) {
                return callback(new Error('邮箱不能为空'));
            }
            setTimeout(() => {
                if (!reg.test(value)) {
                    callback(new Error('请输入正确的邮箱'));
                } else {
                    callback();
                }
            }, 1000);
        };
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (this.ruleForm.checkPass !== '') {
                    this.$refs.ruleForm.validateField('checkPass');
                }
                callback();
            }
        };
        return {
            load: false,
            ruleForm: {
                pass: '',
                email: ''
            },
            rules: {
                pass: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                email: [
                    { validator: checkEmail, trigger: 'blur' }
                ]
            }
        }
    },
    mounted() {
        // 如果用户已经登陆，则跳转至主页
        let log_email = localStorage.getItem('username');
        if (log_email && log_email !== "anonymous@anonymous.com") {
            this.sync_progress({
                email: log_email
            }, () => {
                this.$router.push('/');
            });
        }
    },
    methods: {
        submitForm(formName) {
            this.load = true
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.login({
                        email: this.ruleForm.email,
                        password: this.ruleForm.pass
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        login(userinfo) {
            // 游客登陆
            if (userinfo == null) {
                userinfo = {
                    email: 'anonymous@anonymous.com'
                };
            }

            this.$api.user.login(userinfo).then(({ data }) => {
                this.load = false
                if (data.status == '0') {
                    this.$store.dispatch('UserLogin', data.result.token)
                    this.$store.dispatch('UserName', data.result.email)

                    // sync progress of games
                    this.sync_progress(userinfo);

                    let redirect = decodeURIComponent(this.$route.query.redirect || '/');
                    this.$router.push({
                        path: redirect
                    })
                } else {
                    this.$message.error(data.msg);
                }
            });
        },
        sync_progress(userinfo, callback_on_success) {
            this.$api.record.load(userinfo).then((res) => {
                if (res.data.status == '0') {
                    let records = res.data.result;
                    for (let i in records) {
                        let record = records[i];
                        localStorage.setItem(record.level, record.progress);
                    }

                    if (callback_on_success)
                        callback_on_success(res);
                }
            })
        }
    }
}
</script>

<style lang='scss'>
.login {
    width: 100%;
    height: 100%;
    background: rgb(48, 49, 62);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #fff;

    .logo {
        color: rgb(3, 174, 189);
        font-size: 30px;
        // font-style: italic;
        font-weight: bold;
        margin-bottom: 20px;

        img {
            width: 74px;
            vertical-align: middle;
            margin-right: 10px;
        }
    }

    .login-input {
        width: 290px;
        padding: 10px;
        margin-top: 10px;

        .el-input {

            // margin-bottom: 20px;
            .el-input__inner {
                border-radius: 30px !important;
                text-align: center;
            }
        }

        .el-button {
            border-radius: 30px !important;
            width: 270px;
            background: rgb(3, 174, 189);
            color: #fff;
            border: 0;
        }

        .register {
            text-align: right;
            margin: 10px;

            a {
                color: #fff
            }
        }

    }
}
</style>
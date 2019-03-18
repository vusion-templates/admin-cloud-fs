<template>
<div :class="$style.root">
    <u-header></u-header>
    <div :class="$style.gbody">
        <div :class="$style.form_body">
            <div :class="$style.cont_body">
                <div :class="$style.container">
                    <div :class="$style.container_form">
                        <div :class="$style.login_form">
                            <div :class="$style.form">
                                <u-linear-layout direction="vertical" gap="large">
                                    <u-linear-layout type="flex" justify="center">
                                        <u-input size="huge" :class="$style.input" name="account" v-model="account.AccountId" placeholder="请输入账号" maxlength="128" maxlength-message="账号最多输入128个字符">
                                            <i :class="$style.user_icon"></i>
                                            <i v-if="account.AccountId" @click="account.AccountId = ''" :class="$style.close"></i>
                                        </u-input>
                                    </u-linear-layout>
                                    <u-linear-layout type="flex" justify="center">
                                        <u-input size="huge" :class="$style.input" name="password" :type="pwdFlag ? 'password' : 'text'" v-model="account.AccountPassword" @keyup.enter="login" placeholder="请输入密码" maxlength="128" maxlength-message="密码最多输入128个字符">
                                            <i :class="$style.pwd_icon"></i>
                                            <i v-if="account.AccountPassword" @click="account.AccountPassword = ''" :class="[$style.close, $style.pwd_close]"></i>
                                            <i :class="pwdFlag ? $style.eye : $style.eyeclose" @click="pwdFlag = !pwdFlag"></i>
                                        </u-input>
                                    </u-linear-layout>
                                    <u-linear-layout type="flex" style="position: relative;">
                                        <div v-show="errFlag" :class="$style.error"><i :class="[$style.close, $style.err_close]"></i><span>{{ errMsg }}</span></div>
                                    </u-linear-layout>
                                    <u-linear-layout type="flex" justify="center">
                                        <u-button color="primary" size="large" :class="$style.btn" @click="login">登录</u-button>
                                    </u-linear-layout>
                                </u-linear-layout>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <u-footer></u-footer>
</div>
</template>

<script>
import { mapComponents } from 'vusion-utils';
import Header from '@/components/common/u-header.vue';
import Footer from '@/components/common/u-footer.vue';
export default {
    name: 'u-global-layout',
    components: mapComponents([Header, Footer]),
    data() {
        return {
            account: {
                LoginType: 'normal',
                AccountId: '',
                AccountPassword: '',
            },
            errFlag: false,
            errMsg: '',
            beforeUrl: '',
            beforePath: '',
            pwdFlag: true,
            ldapFlag: false,
            openIdFlag: false,
            resetVisible: false,
            accountId: '',
            // redirectQuery: this.parseRedirectQuery(redirectUrl),
            indexDomain: '',
            step: 0,
            updatePwd: {
                AccountId: '',
                OriginPassword: '',
                NewPassword: '',
            },
            confirmPwd: '',
            canClick: false,
            canSubmit: false,
            oldPwdFlag: false,
            newPwdFlag: false,
            confPwdFlag: false,
            pwdErrFlag: false,
            errMessage: '',
        };
    },
};
</script>

<style module>
.root {
    position: relative;
    box-sizing: border-box;
    padding-bottom: 133px;
    height: 100vh;
    background: url(@/assets/bg.jpg) no-repeat;
    background-size: cover;
}
.gbody {
    min-width: 1200px;
    max-width: 1920px;
    margin: 0 auto;
}
.form {
    width: 325px;
    margin: 0 auto;
    padding: 0;
    line-height: 1;
}
.error {
    padding-left: 20px;
    position: relative;
    max-width: 300px;
    color: #ff5c57;
}
.form_body {
   background: none;
   margin: 0;
   padding: 0;
   padding-top: 150px;
}
.cont_body {
    max-width: 1180px;
    margin:0 auto;
    padding: 0;
}
.container {
    display: table;
    background: transparent;
    width: 1160px;
    min-height: 600px;
    margin: 0 auto;
    padding-top: 26px;
}
.login_form {
    float: none;
    width: 410px;
    height: 380px;
    margin: auto;
    padding-top: 60px;
    box-sizing: border-box;
    background: #fff;
    transition: box-shadow 0.2s;
    box-shadow: 0 0 10px 0 rgba(80,90,109,0.16);
}
.container_form {
    zoom: 1;
    width: 915px;
    margin: 0 auto;
}
.input[class] {
    width: 350px !important;
    padding: 0 30px !important;
}
input:focus {
    border-color: #4486e9;
    box-shadow: 0 0 2px #4486e9;
}
.err_icon[class]:before {
    font-size: 12px !important;
    vertical-align: -1px !important;
    font-weight: bold;
}
.user_icon:after {
    position: absolute;
    left: 5px;
    color: #ccc;
    font-size: 16px;
    icon-font: url(@/assets/user.svg);
}
.pwd_icon:after {
    position: absolute;
    left: 8px;
    color: #ccc;
    font-size: 16px;
    icon-font: url(@/assets/permission.svg);
}
.center {
    text-align: center;
}
.head > span > i {
    margin-left: 50px;
}
.close:after {
    position: absolute;
    right: 5px;
    icon-font: url(@/assets/delete.svg);
    color: #ccc;
    font-size: 16px;
}
.icons {
    position: absolute;
    right: 5px;
    display: inline-block;
    width: 45px;
}
.pwd_close:after {
    right: 25px;
}
.eyeclose:after {
    position: absolute;
    font-size: 18px;
    icon-font: url(@/assets/eyeclose.svg);
    right: 5px;
    color: #ccc;
}
.eye:after {
    position: absolute;
    font-size: 18px;
    icon-font: url(@/assets/eye.svg);
    right: 5px;
    color: #ccc;
}
.close:hover, .eye:hover, .eyeclose:hover {
    cursor: pointer;
}
.btn[class] {
    width: 350px;
}
.err_close:after {
    position: absolute;
    left: 0;
    color: #ff5c57;
}
.link {
    padding-left: 5px;
}
</style>

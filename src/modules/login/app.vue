<template>
    <section>
        <input type="text" v-model="account">
        <input type="password" v-model="password">
        <button @click="login">登录</button>
    </section>
</template>
<script>
import comm from "~utils/comm.js";
import login from '~utils/login.js';
import axios from 'axios';
import api from '~api'
export default {
    name: 'index-app',
    data() {
        return {
            account:'',
            password:''
        }
    },
    methods:{
        login(){
            let param = {};
            let account=this.account;
            let password=this.password;
            param.j_username = "website;" + account + ";" + password + ";email";
            param.j_password = password;
            param.rememberMe = true;
            comm.ajax2({
                url:"/call/passport/securitycheck",
                type: "POST",
                data: param,
                dataType: "json",
                success: function (data) {

                }
            })
        }
    },
    async mounted() {

    },
    metaInfo: {
        title: '首页'
    }
}
</script>
<style lang="scss">

</style>

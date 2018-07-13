import comm from "./comm.js";
let login={
    init(){
        let t=this;
        let param = {};
        let account="lch@shouhu.com";
        let password="123456";
        param.j_username = "website;" + account + ";" + password + ";email";
        param.j_password = password;
        param.rememberMe = true;
        comm.ajax2({
            url:"/call/passport/securitycheck",
            type: "POST",
            data: param,
            dataType: "json",
            success: function (data) {
                t.checkSession();
            }
        })
    },
    checkSession(){
        comm.ajax2({
            url:"/call/customer/unite/checkSession/",
            type: "POST",
            dataType: "json",
            success: function (data) {

            }
        })
    }
}

login.checkSession();

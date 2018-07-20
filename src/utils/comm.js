/**
 * Created by lichunhui on 2018/7/9.
 * comm 公共方法
 */
import axios from 'axios';
const comm={
    //axios VUE ajax 请求
    ajax(obj) {
        axios({
            url: obj.url,
            method: obj.method || 'get',
            data: obj.data,
            transformRequest: [
                function (data) {
                    if (obj.paramJson) {
                        return 'paramJson=' + JSON.stringify(obj.data)
                    } else {
                        return obj.data
                    }
                }
            ],
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
            .then(function (res) {
                obj.success && obj.success(res)
            }).catch(function (err) {
            obj.fail && obj.fail(err)
        })
    },
    //原生ajax请求
    ajax2(options) {
        options = options || {}
        options.type = (options.type || 'GET').toUpperCase()
        options.dataType = options.dataType || 'json'
        let params = formatParams(options.data)
        let xhr = new XMLHttpRequest()
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                let status = xhr.status
                if (status >= 200 && status < 300) {
                    options.success && options.success(JSON.parse(xhr.responseText), xhr.responseXML)
                } else {
                    options.fail && options.fail(status)
                }
            }
        }
        //连接 和 发送 - 第二步
        if (options.type == 'GET') {
            xhr.open('GET', options.url + '?' + params, true)
            xhr.send(null)
        } else if (options.type == 'POST') {
            xhr.open('POST', options.url, true)
            //设置表单提交时的内容类型
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
            xhr.send(params)
        }

        //格式化参数
        function formatParams (data) {
            let arr = []
            for (let name in data) {
                arr.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]))
            }
            arr.push(('v=' + Math.random()).replace('.', ''))
            return arr.join('&')
        }

    },
    /*
    * 截取字符长度
    * 调用方法 getStrByteLen(字符串,截取长度) //长度需要转换成字节即一个汉字两个字节
    * */
    getStrLen(str,len) {
        let newStr='',newLength=0;
        if(!str){//如果不存在
            return '';
        }
        for(let i=0;i<str.length;i++){
            if(str.charCodeAt(i)>128){
                newLength+=2;
            }else{
                newLength++;
            }
            if(newLength<=len){
                newStr=newStr.concat(str[i]);
            }else{
                break;
            }
        }
        if(newLength>len){
            newStr = newStr+"..."
        }
        return newStr;
    },
    getParamFromUrl(url, name){
        const str = url.split('?');
        const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        const r = str[1].match(reg);
        if (r != null) {
            return unescape(r[2]);
        }
        return null;
    },
    //截取链接参数的函数
    getpara(symbol){
        let t = this;
        let url=document.URL;
        let param={};
        let str,item;
        if(url.lastIndexOf(symbol?symbol:"?")>0) {
            str=url.substring(url.lastIndexOf(symbol?symbol:"?")+1,url.length);
            let arr=str.split("&");
            for(let i=0;i<arr.length;i++) {
                item =  arr[i].split("=");
                param[item[0]] = t.htmlToString(decodeURIComponent(item[1]));
            }
        }
        return param;
    },
    //空对象判断方法
    isEmptyObject(obj){
        for(let n in obj){return false}
        return true;
    },
    //判断返回对象responseData
    hasResponseData(r) {
        if (r && r.responseObject && r.responseObject.responseData && !this.isEmptyObject(r.responseObject.responseData)) {
            return true
        }
        return false
    },
    //判断返回对象responseData
    hasResponseData2(r) {
        if (r  && r.responseData && !this.isEmptyObject(r.responseData)) {
            return true
        }
        return false
    },
    //判断返回信息responseMessage
    hasResponseMessage(r) {
        if (r && r.responseObject && r.responseObject.responseMessage && !this.isEmptyObject(r.responseObject.responseMessage)) {
            return true
        }
        return false
    },
    //展示时把html标签转换成字符串显示
    htmlToString(str){
        let rstStr = (str+ '').replace(/[<>&]/g,function(c){return {'<':'&lt;','>':'&gt;','&':'&amp;'}[c];});
        let tempArr = rstStr.split("\&lt\;\/a\&gt\;&lt\;a");
        if(tempArr.length>=2){
            rstStr = tempArr.map(function(d,index) {
                let s =  d.replace(/\&lt\;a[\s]*href\=\"?(\S*)\"?\&gt\;([\S\s]*)/gi,"<a href=\"$1\">$2");
                s =  s.replace(/[\s]*href\=\"?(\S*)\"?\&gt\;([\S\s]*)&lt\;\/a\&gt\;/gi,"<a href=\"$1\">$2</a>");
                s =  s.replace(/[\s]*href\=\"?(\S*)\"?\&gt\;([\S\s]*)/gi,"<a href=\"$1\">$2</a>");
                return s;
            }).join();
        }else{
            rstStr = (rstStr+'').replace(/\&lt\;a[\s]*href\=\"?(\S*)\"?\&gt\;([\S\s]*)\&lt\;\/a\&gt\;/gi,"<a href=\"$1\">$2</a>"); /* 恢复文本中的提醒谁看的A链接*/
        }
        rstStr = rstStr.replace(/@@/g,"@");
        return rstStr;
    },
    //防止xss攻击进行标签转换字符串显示
    symbolToString(str){
        let rstStr = str.replace(/[<>]/g,function(c){return {'<':'&lt;','>':'&gt;'}[c];});
        let tempArr = rstStr.split("\&lt\;\/a\&gt\;&lt\;a");
        if(tempArr.length>=2){
            rstStr = tempArr.map(function(d,index) {
                let s =  d.replace(/\&lt\;a[\s]*href\=\"?(\S*)\"?\&gt\;([\S\s]*)/gi,"<a href=\"$1\">$2");
                s =  s.replace(/[\s]*href\=\"?(\S*)\"?\&gt\;([\S\s]*)&lt\;\/a\&gt\;/gi,"<a href=\"$1\">$2</a>");
                s =  s.replace(/[\s]*href\=\"?(\S*)\"?\&gt\;([\S\s]*)/gi,"<a href=\"$1\">$2</a>");
                return s;
            }).join();
        }else{
            rstStr = (rstStr+'').replace(/\&lt\;a[\s]*href\=\"?(\S*)\"?\&gt\;([\S\s]*)\&lt\;\/a\&gt\;/gi,"<a href=\"$1\">$2</a>"); //恢复文本中的提醒谁看的A链接
        }
        rstStr = rstStr.replace(/@@/g,"@");
        return rstStr;
    },
    //特殊字符转义
    escapeReplace(str){
        return str.replace(/[+/?#&=!%]/g,function(c){return {'+':'%2B','/':'%2F','?':'%3F','#':'%23','&':'%26','=':'%3D','!':'%21','%':'%25'}[c];});
    },
    //获取浏览器信息
    browser :{
        mozilla : /firefox/.test(navigator.userAgent.toLowerCase()),
        webkit : /webkit/.test(navigator.userAgent.toLowerCase()),
        opera : /opera/.test(navigator.userAgent.toLowerCase()),
        msie : /msie/.test(navigator.userAgent.toLowerCase()),
        versions: function () {
            let u = navigator.userAgent, app = navigator.appVersion;
            return {//移动终端浏览器版本信息
                trident: u.indexOf('Trident') > -1, //IE内核
                presto: u.indexOf('Presto') > -1, //opera内核
                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
                iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
                iPad: u.indexOf('iPad') > -1, //是否iPad
                webApp: u.indexOf('Safari') === -1 //是否web应该程序，没有头部与底部
            };
        }(),
        language: (navigator.browserLanguage || navigator.language).toLowerCase(),
        isIe8:function(){
            let browser = navigator.appName;
            let b_version = navigator.appVersion;
            let version = b_version.split(";");
            let trim_Version = (version[1]!=undefined&&version[1]!="")?version[1].replace(/[ ]/g, ""):"";
            if (browser === "Microsoft Internet Explorer" && trim_Version=="MSIE8.0") {
                return true;
            } else {
                return false;
            }
        },
        isIe9:function(){
            let browser = navigator.appName;
            let b_version = navigator.appVersion;
            let version = b_version.split(";");
            let trim_Version = (version[1]!=undefined&&version[1]!="")?version[1].replace(/[ ]/g, ""):"";
            if (browser === "Microsoft Internet Explorer" && trim_Version=="MSIE9.0") {
                return true;
            } else {
                return false;
            }
        },
        isIeOrEdge:function() {
            let userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
            let isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
            let isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器
            let isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
            if(isIE) {
                let reIE = new RegExp("MSIE (\\d+\\.\\d+);");
                reIE.test(userAgent);
                let fIEVersion = parseFloat(RegExp["$1"]);
                if(fIEVersion == 7) {
                    return true;
                } else if(fIEVersion == 8) {
                    return true;
                } else if(fIEVersion == 9) {
                    return true;
                } else if(fIEVersion == 10) {
                    return true;
                } else {
                    return true;//IE版本<=7
                }
            } else if(isEdge) {
                return true;//edge
            } else if(isIE11) {
                return true; //IE11
            }else{
                return false;//不是ie浏览器
            }
        },
        isLessIe10:function() {
            let userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
            let isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
            let isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器
            let isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
            if(isIE) {
                let reIE = new RegExp("MSIE (\\d+\\.\\d+);");
                reIE.test(userAgent);
                let fIEVersion = parseFloat(RegExp["$1"]);
                if(fIEVersion == 7) {
                    return true;
                } else if(fIEVersion == 8) {
                    return true;
                } else if(fIEVersion == 9) {
                    return true;
                } else if(fIEVersion == 10) {
                    return true;
                } else {
                    return false;//IE版本<=7
                }
            } else if(isEdge) {
                return false;//edge
            } else if(isIE11) {
                return false; //IE11
            }else{
                return false;//不是ie浏览器
            }
        }
    }
};

export default comm;

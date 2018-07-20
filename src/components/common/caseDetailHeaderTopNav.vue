<template>
    <div>
        <section class="headerTopNav">
            <logo></logo>
            <aside class="crumbs">新建病历<i></i><span class="detailTxt">病历详情</span><span>张国强</span><span>4岁2月26天</span><span>男</span></aside>
            <aside class="saveBtn editBtn" @click.stop="editBtnCli()">
                <span>编辑</span>
            </aside>
            <aside class="operationLog">
                <span @click.stop="operationLog()">操作日志</span>
            </aside>
            <aside class="logDetail" v-show="opeLogCli">
                <aside class="logTitle">
                    <p>操作日志</p>
                    <i @click.stop="operationLog()"></i>
                </aside>
                <aside class="logDesc">
                    <!--操作日志-->
                    <ul v-show="haveOpeLog">
                        <li v-for="(item,inex) in listItem">
                            <div class="logLeft">
                                <img :src="item.adAttUrl" />
                            </div>
                            <div class="logRight">
                                <p class="logRigTop">
                                    <span>{{item.name|nameSub}}</span>
                                    <span>{{item.title}}</span>
                                    <span>{{item.time}}</span>
                                </p>
                                <p class="logRigBot">{{item.content}}</p>
                            </div>
                        </li>
                    </ul>
                    <!--无操作日志-->
                    <div class="noneLogImg" v-show="noneOpeLog">
                        <img src="/static/images/pages/caseDetail/logNone.png" alt="">
                    </div>
                    <div class="noneLogTxt" v-show="noneOpeLog">
                        暂无操作日志
                    </div>
                </aside>
            </aside>
            <aside class="editCont" v-show="editCont">
                <div class="editDesc" v-show="editing">
                    当前病历正在被其他团队成员编辑中
                    请稍后再试
                </div>
                <div class="editDesc" v-show="editQuit">
                    检测到异常退出，当前病历正在保护期
                    请稍后再试
                </div>
                <button @click.stop="editBtnCli()">
                    知道了
                </button>
            </aside>
        </section>
        <loading v-show="showLoading"></loading>
    </div>
</template>
<script>
    import Logo from './Logo.vue';
    import comm from "~utils/comm.js";
    import loading from '~components/loading/loading.vue';
    export default {
        // props:['navName'],
        data(){
            return {
                opeLogCli:false,//表示点击操作日志
                haveOpeLog:false,//表示有操作日志
                noneOpeLog:false,//没有操作日志
                editCont:false,//点击编辑
                editing:false,//正在编辑
                editQuit:false,//异常退出
                caseId:123,
                listItem:[],
                showLoading:false
            };
        },
        components:{
            Logo,
            loading
        },
        watch:{

        },
        methods:{
            //操作日志点击
            operationLog(){
                let t=this;
                t.showLoading = true;
                if(t.opeLogCli){
                    t.opeLogCli=false;//表示点击操作日志
                }else{
                    t.opeLogCli=true;//表示点击操作日志
                }
                comm.ajax2({
                    url: '/emrpc/actionLog/',
                    type: "get",
                    data: {
                        id:1
                    },
                    timeout: 30000,
                    success:function(res){
                        t.showLoading = false;
                        if(res.responseStatus){//有操作日志
                            t.haveOpeLog=true;
                            t.noneOpeLog = false;
                            t.listItem = res.responseData.data_list;
                        }else{
                            t.haveOpeLog=false;//有操作日志
                            t.noneOpeLog=true;//没有操作日志
                        }
                    }
                });
            },
            //点击编辑
            editBtnCli(caseId){
                let t = this;
            //    调用接口看看是否可以进行编辑页面
                if(true){//跳转到病例编辑页面
                    window.location.href = '/newCases?caseId='+caseId;
                }else{
                    if(t.editCont){
                        t.editCont=false;//点击编辑
                        t.editing=false;//正在编辑
                        t.editQuit=false//异常退出
                    }else{
                        t.editCont=true;//点击编辑
                        t.editing=true;//正在编辑
                        // t.editQuit=true//异常退出
                    }
                }

            }
        },
        filters:{
            nameSub(txt){
                if(txt.length>6){
                    return txt.substring(0,5)+'...';
                }else{
                    return txt;
                }
            }
        },
        mounted(){
            let t = this;
            // $('body').off('click').on('click',function () {
            //     t.opeLogCli=false;//表示点击操作日志
            //     t.haveOpeLog=false
            // })
        }
    }
</script>
<style lang="scss">
@import "../../assets/scss/components/headerTopNav.scss";
</style>

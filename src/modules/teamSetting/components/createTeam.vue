<template>

    <section class="alEmr-mainIndex">
        <loading v-show="showLoading"></loading>
        <aside class="teamSetting width450">
            <div class="title">
                <p>1.创建团队</p>
                <p :class="{notActive:titleOnOFF}">2.邀请成员</p>
            </div>
            <!--跳过-->
            <div class="skipBtn" v-show="!titleOnOFF" @click="skipBtn">跳过</div>
            <!--创建-->
            <div class="teamSetInput" :class="{'error':checkOnOff,'focus':patientNameFocus}" v-show="titleOnOFF">
                <input type="text" placeholder="请为团队起一个名字" v-model="establishText" @focus.stop="patientNameFocus=true" @blur.stop="patientNameFocus=false"/>
                <div class="formError" v-show="checkOnOff">{{errorText}}</div>
            </div>

            <!--邀请成员-->
            <div class="teamSetInput teamNameInput" :class="{'error':checkOnOff,'focus':patientNameFocus}" v-show="!titleOnOFF" ref="elememt">
                <span v-for="(val,i) in memberList" class="searchListLi"><b>{{val.name}}</b><i @click="findMemberCloseCli({index:i,cid:val.cid})"></i></span>
                <input type="text" placeholder="请添加团队成员" v-model="addMember" @focus.stop="patientNameFocus=true" @blur.stop="patientNameFocus=false"/>
                <div class="formError" v-show="checkOnOff">{{errorText}}</div>
                <div class="notFound" v-show="checkNoneOnOff" ref="associationNone"><p>没有找到“<i>{{searchNoData}}</i>”</p></div>
                <ul class="searchUserList" v-show="checkOnOff" ref="association">
                    <li v-for="(user,i) in searchUserList" @click="findMemberCli({name:user.customer_auth.fullName,cid:user.customer_auth.customerId})">
                        <div class="">
                            <p class="userImg"><img :src="user.customer_att.logoUrl"/> </p>
                            <p class="userName">{{user.customer_baseinfo.nickname,5|dateNameChange}}</p>
                            <p class="userTitle">{{user.customer_auth.medicalTitleShow,4|dateNameChange}}</p>
                            <p class="userHospital">{{user.customer_auth.company,7|dateNameChange}}</p>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="establishBtn" @click="establishBtn">{{btnText}}</div>
            <teamDescription v-show="titleOnOFF"></teamDescription>
            <recommend v-show="!titleOnOFF" @PeopleList="PeopleList"  :nameDel="nameDelItem"></recommend>
        </aside>



    </section>

</template>
<script>
    const $ = require('jquery');
    import comm from '../../../utils/comm.js';
    import recommend from './recommend.vue';
    import teamDescription from './teamDescription.vue';
    import loading from "~components/loading/loading.vue";
export default {
    name: 'index-app',
    props:[''],
    data() {
        return {
            establishText:'',//创建团队名称默认值
            errorText:'',//报错的文案
            addMember:'',//邀请成员默认值
            btnText:'创建',//按钮默认值
            checkOnOff:false,
            checkNoneOnOff:false,//联想无数据开关
            titleOnOFF:true,//判断显示第几部，默认为第一步
            patientNameError:false,//报错框
            patientNameFocus:false,//获取焦点
            memberList:[],//
            peopleList:[],
            IdList:[],
            searchUserList:[],
            borderHeight:'74',
            showLoading:false,
            responsePk:'',
            customerIdAry:[],//cid数组
            nameDelItem:'',
            searchNoData:'',//联想无数据
            timer:''
        }
    },
    components: {
/*        NavSideBar,
        TopHeader,*/
        recommend,
        teamDescription,
        loading
    },
    computed:{
        onOff(){
            return (this.establishText.length===0&&this.checkOnOff)
        }
    },
    watch:{
        patientNameFocus(){
        },
        establishText(newVal,oldVal){
            this.checkOnOff=false;
            if(this.establishText.length>20){
                this.checkOnOff=true;
                this.establishText=this.establishText.substr(0,20);
            }
        },
        addMember(){
            // clearTimeout(timer);
            let t=this;
            $(t.$refs.association).scrollTop(0);
            if(t.addMember==''){
                t.checkNoneOnOff = false;
                t.checkOnOff=false;
                t.showLoading=false;
            }else {
                this.showLoading=true;
                clearTimeout(this.timer);
                this.timer = setTimeout(function () {
                    if(t.addMember.length>0){
                        comm.ajax2({
                            url: '/call/customer/unite/json_list/',
                            type: "post",
                            data: {
                                paramJson:JSON.stringify({"useFlag":3,"searchParam":t.addMember,"isCUnite":0,"isCStatistics":0,"isCFPeople":0,"pageIndex":1,"pageSize":30,"isAuthState":1})
                            },
                            success:function(res){
                                t.showLoading=false;
                                t.searchUserList=res.responseObject.responseData.data_list;
                                if(res.responseObject.responseStatus == false){
                                    t.checkNoneOnOff = true;
                                    t.searchNoData = t.addMember;
                                }else {
                                    t.checkNoneOnOff = false;
                                    t.checkOnOff=true;
                                }
                            }
                        })
                    }
                },500)}

        },
        titleOnOFF(newVal){
            let t = this;
            if(!newVal){
                $(t.$refs.association).css('top',$(t.$refs.elememt).outerHeight());
                // $(t.$refs.association).css('top',$(t.$refs.elememt).outerHeight());
            }
        },
        memberList(){
            let t = this;
            // console.log($(t.$refs.elememt).outerHeight())
        }
    },
    updated(){
        let t = this;
        $(t.$refs.association).css('top',$(t.$refs.elememt).outerHeight());//获取联想列表宽给下拉的top -有数据
        $(t.$refs.associationNone).css('top',$(t.$refs.elememt).outerHeight());//获取联想列表宽给下拉的top -无数据
    },
    methods:{
        formInputCheck:function(){
            this.onOff=true
        },
        establishBtn:function () {//点击创建
            let t = this;
            if(this.establishText.length<=0){
                t.checkOnOff=true;
                t.titleOnOFF = true;
                t.errorText='请添加团队名称';
                t.btnText='创建';
            }else {
                t.showLoading=true;
                comm.ajax2({
                    url: '/call/caseFolder/team_baseinfo/create/',
                    type: "post",
                    data: {
                        paramJson:JSON.stringify({"teamName":t.establishText,"customerId":"1399252409974","siteId":1})
                    },
                    success:function(res){
                        // t.listItem = res.responseObject.responseData.data_list[0];
                        t.responsePk = res.responseObject.responsePk;
                        if(res.responseObject.responseStatus == true){
                            t.showLoading=false;
                            t.checkOnOff=false;
                            t.titleOnOFF = false;
                            t.btnText='发送邀请';
                        }
                    }
                })
            }
        },
        skipBtn:function () {//跳过点击
            this.$router.push({
                path: 'teamSetting',//跳转链接
                /*query: { //链接后面的参数
                    name: 'name',
                    dataObj: '1111'
                }*/
            })
        },
        findMemberCli(obj){//联想搜索添加成员
            let t = this;
            t.memberList.push({name:obj.name,cid:obj.cid});
            // t.customerIdAry.push(obj.cid);
            t.addMember='';
            t.checkOnOff=false;
            t.showLoading=false;
        },
        findMemberCloseCli(obj){//删除成员
            let t = this;
            // console.log(t.memberList)
            // t.memberList.splice(t.memberList.indexOf(obj.index),1);
            for(let i=0;i<this.memberList.length;i++){
                if(this.memberList[i].cid==obj.cid){
                    this.memberList.splice(i, 1)
                }
            }
            t.nameDelItem=obj.cid;
        },
        PeopleList(data){
            if(data.add){
                this.memberList.push(data)
            }else {
                for(let i=0;i<this.memberList.length;i++){
                    if(this.memberList[i].cid==data.cid){
                        this.memberList.splice(i, 1)
                    }
                }
            }
        },
    },
    async mounted() {
        let t=  this;
        if(this.$route.query.type){
            this.titleOnOFF = false;
        }




    },
    filters:{
        dateTypeChange:function (date) {
            if(date){
                let newDate = date.split(",");
                newDate=newDate[0].split('_');
                return newDate[2];
            }
        },
        dateNameChange:function (txt,num) {
            if(txt.length>num+1){
                txt = txt.substring(0,num)+'...';
                return txt;
            }else{
                return txt;
            }
        }
    },
    metaInfo: {
        title: '团队设置'
    }
}
</script>
<style lang="scss">

</style>


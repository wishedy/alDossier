<template>
    <div class="alEmr-mainInner">
        <NavSideBar></NavSideBar>
        <TopHeader></TopHeader>
        <section class="alEmr-mainIndex">
            <aside class="teamSetting width450">
                <div class="title">
                    <p>1.创建团队</p>
                    <p :class="{notActive:titleOnOFF}">2.邀请成员</p>
                </div>
                <div class="teamSetInput" :class="{'error':checkOnOff,'focus':patientNameFocus}">
                    <input type="text" placeholder="请为团队起一个名字" v-model="establishText" @focus.stop="patientNameFocus=true" @blur.stop="patientNameFocus=false"/>
                    <div class="formError" v-show="checkOnOff">{{errorText}}</div>
                    <ul class="searchUserList">
                        <li>
                            <p class="userImg"><img src="https://img05.allinmd.cn/public1/M01/13/5A/wKgBMFsrdDeAawYfAALjjAJhig4145_c_p_300_300.png"/> </p>
                            <p class="userName">李春辉</p>
                            <p class="userTitle">副主任医师</p>
                            <p class="userHospital">中国人民解放军总医院</p>
                        </li><li>
                            <p class="userImg"><img src="https://img05.allinmd.cn/public1/M01/13/5A/wKgBMFsrdDeAawYfAALjjAJhig4145_c_p_300_300.png"/> </p>
                            <p class="userName">李春辉</p>
                            <p class="userTitle">副主任医师</p>
                            <p class="userHospital">中国人民解放军总医院</p>
                        </li>
                    </ul>
                </div>
                <div class="establishBtn" @click="establishBtn">{{btnText}}</div>
                <teamDescription v-show="titleOnOFF"></teamDescription>
                <recommend v-show="!titleOnOFF"></recommend>
            </aside>
        </section>
    </div>
</template>
<script>
import NavSideBar from '~components/common/NavSideBar.vue';
import TopHeader from '~components/common/TopHeader.vue';
import recommend from './components/recommend.vue';
import teamDescription from './components/teamDescription.vue';
import axios from 'axios';
import api from '~api'
export default {
    name: 'index-app',
    data() {
        return {
            establishText:'',
            errorText:'',
            btnText:'创建',
            checkOnOff:false,
            titleOnOFF:true,
            names:['北京','北海','东北','上海','武汉','东京','广州','广元市','上饶','上水市'],
            'patientNameError':false,
            'patientNameFocus':false
        }
    },
    components: {
        NavSideBar,
        TopHeader,
        recommend,
        teamDescription
    },
    computed:{
      onOff(){
          console.log(this.establishText.length===0)
          return (this.establishText.length===0&&this.checkOnOff)
      }
    },
    watch:{
        patientNameFocus(){
            console.log('触发')
        },
        establishText(newVal,oldVal){
            console.log(this.checkOnOff)
            this.checkOnOff=false;
            if(this.establishText.length>20){
                this.checkOnOff=true;
                this.establishText=this.establishText.substr(0,20);
            }
        }
    },

    methods:{
        formInputCheck:function(){
            this.onOff=true
        },
        establishBtn:function () {
            this.checkOnOff=false;
            this.titleOnOFF = false;
            this.btnText='发送邀请';
            if(this.establishText.length<=0){
                this.checkOnOff=true;
                this.titleOnOFF = true;
                this.errorText='请添加团队名称'
                this.btnText='创建';
            }
        },

    },
    async mounted() {
        axios({
            method: 'post',
            url: '/call/ad/position/profile/getMapList/',
            data: {"firstResult":0,"maxResult":10,"visitSiteId":1,"channelId":68,"isIndex":1,"platformId":"1","customerId":"1399252409974"},
            transformRequest: [function (data) {
                return "paramJson=" + JSON.stringify(data);
            }],
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            },
            timeout: 30000
        }).then(function (res) {
            console.log(res)
        });

    },
    metaInfo: {
        title: '团队设置'
    }
}
</script>
<style lang="scss">
    @import "../../assets/scss/base.scss";
    @import '../../assets/scss/pages/teamSetting.scss';
</style>

<template>
    <div class="alEmr-mainInner">
        <NavSideBar :sideSetting="{index:3}"></NavSideBar>
        <TopHeader></TopHeader>
        <router-view></router-view>
        <!--弹层开始-->
        <!--<section class="casePopup">
            <section class="casePopupCont">
                <div class="close"><i></i></div>
                <div class="text"><i></i><p><span>更换模板将清空全部病历内容，您确认更换么？</span></p></div>
                &lt;!&ndash;<div class="text"><i></i><p><span>保存失败</span><span>长期未操作，当前内容已过期失效请重新录入</span></p></div>&ndash;&gt;
                <div class="btn">
                    <a class="grey">不保存</a>
                    <a class="blue">保存</a>
                    <a class="red">清空并更换</a>
                </div>
            </section>
        </section>-->
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

    },
    metaInfo: {
        title: '团队设置'
    }
}
</script>
<style lang="scss">
    @import "../../assets/scss/base.scss";
    @import '../../assets/scss/pages/teamSetting.scss';
    @import "../../assets/scss/components/casePopup.scss";
</style>

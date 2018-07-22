<template>
    <section class="newCases alEmr-mainInner">
        <headerTopNav :saveStatus="saveStatus" :crumbsTxt="crumbsTxt" :pageType="1" :navName="titleName" @quitSaveCaseInfo="quitSaveCaseInfo"></headerTopNav>
        <caseTopNav ref="topNavBar"></caseTopNav>
        <caseLeftNav v-show="parseInt(navHeight,10)" :style="[{'top':(navHeight+71)+'px'}]"></caseLeftNav>
        <router-view  :style="[{'paddingTop':(navHeight+71)+'px'}]"></router-view>

    </section>
</template>
<script>
import headerTopNav from '~components/common/headerTopNav.vue';
import caseTopNav from '~components/common/caseTopNav.vue';
import comm from '~utils/comm.js';
import {mapGetters,mapActions} from 'vuex';
import CaseLeftNav from "../../components/common/caseLeftNav";
export default {
    name: 'index-app',
    data() {
        return {
            crumbsTxt:"新建病例",
            edit: (comm.getParamFromUrl(document.URL,'edit')||'0').replace(/[^0-9]/ig,""),
            topics: [],
            queryCaseId:(comm.getParamFromUrl(document.URL,'caseId')||'0').replace(/[^0-9]/ig,""),
            heightTop:43,
            saveStatus:0
        }
    },
    components: {
        CaseLeftNav,
        headerTopNav,
        caseTopNav
    },
    async mounted() {
        /*1532066201016*/
        this.saveEditType(this.edit);
        if(((parseInt(this.queryCaseId,10)>0)||(localStorage.getItem('emrNewCaseCaseId')))){
            if((parseInt(this.queryCaseId,10)>0)){
                this.saveCaseId(this.queryCaseId);
            }else{
                this.saveCaseId(localStorage.getItem('emrNewCaseCaseId'));
            }
        }
        this.getTeamList();
    },
    computed:{
        ...mapGetters(['titleName','navHeight','editType','tabList','pageIndex','CaseId','templateId','teamList'])
    },
    metaInfo: {
        title: '新建病历'
    },
    methods:{
        ...mapActions(['saveEditType','saveCaseId','getTabList','getBaseCaseInfo','getTeamList','changeIndex']),
        quitSaveCaseInfo(){
            let t=this;
            t.saveStatus = 1;
            setTimeout(function(){
                t.saveStatus = 2;
            },2000)
        }
    },
    watch:{
        pageIndex(newVal){
            if(newVal===-1){
                console.log('去基本信息');
            }else{
                console.log('组装页面');
            }
            console.log('跳页了');
        },
        CaseId(newVal){
            //当获取到caseId的时候去发请求获得模板id,，或者新建病例的时候自己去选择一个模板，取出模板id
            let t = this;
            if(parseInt(newVal,10)>0){
                if(t.editType===1){
                    //如果是编辑病例这是需要获取基本信息
                    t.getBaseCaseInfo();
                }else{
                    //如果是在基本信息创建病历后这时候可以去选模板了
                    if((t.$route.path.replace('/','')==='baseInfo')){
                        t.getBaseCaseInfo();
                    }
                }
            }else{
                console.log('没有病例ID');
            }
        },
        '$route'(n){
            let t = this;
            if(n.name==='baseInfo'){
                t.getBaseCaseInfo();
            }
        },
        templateId(newVal){
            //在获取模板id的时候果断发起请求tab数据的请求
            let t = this;
            if(parseInt(newVal,10)>0){
                (t.tabList.length===0)?t.getTabList():'';
                /*if(t.$route.path.replace('/','')==='tplate'){
                    t.changeIndex({
                        index:0
                    });
                }*/
            }

        }
    }
}
</script>

<style lang="scss">
    @import "../../assets/scss/base.scss";
    @import "../../assets/scss/pages/newCases.scss";
</style>

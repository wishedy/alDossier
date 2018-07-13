<template>
    <section class="newCases alEmr-mainInner">
        <headerTopNav :navName="titleName" @quitSaveCaseInfo="quitSaveCaseInfo"></headerTopNav>
        <caseTopNav ref="topNavBar"></caseTopNav>
        <!--<caseLeftNav v-show="parseInt(navHeight,10)" :style="[{'top':(navHeight+71)+'px'}]"></caseLeftNav>-->
        <caseLeftNav :style="[{'top':(navHeight+71)+'px'}]" v-show="false"></caseLeftNav>
        <router-view></router-view>

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
            edit: comm.getParamFromUrl(document.URL,'edit')||0,
            topics: [],
            templateId:comm.getParamFromUrl(document.URL,'templateId')||0,
            heightTop:43
        }
    },
    components: {
        CaseLeftNav,
        headerTopNav,
        caseTopNav
    },
    async mounted() {
        console.log(document.URL,comm.getParamFromUrl(document.URL,'templateId'));
        (parseInt(this.templateId,10))?(this.saveTemplateId(this.templateId)):'';
        (parseInt(this.templateId,10))?(this.getTabList()):'';
        this.saveEditType(this.edit);

    },
    computed:{
        ...mapGetters(['titleName','navHeight','editType','tabList','pageIndex'])
    },
    metaInfo: {
        title: '新建病例'
    },
    methods:{
        ...mapActions(['saveEditType','saveTemplateId','getTabList']),
        quitSaveCaseInfo(){
            //console.log('触发保存');
        }
    },
    watch:{
        editType(newVal){
            //console.log('改变了'+newVal);
        },
        pageIndex(newVal){
            if(newVal===-1){
                console.log('去基本信息');
            }else{
                console.log('组装页面');
            }
            console.log('跳页了');
        }
    }
}
</script>

<style lang="scss">
    @import "../../assets/scss/base.scss";
    @import "../../assets/scss/pages/newCases.scss";
</style>

<template>
    <div class="alEmr-mainInner">
        <NavSideBar :sideSetting="{index:1}"></NavSideBar>
        <TopHeader></TopHeader>
        <section class="alEmr-mainIndex">
            <section class="alEmr-indexInner">
                <!--默认无病历开始-->
                <IndexNoCase></IndexNoCase>
                <!--默认无病历结束-->
                <!--搜索无结果开始-->
                <SearchNoList></SearchNoList>
                <!--搜索无结果结束-->
                <!--筛选条件开始-->
                <ScreeningItems></ScreeningItems>
                <!--筛选条件结束-->
                <!--筛选条件展示开始-->
                <ScreItemsShow></ScreItemsShow>
                <!--筛选条件展示结束-->
                <!--筛选无结果开始-->
                <ScreeningNoList></ScreeningNoList>
                <!--筛选无结果结束-->
                <!--病历列表开始-->
                <CaseList></CaseList>
                <!--病历列表结束-->
                <!--分页开始-->
                <pagination :pageIndex="pageIndex" :pageSize="pageSize" :total="total" @change="pageChange"></pagination>
                <!--分页结束-->
            </section>
        </section>
        <!--归属遮罩开始-->
        <BelongOpPop></BelongOpPop>
        <!--归属遮罩结束-->
        <!--归属成功提示遮罩开始-->
        <SucPop></SucPop>
        <!--归属成功提示遮罩结束-->
        <!--病历不能被归属提示开始-->
        <NotBelongPop></NotBelongPop>
        <!--病历不能被归属提示结束-->
        <!--病历归属选择团队开始-->
        <SelectTeamPop></SelectTeamPop>
        <!--病历归属选择团队结束-->
    </div>
</template>
<script>
import NavSideBar from '~components/common/NavSideBar.vue';
import TopHeader from '~components/common/TopHeader.vue';
import IndexNoCase from './components/indexNoCase.vue';
import SearchNoList from './components/searchNoList.vue';
import ScreeningItems from './components/screeningItems.vue';
import ScreItemsShow from './components/screItemsShow.vue';
import ScreeningNoList from './components/screeningNoList.vue';
import CaseList from './components/caseList.vue';
import SelectTeamPop from './components/selectTeamPop.vue';
import NotBelongPop from './components/notBelongPop.vue';
import BelongOpPop from './components/belongOpPop.vue';
import SucPop from './components/belongSuccessPop.vue';
import pagination from "~components/pagination/pagination.vue";
// import api from '~api'
import user from "~utils/user.js";
// import comm from "~utils/comm.js";
import {mapActions,mapGetters} from 'vuex';
export default {
    name: 'index-app',
    data() {
        return {
            page: Number(new URLSearchParams(window.location.search).get('page')) || 1,
            pageIndex:1,
            pageSize:20,
            total:35,
            topics: []
        }
    },
    components: {
        NavSideBar,//侧边连
        TopHeader,//顶部栏
        pagination,//分页
        IndexNoCase,//首页默认无病历
        SearchNoList,//搜索无结果
        ScreeningItems,//筛选条件的选项
        ScreItemsShow,//筛选条件选中的展示
        ScreeningNoList,//筛选无结果
        CaseList,//病历列表
        SelectTeamPop,//选择团队列表弹层
        NotBelongPop,//病历不能被归属弹层
        BelongOpPop,//病历归属操作弹层
        SucPop,//归属成功提示弹层
    },
    computed:{
        ...mapGetters(['itemsArr','orderType','sIdList'])
    },
    methods:{
        ...mapActions(['itemsArrChange','itemsLenChange','caseListInit']),
        pageChange(pageIndex){

        },
    },
    watch:{
        orderType(){
            let t=this;
            t.caseListInit();
        },
        sIdList(){
            let t=this;
            t.caseListInit();
        }
    },
    mounted() {
       let t=this;
       t.caseListInit();
        user.login({
            scene:0
        });
    },
    metaInfo: {
        title: '全部病历'
    }
}
</script>
<style lang="scss">
    @import '../../assets/scss/pages/index.scss';
</style>

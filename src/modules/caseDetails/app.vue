<template>
    <div class="alEmr-mainInner">
        <TopHeader></TopHeader>
        <slideBar></slideBar>
        <section class="alEmr-mainIndex">
            <section class="alEmr-indexInner">
                <caseDetail></caseDetail>
                <section class="addCaseDetail">
                    <i></i>
                    添加病历详情
                </section>
            </section>
            <section class="detRecord">
                <div class="repRecord">报道记录</div>
                <div class="InqRecord">问诊记录</div>
            </section>
            <section class="supCase">
                <article class="supCaseTitle">
                    您还没有填写病历信息，立即补充吧
                </article>
                <article class="supCaseBtn">
                    编辑病历
                </article>
            </section>
        </section>
    </div>
</template>
<script>
    import NavSideBar from '~components/common/NavSideBar.vue';
    import TopHeader from '~components/common/caseDetailHeaderTopNav.vue';
    import caseDetail from './components/caseDetail.vue';
    import slideBar from './components/caseSlideBar.vue'

    import axios from 'axios';
    export default {
        name: 'index-app',
        data() {
            return {
                page: Number(new URLSearchParams(window.location.search).get('page')) || 1,
                topics: []
            }
        },
        components: {
            NavSideBar,
            TopHeader,
            caseDetail,
            slideBar
        },
        async mounted() {
            // const { success, data } = await api.post('/call/ad/position/profile/getMapList/',
            //     {"firstResult":0,"maxResult":10,"visitSiteId":1,"channelId":68,"isIndex":1,"platformId":"1","customerId":"1399252409974"}
            //     )
            // if (success) {
            //     console.log(data);
            // }

        },
        metaInfo: {
            title: '病例详情'
        }
    }
</script>
<style lang="scss">
    @import "../../assets/scss/base.scss";
    @import "../../assets/scss/pages/caseDetail.scss";
</style>

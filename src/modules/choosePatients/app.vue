<template>
    <div class="alEmr-mainInner">
        <TopHeader></TopHeader>
        <section class="alEmr-mainIndex" style="padding-left: 0">
            <section class="alEmr-indexInner">
                <patList></patList>
            </section>
        </section>
    </div>
</template>
<script>
    import NavSideBar from '~components/common/NavSideBar.vue';
    import TopHeader from '~components/common/TopHeader.vue';
    import patList from './components/patientsList.vue'

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
            patList
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
            title: '选择患者'
        }
    }
</script>
<style lang="scss">
    @import "../../assets/scss/base.scss";
    @import "../../assets/scss/pages/chosePatient.scss";
</style>

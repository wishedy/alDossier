<template>
    <div class="alDossier-mainInner">
        <NavSideBar></NavSideBar>
        <TopHeader></TopHeader>
        <!--<nav-component :current="1" style="display: none"/>-->
        <section class="alDossier-mainIndex">
            <section class="alDossier-indexInner">
                <h1>这是首页</h1>
            </section>
        </section>
    </div>
</template>
<script>
import navComponent from '~components/nav-component.vue';
import NavSideBar from '~components/common/NavSideBar.vue';
import TopHeader from '~components/common/TopHeader.vue';
import modules from '~components/module-1.vue';
import axios from 'axios';
import api from '~api'
export default {
    name: 'index-app',
    data() {
        return {
            page: Number(new URLSearchParams(window.location.search).get('page')) || 1,
            topics: []
        }
    },
    components: {
        navComponent,
        modules,
        NavSideBar,
        TopHeader
    },
    async mounted() {
        // const { success, data } = await api.post('/call/ad/position/profile/getMapList/',
        //     {"firstResult":0,"maxResult":10,"visitSiteId":1,"channelId":68,"isIndex":1,"platformId":"1","customerId":"1399252409974"}
        //     )
        // if (success) {
        //     console.log(data);
        // }
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
        title: '首页'
    }
}
</script>

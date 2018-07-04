<template>
    <div class="alDossier-mainInner">
        <NavSideBar></NavSideBar>
        <TopHeader></TopHeader>
        <nav-component :current="1" style="display: none"/>
        <h1>11111211</h1>
        <!--<modules :topics="topics" :page="page" />-->
    </div>
</template>
<script>
import navComponent from '~components/nav-component.vue';
import NavSideBar from '~components/common/NavSideBar.vue';
import TopHeader from '~components/common/TopHeader.vue';
import modules from '~components/module-1.vue'
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
        const { success, data } = await api.get('topics', { page: this.page })
        if (success) this.topics = data
    },
    metaInfo: {
        title: '首页'
    }
}
</script>
<style lang="scss" rel="stylesheet">
    body{
        background: #54d9e0;
        .g-doc{
            background: #343423;
        }
    }
</style>

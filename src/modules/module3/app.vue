<template>
    <div class="alEmr-mainInner">
        <NavSideBar></NavSideBar>
        <TopHeader></TopHeader>
        <!--<nav-component :current="1" style="display: none"/>-->
        <section class="alEmr-mainIndex">
            <section class="alEmr-indexInner">
                <h1>这是模块3</h1>
            </section>
        </section>
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
            title: '模块3'
        }
    }
</script>

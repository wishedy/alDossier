<template>
    <section class="alEmr-aside">
        <Logo></Logo>
        <ul class="alEmr-aside-list">
            <li class="alEmr-aside-item">
                <a href="../newCases?edit=0">
                    <i class="icon icon-build"></i>
                    <p class="title">新建</p>
                </a>
            </li>
            <li class="alEmr-aside-item">
                <a href="../choosePatients">
                    <i class="icon icon-patients"></i>
                    <p class="title">选择患者</p>
                </a>
            </li>
            <li class="alEmr-aside-item alEmr-aside-active">
                <a href="../index">
                    <i class="icon icon-template"></i>
                    <p class="title">全部病例</p>
                    <div class="pointTo"></div>
                </a>
            </li>
            <li class="alEmr-aside-item alEmr-aside-normal">
                <a href="../templateLib">
                    <i class="icon icon-template"></i>
                    <p class="title">模板库</p>
                </a>
            </li>
        </ul>
        <section class="alEmr-aside-item alEmr-aside-outside alEmr-aside-normal">
            <a href="../teamSetting">
                <i class="icon icon-team"></i>
                <p class="title">团队设置</p>
            </a>
        </section>
    </section>
</template>
<script>
    import Logo from './Logo.vue';
    export default {
        components:{
            Logo
        }
    }
</script>
<style scoped lang="scss">
@import "../../assets/scss/components/navSideBar.scss";
</style>

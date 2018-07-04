<template>
    <section class="alDossier-aside">
        <Logo></Logo>
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
    .alDossier-aside{
        position: fixed;
        left: 0;
        top:0;
        width: 270px;
        height: 100%;
        background: #303F5B;
        z-index: 2;
    }
</style>

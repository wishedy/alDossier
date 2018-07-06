<template>
    <section class="alDossier-header">
        <section class="alDossier-headerContainer">
            <section class="alDossier-headerInner">
                <SearchInput></SearchInput>
                <UserLogo></UserLogo>
            </section>

        </section>
    </section>
</template>
<script>
    import SearchInput from './SearchInput.vue';
    import UserLogo from './UserLogo.vue';
    export default {
        components:{
            SearchInput,
            UserLogo
        }
    }
</script>
<style lang="scss" scoped>
    .alDossier-header{
        position: fixed;
        top:0;
        width: 100%;
        height: 80px;
        z-index: 1;
        background: #ffffff;
        border-bottom: 1px solid #DFDFDF;
        .alDossier-headerContainer{
            margin: 0 auto;
            width: 1200px;
            height: 100%;
            position: relative;
            .alDossier-headerInner{
                float: right;
                display: inline;
            }
        }
    }
</style>

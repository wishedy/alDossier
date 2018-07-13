<template>
    <section class="headerTopNav">
        <logo></logo>
        <aside class="crumbs">新建病历<i></i><span v-text="navName"></span></aside>
        <aside class="saveBtn" @click="saveCaseInfo">
            <!--<span>保存并退出</span>   -->                     <!--默认状态-->
            <ul><li></li><li></li><li></li></ul>         <!--loading-->
            <!--<i></i>-->                                      <!--加载成功-->
        </aside>
    </section>
</template>
<script>
    import Logo from './Logo.vue';
    export default {
        props:['navName'],
        components:{
            Logo
        },
        watch:{
            navName(n,o){
                console.log('头部组件',this.navName,n,o)
            }
        },
        methods:{
          'saveCaseInfo'(){
              this.$emit('quitSaveCaseInfo');
          }
        },
        mounted(){
            console.log('头部组件',this.navName)
        }
    }
</script>
<style scoped lang="scss">
@import "../../assets/scss/components/headerTopNav.scss";
</style>

<template>
    <section class="headerTopNav">
        <logo></logo>
        <aside class="crumbs">新建病历<i></i><span>病例详情</span></aside>
        <aside class="saveBtn editBtn">
            <span>编辑</span>
        </aside>
        <aside class="operationLog">
            <span>操作日志</span>
        </aside>
        <aside class="logDetail">
            <aside class="logTitle">
                <p>操作日志</p>
                <i></i>
            </aside>
            <aside class="logDesc">
                <ul>
                    <li>
                        <div class="logLeft">
                            <img src="https://img05.allinmd.cn/public1/M00/13/60/wKgBL1sxrpOAeJTmAAJq9XnHq_o123_c_p_300_300.png" />
                        </div>
                        <div class="logRight">
                            <p class="logRigTop">
                                <span>尼格买买提</span>
                                <span>编辑病历</span>
                                <span>2018-03-03-18:36</span>
                            </p>
                            <p class="logRigBot">
                                随访记录
                            </p>
                        </div>
                    </li>
                    <li></li>
                </ul>
            </aside>
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
            // navName(n,o){
            //     console.log('头部组件',this.navName,n,o)
            // }
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
<style lang="scss">
@import "../../assets/scss/components/headerTopNav.scss";
</style>

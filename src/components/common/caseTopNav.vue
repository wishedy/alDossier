<template>
    <section class="caseTopNav" ref="topNav">
        <ul>
            <router-link tag="li" to="/baseInfo"  active-class="active" @click.native.stop="changeIndex({pre:0,index:-1})">
                <span >基本信息</span>
            </router-link>
            <!--<li><span>基本信息</span></li>-->
            <!--<li><span>基本信息</span></li>-->
            <!--<li><span>基本信息</span></li>-->
            <!--<li class="active"><span>基本信息</span></li>-->
            <!--<li><span>基本信息</span></li>-->
            <!--<li><span>基本信息</span></li>-->
            <!--<li><span>基本信息</span></li>-->
            <!--<li><span>基本信息</span></li>-->
            <!--<li><span>基本信息</span></li>-->
            <!--<li><span>基本信息</span></li>-->
            <!--<li><span>基本信息</span></li>-->
            <!--<li><span>基本信息</span></li>-->
            <router-link tag="li" :to="'/assemble/'+item.menuId" v-for="(item,index) in tabList" active-class="active" :key="index" @click.native.stop="changeIndex({pre:0,index:index})">
                <span v-text="item.menuName"></span>
            </router-link>
        </ul>
    </section>
</template>
<script>
    const $ = require('jquery');
    import Logo from './Logo.vue';
    import {mapActions,mapGetters} from 'vuex';
    export default {
        components:{
            Logo
        },
        mounted(){
            let t = this;
            t.saveNavTopHeight($(this.$refs.topNav).height());
        },
        watch:{
            templateId(){
                console.log('改变');
            },
            tabList(newVal){
                console.log(newVal);
            }
        },
        methods:{
            ...mapActions(['saveNavTopHeight','changeIndex'])
        },
        computed:{
            ...mapGetters(['templateId','tabList'])
        }
    }
</script>
<style scoped lang="scss">
@import "../../assets/scss/components/caseTopNav.scss";
</style>

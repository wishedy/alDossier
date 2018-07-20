<template>
    <section class="caseTopNav" ref="topNav">
        <ul>
            <router-link tag="li" to="/baseInfo"  active-class="active" @click.native.stop="changeIndex({index:-1})" v-show="$route.path.replace('/','')!=='tplate'">
                <span >基本信息</span>
            </router-link>
            <router-link tag="li" :to="'/assemble/'+item.menuId" v-for="(item,index) in tabList" active-class="active" :key="index" @click.native.stop="changeIndex({index:index})">
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
        updated(){
            let t = this;
            t.saveNavTopHeight($(this.$refs.topNav).height());
        },
        watch:{
            tabList(newVal){
                let t = this;
                if(t.$route.params.menuId){
                    for(let num = 0;num<newVal.length;num++){
                        if(t.$route.params.menuId==newVal[num].menuId){
                            t.changeIndex({
                                index:num
                            });
                            break;
                        }
                    }
                }else{
                    if(t.$route.path.replace('/','')==='tplate'){
                        t.changeIndex({
                            index:0
                        });
                    }
                }

            },
            pageIndex(newVal){//监听带有tab时候的页面索引值，在索引值修改的时候，跳转页面
                let t = this;
                if(newVal>=0){
                    t.$router.push({
                        name: 'assemble',
                        params: {
                            menuId: parseInt(t.tabList[parseInt(newVal)].menuId)
                        }
                    })
                }else{
                    t.$router.push({
                        path: '/baseInfo'
                    });
                }

            }
        },
        methods:{
            ...mapActions(['saveNavTopHeight','changeIndex'])
        },
        computed:{
            ...mapGetters(['CaseId','tabList','pageIndex','templateId'])
        }
    }
</script>
<style scoped lang="scss">
@import "../../assets/scss/components/caseTopNav.scss";
</style>

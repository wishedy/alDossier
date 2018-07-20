<template>
    <section class="caseLeftNav" v-if="subPageData&&subPageData['data_list']&&subPageData['data_list'].length">
        <div class="addColumn">
            <i></i><span>添加</span>
        </div>
        <ul>
            <li v-for="(item,index) in subPageData['data_list']" :key="index" @click.stop="changeSubIndex(index)" :class="{'active':subIndex==index}">{{item.item.contentDes}}
                <div class="delete">
                    <div class="deletePopup">
                        <p>您确定删除术后{{item.item.contentDes}}的全部内容吗</p>
                        <div class="deleteBtn">
                            <button>确认</button>
                            <button>取消</button>
                        </div>
                    </div>
                </div>
            </li>
            <!--<li class="active">第二次</li>-->
        </ul>
    </section>
</template>
<script>
    import {mapGetters,mapActions} from 'vuex';
    import Logo from './Logo.vue';
    export default {
        props:['navName'],
        components:{
            Logo
        },
        watch:{
            navName(n,o){
                //console.log('头部组件',this.navName,n,o)
            },
            subPageData(n){
                //console.log('触发侧边栏');
                //console.log(n.length);
            }
        },
        methods:{
            ...mapActions(['changeSubIndex']),
          'saveCaseInfo'(){
              this.$emit('quitSaveCaseInfo');
          }
        },
        computed:{
            ...mapGetters(['subPageData','subIndex'])
        },
        mounted(){
            //console.log('头部组件',this.navName)
        }
    }
</script>
<style scoped lang="scss">
@import "../../assets/scss/components/caseLeftNav.scss";
</style>

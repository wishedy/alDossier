<template>
    <section class="caseLeftNav">
        <div class="addColumn">
            <i></i><span>添加</span>
        </div>
        <ul>
            <li>第一次
                <div class="delete">
                    <div class="deletePopup">
                        <p>您确定删除术后XX片的全部内容吗</p>
                        <div class="deleteBtn">
                            <button>确认</button>
                            <button>取消</button>
                        </div>
                    </div>
                </div>
            </li>
            <li class="active">第二次</li>
        </ul>
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
@import "../../assets/scss/components/caseLeftNav.scss";
</style>

<template>
    <!--归属遮罩开始-->
    <section class="alEmr-belongPop" v-if="belongBtn">
        <p class="firstBtn" @click="beCancel">取消</p>
        <p class="secBtn" @click="beSure">确定</p>
    </section>
    <!--归属遮罩结束-->
</template>

<script>
    import {mapActions,mapGetters} from 'vuex';
    export default {
        name: 'belongOpPop',
        computed:{
            ...mapGetters(['belongBtn','chooseTips','belongList']),
        },
        methods: {
            ...mapActions(['belongListChange', 'belongBtnChange', 'chooseTipsChange','teamListAjax']),
            //归属操作取消
            beCancel(){
                let t=this;
                t.belongBtnChange(false);//归属按钮状态变化
                t.belongListChange({caseId:'',flag:false});//取消操作的时候，默认取消所有id
                t.chooseTipsChange(false);
            },
            //归属操作确认
            beSure(){
                let t=this;
                if(t.belongList.length>0){//选中的列表长度大于0时才可进行归属操作
                    t.teamListAjax();
                }else{//提示，请选择一个病例
                    t.chooseTipsChange(true);
                }
            },
        }
    }
</script>

<style scoped>

</style>

<!--<template>-->
    <!--<div class="detslideCon">-->
        <!--<ul>-->
            <!--<li :class="{detSliItem:true,active:index == listIndex}" v-for="(item,index) in listItem" @click.stop="itemCli(index)">{{item.menuName}}</li>-->
            <!--&lt;!&ndash;<li class="detSliItem">主诉</li>&ndash;&gt;-->
            <!--&lt;!&ndash;<li class="detSliItem">现病史</li>&ndash;&gt;-->
            <!--&lt;!&ndash;<li class="detSliItem">既往史</li>&ndash;&gt;-->
            <!--&lt;!&ndash;<li class="detSliItem">专科检查</li>&ndash;&gt;-->
            <!--&lt;!&ndash;<li class="detSliItem">术前影像资料</li>&ndash;&gt;-->
            <!--&lt;!&ndash;<li class="detSliItem">初步诊断</li>&ndash;&gt;-->
            <!--&lt;!&ndash;<li class="detSliItem">手术治疗</li>&ndash;&gt;-->
            <!--&lt;!&ndash;<li class="detSliItem">术后影像资料</li>&ndash;&gt;-->
            <!--&lt;!&ndash;<li class="detSliItem">随访记录</li>&ndash;&gt;-->
        <!--</ul>-->
    <!--</div>-->
<!--</template>-->
<!--<script>-->
    <!--import comm from '../../../utils/comm.js';-->
    <!--export default {-->
        <!--data(){-->
            <!--return{-->
                <!--listItem:[],-->
                <!--listIndex:0-->
            <!--}-->
        <!--},-->
        <!--components:{-->

        <!--},-->
        <!--methods:{-->
            <!--itemCli(index){-->
                <!--let t = this;-->
                <!--t.listIndex = index;-->
            <!--}-->
        <!--},-->
        <!--mounted(){-->
            <!--let t = this;-->
            <!--comm.ajax2({-->
                <!--url: '/call/multicenter/major/case/getCaseSecondMenu/',-->
                <!--type: "post",-->
                <!--data: {-->
                    <!--paramJson:JSON.stringify({"majorId":"1528162679022","customerId":"1506065952621","caseId":"1531363084636","menuId":"1528163073956"})-->
                <!--},-->
                <!--timeout: 30000,-->
                <!--success:function(res){-->
                    <!--t.listItem = res.responseObject.responseData.data_list[0];-->
                <!--}-->
            <!--})-->
        <!--}-->
    <!--}-->
<!--</script>-->
<!--<style scoped lang="scss">-->

<!--</style>-->

<template>
    <!--筛选条件展示开始-->
    <section class="alEmr-screeningShow" v-if="scrShowFlag">
        <aside class="showTips"><span>{{itemsLen}}</span>条结果</aside>
        <ul class="activeTips">
            <li v-for="(items,i) in scrShowArr" @click="clickScrClick(i)" v-if="items.active"><span>{{items.kv}}</span><i></i></li>
        </ul>
    </section>
    <!--筛选条件展示结束-->
</template>

<script>
    import {mapActions,mapGetters} from 'vuex';
    export default {
        name: 'screItemsShow',
        data(){
          return{
              sIndex:'',//删除筛选选中的项目
          }
        },
        computed:{
            ...mapGetters(['scrShowArr','scrShowFlag','itemsLen']),
        },
        methods:{
            ...mapActions(['sIdListChange','scrShowArrChange']),
            //删除筛选标签的选中
            clickScrClick(index){
                let t=this;
                if(t.scrShowArr.length){
                    t.sIdListChange({val:t.scrShowArr[index].id,
                        flag:false});
                }
                t.scrShowArrChange({val:{
                        kv:t.scrShowArr[index].kv,
                        id:t.scrShowArr[index].id,
                        active:false,
                        from:t.scrShowArr[index].from,
                    },flag:false});
            },
        },
    }
</script>

<style scoped>

</style>

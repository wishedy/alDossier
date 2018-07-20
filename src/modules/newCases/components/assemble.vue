<template>
    <section class="alEmr-indexInner" v-show="containerOnOff">
        <h2 v-text="titleName"></h2>
        <aside id="assemble" ></aside>
        <ChangeIndex></ChangeIndex>
    </section>
</template>
<script>
    import assemblePage from '../assemble/assemblePage.js';
    import ChangeIndex from '../components/changeIndex.vue';
    import {mapGetters,mapActions} from 'vuex';
    import axios from 'axios';
    export default {
        mounted(){
            let t = this;
            t.updatePage();
        },
        data(){
          return{
              containerOnOff:false,//当切换页面前先隐藏当前
              dynamicElement:null//动态vue对象，用来渲染动态页面
          }
        },
        components:{
            ChangeIndex
        },
        watch:{
            subIndex(n){
              let t = this;
              if(parseInt(n,10)>=0){
                  t.mountPage(n,t.subPageData);
              }
            },
            pageIndex(){
                  let t = this;
                  t.containerOnOff = false;
                  t.createPage();
            },
            pageInfo:{
              handler(){
              },
                deep:true
            },
            CaseId(){
                console.log('触发');
                let t = this;
                t.updatePage();
            }
        },
        methods:{
            ...mapActions(['saveSubPageData','changeSubIndex','setTopNavTitle','saveCaseId','getBaseCaseInfo']),
            mountPage(index,data){//新建病例动态创建页面核心所在，通过class动态生成一个vue对象，然后将其挂在到自定元素完成页面的动态渲染
                let t = this;
                let AssemblePage  = new assemblePage({templateIndex:index,data:data});
                t.dynamicElement =AssemblePage.createPage();
                t.dynamicElement.$mount("#assemble");
                t.containerOnOff = true;
            },
            updatePage(){
                let t = this;
                console.log(parseInt(t.CaseId));
                if(parseInt(t.CaseId)>0){
                    t.createPage();//assemble页面刷新或者刚进入的的时候触发
                }else{
                    if(localStorage.getItem('emrNewCaseCaseId')){
                        t.saveCaseId(localStorage.getItem('emrNewCaseCaseId'));
                        t.getBaseCaseInfo();
                    }else{
                        t.$router.push({
                            path: '/baseInfo'
                        });
                        t.changeIndex({index:-1});
                    }
                }
            },
            createPage(){
                let t = this;
                t.saveSubPageData([]);
                t.changeSubIndex(-1);//清空还原多页面的数据
                t.setTopNavTitle(t.tabList[t.pageIndex].menuName);//在每一次渲染页面的时候改变该页面的标题以及顶部导航箭头的标题
                axios({
                    method: 'get',
                    url: '/emrpc/casePageInfo/',
                    data: {
                        id: "22"
                    }
                }).then((req)=>{
                    let reqData = req.data;
                    if((t.tabList.length)&&parseInt(t.tabList[t.pageIndex].isAdd,10)===0){
                        t.mountPage(0,reqData);
                    }else{
                        axios({
                            method: 'get',
                            url: '/emrpc/caseSubPageInfo/',
                            data: {
                                id: "22"
                            }
                        }).then((req)=>{
                            let subPageData = req.data;
                            t.saveSubPageData(subPageData);
                            t.changeSubIndex(0);
                        });
                    }

                });
            }
        },
        computed:{
            ...mapGetters(['pageInfo','pageIndex','tabList','subIndex','subPageData','CaseId','titleName'])
        }

    }
</script>

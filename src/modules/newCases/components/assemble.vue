<template>
    <section class="alEmr-indexInner">
        <aside id="assemble"></aside>
    </section>
</template>
<script>
    import assemblePage from '../assemble/assemblePage.js';
    export default {
        mounted(){
            //console.log(this.$router,this.$route);
            this.id=this.$route.params.menuId;
            //console.log(this.$route.params.progressId)
        },
        data(){
          return{
              id:'',
              dynamicElement:null
          }
        },
        created(){
          //console.log('进入');
        },
        components:{},
        watch:{
          '$route'(){
              console.log(this.$route.params);
              let AssemblePage  = new assemblePage(this.$route.params.menuId);
              this.dynamicElement =AssemblePage.createPage();
              this.dynamicElement.$mount("#assemble");
          },
            id(){
              //console.log('初始化');
            }
        },
        methods:{
            changeRoute(){
                //console.log('点击');
                this.$router.push({
                    name: 'assemble',
                    params: {
                        progressId: parseInt(this.$route.params.progressId)+1
                    }
                })
            }
        }

    }
</script>

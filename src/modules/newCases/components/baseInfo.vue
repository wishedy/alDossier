<template>
    <section class="alEmr-indexInner"  @click.stop="resetSelect">
        <aside class="casesWidth"><!--//报错时添加error  获取焦点添加focus-->
            <InputBar maxLen="20" contentDes="" testRule="testName" isRequired="1" labelName="姓名" placeholder="请输入您的姓名" unitName=""></InputBar>
            <AgeInput maxLen="20" contentDes="" testRule="testNum" isRequired="1" labelName="姓名" placeholder="请输入您的姓名"></AgeInput>
            <RadioBar :RadioList='strRadioName' index="-1" isRequired="1"  labelName="性别" row="0" needInput="0" testRule="" contentDes="" placeholder=""></RadioBar>
            <InputBar maxLen="0" contentDes="" testRule="testPhoneNum" isRequired="0" labelName="电话" placeholder="请输入中国大陆电话号码" unitName=""></InputBar>
            <SelectInput :SelectInputList='str' index="-1" isRequired="1"  labelName="编号" inputContent="" testRule="testNum"></SelectInput>
            <RadioBar :RadioList='strRadioName' index="-1" isRequired="1"  labelName="归属" row="0" needInput="0" testRule="" contentDes="" placeholder=""></RadioBar>
            <TagList :contentTagList='tagList'></TagList>
        </aside>
        <ChangeIndex></ChangeIndex>
    </section>
</template>
<script>
    import {mapActions,mapGetters} from 'vuex';
    import regularTest from '~utils/regularTest.js';
    import SelectInput from '../components/selectInput.vue';
    import InputBar from '../components/InputBar.vue';
    import AgeInput from '../components/ageInput.vue';
    import TagList from '../components/tagList.vue';
    import ChangeIndex from '../components/changeIndex.vue';
    import RadioBar from '../components/radioboxBar.vue';
    import axios from 'axios';
    //Vue.component('Aaa',Aaa);
    export default {
        data(){
          return{
              strRadioName:JSON.stringify([{'radioName':'男'},{'radioName':'女'}]),
              str:JSON.stringify([{'selectName':'1212'},{'selectName':'234'},{'selectName':'531'}]),
              'tagList':JSON.stringify([
                  {
                      'tagName':'标签名字'
                  },
                  {
                      'tagName':'标签名字'
                  },
                  {
                      'tagName':'标签名字'
                  },
                  {
                      'tagName':'标签名字'
                  },
                  {
                      'tagName':'标签名字'
                  }
              ])
          }
        },
        created(){
            this.setTopNavTitle('填写患者基本信息');
            //在此处发送动态请求;
        },
        beforeMount(){},
        computed:{
            ...mapGetters(['baseInfo','editType']),

        },
        components:{
            InputBar,
            AgeInput,
            RadioBar,
            SelectInput,
            TagList,
            ChangeIndex
        },
        watch:{
            editType(newVal){
              if(parseInt(newVal,10)){
                  console.log('编辑病例获取信息');
                  this.getBaseCaseInfo();
              }else{
                  //console.log('这里是创建病例');
              }
            },
            baseInfo: {
                handler: function (val, oldVal) {
                    //console.log('基本信息请求到了')
                    this.initPageData();
                },
                deep: true
            }
        },
        methods:{
            ...mapActions(['getBaseCaseInfo','setTopNavTitle']),
            initPageData(){
                this.originalData = JSON.parse(JSON.stringify(this.baseInfo));
                this.patientName=this.originalData.patientName ;
                this.ageYear=this.originalData.ageYear;
                this.ageMonth=this.originalData.ageMonth;
                this.ageDay=this.originalData.ageDay;
                this.sex=this.originalData.sex;
                this.phoneNum=this.originalData.phoneNum;
                this.admissionNum=this.originalData.admissionNum;
                this.affiliation=this.originalData.affiliation;
                this.affiliationTeamName=this.originalData.affiliationTeamName;
            }
        },
        mounted(){
            //var Aaa = new Vue({ template:"<h1>这是一个标题</h1>" }).$mount("#test");
            ////console.log(Assemble)
            ////console.log(assemblePage,this.htmlStr)
        }
    }
</script>
<style lang="scss">
    @import "../../../assets/scss/modules/common-modules";
    .alEmr-indexInner{
        padding-left: 270px;
    }
    .newCases{

        .casesWidth{
            /*width: 550px;*/
            margin: 50px auto 0;
            padding-bottom: 125px;
            .articleText{
                display: inline-block;
                vertical-align: middle;
                //font-size: 18px;
                //color: #333333;
                @include fontSize(18px,#333);
                width: 72px;
                text-align: center;
                margin-right: 22px;
                i{
                    //font-size: 16px;
                    //color: #F34B4B;
                    @include fontSize(16px,#F34B4B);
                    margin-right: 6px;
                }
            }
        }
    }

</style>

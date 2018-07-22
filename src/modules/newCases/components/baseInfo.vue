<template>
    <section class="alEmr-indexInner">
        <h2 v-text="titleName"></h2>
        <aside class="casesWidth"><!--//报错时添加error  获取焦点添加focus-->
            <radioSelectBar :RadioList='sexRadioList' :index="patientSex" isRequired  radioLabelName="归属" selectLabelName="归属团队" :SelectList="selectList" radioIndex="0" selectIndex="0"></radioSelectBar>
            <InputBar maxLen="20"  testRule="testName" isRequired labelName="姓名" placeholder="请输入您的姓名" :HandleId="nameHandleId" :contentDes="nameContent"></InputBar>
            <AgeInput maxLen="20"   testRule="testNum" isRequired labelName="年龄" :HandleId="ageHandleId" :contentYear="contentYear" :contentMonth="contentMonth"  :contentDay="contentDay" testResult="-1"></AgeInput>
            <RadioBar :RadioList='sexRadioList' :index="patientSex" isRequired  labelName="性别" :HandleId="sexHandleId"></RadioBar>
            <InputBar :maxLen="test"   testRule="testPhoneNum"  labelName="电话" placeholder="请输入中国大陆电话号码" unitName="" :contentDes="patientMobile" :HandleId="phoneNumHandleId"></InputBar>
            <SelectInput :SelectInputList='selectList' :contentDes="numberContent" :index="numberType" isRequired  labelName="编号"   testRule="testNum" :HandleId="numberHandleId"></SelectInput>
            <RadioBar :RadioList='belongRadioList' :index="belongType"  labelName="归属" :HandleId="belongHandleId" @changeOption="changeBelong"></RadioBar>
            <SelectBar :SelectList='teamSelectList'   :index="teamNumberType"  labelName="归属团队" isRequired v-show="belongType==1" :HandleId="belongTeamHandleId"></SelectBar>
            <TagList :contentTagList='tagList' maxLen="20" :HandleId="tagListHandleId"></TagList>
        </aside>
        <ChangeIndex></ChangeIndex>
    </section>
</template>
<script>
    import {mapActions,mapGetters} from 'vuex';
    import comm from '../../../utils/comm.js';
    import SelectInput from '../components/selectInput.vue';
    import radioSelectBar from '../components/radioSelectBar.vue';
    import InputBar from '../components/InputBar.vue';
    import AgeInput from '../components/ageInput.vue';
    import TagList from '../components/tagList.vue';
    import ChangeIndex from '../components/changeIndex.vue';
    import RadioBar from '../components/radioboxBar.vue';
    import SelectBar from '../components/selectBar.vue';
    //Vue.component('Aaa',Aaa);
    export default {
        data(){
          return{
              nameContent:'',
              numberContent:'',
              "contentYear":'',
              "contentMonth":"",
              "contentDay":"",
              patientSex:-1,
              teamNumberType:-1,
              numberType:-1,
              belongType:-1,
              patientMobile:'',
              nameHandleId:0,
              ageHandleId:0,
              sexHandleId:0,
              phoneNumHandleId:0,
              numberHandleId:0,
              belongHandleId:0,
              belongTeamHandleId:0,
              tagListHandleId:0,
              teamSelect:{
                  "componentId":"",
                  "componentType":"1",
                  "labelName":"归属团队",
                  "isRequired|0-1":0,
                  "selectList":'[]',
                  "index|0-3":0,
                  "testResult":-1
              },
              test:0,/*1-住院号2-床位号3-病历号4-身份证号5-军官号*/
              sexRadioList:JSON.stringify([{'radioName':'男'},{'radioName':'女'}]),
              belongRadioList:JSON.stringify([{'radioName':'个人'},{'radioName':'团队'}]),
              selectList:JSON.stringify([{'selectName':'住院号','testRule':'testNum'},{'selectName':'床位号','testRule':'testNum'},{'selectName':'病历号','testRule':'testNum'},{'selectName':'身份证号','testRule':'testID'},{'selectName':'军官号','testRule':'testNum'}]),
              teamSelectList:JSON.stringify([]),
              'tagList':'[]'
          }
        },
        mounted(){
          console.log('进入');
        },
        created(){
            this.setTopNavTitle('填写患者基本信息');
            //在此处发送动态请求;
        },
        computed:{
            ...mapGetters(['baseInfo','editType','titleName','teamList','teamId'])

        },
        components:{
            InputBar,
            AgeInput,
            RadioBar,
            SelectInput,
            TagList,
            ChangeIndex,
            SelectBar,
            radioSelectBar
        },
        watch:{
            editType(newVal){
                let t = this;
                /*如果监听到editType值为0就初始化首页的前端基本数据结构*/
              if(parseInt(newVal,10)===0){
                  //获取这个编辑病例的基本信息,基本信息是在store中请求的
                  t.initBasePageData();
              }
            },
            teamId(n){
              if(n>0){
                  let t = this;
                  t.changeTeamPanel(t.teamList);
              }
            },
            teamList(n){
                let t = this;
                t.changeTeamPanel(n);
            },
                baseInfo(newVal){
                let t = this;
                if(!comm.isEmptyObject(newVal)){
                    //初始化首页的前端基本数据结构,带数据的
                    t.initBasePageData(newVal);
                }
            }
        },
        methods:{
            ...mapActions(['getBaseCaseInfo','setTopNavTitle','savePageData','getTeamList']),
            changeBelong(n){
                let t = this;
                t.belongType = n;
                if(n===0){
                    t.teamNumberType = -1;
                }

            },
            changeTeamPanel(list){
                let t = this;
                let arr = [];
                for(let i = 0;i<list.length;i++){
                    arr.push({
                        "selectName":list[i].teamName,
                        "selectId":list[i].teamId
                    });
                    if(list[i].teamId==t.baseInfo.teamId){
                        t.teamNumberType = i;
                        t.belongType = 1;
                    }
                }
                t.teamSelectList=  JSON.stringify(arr);
            },
            initBasePageData(data){
                let t = this;
                let dataJson = {};
                t.patientAge = (data&&data.patientAge&&!comm.isEmptyObject(data.patientAge))?data.patientAge.split(','):['','',''];
                t.nameContent = ((data)&&(data.patientName)&&!comm.isEmptyObject(data.patientName))?data.patientName:'';
                t.numberContent = ((data)&&(data.numberContent)&&!comm.isEmptyObject(data.numberContent))?data.numberContent:'';
                t.contentYear=t.patientAge[0];
                t.contentMonth=t.patientAge[1];
                t.contentDay=t.patientAge[2];
                t.patientSex = (data&&!isNaN(data.patientSex))?data.patientSex:-1;
                t.patientMobile = (data&&data.patientMobile&&!comm.isEmptyObject(data.patientMobile))?data.patientMobile:'';
                t.numberType = (data&&!isNaN(data.numberType))?data.numberType:-1;
                t.belongType = (data&&data.belongType)?data.belongType:0;
                let dataList = [
                    {
                        "componentId":"",
                        "componentType":"0",
                        "labelName":'姓名',
                        "isRequired":1,
                        "contentDes":t.patientName,
                        "placeholder":'请输入您的姓名',
                        "maxLen":20,
                        "testRule":"testName",
                        "unitName":'',
                        testResult:-1//-1代表为空0，代表错误，1代表正确
                    },
                    {
                        "componentId":"",
                        "componentType":"4",
                        "labelName":"年龄",
                        "isRequired":1,
                        "contentYear":'18',
                        "contentMonth":"12",
                        "contentDay":"12",
                        testResult:-1//-1代表为空0，代表错误，1代表正确
                    },
                    {
                        "componentId":"",
                        "componentType":"6",
                        "labelName":"性别",
                        "isRequired":1,
                        "RadioList":[
                            {
                                "radioName":"男",
                                "radioId":"1"
                            },
                            {
                                "radioName":"女",
                                "radioId":"0"
                            }
                        ],
                        "index":t.patientSex,
                        testResult:-1//-1代表为空0，代表错误，1代表正确
                    },
                    {
                        "componentId":"",
                        "componentType":"0",
                        "labelName":"电话",
                        "isRequired":0,
                        "contentDes":t.patientMobile,
                        "placeholder":'请输入中国大陆电话号码',
                        "testRule":"testPhoneNum",
                        testResult:-1//-1代表为空0，代表错误，1代表正确
                    },
                    {
                        "componentId":"",
                        "componentType":2,
                        "labelName":"编号",
                        "isRequired":1,
                        "contentDes":t.numberContent,
                        "placeholder":"请您输入",
                        "SelectInputList":[
                            {
                                "selectName":"住院号",
                                "selectId":"1",
                                "testRule":'testNum'
                            },
                            {
                                "selectName":"床位号",
                                "selectId":"2",
                                "testRule":'testNum'
                            },
                            {
                                "selectName":"病历号",
                                "selectId":"3",
                                "testRule":'testNum'
                            },
                            {
                                "selectName":"身份证号",
                                "selectId":"4",
                                "testRule":'testNum'
                            },{
                                "selectName":"军官号",
                                "selectId":"5",
                                "testRule":'testNum'
                            }
                        ],
                        "index":t.numberType,
                        testResult:-1//-1代表为空0，代表错误，1代表正确
                    },
                    {
                        "componentId":"",
                        "componentType":"6",
                        "labelName":"归属",
                        "RadioList":[
                            {
                                "radioName":"个人",
                                "radioId":"0"
                            },
                            {
                                "radioName":"团队",
                                "radioId":"1"
                            }
                        ],
                        "index":t.belongType,
                        testResult:-1//-1代表为空0，代表错误，1代表正确
                    },
                    {
                        "componentId":"",
                        "componentType":"1",
                        "labelName":"归属团队",
                        'index':-1,
                        "SelectList":JSON.stringify([]),
                        "isRequired":1,
                        testResult:-1//-1代表为空0，代表错误，1代表正确
                    },
                    {
                        "componentId": "",
                        "componentType": "11",
                        'contentTagList':t.tagList,
                        testResult:-1//-1代表为空0，代表错误，1代表正确
                    }
                ];
                let handleBox = [
                    'nameHandleId',
                    'ageHandleId',
                    'sexHandleId',
                    'phoneNumHandleId',
                    'numberHandleId',
                    'belongHandleId',
                    'belongTeamHandleId',
                    'tagListHandleId'
                ];
                for(let i = 0;i<dataList.length;i++){
                    let dataItem = dataList[i];
                    let timestamp = Date.parse(new Date())+i;
                    dataJson[timestamp]=dataItem;
                    t[handleBox[i]] = timestamp;
                }
                console.log(dataJson);
                t.savePageData(dataJson);
            }
        }
    }
</script>
<style lang="scss">
    @import "../../../assets/scss/modules/common-modules";
    .alEmr-indexInner{
        padding: 270px 0 100px;
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

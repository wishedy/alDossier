<template>
    <div class="caseBottomBtn">
        <p class="casePrevBtn" @click.stop="changeIndex({pre:0})" v-if="!(pageIndex==-1)">上一步</p>
        <p class="caseNextBtn" @click.stop="(nextTemplate)?changePage():changeIndex({pre:1})"  v-if="((!(pageIndex==tabList.length-1))||pageIndex==-1)">下一步</p>
        <span class="caseChangeTemplate" @click.stop="changeTemplate" v-show="(tabList.length&&pageIndex==-1&&templateId.length)">更换病历模板</span>
    </div>
</template>
<script>
    import {mapGetters,mapActions} from 'vuex';
    import axios from 'axios';
    export default {
        computed:{
            ...mapGetters(['pageIndex','pageInfo','tabList','editType','templateId','changePageOnOff','clickNum','teamList']),
            nextTemplate(){
                let t = this;
                console.log((parseInt(this.editType,10)===0)&&(this.tabList.length===0)&&(t.pageIndex==-1));
                return (parseInt(this.editType,10)===0)&&(this.tabList.length===0)&&(t.pageIndex==-1);
            }
        },
        methods:{
            ...mapActions(['changeIndex','saveCaseId','saveBasePageInfo','clickChangeBtn','examineBasePageData']),
            changeTemplate(){
              let t = this;
            },
            filtrateBaseData(){
              let t = this;
              let data = {
                  patientName:"",//	string	是	病例名称		王二狗
                  patientAge:"",//	string	是	年龄		17
                  patientSex:"",//	string	是	性别		1
                  patientMobile:"",//	string	是	患者手机号		15187609251
                  numberType:"",//	string	是	编号类型		4
                  numberContent:"",//	string	是	编号内容		110101199101013726
                  belongType:"",//	string	是	病例所属（0：个人，1：团队）		1
                  teamId:"",//string	是	团队id		1321112345
                  customerId:"1399252409974",//	string	是	用户id		987654567
                  tagIdList:"",//	string	是	标签id		2,3,23,39
                  siteId:"1",//	string	是	来源站点		1
                  patientId:''
              };
              let dataJson = t.pageInfo.pageData;
                for(let key in dataJson){
                    if(dataJson[key].labelName=='姓名'){
                        data.patientName = dataJson[key].contentDes;
                    }
                    if(dataJson[key].labelName=='年龄'){
                        data.patientAge = `${(dataJson[key].contentYear)?(dataJson[key].contentYear):''},${(dataJson[key].contentMonth)?(dataJson[key].contentMonth):''},${(dataJson[key].contentDay)?(dataJson[key].contentDay):''}`
                    }
                    if(dataJson[key].labelName=='性别'){
                        data.patientSex = dataJson[key].index;
                    }
                    if(dataJson[key].labelName=='电话'){
                        data.patientMobile = (dataJson[key].contentDes)?(dataJson[key].contentDes):'';
                    }
                    if(dataJson[key].labelName=='编号'){
                        data.numberType = dataJson[key].index;
                        data.numberContent = dataJson[key].contentDes;
                    }
                    if(dataJson[key].labelName=='归属'){
                        data.belongType = dataJson[key].index;
                    }
                    if((dataJson[key].labelName=='归属团队')){
                        data.teamId = t.teamList[dataJson[key].index].teamId;
                    }
                    if(dataJson[key].componentType==11){
                        let tagIdList = '';
                        let arr = JSON.parse(dataJson[key].contentTagList);
                        for(let i = 0;i<arr.length;i++){
                            if(i===0){
                                tagIdList+=arr[i].tagId;
                            }else{
                                tagIdList+=","+arr[i].tagId;
                            }
                        }
                        data.tagIdList = tagIdList;
                    }
                }
                return data;
            },
            changePage(option){
                let t = this;
                if((parseInt(this.editType,10)===0)&&(this.tabList.length===0)&&(t.pageIndex==-1)){
                    t.examineBasePageData();
                    console.log(this.changePageOnOff);
                    if(!this.changePageOnOff){
                        t.clickChangeBtn();
                    }else{//保存完第一步的信息然后跳转到模板页
                        axios({
                            url: "/call/caseFolder/baseinfo/create/",
                            method: "POST",
                            data: t.filtrateBaseData(),
                            transformRequest: [function(data) {
                                return "paramJson=" + JSON.stringify(data);
                            }],
                            headers: {
                                'X-Requested-With': 'XMLHttpRequest'
                            },
                            timeout: 30000
                        }).then(function(res){
                            t.saveCaseId(res.data.responseObject.responsePk);
                            if(parseInt(t.templateId,10)>0){
                                t.changeIndex({index:0});
                            }else{
                                t.$router.push({
                                  path: '/tplate'
                               });
                            }
                        });

                    }
                }else{
                    console.log('开始')
                }
            }
        },
        watch:{
            clickNum(){
                console.log('点击');
            }
        }
    }
</script>
<style lang="scss" scoped>
    .caseChangeTemplate{
        float: right;
        width: 146px;
        height: 64px;
        line-height: 64px;
        text-align: center;
        font-size: 16px;
        cursor: pointer;
        color: #4B6EA6;
    }
</style>

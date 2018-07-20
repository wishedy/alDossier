<template>
    <div class="alEmr-mainInner" @click="closeCall" :class="{'mainHide':ismainHide,'alEmr-mainCase':typeNameCase}">
        <NavSideBar v-if="!typeNameCase" :sideSetting="{index:2}"></NavSideBar>
        <TopHeader v-if="!typeNameCase"></TopHeader>
        <header-top-nav v-if="typeNameCase" :navName="'选择病历模板'" :pageType="1" :crumbsTxt="crumbsText"></header-top-nav>
        <section class="alEmr-mainIndex">
            <section class="alEmr-innerLeft">
                <ul>
                    <li v-for="(item,index) in libDateList" :class="{'active':index==indexActive}" @click="majorList(index)">{{item.typeName}}</li>
                </ul>
            </section>
            <section class="alEmr-innerRight">
                <section class="alEmr-innerAll alEmr-moudel" v-for="(item,index) in libDateList" :class="majorColor(index)" v-if="indexActive==index||indexActive==0">
                    <h4 v-if="index!=0">{{item.typeName}}</h4>
                    <div v-if="!typeNameCase">
                        <div v-if="index==0" class="modelItem" @click="modelItem('通用模板')"><span class="modelText">通用模板</span></div>
                        <div v-for="(itemL,indexI) in item.template_list" v-else :class="{'modelItem':itemL.isNew==='0' ,'modelItemNew':itemL.isNew==='1'}" @click="modelItem(itemL)"><span class="modelText">{{templateTitle(itemL.templateTitle)}}</span></div>
                    </div>
                    <div v-else>
                        <div v-if="index==0" class="modelItem" @click.stop.prevent="modelItem('通用模板',0,index)" :class="{'active':isSelectActive&&isSelectIndex==0&&isItemIndex==0}"><span class="modelText">通用模板</span><i></i></div>
                        <div v-for="(itemL,indexI) in item.template_list" v-else  @click.stop.prevent="modelItem(itemL,indexI,index)" :class="{'active':isSelectActive&&isSelectIndex==indexI&&isItemIndex==index,'modelItem':itemL.isNew==='0' ,'modelItemNew':itemL.isNew==='1'}"><span class="modelText">{{templateTitle(itemL.templateTitle)}}</span><i></i></div>
                    </div>
                </section>
                <p class="alEmr-innerMore">~更多模板正在准备中，尽请期待~</p>
                <section class="callOur">
                    <section :class="{'caseCallTop':typeNameCase}" class="callContent">
                        <span class="callText">没有需要的病历模板？</span>
                        <div class="callContainer">
                            <span class="callLink" @click.stop.prevent="callModule">告诉我们</span>
                            <transition name="fade">
                                <div class="callModule" v-if="isCallModule" @click.stop.prevent>
                                <span class="closeCall" @click="btnCancel"></span>
                                <div v-if="!submitSuccess" class="contentCon">
                                    <h4>请告诉我们你您需要的病历模板</h4>
                                    <textarea placeholder="请简单说明您需要的模板名称、主要内容等" v-model="textVal"></textarea>
                                    <h4>您的联系方式</h4>
                                    <input v-model="inputVal"/>
                                    <div class="btnModule">
                                        <!--<button class="btnCancel" @click="btnCancel">取消</button>-->
                                        <button class="btnSubmit" @click="btnSubmit" :class="{'active':isBtnSubmit}">提交</button>
                                    </div>
                                </div>
                                <div v-else class="subSuccess">
                                    <div class="subText">
                                        <h2><i></i>提交成功</h2>
                                        <p>感谢您的宝贵建议，我们会尽快向您反馈处理结果</p>
                                    </div>
                                </div>
                            </div>
                            </transition>
                        </div>
                    </section>
                    <section v-if="typeNameCase" class="baseInfoCotainer">
                        <a href="#" class="baseInfoBack" @click.stop.prevent="baseInfoBack">返回基本信息</a>
                        <div class="btnBase" :class="{'active':isSelectActive}" @click.stop.prevent>
                            <button class="btnReview" @click="leftMenu(templateId)">预览</button>
                            <button class="BtnUse" @click="useBtn">使用</button>
                        </div>
                    </section>
                </section>
            </section>
        </section>
        <section class="alEmr-thickness" v-if="isThickness" @click.stop.prevent>
            <section class="thickMaster">
            </section>
            <section class="thickCotainer">
                <section class="thickTitle">
                    <p class="titleName">模板预览-{{thickTitle}}</p>
                    <p class="titleDesc">可根据需要选择对应的模板<i @click="closeThick"></i></p>
                </section>
                <section class="thickLeft">
                    <ul>
                        <li v-for="(item,index) in thickLeft" :class="thickLeftIndex==index?'active':''" @click="selectThick(index)">{{item.structureName}}</li>
                    </ul>
                </section>
                <section class="thickRight">
                    <section class="newCases thickCase">
                        <!--<aside class="casesWidth">-->
                        <section v-for="(item,index) in thickRight">
                            <!--1-单选-下拉列表 2-单选-下拉列表-其他3-多选-下拉列表4-多选-下拉列表-其他 5-时间控件（岁月天）6-时间控件（年月日）7-时间控件（月周天）8-文本9-数值10-视频/图片',-->
                            <form-select v-if="item.commDataField.fieldType==1||item.commDataField.fieldType==2||item.commDataField.fieldType==3||item.commDataField.fieldType==4" :data="item"></form-select>
                            <!--<form-check v-if="item.commDataField.fieldType==3||item.commDataField.fieldType==4" :data="item"></form-check>-->
                            <form-input-age v-if="item.commDataField.fieldType==5" :data="item"></form-input-age>
                            <surgery-cure v-if="item.commDataField.fieldType==6" :data="item"></surgery-cure>
                            <form-select-time v-if="item.commDataField.fieldType==7" :data="item"></form-select-time>
                            <form-input v-if="item.commDataField.fieldType==8" :data="item"></form-input>
                            <form-number v-if="item.commDataField.fieldType==9" :data="item"></form-number>
                            <before-surgery-view v-if="item.commDataField.fieldType==10" :data="item"></before-surgery-view>
                            <form-tag :data="item" v-if="item.commDataField.fieldType==11111"></form-tag>
                        </section>
                        <!--</aside>-->
                    </section>
                </section>
                <section class="thickFooter" v-if="typeNameCase">
                    <button @click="useBtn">使用</button>
                </section>
            </section>
        </section>
        <loading v-if="isLoading"></loading>
    </div>
</template>
<script>
    // <!--1-单选-下拉列表 2-单选-下拉列表-其他3-多选-下拉列表4-多选-下拉列表-其他 5-时间控件（岁月天）6-时间控件（年月日）7-时间控件（月周天）8-文本9-数值10-视频/图片',-->
    import headerTopNav from '~components/common/headerTopNav.vue';
    import NavSideBar from '~components/common/NavSideBar.vue';
    import TopHeader from '~components/common/TopHeader.vue';
    import loading from '~components/loading/loading';
    import formSelect from './component/formSelect';//1-单选-下拉列表 2-单选-下拉列表-其他3-多选-下拉列表4-多选-下拉列表-其他
    import formInputAge from './component/formInputAge';//5-时间控件（岁月天）
    import surgeryCure from './component/surgeryCure';//8-年月日控件
    import formSelectTime from './component/formSelectTime';//7-时间控件（月周天）
    import formInput from './component/formInput';//8-文本
    import formNumber from './component/formNumber';//9-数值
    import beforeSurgeryView from './component/beforeSurgeryView.vue';//10-视频/图片
    import formTag from './component/formTag';//11111-标签
    import comm from '../../utils/comm.js';
    const tpCommUrl={
        // getScreeningCondition:'/call/conference/index/getScreeningCondition/',//获取专业标签
        getMapList:'/call/caseFolder/template/getMapList/',//获取模板内容
        suggestion:'/call/customer/suggestion/create/',//提交反馈信息
        json_list_tree1:'/call/caseFolder/template_structure/json_list_tree1/',//获取新建病历一级列表
        json_list_tree2:'/call/caseFolder/template_structure/json_list_tree2/',//获取新建病历二级列表

    };
    export default {
        // name: 'index-app',
        props:['typeNameCase','crumbsText'],
        data() {
            return {
                page: Number(new URLSearchParams(window.location.search).get('page')) || 1,
                topics: [],
                majorName:[],
                libDateList:[],
                majorClass:['orderMajor',' jointMajor','spineMajor'],
                indexActive:0,
                isCallModule:false,
                textVal:'',
                inputVal:'',
                isThickness:false,
                ismainHide:false,
                thickLeftIndex:0,
                thickLeft:[],
                thickTitle:'',
                thickRight:[],
                submitSuccess:false,
                isBtnSubmit:false,
                isSelectActive:false,
                isSelectIndex:0,
                isItemIndex:0,
                userId:localStorage.getItem('userId')||"1463461611339",
                isLoading:false,
                templateId:'',
                locationData:{}
            }
        },
        components: {
            headerTopNav,
            NavSideBar,
            TopHeader,
            formSelect,
            formInputAge,
            surgeryCure,
            formSelectTime,
            formInput,
            formNumber,
            formTag,
            beforeSurgeryView,
            loading
        },
        watch:{
            textVal(){
                console.log(this.textVal&&this.inputVal)
                if(this.textVal){
                    this.isBtnSubmit=true;
                }else {
                    this.isBtnSubmit=false;
                }
            },
        },
        methods:{
            baseInfoBack(){
                history.go(-1);
            },
            templateTitle(title){
                if(title.length>21){
                    return title.slice(0,20)+'...'
                }else {
                    return title;
                }
            },
            //获取左侧专业列表
            ajaxMajor(){
                let t=this;
                t.isLoading=true;
                comm.ajax2({
                    url: tpCommUrl.getMapList,
                    type: "GET",
                    data: {
                        paramJson:JSON.stringify({"customerId":t.userId})
                    },
                    timeout: 30000,
                    success:function(res){
                        t.isLoading=false;
                        if(res&&res.responseObject&&res.responseObject.responseData&&res.responseObject.responseData.data_list){
                            t.libDateList=[{'typeName':'全部'}];
                            t.libDateList=t.libDateList.concat(res.responseObject.responseData.data_list);
                        }

                    }
                })
            },
            //左侧专业列表
            majorList(index){
                this.indexActive=index;
            },
            //对右侧模板背景颜色循环处理
            majorColor(index){
                if(index==0){
                    return 'allMajor';
                }else if(index%3==0){
                    return  this.majorClass[2]
                }else {
                    return  this.majorClass[index%3-1]
                }
            },
            //告诉我们
            callModule(){
                if(this.isCallModule){
                    this.closeCall();
                }else {
                    this.isCallModule=true;
                    this.isSelectActive=false;
                }

            },
            //告诉我们 取消
            btnCancel(){
                this.isCallModule=false;
                this.textVal='';
                this.inputVal='';
            },
            //告诉我们 提交
            btnSubmit(){
                if(this.isBtnSubmit){
                    console.log(this.textVal+':'+this.inputVal);
                    this.ajaxCallBtn(this.textVal);
                    this.textVal='';
                    this.inputVal='';
                    this.submitSuccess=true;
                    let t=this;
                    setTimeout(function () {
                        t.isCallModule=false;
                        t.submitSuccess=false;
                    },3000);
                }

            },
            //上传反馈信息
            ajaxCallBtn(suggestion){
                let t=this;
                t.isLoading=true;
                comm.ajax2({
                    url: tpCommUrl.suggestion,
                    type: "GET",
                    data: {
                        paramJson:JSON.stringify({"customerId":t.userId,"siteId":"1",'visitSiteId':'1',suggestion:suggestion,'suggestionType':11})
                    },
                    timeout: 30000,
                    success:function(res){
                        t.isLoading=false;
                    }
                })
            },
            //关闭弹窗
            closeCall(){
                this.btnCancel();
                if(this.typeNameCase){
                    this.isSelectActive=false;
                }

            },
            //模板预览
            modelItem(item,indexI,index){
                this.thickTitle=item.templateTitle||item;
                if(this.typeNameCase){
                    this.isSelectActive=true;
                    this.isSelectIndex=indexI;
                    this.isItemIndex=index;
                    this.btnCancel();
                    this.templateId=item.templateId;
                }else {
                    this.leftMenu(item.templateId);
                }

            },
            //获取左侧导航列表
            leftMenu(templateId){
                if(this.typeNameCase&&!this.isSelectActive){
                    return false;
                }
                let t=this;
                t.isThickness=true;
                t.ismainHide=true;
                t.isLoading=true;
                comm.ajax2({
                    // url: '/call/multicenter/major/case/getCaseMenu/',
                    url: tpCommUrl.json_list_tree1,
                    type: "GET",
                    data: {
                        // paramJson:JSON.stringify({"majorId":"1520408589147"})
                        paramJson:JSON.stringify({
                            "templateId":templateId,
                            'firstResult':0,
                            'maxResult':'999'
                        })
                    },
                    timeout: 30000,
                    success:function(res){
                        t.isLoading=false;
                        t.thickLeft=[{structureName:'患者基本信息'}];
                        if(res&&res.responseObject&&res.responseObject.responseData&&res.responseObject.responseData.data_list){
                            t.thickLeft=t.thickLeft.concat(res.responseObject.responseData.data_list);
                        }
                        t.baseInfoMenu();
                    }
                })
            },
            //获取患者基本信息
            baseInfoMenu(){
                this.thickRight=[
                    {
                        "commDataField": {
                            "fieldType": "8",
                            "fieldName": "姓名"
                        },
                        commDataThreshold:[
                            {thresholdValue:0},
                            {thresholdValue:20},
                        ],
                        isRequire:1
                    },
                    {
                        "commDataField": {
                            "fieldType": "5",
                            "fieldName": "年龄"
                        },
                        isRequire:1
                    },
                    {
                        "caseFolderTemplateScope": [
                            {
                                "dictionaryName": "男",
                            },
                            {
                                "dictionaryName": "女",
                            }
                        ],
                        "commDataField": {
                            "fieldType": "1",
                            "fieldName": "性别"
                        },
                        isRequire:1
                    },
                    {
                        "commDataField": {
                            "fieldType": "9",
                            "fieldName": "电话"
                        },
                        caseFolderTemplateScope:[
                        ],
                        commDataThreshold:[
                            {thresholdValue:0},
                            {thresholdValue:50},
                        ],
                    },
                    {
                        "commDataField": {
                            "fieldType": "9",
                            "fieldName": "编号"
                        },
                        caseFolderTemplateScope:[
                            {'value':''},
                        ],
                    },
                    {
                        "caseFolderTemplateScope": [
                            {
                                "dictionaryName": "共享给团队",
                            },
                            {
                                "dictionaryName": "仅自己可见",
                            }
                        ],
                        "commDataField": {
                            "fieldType": "1",
                            "fieldName": "归属"
                        },
                    },
                    {
                        "commDataField": {
                            "fieldType": "11111",
                            "fieldName": "标签"
                        },
                    },
                ];
            },
            //获取右侧内容区数据
            rightMenu(thickLeft,index){
                let t=this;
                t.isLoading=true;
                comm.ajax2({
                    url: tpCommUrl.json_list_tree2,
                    type: "GET",
                    data: {
                        // paramJson:JSON.stringify({"majorId":"1520408589147","menuId":menuId})
                        paramJson:JSON.stringify({
                            "templateId":thickLeft.templateId,
                            treelevel:2,
                            parentId:thickLeft.structureId,
                            firstResult:0,
                            'maxResult':'999'

                        })
                    },
                    timeout: 30000,
                    success:function(res){
                        t.isLoading=false;
                        if(res&&res.responseObject&&res.responseObject.responseData&&res.responseObject.responseData.data_list){
                            t.thickRight=res.responseObject.responseData.data_list[0];
                            t.locationData[index]=t.thickRight;
                        }

                    }
                })
            },
            //新建病历左侧导航
            selectThick(index){
                this.thickLeftIndex=index;
                if(index!=0){
                    if(this.locationData[index]){
                        this.thickRight=this.locationData[index]
                    }else {
                        this.rightMenu(this.thickLeft[index],index);
                    }

                }else {
                    this.baseInfoMenu();
                }
            },
            //模板预览关闭
            closeThick(){
                this.isThickness=false;
                this.ismainHide=false;
                this.thickLeftIndex=0;
                this.locationData={};
            },
            //使用
            useBtn(){
                this.$emit('tpUse',this.templateId);
            }

        },
        async mounted() {
            this.ajaxMajor();

        },
        // metaInfo: {
        //     title: '模板库'
        // }
    }
</script>
<style lang="scss">
    @import "../../assets/scss/base";
    @import "../../assets/scss/pages/newCases";
    @import "../../assets/scss/pages/templateLib";

    .newCases.thickCase .articleText{
        text-align: right;
    }
    .thickCase .inputCont ,.newCases.thickCase .formInputAge .inputText,.newCases.thickCase .selectCont,.newCases.thickCase .formNumber .inputCont{
        /*background: rgba(216,216,216,0.10);*/
    }
    .newCases.thickCase input{
        /*background: rgba(251, 251, 251,0.10);*/
    }
    .newCases.thickCase p.articleText{
        display: inline-block;
    }
    .thickCase .formTag{
        margin-bottom: 36px;
    }
    .fade-enter-active, .fade-leave-active {
        transition: all ease-in .5s;
        -moz-transition: all ease-in .5s; /* Firefox 4 */
        -webkit-transition: all ease-in .5s; /* Safari 和 Chrome */
        -o-transition: all ease-in .5s; /* Opera */
    }
    .fade-enter, .fade-leave-active {
        opacity: 0;
        transform: scale(0,0);
        transform-origin:90% 100%;

        -ms-transform: scale(0,0); 		/* IE 9 */
        -ms-transform-origin:90% 100%; 		/* IE 9 */

        -webkit-transform: scale(0,0);	/* Safari 和 Chrome */
        -webkit-transform-origin:90% 100%;	/* Safari 和 Chrome */

        -moz-transform: scale(0,0);		/* Firefox */
        -moz-transform-origin:90% 100%;		/* Firefox */

        -o-transform: scale(0,0);		/* Opera */
        -o-transform-origin:90% 100%;		/* Opera */
    }
</style>

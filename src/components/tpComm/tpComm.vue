
<template>
    <div class="alEmr-mainInner" @click="closeCall" :class="ismainHide?(typeName?'alEmr-mainCase mainHide':'mainHide'):(typeName?'alEmr-mainCase':'')">
        <NavSideBar v-if="!typeName"></NavSideBar>
        <TopHeader v-if="!typeName"></TopHeader>
        <header-top-nav v-if="typeName" :navName="'选择病例模板'"></header-top-nav>
        <section class="alEmr-mainIndex">
            <section class="alEmr-innerLeft">
                <ul>
                    <li v-for="(item,index) in majorName" :class="index==indexActive ? 'active' : ''" @click="majorList(index)">{{item}}</li>
                </ul>
            </section>
            <section class="alEmr-innerRight">
                <section class="alEmr-innerAll alEmr-moudel" v-for="(item,index) in majorName" :class="majorClass[index]" v-if="indexActive==index||indexActive==0">
                    <h4 v-if="index!=0">{{item}}</h4>
                    <div v-if="!typeName">
                        <p v-if="index==0" class="modelItem" @click="modelItem('通用模板')">通用模板</p>
                        <p v-for="(item,indexI) in libList" v-else class="modelItem" @click="modelItem(item)">{{item}}</p>
                    </div>
                    <div v-else>
                        <p v-if="index==0" class="modelItem" @click.stop.prevent="modelItem('通用模板',0,index)" :class="isSelectActive&&isSelectIndex==0&&isItemIndex==0?'active':''">通用模板</p>
                        <p v-for="(item,indexI) in libList" v-else class="modelItem" @click.stop.prevent="modelItem(item,indexI,index)" :class="isSelectActive&&isSelectIndex==indexI&&isItemIndex==index?'active':''">{{item}}</p>
                    </div>
                </section>
                <p class="alEmr-innerMore">~更多模板正在准备中，尽请期待~</p>
                <section class="callOur">
                    <section :class="typeName?'caseCallTop':''" class="callContent">
                        <span class="callText">没有需要的病例模板？</span>
                        <div class="callContainer">
                            <span class="callLink" @click.stop.prevent="callModule">告诉我们</span>
                            <div class="callModule" v-if="isCallModule" @click.stop.prevent>
                                <span class="closeCall" @click="btnCancel"></span>
                                <div v-if="!submitSuccess" class="contentCon">
                                    <h4>请告诉我们你您需要的病例模板</h4>
                                    <textarea placeholder="请简单说明您需要的模板名称、主要内容等" v-model="textVal"></textarea>
                                    <h4>您的联系方式</h4>
                                    <input v-model="inputVal"/>
                                    <div class="btnModule">
                                        <!--<button class="btnCancel" @click="btnCancel">取消</button>-->
                                        <button class="btnSubmit" @click="btnSubmit" :class="isBtnSubmit?'active':''">提交</button>
                                    </div>
                                </div>
                                <div v-else class="subSuccess">
                                    <div class="subText">
                                        <h2><i></i>提交成功</h2>
                                        <p>感谢您的宝贵建议，我们会尽快向您反馈处理结果</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section v-if="typeName" class="baseInfoCotainer">
                        <a href="#" class="baseInfoBack" @click.stop.prevent>返回基本信息</a>
                        <div class="btnBase" :class="isSelectActive?'active':''" @click.stop.prevent>
                            <button class="btnReview" @click="leftMenu">预览</button>
                            <button class="BtnUse">使用</button>
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
                        <li v-for="(item,index) in thickLeft" :class="thickLeftIndex==index?'active':''" @click="selectThick(index)">{{item.menuName}}</li>
                    </ul>
                </section>
                <section class="thickRight">
                    <section class="newCases">
                        <!--<aside class="casesWidth">-->
                        <section v-for="(item,index) in thickRight">
                            <form-input-age v-if="item.id==18"></form-input-age>
                            <form-number v-if="item.id==18"></form-number>
                            <form-tag v-if="item.id==18"></form-tag>
                            <!--//1-文本框,2-单选,3-复选,4-下拉列表,5-文本域,6-图片,7-视频,8-年月日控件，9-年月日时分控件，10-月周天控件，11-月周天小时时分控件-->
                            <form-input v-if="item.menuType==1" :data="item"></form-input>
                            <form-radio v-if="item.menuType==2" :data="item"></form-radio>
                            <form-select v-if="item.menuType==4" :data="item"></form-select>
                            <now-medical v-if="item.menuType==5" :data="item"></now-medical>
                            <surgery-cure v-if="item.menuType==8" :data="item"></surgery-cure>
                            <surgery-cure-hour v-if="item.menuType==9" :data="item"></surgery-cure-hour>
                            <form-select-time-y v-if="item.menuType==10" :data="item"></form-select-time-y>
                            <form-select-time v-if="item.menuType==11" :data="item"></form-select-time>
                        </section>
                        <!--</aside>-->
                    </section>
                </section>
                <section class="thickFooter" v-if="typeName">
                    <button>使用</button>
                </section>
            </section>
        </section>
    </div>
</template>
<script>
    import headerTopNav from '~components/common/headerTopNav.vue';
    import navComponent from '~components/nav-component.vue';
    import NavSideBar from '~components/common/NavSideBar.vue';
    import TopHeader from '~components/common/TopHeader.vue';
    import formInput from './component/formInput';//1-文本输入框
    import formInputAge from './component/formInputAge';//年龄
    import formNumber from './component/formNumber';//下拉选择+输入框
    import formRadio from './component/formRadio';//2-单选
    import formSelect from './component/formSelect';//4-下拉列表
    import nowMedical from './component/nowMedical';//5-文本域
    import surgeryCure from './component/surgeryCure';//8-年月日控件
    import surgeryCureHour from './component/surgeryCureHour';//9-年月日时分控件
    import formSelectTimeY from './component/formSelectTimeY';//10-年月日控件
    import formSelectTime from './component/formSelectTime';//11-月周天控件
    import formTag from './component/formTag';//标签


    import comm from '../../utils/comm.js';
    export default {
        name: 'index-app',
        props:['typeName'],
        data() {
            return {
                page: Number(new URLSearchParams(window.location.search).get('page')) || 1,
                topics: [],
                majorName:['全部','定制','关节','脊柱','创伤'],
                libList:['强制性脊柱炎模板','髌骨骨折模板','髌骨骨折模板','髌骨骨折模板'],
                majorClass:['allMajor','orderMajor',' jointMajor','spineMajor','orderMajor'],
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
                isItemIndex:0
            }
        },
        components: {
            headerTopNav,
            navComponent,
            NavSideBar,
            TopHeader,
            formInput,
            formInputAge,
            formNumber,
            formRadio,
            formSelect,
            formSelectTime,
            formTag,
            nowMedical,
            surgeryCure,
            surgeryCureHour,
            formSelectTimeY
        },
        watch:{
            textVal(){
                console.log(this.textVal&&this.inputVal)
                if(this.textVal||this.inputVal){
                    this.isBtnSubmit=true;
                }else {
                    this.isBtnSubmit=false;
                }
            },
            inputVal(){
                console.log(this.textVal&&this.inputVal)
                if(this.textVal||this.inputVal){
                    this.isBtnSubmit=true;
                }else {
                    this.isBtnSubmit=false;
                }
            },
        },
        methods:{
            //左侧专业列表
            majorList(index){
                this.indexActive=index;
            },
            //告诉我们
            callModule(){
                this.isCallModule=true;
                this.isSelectActive=false;
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
            //关闭弹窗
            closeCall(){
                this.btnCancel();
                if(this.typeName){
                    this.isSelectActive=false;
                }

            },
            //模板预览
            modelItem(item,indexI,index){
                this.thickTitle=item;
                if(this.typeName){
                    this.isSelectActive=true;
                    this.isSelectIndex=indexI;
                    this.isItemIndex=index;
                    this.btnCancel();
                }else {
                    this.leftMenu();
                }

            },
            //获取左侧导航列表
            leftMenu(){
                if(this.typeName&&!this.isSelectActive){
                    return false;
                }
                let t=this;
                t.isThickness=true;
                t.ismainHide=true;
                comm.ajax2({
                    url: '/call/multicenter/major/case/getCaseMenu/',
                    type: "GET",
                    data: {
                        paramJson:JSON.stringify({"majorId":"1520408589147"})
                    },
                    timeout: 30000,
                    success:function(res){
                        t.thickLeft=res.responseObject.responseData.data_list;
                        t.rightMenu(t.thickLeft[0].menuId);
                    }
                })
            },
            //获取右侧内容区数据
            rightMenu(menuId){
                let t=this;
                comm.ajax2({
                    url: '/call/multicenter/major/case/getCaseSecondMenu/',
                    type: "GET",
                    data: {
                        paramJson:JSON.stringify({"majorId":"1520408589147","menuId":menuId})
                    },
                    timeout: 30000,
                    success:function(res){
                        t.thickRight=res.responseObject.responseData.data_list[0];
                    }
                })
            },
            //新建病例左侧导航
            selectThick(index){
                this.thickLeftIndex=index;
                this.rightMenu(this.thickLeft[index].menuId);
            },
            //模板预览关闭
            closeThick(){
                this.isThickness=false;
                this.ismainHide=false;
                this.thickLeftIndex=0;
            }

        },
        async mounted() {
            // axios({
            //     method: 'post',
            //     url: '/call/ad/position/profile/getMapList/',
            //     data: {"firstResult":0,"maxResult":10,"visitSiteId":1,"channelId":68,"isIndex":1,"platformId":"1","customerId":"1399252409974"},
            //     transformRequest: [function (data) {
            //         return "paramJson=" + JSON.stringify(data);
            //     }],
            //     headers: {
            //         'X-Requested-With': 'XMLHttpRequest'
            //     },
            //     timeout: 30000
            // }).then(function (res) {
            //     console.log(res)
            // });

        },
        // metaInfo: {
        //     title: '模板库'
        // }
    }
</script>
<style lang="scss">
    @import "../../assets/scss/pages/templateLib";
    @import "../../assets/scss/pages/newCases";
    .newCases .articleText{
        text-align: right;
    }
    .inputCont ,.newCases .formInputAge .inputText,.newCases .selectCont,.newCases .formNumber .inputCont{
        background: rgba(216,216,216,0.10);
    }
    .newCases input{
        background: rgba(251, 251, 251,0.10);
    }
    .newCases p.articleText{
        display: inline-block;
    }
    .formTag{
        margin-bottom: 36px;
    }

</style>

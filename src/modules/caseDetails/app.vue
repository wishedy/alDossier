<template>
    <div class="alEmr-mainInner">
        <section class="alEmr-mainIndex" style="padding-left: 0">
            <TopHeader></TopHeader>
            <caseDetail></caseDetail>
            <section class="detRecord">
                <div class="repRecord" @click.stop="repRecordCli()">报道信息</div>
                <div class="InqRecord" @click.stop="InqRecordCli()">问诊信息</div>
            </section>
            <!--无报道信息-->
            <section class="reportLogNone" v-show="reportLogNone">
                <article class="reportLogCont">
                    <div class="reportLogTop">
                        报到信息<i @click.stop="repInqQuit"></i>
                    </div>
                    <div class="noneReportImg">
                        <img src="/static/images/pages/caseDetail/reportNone.png" alt="">
                    </div>
                    <div class="noneReportTxt">
                        暂无报道信息
                    </div>
                    <!--<reportLogItem></reportLogItem>-->
                </article>
            </section>
            <!--无问诊信息-->
            <section class="reportLogNone" v-show="inqLogNone">
                <article class="reportLogCont">
                    <div class="reportLogTop">
                        问诊信息<i @click.stop="repInqQuit"></i>
                    </div>
                    <div class="noneReportImg">
                        <img src="/static/images/pages/caseDetail/InquisitionNone.png" alt="">
                    </div>
                    <div class="noneReportTxt">
                        暂无问诊信息
                    </div>
                </article>
            </section>
            <!--报道信息-->
            <section class="reportLog" v-show="reportLog">
                <article class="reportLogCont">
                    <div class="reportLogTop">
                        报到信息<i @click.stop="repInqQuit"></i>
                    </div>
                    <div class="reportLogBot">
                        <reportLogItem></reportLogItem>
                        <!--<reportLogImgItem></reportLogImgItem>-->
                    </div>
                </article>
            </section>
            <!--问诊信息-->
            <section class="reportLog" v-show="inqLog">
                <article class="reportLogCont">
                    <div class="reportLogTop">
                        问诊信息<i @click.stop="repInqQuit"></i>
                    </div>
                    <div class="reportLogBot">
                        <div>
                            <ul class="inqLeftNav">
                                <li :class="{active:index==inqIndex}" @click.stop="inqItemCli(index)" v-for="(item,index) in inqLeft" :data-caseId="item.caseId">{{item.timeYMD}}</li>
                            </ul>
                            <div class="inqContent" v-for="(item,index) in inqRight">
                                <!--v-for="(item,index) in inqRight"-->
                                <div class="inqLogItemCont">
                                    <div class="repItemDesc">
                                        <div class="repItem">
                                            <p class="repImteLeft">患者</p>
                                            <p class="repImteRight">{{item.patientName}}&nbsp;&nbsp;&nbsp;{{item.sexName}}&nbsp;&nbsp;&nbsp;{{item.age}}岁</p>
                                        </div>
                                        <div class="repItem">
                                            <p class="repImteLeft">电话</p>
                                            <p class="repImteRight">{{item.mobile}}</p>
                                        </div>
                                        <div class="repItem">
                                            <p class="repImteLeft">民族</p>
                                            <p :class="{repImteRight:true,noneTxt:item.nation==''}">{{item.nation?item.nation:'未填写'}}</p>
                                        </div>
                                        <!--<div class="repItem">-->
                                            <!--<p class="repImteLeft">籍贯</p>-->
                                            <!--<p :class="{repImteRight:true,noneTxt:item.nativeProvince==''&&item.nativeCity==''&&item.nativeDistrict==''}">{{item.nativeProvince||item.nativeCity||item.nativeDistrict?item.nativeProvince+'&nbsp;'+item.nativeCity+'&nbsp;'+item.nativeDistrict:'未填写'}}</p>-->
                                        <!--</div>-->
                                        <div class="repItem">
                                            <p class="repImteLeft">婚姻状况</p>
                                            <p :class="{repImteRight:true,noneTxt:item.nation==1}">{{item.isMarriage|isMarriage}}</p>
                                        </div>
                                        <div class="repItem">
                                            <p class="repImteLeft">家庭地址</p>
                                            <p :class="{repImteRight:true,noneTxt:item.homeAddress==''}">{{item.homeAddress?item.homeAddress:'未填写'}}</p>
                                        </div>
                                        <div class="repItem">
                                            <p class="repImteLeft">工作单位</p>
                                            <p :class="{repImteRight:true,noneTxt:item.workplace==''}">{{item.workplace?item.workplace:'未填写'}}</p>
                                        </div>
                                    </div>
                                    <div class="repItemTitle">
                                        <span>患者自述</span>
                                    </div>
                                    <div class="repItemDesc">
                                        <div class="repItem" v-show="item.caseMain!=''">
                                            <p class="repImteLeft">患者主诉</p>
                                            <p class="repImteRight">{{item.caseMain}}</p>
                                        </div>
                                        <div class="repItem" v-show="item.caseProperties!=''">
                                            <p class="repImteLeft">疼痛说明</p>
                                            <p class="repImteRight">{{item.caseProperties}}</p>
                                        </div>
                                        <div class="repItem" v-show="item.descriptionDisease!='{}'">
                                            <p class="repImteLeft">病情描述</p>
                                            <p class="repImteRight">{{item.descriptionDisease}}</p>
                                        </div>
                                        <!--<div class="repItem" v-show="item.!=''">-->
                                            <!--<p class="repImteLeft">就诊目的</p>-->
                                            <!--<p class="repImteRight">{{item.}}</p>-->
                                        <!--</div>-->
                                        <div class="repItem" v-show="item.treatmentList!=''">
                                            <p class="repImteLeft">治疗情况</p>
                                            <p class="repImteRight">{{item.treatmentList|commOption}}</p>
                                        </div>
                                        <!--<div class="repItem" v-show="item.takeMedicine!=''">-->
                                            <!--<p class="repImteLeft">在用药物</p>-->
                                            <!--<p class="repImteRight">{{item.takeMedicine}}</p>-->
                                        <!--</div>-->
                                        <!--<div class="repItem" v-show="item.!=''">-->
                                            <!--<p class="repImteLeft">理疗名称</p>-->
                                            <!--<p class="repImteRight">{{item.}}</p>-->
                                        <!--</div>-->
                                        <!--<div class="repItem" v-show="item.!=''">-->
                                            <!--<p class="repImteLeft">针剂名称</p>-->
                                            <!--<p class="repImteRight">{{item.}}</p>-->
                                        <!--</div>-->
                                        <!--<div class="repItem" v-show="item.!=''">-->
                                            <!--<p class="repImteLeft">手术名称</p>-->
                                            <!--<p class="repImteRight">{{item.}}</p>-->
                                        <!--</div>-->
                                        <!--<div class="repItem" v-show="item.!=''">-->
                                            <!--<p class="repImteLeft">手术时间</p>-->
                                            <!--<p class="repImteRight">{{item.}}</p>-->
                                        <!--</div>-->
                                    </div>
                                    <div class="repItemTitle">
                                        <span>影像资料({{item.caseAttList,item.videoAttList|imgNum}})</span>
                                    </div>
                                    <div class="repItemImgDesc">
                                        <div class="repImgItem">
                                            <div class="ImgItemTitle">图片资料</div>
                                            <div class="ImgItemDesc" v-for="(ite,ind) in item.caseAttSortList">
                                                <div class="ImgItemData">{{ite.dataList[0].createTime|dateFilter}}</div>
                                                <ul class="ImgItems">
                                                    <li class="ev-bigImg" :listId="items.id" @click.stop="viewBigImg" v-for="(items,i) in ite.dataList" v-show="i<12">
                                                        <img v-bind:src="items.caseAttUrl" alt="">
                                                        <p class="repImgMore">
                                                            还有<span>{{ite.dataList,12|imgMore}}</span>张><i></i>
                                                        </p>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="repImgItem">
                                            <div class="ImgItemTitle">其他文件</div>
                                            <div class="ImgItemDesc">
                                                <ul>
                                                    <li class="imgItemList" v-for="(itemOther,indexOther) in item.videoAttList">
                                                        <img src="/static/images/pages/caseDetail/pdfImg.png" alt="">
                                                        <div class="imgItemListDesc">
                                                            <p><a :href="itemOther">{{名字名字}}</a></p>
                                                            <p>
                                                                <span>2017-11-10</span>
                                                                <span>1.5M</span>
                                                            </p>
                                                        </div>
                                                    </li>
                                                    <li class="imgItemList">
                                                        <img src="/static/images/pages/caseDetail/pdfImg.png" alt="">
                                                        <div class="imgItemListDesc">
                                                            <p>颈椎侧位片检查报告.pdf</p>
                                                            <p>
                                                                <span>2017-11-10</span>
                                                                <span>1.5M</span>
                                                            </p>
                                                        </div>
                                                    </li>
                                                    <li class="imgItemList">
                                                        <img src="/static/images/pages/caseDetail/videoImg.png" alt="">
                                                        <div class="imgItemListDesc">
                                                            <p>颈椎侧位片检查报告.pdf</p>
                                                            <p>
                                                                <span>2017-11-10</span>
                                                                <span>1.5M</span>
                                                            </p>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="repItemTitle" v-show="item.triageMap.remarkList!=''">
                                        <span>专科检查</span>
                                    </div>
                                    <div class="repItemDesc">
                                        <div class="repItem" v-for="(itemSpe,indexSpe) in item.specialtyMap">
                                            <p class="repImteLeft">视诊</p>
                                            <p class="repImteRight"></p>
                                        </div>
                                    </div>
                                    <div class="repItemTitle" v-show="item.triageMap.remarkList!=''">
                                        <span>分诊备注</span>
                                    </div>
                                    <div class="repItemDesc" v-show="item.triageMap.remarkList!=''">
                                        <div class="repItem" v-for="(itemRem,indexRem) in item.triageMap.remarkList">
                                            <p class="repImteLeft" style="margin:0">备注{{indexRem+1}}：</p>
                                            <p class="repImteRight">{{itemRem.remarkContent}}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!--<InqLogItem></InqLogItem>-->
                    </div>
                </article>
            </section>
            <!--视频开始-->
            <!--<videoPlayer :path="path" :beginPlay="beginPlay"></videoPlayer>-->
            <!--视频结束-->
        </section>
        <loading v-show="showLoadi"></loading>
    </div>
</template>
<script>
    import NavSideBar from '~components/common/NavSideBar.vue';
    import TopHeader from '~components/common/caseDetailHeaderTopNav.vue';
    import caseDetail from './components/caseDetail.vue';
    import slideBar from './components/caseSlideBar.vue';//病历详情左侧导航
    import reportLogItem from './components/reportLogItem.vue';//报道信息不带图片
    import reportLogImgItem from './components/reportLogImgItem.vue';//报道信息带有图片+pdf
    // import InqLogItem from './components/inqLogItem.vue';//问诊信息
    import InqLogImgItem from './components/inqLogImgItem.vue';
    import videoPlayer from  '~components/videoPlayer/videoPlayer.vue'
    import loading from '~components/loading/loading.vue';
    import user from "~utils/user.js";
    import comm from "~utils/comm.js";
    // import {mapActions,mapGetters} from 'vuex';

    import axios from 'axios';
    import viewBigImgAll from '../../utils/view-big-img/module.view-big-img.js'
    export default {
        name: 'index-app',
        data() {
            return {
                bodyHidden:'',
                page: Number(new URLSearchParams(window.location.search).get('page')) || 1,
                topics: [],
                reportLogNone:false,//无报道信息
                reportLog:false,//有报道信息
                inqLogNone:false,//无问诊信息
                inqLog:false,//有问诊信息
                path:'https://vpro01.allinmd.cn/1523411864042_480_320.mp4?1523412002',
                beginPlay:false,//开始播放视频
                showLoadi:false,
                // showLoading:false,
                inqLeft:[],//问诊信息左侧导航列表
                inqIndex:0,
                inqRight:[],
            }
        },
        components: {
            NavSideBar,
            TopHeader,
            caseDetail,
            reportLogItem,
            reportLogImgItem,
            // InqLogItem,
            InqLogImgItem,
            loading
        },
        computed:{
            // ...mapGetters(['showLoad'])
        },
        methods:{
            //报道信息
            repRecordCli(){
                let t = this;
                $('body').addClass('bodyHidden');
                $('body').css('position',"");
                $('body').css('overflow',"hidden");
            //    在接口中判断时候有报道信息
            //     t.reportLogNone = true;
                t.reportLog = true;
                // t.showLoadi(true);
            },
            //问诊信息
            InqRecordCli(){
                let t = this;
                $('body').addClass('bodyHidden');
                $('body').css('position',"");
                $('body').css('overflow',"hidden");
                // t.inqLogNone = true;
                t.inqLog = true;
                // t.showLoading = true;
                t.inqLeftBar();//问诊左侧导航信息
            },
            repInqQuit(){
                let t = this;
                $('body').removeClass('bodyHidden');
                $('body').css('position',"static");
                $('body').css('overflow',"scroll");
                t.reportLogNone=false;//无报道信息
                t.reportLog=false;//有报道信息
                t.inqLogNone=false;//无问诊信息
                t.inqLog=false;
            },
            // ...mapActions(['showLoadi'])
            inqLeftBar(){//问诊记录左侧导航
                let t = this;
                comm.ajax2({
                    url: '/call/patient/case/getInquisitionList/',
                    type: "post",
                    data: {
                        paramJson:JSON.stringify({"patientId":"1524022739020","customerId":"1428327147313"})
                    },
                    timeout: 30000,
                    success:function(res){
                        t.inqLeft = res.responseObject.responseData.dataList;
                        t.inqRightCon(1);
                    }
                })
            },
            inqRightCon(type){
                let t = this;
                comm.ajax2({
                    url:'/call/patient/case/getMapByCaseIds/',
                    type: "get",
                    data: {
                        paramJson:JSON.stringify({
                            // caseIdList:t.inqCaseList,
                            // visitSiteId:1,
                            // caseSocure:type,//1--问诊，2--报道
                            // patientId:1524022739020,
                            // customerId:1428327147313,
                "caseIdList":"1531453533882","visitSiteId":1,"caseSocure":1,"patientId":1524022739020,"customerId":1428327147313}
                        )
                    },
                    timeout: 30000,
                    success:function(res){
                        // t.detailItem = res.response_data;
                        if(res&&res.responseObject&&res.responseObject.responseData&&res.responseObject.responseData.dataList){
                            t.inqRight = res.responseObject.responseData.dataList;
                        }
                    }
                })
            },
            inqItemCli(index){//问诊记录左侧导航点击事件
                this.inqIndex = index;
            },
            viewBigImg(e){
                e.stopPropagation();
                e.preventDefault();
                let imgList=[],
                    id=$(e.target).parents('.ev-bigImg').attr("listId"),
                    container=$(e.target).parents("ul");
                if(id){
                    $('.ev-bigImg',container).each(function(i,em){
                        imgList.push({id:$(em).attr("listid"),url:$(em).find("img").attr("src")});
                    });
                    viewBigImgAll({
                        container:container,
                        typeTitle: "",
                        imgListType:'caze',
                        id: id,
                        imgList:imgList,
                        srcSplit:true,
                        isPopup:true,
                    });
                }
            },
        },
        filters:{
            isMarriage(type){
                let t = this,txt='未婚';
                switch (type){//1-未婚2-已婚3-离异4-丧偶
                    case -1:
                        txt = '未填写';
                        break;
                    case 1:
                        txt = '未婚';
                        break;
                    case 2:
                        txt = '已婚';
                        break;
                    case 3:
                        txt = '离异';
                        break;
                    case 4:
                        txt = '丧偶';
                        break;
                }
                return txt;
            },
            imgNum(num1,num2){//问诊信息中影像资料显示总数
                  return parseInt(num1.length)+parseInt(num2.length);
            },
            dateFilter(txt){//年月日的格式修改
                txt = txt.split(' ');
                txt = txt[0].split('-');
                txt = txt[0]+'年'+txt[1]+'月'+txt[2];
                return txt;
            },
            imgMore(txt,num){
                if(txt.length>num){
                    return parseInt(txt.length)-parseInt(num);
                }else{
                    return 0
                }
            },
            commOption(data){
                let txt = '';
                for(let i = 0;i<data.length;i++){
                    txt+=data[i].commOptionName+'，';
                }
                return txt.substring(0,txt.length-1);
            }

        },
        metaInfo: {
            title: '病历详情'
        },
        watch:{
            bodyHidden(){

            }
        },
        mounted() {
            let t = this;
            user.login({
                scene:0
            });
            // setTimeout(function () {
            //     t.beginPlay = true;
            // },2000)
            // $('body').addClass('bodyHidden');
        },
    }
</script>
<style lang="scss">
    @import "../../assets/scss/base.scss";
    @import "../../assets/scss/pages/caseDetail.scss";
</style>

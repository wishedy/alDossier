<template>
    <div class="alEmr-mainInner">
        <header-top-nav :crumbsTxt="crumbsTxt" :pageType="2"></header-top-nav>
        <section class="alEmr-mainIndex" style="padding-left: 0">
            <section class="alEmr-indexInner">
                <div class="patListCon">
                    <div class="importBtn" @click="importBtn">
                        <div class="impDef" v-show="impDef">
                            导入 <span class="patChoNum" v-text="patChoNum">0</span>
                        </div>
                        <span class="patTip" v-show="tipError">请选择一个患者</span>
                        <!--导入按钮...显示-->
                        <ul class="impPro" v-show="impPro"><li></li><li></li><li></li></ul>
                    </div>
                    <section class="patLists" v-for="(item,index) in patientLists">
                        <section class="calendar"><i></i><span>{{item.timeYMD|dateChange}}</span></section>
                        <ul>
                            <li :class="{patListItem:true,unchecked:sonItem.isSelected==1,active:indexItem.indexOf(i+'-'+sonItem.caseId)>-1}" v-for="(sonItem,i) in item.dataList">
                                <span class="patChooBtn" @click.stop="(sonItem.isSelected==0?true:false) && itemCli(i,sonItem.caseId,sonItem)"></span>
                                <span :class="{patType:true,typeTwo:sonItem.caseType!=14}" v-text="sonItem.caseType==14?'报道患者':'问诊患者'"></span>
                                <span class="patName">{{sonItem.patientName,4|titLen}}</span>
                                <span class="patSex">{{sonItem.patientSex|patientSex}}</span>
                                <span class="patAge">{{sonItem.patientAge}}</span>
                                <span class="patNum1" v-show="sonItem.caseType==14">{{sonItem.cell2,8|titLen}}</span>
                                <span class="patNum1" v-show="sonItem.caseType==14">{{sonItem.cell3,8|titLen}}</span>
                                <span class="patNum1" v-show="sonItem.caseType==14">{{sonItem.cell4,8|titLen}}</span>
                                <span class="patNum1" v-show="sonItem.caseType==14">{{sonItem.cell5,8|titLen}}</span>
                                <span class="patNum" v-show="sonItem.caseType!=14">{{sonItem.caseMain,43|titLen}}</span><!--问诊患者只展示主诉-->
                            </li>
                        </ul>
                    </section>
                </div>
                <div class="patPopupCont" v-show="importErr||importSuc">
                    <section class="importError" v-show="importErr">
                        <i class="impClose" @click.stop="popupCancle"></i>
                        <article class="impErrTop">
                            <i></i>
                            <p>导入失败，请检查你的的网络设置</p>
                        </article>
                        <article class="impErrBot">
                            <button class="impCancle" @click.stop="popupCancle">取消</button>
                            <button class="impAgain" @click="importBtn">重新上传</button>
                        </article>
                    </section>
                    <section class="importSuc importError" v-show="importSuc">
                        <i class="impClose" @click.stop="popupSucCancle"></i>
                        <article class="impErrTop">
                            <i></i>
                            <div>
                                <p>导入成功</p>
                                <p>
                                    已将已选择的患者成功导入到病历中，可
                                    在全部病历中查看
                                </p>
                            </div>
                        </article>
                        <article class="impErrBot">
                            <button class="impAgain" @click.stop="Iknow">知道了</button>
                        </article>
                    </section>
                </div>
                <!--分页开始-->
                <pagination :pageIndex="pageIndex" :pageSize="pageSize" :total="total" @change="pageChange" v-if="showPager"></pagination>
                <!--分页结束-->
            </section>
        </section>
        <!--loading开始-->
        <loading v-show="showLoading" @showLoading="showLoading"></loading>
        <!--loading结束-->
    </div>
</template>
<script>
    import patList from './components/patientsList.vue';
    import pagination from "~components/pagination/pagination.vue";
    import videoPlayer from  '~components/videoPlayer/videoPlayer.vue';
    import loading from '~components/loading/loading.vue';
    import comm from '../../utils/comm.js';

    import axios from 'axios';
    import HeaderTopNav from "../../components/common/headerTopNav";
    const xUrl={
        patientList:'/call/patient/case_baseinfo/getPatientCaseSelects/',//选择患者列表
        importCreat:'/call/caseFolder/baseinfo/batchCreate/',//导入病例
    };
    export default {
        name: 'index-app',
        provide(){
          return{
              reload:this.reload
          }
        },
        data() {
            return {
                customerId:'1501482969554',
                page: Number(new URLSearchParams(window.location.search).get('page')) || 1,
                topics: [],
                pageIndex:0,
                pageSize:10,
                total:0,
                crumbsTxt:'选择患者',
                showLoading:false,
                tipError:false,//错误提示，true为显示错误提示
                patientLists:'',
                patChoNum:0,
                isClicked:false,//用来标示已经点击过
                // indexItem:0
                indexItem:[],//用来标示是否选中
                patientData:[],//用来存放所有传入的数据
                cliFlag:true,
                importSuc:false,//导入成功
                importErr:false,//导入失败
                showPager:false,//展示分页
                impDef:true,//导入按钮默认显示导入
                impPro:false,//点击导入过程中显示"···"
                belongType:0
            }
        },
        // inject:['reload'],
        components: {
            HeaderTopNav,//顶部fixed
            patList,//患者列表
            pagination,//分页
            videoPlayer,//视频播放器
            loading,//loading
        },
        mounted() {
            let t=this;
            t.patientList();
        },
        watch:{
            importErr(){
                if(this.importErr){
                    $('body').addClass('bodyHidden');
                }else{
                    $('body').removeClass('bodyHidden');
                }
            },
            importSuc(){
                if(this.importSuc){
                    $('body').addClass('bodyHidden');
                }else{
                    $('body').removeClass('bodyHidden');
                }
            },
        },
        methods:{
            pageChange(pageIndex){//切换页数，请求数据
                this.patientList((pageIndex-1)*this.pageSize+1);
            },
            importBtn(){
                let t = this;
                if(t.patChoNum<=0){//是否已经选择了病例
                    t.tipError = true;
                    let timer = setTimeout(function () {
                        t.tipError = false;
                        clearTimeout(timer);
                    },3000);
                }else{
                    //    此时走入接口判断是否导入成功过
                    t.showLoading=true;
                    // t.importErr=false;//导入失败
                    // t.patientData.push({customerId: t.customerId});
                    // t.patientData.push({belongType : t.belongType});//0--个人，1--团队
                    // t.patientData.push({siteId : 1});//
                    console.log(t.patientData);
                    comm.ajax2({
                        url: xUrl.importCreat,
                        type:"post",
                        data:{
                            paramJson:JSON.stringify(t.patientData)
                        },
                        timeout: 30000,
                        success:function(res){
                            t.showLoading=false;
                            t.impDef = false;//导入按钮默认样式
                            t.impPro = true;//导入过程按钮...显示
                            if(res&&res.responseObject&&res.responseObject.responseStatus){//导入成功
                                t.importSuc=true;//导入成功
                                t.importErr=false;
                                t.impDef = true;
                                t.impPro = false;
                            }else{
                                t.importSuc=false;
                                t.importErr=true;//导入失败
                                t.impDef = true;
                                t.impPro = false;
                            }
                        }
                    })
                }
            },
            itemCli(indexInner,caseId,info){
                let t = this,index = '';
                t.isClicked = true;
                index=indexInner+'-'+caseId;
                if(t.indexItem.indexOf(index)>-1){
                    //移除元素
                    t.indexItem.splice(t.indexItem.indexOf(index), 1);
                    t.patientData.splice(t.patientData.indexOf(index),1);
                    t.patChoNum--;
                }else {
                    //选中元素
                    t.indexItem.push(index);
                    if(info.caseType==14){//如果是报道患者则不传证件号
                        t.patientData.push({
                            patientName:info.patientName,
                            patientAge:info.patientAge,
                            patientSex:info.patientSex,
                            patientMobile:info.mobile,
                            belongType:0,
                            customerId:t.customerId,
                            siteId:1,
                            patientId:info.patientId
                        });
                    }else{
                        t.patientData.push({
                            patientName:info.patientName,
                            patientAge:info.patientAge,
                            patientSex:info.patientSex,
                            patientMobile:info.mobile,
                            numberType:4,
                            numberContent:info.certificateCode,
                            belongType:0,
                            customerId:t.customerId,
                            siteId:1,
                            patientId:info.patientId
                        });
                    }
                    t.patChoNum++;
                }
            },
            patientList(pageIndex){
                let t=this;
                t.showLoading=true;
                comm.ajax2({
                    // url: '/call/multicenter/major/customer/getCustomerList/',
                    // url: '/emrpc/choosePatients/',
                    url: xUrl.patientList,
                    type:"get",
                    data:{
                        // id:1
                        paramJson:JSON.stringify({"customerId":t.customerId,"firstResult":(pageIndex?pageIndex-1:t.pageIndex)+1,"maxResult":t.pageSize})
                    },
                    timeout: 30000,
                    success:function(res){
                        if(res&&res.responseObject&&res.responseObject.items){
                            t.showLoading=false;
                            t.patientLists=res.responseObject.items;
                            t.pageIndex = res.responseObject.pageIndex;
                            t.pageSize = res.responseObject.pageSize;
                            t.total = res.responseObject.pageCount;
                            if(res.responseObject.pageCount>1){
                                t.showPager = true;
                            }
                        }
                    }
                })
            },
            popupCancle(){//失败后点击取消或者关闭按钮
                this.importSuc=false;
                this.importErr=false;
                // t.reload();
            },
            popupSucCancle(){
                location.reload();//点击X重新刷新页面
            },
            Iknow(){//点击我知道了 进入全部病例页
                window.location.href='/'
            }
        },
        filters:{
            patientSex(sex){
                if(sex==1){
                    return '男'
                }else{
                    return '女'
                }
            },
            titLen:function (txt,len) {//判断title长度进行显示长内容
                if(txt){
                    if(len&&txt.length>len){
                        return txt.substring(0,len)+"..."
                    }else{
                        return txt;
                    }
                }
            },
            dateChange:function (date) {
                if(date){
                    let newDate = date.split("-");
                    return newDate[1]+'月'+newDate[2]+'日';
                }
            }
        },
        metaInfo: {
            title: '选择患者'
        }
    }
</script>
<style lang="scss">
    @import "../../assets/scss/base.scss";
    @import "../../assets/scss/pages/chosePatient.scss";
</style>

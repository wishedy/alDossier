<template>
    <div>
        <div class="detslideCon">
            <ul>
                <li :class="{detSliItem:true,active:index == listIndex}" v-for="(item,index) in detailItem" @click.stop="itemCli(index)">
                    <a :href="'#'+index">{{item.title}}</a>
                </li>
                <!--<li class="detSliItem">主诉</li>-->
                <!--<li class="detSliItem">现病史</li>-->
                <!--<li class="detSliItem">既往史</li>-->
                <!--<li class="detSliItem">专科检查</li>-->
                <!--<li class="detSliItem">术前影像资料</li>-->
                <!--<li class="detSliItem">初步诊断</li>-->
                <!--<li class="detSliItem">手术治疗</li>-->
                <!--<li class="detSliItem">术后影像资料</li>-->
                <!--<li class="detSliItem">随访记录</li>-->
            </ul>
        </div>
        <section class="alEmr-mainIndex">
            <section class="alEmr-indexInner">
                <section class="caseDetailCon">
                    <section class="detInfo detBasInfo">
                        <section class="detItem detMust">
                            <span class="detTitle">姓名</span>
                            <article class="detDesc">
                                <p>张国强</p>
                            </article>
                        </section>
                        <!--<section class="detItem detMust">-->
                            <!--<span class="detTitle">年龄</span>-->
                            <!--<article class="detDesc">-->
                                <!--<p>4岁2月26天</p>-->
                            <!--</article>-->
                        <!--</section>-->
                        <!--<section class="detItem detMust">-->
                            <!--<span class="detTitle">性别</span>-->
                            <!--<article class="detDesc">-->
                                <!--<p>女</p>-->
                            <!--</article>-->
                        <!--</section>-->
                        <!--<section class="detItem">-->
                            <!--<span class="detTitle">电话</span>-->
                            <!--<article class="detDesc">-->
                                <!--<p>13302190257</p>-->
                            <!--</article>-->
                        <!--</section>-->
                        <!--<section class="detItem">-->
                            <!--<span class="detTitle">编号</span>-->
                            <!--<article class="detDesc">-->
                                <!--<p>住院号371922200105347615</p>-->
                            <!--</article>-->
                        <!--</section>-->
                        <!--<section class="detItem">-->
                            <!--<span class="detTitle">标签</span>-->
                            <!--<article class="detDesc">-->
                                <!--<p><span class="detTag">手术;</span><span class="detTag">疑难;</span><span class="detTag">科研;</span><span class="detTag">住院;</span></p>-->
                            <!--</article>-->
                        <!--</section>-->
                        <!--<section class="detItem">-->
                            <!--<span class="detTitle">归属</span>-->
                            <!--<article class="detDesc">-->
                                <!--<p>招财进宝科研团队</p>-->
                            <!--</article>-->
                        <!--</section>-->
                    </section>
                    <section class="detInfo" v-for="(item,index) in detailItem">
                        <section class="detItem" v-for="(ite,inde) in item.data_list">
                            <span class="detTitle" >{{ite.title}}</span>
                            <article class="detDesc">
                                <p v-for="(it,i) in ite.son_list">{{it.content}}</p>
                            </article>
                        </section>
                    </section>
                    <!--<section class="detInfo">-->
                        <!--<section class="detItem">-->
                            <!--<span class="detTitle" >主诉</span>-->
                            <!--<article class="detDesc">-->
                                <!--<p>下腰，痛，伴左侧下肢，放射性疼痛1月余</p>-->
                            <!--</article>-->
                        <!--</section>-->
                        <!--<section class="detItem">-->
                            <!--<span class="detTitle">超过八个字进行折行显示</span>-->
                            <!--<article class="detDesc">-->
                                <!--<p>下腰，痛，伴左侧下肢，放射性疼痛1月余</p>-->
                                <!--<p>下腰，痛，伴左侧下肢，放射性疼痛1月余</p>-->
                                <!--<p>下腰，痛，伴左侧下肢，放射性疼痛1月余</p>-->
                                <!--<p>下腰，痛，伴左侧下肢，放射性疼痛1月余</p>-->
                            <!--</article>-->
                        <!--</section>-->
                        <!--<section class="detItem">-->
                            <!--<span class="detTitle">术前影像资料</span>-->
                            <!--<article class="detDesc">-->
                                <!--<p class="detSurgeryTitle">-->
                                    <!--<span>术前X片</span>-->
                                    <!--<span>采集时间：2017-08-07</span>-->
                                <!--</p>-->
                                <!--<article class="detImgs">-->
                                    <!--<ul class="detImgList">-->
                                        <!--<li class="ev-bigImg" v-for="(item,index) in imgItem" v-show="index<=3" :listId="item.id" @click.stop="viewBigImg">-->
                                            <!--<div class="detViewImg">-->
                                                <!--<img v-bind:src="item.img" />-->
                                            <!--</div>-->
                                            <!--<p class="detImgMore">-->
                                                <!--还有<span>{{imgItem|Surplus}}</span>张>-->
                                            <!--</p>-->
                                        <!--</li>-->
                                    <!--</ul>-->
                                    <!--<p class="detRemarks">备注：<span>X片显示关节间隙狭窄。。。。</span></p>-->
                                <!--</article>-->
                            <!--</article>-->
                            <!--<article class="detDesc">-->
                                <!--<p class="detSurgeryTitle">-->
                                    <!--<span>术前X片</span>-->
                                    <!--<span>采集时间：2017-08-07</span>-->
                                <!--</p>-->
                                <!--<article class="detImgs">-->
                                    <!--<ul class="detImgList">-->
                                        <!--<li>-->
                                            <!--<div class="detViewImg">-->
                                                <!--<img src="https://img05.allinmd.cn/public1/M00/10/99/wKgBL1rNa1-AVxmwAADuZCzEeUc294_c.JPG"/>-->
                                            <!--</div>-->
                                        <!--</li>-->
                                        <!--<li>-->
                                            <!--<div class="detViewImg">-->
                                                <!--<img src="https://img05.allinmd.cn/public1/M00/10/99/wKgBL1rNa1-AVxmwAADuZCzEeUc294_c.JPG"/>-->
                                            <!--</div>-->
                                        <!--</li>-->
                                        <!--<li>-->
                                            <!--<div class="detViewImg">-->
                                                <!--<img src="https://img05.allinmd.cn/public1/M00/10/99/wKgBL1rNa1-AVxmwAADuZCzEeUc294_c.JPG"/>-->
                                            <!--</div>-->
                                        <!--</li>-->
                                        <!--<li>-->
                                            <!--<div class="detViewImg">-->
                                                <!--<img src="https://img05.allinmd.cn/public1/M00/10/99/wKgBL1rNa1-AVxmwAADuZCzEeUc294_c.JPG"/>-->
                                            <!--</div>-->
                                            <!--<p class="detImgMore">-->
                                                <!--还有<span>1</span>张>-->
                                            <!--</p>-->
                                        <!--</li>-->
                                        <!--&lt;!&ndash;<li>&ndash;&gt;-->
                                        <!--&lt;!&ndash;<p class="detImgMore">查看全部<span>23</span>张<i></i></p>&ndash;&gt;-->
                                        <!--&lt;!&ndash;</li>&ndash;&gt;-->
                                    <!--</ul>-->
                                    <!--<p class="detRemarks">备注：<span>X片显示关节间隙狭窄。。。。</span></p>-->
                                <!--</article>-->
                            <!--</article>-->
                        <!--</section>-->
                        <!--<section class="detItem">-->
                            <!--<span class="detTitle">手术治疗</span>-->
                            <!--<article class="detDesc">-->
                                <!--<div class="detSurRight">-->
                                    <!--<div>-->
                                        <!--<p class="detSurRTil">手术时间</p>-->
                                        <!--<p>2017-08-16</p>-->
                                    <!--</div>-->
                                    <!--<div>-->
                                        <!--<p class="detSurRTil">手术医生</p>-->
                                        <!--<p>张国强</p>-->
                                    <!--</div>-->
                                    <!--<div>-->
                                        <!--<p class="detSurRTil">手术名称</p>-->
                                        <!--<p>PHILOS钛板</p>-->
                                    <!--</div>-->
                                    <!--<div>-->
                                        <!--<p class="detSurRTil">切口类型</p>-->
                                        <!--<p>Ⅰ型切口</p>-->
                                    <!--</div>-->
                                    <!--<div>-->
                                        <!--<p class="detSurRTil">内固定方式</p>-->
                                        <!--<p>Ⅰ型切口</p>-->
                                    <!--</div>-->
                                    <!--<div class="detSurNum"><span>1</span></div>-->
                                    <!--<div class="LastPoint"><span></span></div>-->
                                <!--</div>-->
                            <!--</article>-->
                            <!--<article class="detDesc">-->
                                <!--<div class="detSurRight">-->
                                    <!--<div>-->
                                        <!--<p class="detSurRTil">手术时间</p>-->
                                        <!--<p>2017-08-16</p>-->
                                    <!--</div>-->
                                    <!--<div>-->
                                        <!--<p class="detSurRTil">手术医生</p>-->
                                        <!--<p>张国强</p>-->
                                    <!--</div>-->
                                    <!--<div>-->
                                        <!--<p class="detSurRTil">手术名称</p>-->
                                        <!--<p>PHILOS钛板</p>-->
                                    <!--</div>-->
                                    <!--<div>-->
                                        <!--<p class="detSurRTil">切口类型</p>-->
                                        <!--<p>Ⅰ型切口</p>-->
                                    <!--</div>-->
                                    <!--<div>-->
                                        <!--<p class="detSurRTil">内固定方式</p>-->
                                        <!--<p>Ⅰ型切口</p>-->
                                    <!--</div>-->
                                    <!--<div class="detSurNum"><span>2</span></div>-->
                                    <!--<div class="LastPoint"><span></span></div>-->
                                <!--</div>-->
                            <!--</article>-->
                        <!--</section>-->
                        <!--<section class="detItem">-->
                            <!--<span class="detTitle">手术治疗</span>-->
                            <!--<article class="detDesc">-->
                                <!--<div class="detSurRight">-->
                                    <!--<div>-->
                                        <!--<p class="detSurRTil">手术时间</p>-->
                                        <!--<p>2017-08-16</p>-->
                                    <!--</div>-->
                                    <!--<div>-->
                                        <!--<p class="detSurRTil">手术医生</p>-->
                                        <!--<p>张国强</p>-->
                                    <!--</div>-->
                                    <!--<div>-->
                                        <!--<p class="detSurRTil">手术名称</p>-->
                                        <!--<p>PHILOS钛板</p>-->
                                    <!--</div>-->
                                    <!--<div>-->
                                        <!--<p class="detSurRTil">切口类型</p>-->
                                        <!--<p>Ⅰ型切口</p>-->
                                    <!--</div>-->
                                    <!--<div>-->
                                        <!--<p class="detSurRTil">内固定方式</p>-->
                                        <!--<p>Ⅰ型切口</p>-->
                                    <!--</div>-->
                                    <!--<div>-->
                                        <!--<p class="detSurRTil">VAS评分</p>-->
                                        <!--<p>5分</p>-->
                                    <!--</div>-->
                                    <!--<div class="detSurNum"><span>1</span></div>-->
                                    <!--<div class="LastPoint"><span></span></div>-->
                                <!--</div>-->
                            <!--</article>-->
                            <!--<article class="detDesc">-->
                                <!--<div class="detSurRight">-->
                                    <!--<div>-->
                                        <!--<p class="detSurRTil">手术时间</p>-->
                                        <!--<p>2017-08-16</p>-->
                                    <!--</div>-->
                                    <!--<div>-->
                                        <!--<p class="detSurRTil">手术医生</p>-->
                                        <!--<p>张国强</p>-->
                                    <!--</div>-->
                                    <!--<div>-->
                                        <!--<p class="detSurRTil">手术名称</p>-->
                                        <!--<p>PHILOS钛板</p>-->
                                    <!--</div>-->
                                    <!--<div>-->
                                        <!--<p class="detSurRTil">切口类型</p>-->
                                        <!--<p>Ⅰ型切口</p>-->
                                    <!--</div>-->
                                    <!--<div>-->
                                        <!--<p class="detSurRTil">内固定方式</p>-->
                                        <!--<p>Ⅰ型切口</p>-->
                                    <!--</div>-->
                                    <!--<div>-->
                                        <!--<p class="detSurRTil">VAS评分</p>-->
                                        <!--<p>5分</p>-->
                                    <!--</div>-->
                                    <!--<div>-->
                                        <!--<p class="detSurRTil">随访影片</p>-->
                                        <!--<p><span>采集时间：</span>2017-08-07</p>-->
                                        <!--<ul class="detImgList">-->
                                            <!--<li v-for="(item,index) in videoList" v-show="index<=3" @click.stop="videoCli(item.url)">-->
                                                <!--<div class="detViewImg detViewVideo">-->
                                                    <!--<img src="https://img05.allinmd.cn/public1/M00/10/99/wKgBL1rNa1-AVxmwAADuZCzEeUc294_c.JPG"/>-->
                                                    <!--<i class="detVideoBtn"><img src="/static/images/common/icon/PlayIcon.png" alt=""></i>-->
                                                <!--</div>-->
                                                <!--<p class="detImgMore">-->
                                                    <!--还有<span>{{videoList|Surplus}}</span>张>-->
                                                <!--</p>-->
                                            <!--</li>-->
                                        <!--</ul>-->
                                        <!--<p class="detRemarks">备注：<span>X片显示关节间隙狭窄。。。。</span></p>-->
                                    <!--</div>-->
                                    <!--<div class="detSurNum"><span>2</span></div>-->
                                    <!--<div class="LastPoint"><span></span></div>-->
                                <!--</div>-->
                            <!--</article>-->
                        <!--</section>-->
                        <!--<section class="detItem">-->
                            <!--<span class="detTitle">超过八个字进行折行显示</span>-->
                            <!--<article class="detDesc">-->
                                <!--<p>下腰，痛，伴左侧下肢，放射性疼痛1月余</p>-->
                                <!--<p>下腰，痛，伴左侧下肢，放射性疼痛1月余</p>-->
                                <!--<p>下腰，痛，伴左侧下肢，放射性疼痛1月余</p>-->
                                <!--<p>下腰，痛，伴左侧下肢，放射性疼痛1月余</p>-->
                            <!--</article>-->
                        <!--</section>-->
                        <!--<section class="detItem">-->
                            <!--<span class="detTitle">超过八个字进行折行显示</span>-->
                            <!--<article class="detDesc">-->
                                <!--<p>下腰，痛，伴左侧下肢，放射性疼痛1月余</p>-->
                                <!--<p>下腰，痛，伴左侧下肢，放射性疼痛1月余</p>-->
                                <!--<p>下腰，痛，伴左侧下肢，放射性疼痛1月余</p>-->
                                <!--<p>下腰，痛，伴左侧下肢，放射性疼痛1月余</p>-->
                            <!--</article>-->
                        <!--</section>-->
                    <!--</section>-->
                </section>
                <section class="addCaseDetail" @click.stop="goAddCaseDet(123132)">
                    <i></i>
                    添加病历详情
                </section>
            </section>
            <section class="supCase">
                <article class="supCaseTitle">
                    您还没有填写病历信息，立即补充吧
                </article>
                <article class="supCaseBtn" @click.stop="goAddCaseDet(123132)">
                    编辑病历
                </article>
            </section>
        </section>
        <!--视频开始-->
        <videoPlayer :path="path" :beginPlay="beginPlay" @beginFn="beginFn" :isPopup="true"></videoPlayer>
        <!--视频结束-->
    </div>
</template>
<script>
    import viewBigImgAll from '../../../utils/view-big-img/module.view-big-img.js'
    import comm from '../../../utils/comm.js';
    import videoPlayer from  '~components/videoPlayer/videoPlayer.vue';
    export default {
        data(){
          return{
              listItem:[],
              listIndex:0,
              caseId:1213,
              imgItem:[
                  {img:'https://img05.allinmd.cn/public1/M00/10/99/wKgBL1rNa1-AVxmwAADuZCzEeUc294_c.JPG',id:'1'},
                  {img:'https://img05.allinmd.cn/public1/M00/13/8C/wKgBL1tO0EmANAdYAAONqLoP7JM921_c.JPG',id:'2'},
                  {img:'https://img05.allinmd.cn/public1/M00/13/8D/wKgBL1tO0E6AFfWMAAOLoO6TRhY401_c.JPG',id:'3'},
                  {img:'https://img05.allinmd.cn/public1/M00/13/8A/wKgBMFtO0E2AU0yMAAOJsKr0u34582_c.JPG',id:'4'},
                  {img:'https://img05.allinmd.cn/public1/M01/13/8D/wKgBL1tO0EuAZydYAAOFrIcbGoo078_c.JPG',id:'5'},
                  {img:'https://img05.allinmd.cn/public1/M01/13/8A/wKgBMFtO0EqAVbGdAAM5kKk9AQY486_c.JPG',id:'6'},
              ],
              videoList:[
                  {url:'https://vpro01.allinmd.cn/1523411864042_480_320.mp4?1523412002'},
                  {url:'https://vpro01.allinmd.cn/1519613851371_480_320.mp4?1519615755'},
                  {url:'https://vpro01.allinmd.cn/1523411902955_480_320.mp4?1523412003'},
                  {url:'https://vpro01.allinmd.cn/1523411938288_480_320.mp4?1523412001'},
                  {url:'https://vpro01.allinmd.cn/1502695767969_1280_720.mp4?1502653502'},
              ],
              path:'11',
              beginPlay:false,
              detailItem:[],
              customerId:'',
          }
        },
        components:{
            videoPlayer
        },
        methods:{
            itemCli(index){
                let t = this;
                t.listIndex = index;
            },
            goAddCaseDet(caseId){//跳转病历页面
                window.location.href = '/newCases?caseId='+caseId;
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
                    });
                }
            },
            videoCli(path){
                this.path = path;
                this.beginPlay = true;
            },
            beginFn(flag){
                this.beginPlay = flag;
            },
            caseDetail(){//获取病例详情数据
                let t  = this;
                // comm.ajax2({
                //     // url: '/emrpc/casedetail/',
                //     url:'/call/patient/case/getInquisitionList/',
                //     type: "post",
                //     data: {
                //         // id:1
                //         paramJson:JSON.stringify({"patientId":"1524022739020","customerId":"1428327147313"})
                //     },
                //     timeout: 30000,
                //     success:function(res){
                //         // t.detailItem = res.response_data;
                //         console.log(res)
                //     }
                // })
            },
            caseInqLog(type){
                let t  = this;
                // comm.ajax2({
                //     url:'/call/patient/case/getMapByCaseIds/',
                //     type: "post",
                //     data: {
                //         paramJson:JSON.stringify({
                //             caseIdList:"1524022739020",
                //             attUseFlag:"1428327147313",
                //             attSpec:'',
                //             videoPicAttSpec:'',
                //             visitSiteId:1,
                //             caseSocure:type,//1--问诊，2--报道
                //             patientId:'',
                //             customerId:1428327147313
                //         })
                //     },
                //     timeout: 30000,
                //     success:function(res){
                //         // t.detailItem = res.response_data;
                //         console.log(res)
                //     }
                // })
            }
        },
        filters:{
            Surplus(num){//计算图片还有几张
                if(num.length){
                    return parseInt(num.length)-3;
                }else{
                    return 0;
                }
            }
        },
        mounted(){
            let t = this;
            t.caseDetail();//病例详情
            // comm.ajax2({
            //     url: '/call/multicenter/major/case/getCaseSecondMenu/',
            //     type: "post",
            //     data: {
            //         paramJson:JSON.stringify({"majorId":"1528162679022","customerId":"1506065952621","caseId":"1531363084636","menuId":"1528163073956"})
            //     },
            //     timeout: 30000,
            //     success:function(res){
            //         t.listItem = res.responseObject.responseData.data_list[0];
            //     }
            // })
        }
    }
</script>
<style lang="scss">

</style>

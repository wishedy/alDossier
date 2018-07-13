<template>
    <div class="alEmr-mainInner">
        <NavSideBar></NavSideBar>
        <TopHeader></TopHeader>
        <section class="alEmr-mainIndex">
            <section class="alEmr-indexInner">
                <!--默认无病例开始-->
                <section class="alEmr-indexNoCase" style="display: none;">
                        <img class="noCaseImg" src="/static/images/allCase/noCase.png">
                        <p class="noCaseText">暂无病例，您可以试试 <span>新建病例</span>/<span>选择患者</span></p>
                </section>
                <!--默认无病历结束-->
                <!--搜索无结果开始-->
                <section class="alEmr-searchNoList" style="display: none;">
                    <img class="noSearchImg" src="/static/images/allCase/noSearch.png">
                    <p class="noSearchText">暂无搜索结果，换个关键词试试吧</p>
                </section>
                <!--搜索无结果结束-->

                <!--筛选条件开始-->
                <section class="alEmr-screeningItems active">
                    <aside class="screeningTips">
                        <p class="tipsName">术前诊断：</p>
                        <ul>
                            <li class="active"><span>胫骨骨折</span></li>
                            <li><span>桡骨远端骨折</span></li>
                            <li><span>先天性胫骨缺如</span></li>
                            <li class="active"><span>腘肌肌腱炎</span></li>
                            <li><span>肘关节脱位</span></li>
                            <li><span>风湿热</span></li>
                            <li><span>骨股干骨折</span></li>
                            <li><span>胫骨骨折</span></li>
                            <li><span>腘肌肌腱炎</span></li>
                            <li class="active"><span>肘关节脱位</span></li>
                            <li><span>风湿热</span></li>
                            <li><span>骨股干骨折</span></li>
                            <li><span>胫骨骨折</span></li>
                            <li><span>腘肌肌腱炎</span></li>
                            <li class="active"><span>肘关节脱位</span></li>
                            <li><span>风湿热</span></li>
                            <li><span>骨股干骨折</span></li>
                            <li class="active"><span>胫骨骨折</span></li>
                            <li><span>腘肌肌腱炎</span></li>
                            <li><span>肘关节脱位</span></li>
                            <li class="active"><span>风湿热</span></li>
                            <li><span>骨股干骨折</span></li>
                            <li><span>胫骨骨折</span></li>
                        </ul>
                        <p class="screeningMoreBtn active"><span>展开</span><i></i></p>
                    </aside>
                    <aside class="screeningTips">
                        <p class="tipsName">标签：</p>
                        <ul>
                            <li><span>手术</span></li>
                            <li class="active"><span>住院</span></li>
                            <li class="active"><span>手术</span></li>
                            <li><span>疑难</span></li>
                            <li><span>颈椎</span></li>
                            <li><span>腰间盘</span></li>
                            <li><span>腰椎</span></li>
                        </ul>
                        <p class="screeningMoreBtn"><span>更多</span><i></i></p>
                    </aside>
                    <aside class="screeningTips">
                        <p class="tipsName">手术时间：</p>
                        <ul>
                            <li><span>近一个月</span></li>
                            <li><span>近三个月</span></li>
                            <li><span>近六个月</span></li>
                            <li><span>近九个月</span></li>
                            <li class="active"><span>近一年</span></li>
                            <li><span>自定义时间段</span></li>
                        </ul>
                    </aside>
                    <aside class="screeningTips">
                        <p class="tipsName">归属：</p>
                        <ul>
                            <li><span>团体</span></li>
                            <li class="active"><span>个人</span></li>
                            <li class="active"><span>北医三院</span></li>
                            <li><span>航天医院</span></li>
                            <li><span>301医院</span></li>
                            <li class="active"><span>积水潭医院</span></li>
                            <li><span>二道口医院</span></li>
                        </ul>
                    </aside>
                </section>
                <!--筛选条件结束-->
                <!--筛选条件展示开始-->
                <section class="alEmr-screeningShow">
                    <aside class="showTips"><span>29</span>条结果</aside>
                    <ul class="activeTips">
                       <li><span>肘关节脱位</span><i></i></li>
                       <li><span>肩关节损伤</span><i></i></li>
                       <li><span>北医三院</span><i></i></li>
                       <li><span>近1年</span><i></i></li>
                       <li><span>航天医院</span><i></i></li>
                       <li><span>腰部</span><i></i></li>
                    </ul>
                </section>
                <!--筛选条件展示结束-->

                <!--筛选无结果开始-->
                <section class="alEmr-screeningNoList" style="display: none;">
                    <aside>
                        <img class="noScreeningImg" src="/static/images/allCase/noCase.png">
                        <p class="noScreeningText">暂无符合条件的病例</p>
                    </aside>
                </section>
                <!--筛选无结果结束-->

                <!--病例列表开始-->
                <section class="alEmr-caseList">
                    <aside class="attrBtnBox">
                        <p class="attrBtn attrCancelBtn">取消</p>
                        <p class="attrBtn attrSureBtn">确认<span>请先选择一个病例</span></p>
                        <p class="attrBtn" style="display: none;">归属</p>
                    </aside>
                    <section class="caseItems"><!--editStatus-->
                        <!--病例列表标题开始-->
                        <aside>
                             <p class="orderOne"><span>姓名</span></p>
                             <p class="orderTwo"><span>性别</span></p>
                             <p class="commOrder orderThree"><span>年龄</span></p>
                             <p class="commOrder orderFour"><span>术前诊断</span></p>
                             <p class="commOrder orderFive"><span>手术名称</span></p>
                             <p class="commOrder orderSix"><span>标签</span></p>
                             <p class="commOrder orderSeven"><span>更新时间</span></p>
                             <p class="commOrder orderEight"><span>完整度</span></p>
                        </aside>
                        <!--病例列表标题结束-->
                        <!--病例列表内容开始-->
                        <ul>
                            <li>
                                <b></b><!--编辑选中标志-->
                                <span class="listOne"><span>胡测试</span><i></i></span>
                                <span class="listTwo">男</span>
                                <span class="listThree">35</span>
                                <span class="listFour">颈椎病</span>
                                <span class="listFive">颈椎手术</span>
                                <span class="listSix">#特别关注#</span>
                                <span class="listSeven">7.10 15:25</span>
                                <span class="listEight">50%</span>
                            </li>
                            <li>
                                <b class="active"></b><!--编辑选中标志-->
                                <span class="listOne"><span>胡测试</span><i></i></span>
                                <span class="listTwo">男</span>
                                <span class="listThree">35</span>
                                <span class="listFour">颈椎病</span>
                                <span class="listFive">颈椎手术</span>
                                <span class="listSix">#特别关注#</span>
                                <span class="listSeven">7.10 15:25</span>
                                <span class="listEight">50%</span>
                            </li>
                            <li>
                                <b></b><!--编辑选中标志-->
                                <span class="listOne"><span>胡测试</span><i></i></span>
                                <span class="listTwo">男</span>
                                <span class="listThree">35</span>
                                <span class="listFour">颈椎病</span>
                                <span class="listFive">颈椎手术</span>
                                <span class="listSix">#特别关注#</span>
                                <span class="listSeven">7.10 15:25</span>
                                <span class="listEight">50%</span>
                            </li>

                        </ul>
                        <!--病例列表内容结束-->
                    </section>
                </section>
                <!--病例列表结束-->
                <!--分页开始-->
                <section class="alEmr-pages">
                    <aside>
                        <span><</span>
                        <span>1</span>
                        <span class="active">2</span>
                        <span>3</span>
                        <span>4</span>
                        <span>5</span>
                        <span>></span>
                    </aside>
                </section>
                <!--分页结束-->
            </section>
        </section>
        <!--归属遮罩开始-->
        <section class="alEmr-belongPop" style="display: none;">
            <p class="firstBtn">取消</p>
            <p class="secBtn">归属</p>
        </section>
        <!--归属遮罩结束-->
        <!--归属成功提示遮罩开始-->
        <section class="alEmr-sucPop" style="display: none;">
            <section class="sucText">
                <aside>
                    <i></i>
                    <p>
                        <span class="textBelong"><b>29</b>个病例已成功归于</span>
                        <span class="textTeam">“北京大学国际医院”</span>
                    </p>
                </aside>
            </section>
        </section>
        <!--归属成功提示遮罩结束-->
        <!--病例不能被归属提示开始-->
        <section class="alEmr-noBelongCasePop" style="display: none;">
            <section class="alEmr-noBelongCaseList">
                <h2>归属提示</h2>
                <section class="textBox">
                    <h3>以下<span>3</span>个病历已归属其他团队，暂时无法更改到本团队。</h3>
                    <ul>
                        <li>
                            <span class="itemOne">胡测试</span>
                            <span class="itemTwo">男</span>
                            <span class="itemThree">100</span>
                            <span class="itemFour">纤维肌痛综合症</span>
                            <span class="itemFive">足舟状骨骨软骨病</span>
                            <span class="itemSix">#纤维肌痛综合…#</span>
                        </li>
                        <li>
                            <span class="itemOne">胡测试</span>
                            <span class="itemTwo">男</span>
                            <span class="itemThree">100</span>
                            <span class="itemFour">纤维肌痛综合症</span>
                            <span class="itemFive">足舟状骨骨软骨病</span>
                            <span class="itemSix">#纤维肌痛综合…#</span>
                        </li>
                        <li>
                            <span class="itemOne">胡测试</span>
                            <span class="itemTwo">男</span>
                            <span class="itemThree">100</span>
                            <span class="itemFour">纤维肌痛综合症</span>
                            <span class="itemFive">足舟状骨骨软骨病</span>
                            <span class="itemSix">#纤维肌痛综合…#</span>
                        </li>

                    </ul>

                </section>
                <aside>
                    <p class="cancelBtn">放弃</p>
                    <p class="sureBtn">继续</p>
                </aside>
            </section>
        </section>
        <!--病例不能被归属提示结束-->
        <!--病例归属选择团队开始-->
        <section class="alEmr-selectTeamPop" style="display: none;">
            <section class="alEmr-selectTeamList">
                <h2>归属提示</h2>
                <section class="textBox">
                    <h3>归属更改后，只有团队所有者才能进行变更哦～</h3>
                    <ul>
                        <li>
                            <i></i><span>团队测试哈哈哈，就问你怕不怕</span>
                        </li>
                        <li class="active">
                            <i></i><span>团队测试哈哈哈，就问你怕不怕</span>
                        </li>
                        <li>
                            <i></i><span>团队测试哈哈哈，就问你怕不怕</span>
                        </li>
                        <li>
                            <i></i><span>团队测试哈哈哈，就问你怕不怕</span>
                        </li>
                        <li>
                            <i></i><span>团队测试哈哈哈，就问你怕不怕</span>
                        </li>
                        <li>
                            <i></i><span>团队测试哈哈哈，就问你怕不怕</span>
                        </li>
                        <li>
                            <i></i><span>团队测试哈哈哈，就问你怕不怕</span>
                        </li>
                    </ul>
                </section>
                <aside>
                    <p class="cancelBtn">取消</p>
                    <p class="sureBtn">继续</p>
                </aside>
            </section>
        </section>
        <!--病例归属选择团队结束-->
    </div>
</template>
<script>
import NavSideBar from '~components/common/NavSideBar.vue';
import TopHeader from '~components/common/TopHeader.vue';
import axios from 'axios';
import api from '~api'
export default {
    name: 'index-app',
    data() {
        return {
            page: Number(new URLSearchParams(window.location.search).get('page')) || 1,
            topics: []
        }
    },
    components: {
        NavSideBar,
        TopHeader
    },
    async mounted() {
        axios({
            method: 'post',
            url: '/call/ad/position/profile/getMapList/',
            data: {"firstResult":0,"maxResult":10,"visitSiteId":1,"channelId":68,"isIndex":1,"platformId":"1","customerId":"1399252409974"},
            transformRequest: [function (data) {
                return "paramJson=" + JSON.stringify(data);
            }],
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            },
            timeout: 30000
        }).then(function (res) {
            console.log(res)
        });
    },
    metaInfo: {
        title: '首页'
    }
}
</script>
<style lang="scss">
    @import '../../assets/scss/pages/index.scss';
</style>

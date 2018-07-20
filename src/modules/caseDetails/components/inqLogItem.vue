<template>
    <div>
        <ul class="inqLeftNav">
            <li :class="{active:index==listIndex}" @click.stop="itemCli(index)" v-for="(item,index) in dataList">{{item}}</li>
        </ul>
        <div class="inqContent">
            <div class="inqLogItemCont">
                <div class="repItemTitle">
                    <span>患者自诉</span>
                </div>
                <div class="repItemDesc">
                    <div class="repItem">
                        <p class="repImteLeft">患者</p>
                        <p class="repImteRight">佟湘玉    女    45岁</p>
                    </div>
                    <div class="repItem">
                        <p class="repImteLeft">电话</p>
                        <p class="repImteRight">13302190257</p>
                    </div>
                    <div class="repItem">
                        <p class="repImteLeft">患者主患者主诉诉</p>
                        <p class="repImteRight">因爱人行动不便，是否可以将骨片和相关检查快递给您因爱人行动不便，是否可以将骨片和相关检查快递给您</p>
                    </div>
                </div>
                <div class="repItemTitle">
                    <span>影像资料(100)</span>
                </div>
                <div class="repItemImgDesc">
                    <div class="repImgItem">
                        <div class="ImgItemTitle">图片资料</div>
                        <div class="ImgItemDesc">
                            <div class="ImgItemData">2018年05月06日</div>
                            <ul class="ImgItems">
                                <li>
                                    <img src="https://img05.allinmd.cn/public1/M00/13/28/wKgBMFsGalOAWrr9AAFTvg4o4qc738_c.jpg" alt="">
                                </li>
                                <li>
                                    <img src="https://img05.allinmd.cn/public1/M00/13/28/wKgBMFsGalOAWrr9AAFTvg4o4qc738_c.jpg" alt="">
                                </li>
                                <li>
                                    <img src="https://img05.allinmd.cn/public1/M00/13/28/wKgBMFsGalOAWrr9AAFTvg4o4qc738_c.jpg" alt="">
                                </li>
                                <li>
                                    <img src="https://img05.allinmd.cn/public1/M00/13/28/wKgBMFsGalOAWrr9AAFTvg4o4qc738_c.jpg" alt="">
                                </li>
                                <li>
                                    <img src="https://img05.allinmd.cn/public1/M00/13/28/wKgBMFsGalOAWrr9AAFTvg4o4qc738_c.jpg" alt="">
                                </li>
                                <li>
                                    <img src="https://img05.allinmd.cn/public1/M00/13/28/wKgBMFsGalOAWrr9AAFTvg4o4qc738_c.jpg" alt="">
                                </li>
                                <li>
                                    <img src="https://img05.allinmd.cn/public1/M00/13/28/wKgBMFsGalOAWrr9AAFTvg4o4qc738_c.jpg" alt="">
                                </li>
                                <li>
                                    <img src="https://img05.allinmd.cn/public1/M00/13/28/wKgBMFsGalOAWrr9AAFTvg4o4qc738_c.jpg" alt="">
                                </li>
                                <li>
                                    <img src="https://img05.allinmd.cn/public1/M00/13/28/wKgBMFsGalOAWrr9AAFTvg4o4qc738_c.jpg" alt="">
                                    <p class="repImgMore">
                                        还有<span>1</span>张><i></i>
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="repImgItem">
                        <div class="ImgItemTitle">其他文件</div>
                        <div class="ImgItemDesc">
                            <ul>
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
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                dataList:[
                    '2018-02-01',
                    '2018-02-02',
                    '2018-02-03',
                    '2018-02-01',
                    '2018-02-02',
                    '2018-02-03',
                    '2018-02-01',
                    '2018-02-02',
                    '2018-02-03',
                    '2018-02-01',
                    '2018-02-02',
                    '2018-02-03',
                    '2018-02-01',
                    '2018-02-02',
                    '2018-02-03',
                    '2018-02-01',
                    '2018-02-02',
                    '2018-02-03',
                ],
                listIndex:0
            }
        },
        mounted(){

        },
        methods:{
            itemCli(index){
                let t = this;
                t.listIndex = index;
            },
        },
    }
</script>

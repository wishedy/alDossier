<template>
    <div>
        <div class="reportItemCont">
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
        </div>
        <div class="reportImgItemCont">
            <div class="repItemTitle">
                <span>影像资料(100)</span>
            </div>
            <div class="repItemImgDesc">
                <div class="repImgItem">
                    <div class="ImgItemTitle">图片资料</div>
                    <div class="ImgItemDesc">
                        <div class="ImgItemData">2018年05月06日</div>
                        <ul class="ImgItems">
                            <li class="ev-bigImg" :listId="Date.parse(new Date())+index" v-for="(item,index) in ImgList" @click.stop="viewBigImg">
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
                                    <p>
                                        <a href="http://www.caos-china.org/pdf/guide/guide_shenheneirongdan.pdf">颈椎侧位片检查报告1.pdf</a>
                                    </p>
                                    <p>
                                        <span>2017-11-10</span>
                                        <span>1.5M</span>
                                    </p>
                                </div>
                            </li>
                            <li class="imgItemList">
                                <img src="/static/images/pages/caseDetail/pdfImg.png" alt="">
                                <div class="imgItemListDesc">
                                    <p>
                                        <a href="http://www.caos-china.org/pdf/guide/guide_shenheneirongdan.pdf" download="颈椎侧位片检查报告.pdf">颈椎侧位片检查报告2.pdf</a>
                                    </p>
                                    <p>
                                        <span>2017-11-10</span>
                                        <span>1.5M</span>
                                    </p>
                                </div>
                            </li>
                            <li class="imgItemList">
                                <img src="/static/images/pages/caseDetail/videoImg.png" alt="">
                                <div class="imgItemListDesc" @click="videoCli('http://vpro01.allinmd.cn/1523411864042_480_320.mp4?1523412002')">
                                    <p>颈椎侧位片检查报告.mp4</p>
                                    <p>
                                        <span>2017-11-10</span>
                                        <span>1.5M</span>
                                    </p>
                                </div>
                            </li>
                            <li class="imgItemList">
                                <img src="/static/images/pages/caseDetail/videoImg.png" alt="">
                                <div class="imgItemListDesc" @click="videoCli('https://vpro01.allinmd.cn/1519613851371_480_320.mp4?1519615755')">
                                    <p>颈椎侧位片检查报告.mp4</p>
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
            <!--视频开始-->
            <videoPlayer :path="path" :beginPlay="beginPlay" @beginFn="beginFn" :isPopup="true"></videoPlayer>
            <!--视频结束-->
        </div>
    </div>
</template>
<script>
    import videoPlayer from  '~components/videoPlayer/videoPlayer.vue';
    import viewBigImgAll from '../../../utils/view-big-img/module.view-big-img.js'
    export default {
        data(){
            return{
                // path:'https://vpro01.allinmd.cn/1523411864042_480_320.mp4?1523412002',
                beginPlay:false,//开始播放视频
                path:'11',
                ImgList:[
                    'https://img05.allinmd.cn/public1/M01/13/5A/wKgBMFsrdDeAawYfAALjjAJhig4145_c_p_300_300.png',
                    'https://img05.allinmd.cn/public1/M01/13/5A/wKgBMFsrdDeAawYfAALjjAJhig4145_c_p_300_300.png',
                    'https://img05.allinmd.cn/public1/M01/13/5A/wKgBMFsrdDeAawYfAALjjAJhig4145_c_p_300_300.png'
                ],
            }
        },
        components:{
            videoPlayer
        },
        methods:{
            videoCli(path){
                this.path = path;
                this.beginPlay = true;
            },
            beginFn(flag){
                this.beginPlay = flag;
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
        mounted(){
            let t = this;
            // setTimeout(function () {
            //     t.beginPlay = true;
            // },2000)
        }
    }
</script>
<style lang="scss">
    @import "../../../utils/view-big-img/module.view-big-img.css";
</style>

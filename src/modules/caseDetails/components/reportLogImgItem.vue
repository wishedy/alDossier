<template>
    <div class="reportImgItemCont">
        <div class="repItemTitle">
            <span>影像资料(100)</span>
        </div>
        <div class="repItemImgDesc">
            <div class="repImgItem">
                <div class="ImgItemTitle">图片资料</div>
                <div class="ImgItemDesc">
                    <div class="ImgItemData">2018年05月06日</div>
                    <ul class="ImgItems" @click.stop="">
                        <li class="ev-bigImg">
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
</template>
<script>
    import videoPlayer from  '~components/videoPlayer/videoPlayer.vue'
    export default {
        data(){
            return{
                // path:'https://vpro01.allinmd.cn/1523411864042_480_320.mp4?1523412002',
                beginPlay:false,//开始播放视频
                path:'11'
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
                if($(e.target).hasClass('deleteImg')){
                    $(e.target).parent().remove();
                }else {
                    if(id){
                        $('.ev-bigImg',container).each(function(i,em){
                            imgList.push({id:$(em).attr("listid"),url:$(em).find("img").attr("src")});
                        });
                        // console.log(viewBigImgAll)
                        viewBigImgAll({
                            container:container,
                            typeTitle: "",
                            imgListType:'caze',
                            id: id,
                            imgList:imgList,
                            srcSplit:true
                        });
                    }
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

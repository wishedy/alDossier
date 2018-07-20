<template>
   <section class="uploadConier ev-uploadConier">
       <div class="uploadColumnCont">
           <div class="formSelect formCommon"><p class="articleText">术后X片</p>
               <ul class="uploadColumn uploadImg ev-uploadImgList" @click.stop="viewBigImg">
                   <li class="ev-bigImg" :listId="Date.parse(new Date())+index" v-for="(item,index) in uploadColumn.ImgList">
                       <img :src="item">
                       <span class="deleteImg"></span>
                   </li>
                   <li @click="addFile('img')" class="ev-addImg"><i></i><p>添加图片</p></li>
               </ul>
           </div>
           <div class="formSelect formCommon"><p class="articleText">术后X片</p>
               <ul class="uploadColumn uploadVideo ev-uploadVideoList" @click="maskVideo">
                   <li class="ev-video" v-for="(item,index) in uploadColumn.VideoList" data-path="https://vpro01.allinmd.cn/1528162686448_1280_720.mp4?1528162800">
                       <img :src="item">
                       <span class="videoBtn"></span>
                       <span class="deleteImg"></span>
                   </li>
                   <li @click="addFile('video')"  class="ev-addVideo"><i></i><p>添加视频</p></li>
               </ul>
               <videoPlayer :path="videoPath" :beginPlay="beginPlay" @beginFn="beginFn"></videoPlayer>
           </div>
           <div class="formSelect formCommon"><p class="articleText">术后X片</p>
               <div class="textarea"><textarea v-model="textModel"></textarea><i>{{200-textModel.length}}</i></div>
           </div>
       </div>
       <div class="uploadCloud" v-if="isLayer">
           <div class="uploadLayers"></div>
           <div class="layersContent">
               <div class="layersTitle">
                   <h4>云资料库</h4>
                   <h4 v-if="!isFirst" class="secontMenu"><i></i>{{layerTitle}}</h4>
                   <span @click="closeLayer"></span>
               </div>
               <section class="listContainer">
                       <ul class="layerList" v-if="isFirst" :class="{'noFileList':!layerList.length}">
                           <li v-for="(item,index) in layerList" @click="openFile(item)"><img src="/static/images/pages/uploadColumn/file.png"/><p>{{item}}</p></li>
                           <div class="noFile" v-if="!layerList.length">
                               <div class="imgCont">
                                   <img src="/static/images/pages/uploadColumn/empty_file.png"/>
                               </div>
                               <p>暂无文件</p>
                           </div>
                       </ul>
                       <ul class="imgList" v-else :class="{'noImgList':!layerImgList.length}">
                           <li v-for="(item,index) in layerImgList" @click="selecImg(index,item)" :class="{'active':isImgSelect.indexOf(index)!=-1}"><img :src="item"/><i></i></li>
                           <div class="noImg" v-if="!layerImgList.length">
                               <div class="imgCont">
                                   <img src="/static/images/pages/uploadColumn/empty_information.png"/>
                               </div>
                               <p>暂无资料</p>
                           </div>
                       </ul>
                   <div class="noContent">

                   </div>
               </section>
               <div class="layerFooter" :class="{'layerSet':!isFirst}">
                   <button class="selecFile" v-show="isFirst" :class="{'ev-uploadImgBtn':addFileType=='img','ev-uploadVideoBtn':addFileType=='video'}" :id="addFileType=='video'?'ev-uploadVideoBtn':''">选择本地文件<input type="file" name="uploadify" multiple="" v-if="addFileType=='video'" class="uploadVideo"/></button>
                   <button class="selecSure" v-if="!isFirst" :class="{'noImgList':!layerImgList.length}" @click="selectSure">确定{{isImgSelect.length?'('+isImgSelect.length+')':''}}</button>
               </div>
           </div>
       </div>
       <section class="uploadCaseError" v-if="isUplaodError">
           <i></i><span>{{uploadErrorText}}</span>
       </section>
   </section>
</template>
<!--demo 祥见src/modules/uploadDemo/app.vue-->
<script>

    import videoPlayer from '~components/videoPlayer/videoPlayer'
    import viewBigImgAll from '../../utils/view-big-img/module.view-big-img.js'
    export default {
        name: "upload-column",
        props:['uploadColumn'],
        data(){
            return{
                beginPlay:false,//是否播放视频
                isFirst:true,//选择云资料的时候是否是第一级文件夹
                isImgSelect:[],//选择的云图片
                itemList:[],
                layerTitle:'全部资料',
                layerList:[
                   '全部资料',
                   '新资料',
                   '新资料',
                   '新资料',
                   '新资料',
                   '新资料',
                   '新资料',
                   '新资料',
                   '新资料',
                   '新资料',
                   '新资料',
                   '新资料',
                   '新资料',
                   '新资料',
                   '新资料',
                   '新资料',
                   '新资料',
                   '新资料',
                   '新资料',
                   '新资料',
                   '新资料',
                   '新资料',
                   '新资料',
                   '新资料',
                   '新资料'
               ],
                layerImgList:[
                    'https://img05.allinmd.cn/public1/M01/13/5A/wKgBMFsrdDeAawYfAALjjAJhig4145_c_p_300_300.png',
                    'https://img05.allinmd.cn/public1/M01/13/5A/wKgBMFsrdDeAawYfAALjjAJhig4145_c_p_300_300.png',
                    'https://img05.allinmd.cn/public1/M01/13/5A/wKgBMFsrdDeAawYfAALjjAJhig4145_c_p_300_300.png'
                ],
                isLayer:false,
                uploadImgStatus:true,//上传图片的状态：false正在上传中
                uploadVideoStatus:true,//上传图片的状态：false正在上传中
                addFileType:'',
                textModel:this.uploadColumn.textVal,
                videoPath:'',
                isUplaodError:false,
                uploadErrorText:''
            }
        },
        components:{
            videoPlayer
        },
        watch:{
            textModel(){
                if(this.textModel.length>200){
                    this.textModel=this.textModel.substr(0,200);
                }
            }
        },
        methods:{
            beginFn(flag){
                this.beginPlay = flag;
            },
            maskVideo(e){
                e.stopPropagation();
                e.preventDefault();
                var path=$(e.target).parents('.ev-video').attr("data-path");
                if($(e.target).hasClass('deleteImg')){
                    $(e.target).parent().remove();
                }else {
                    if(path){
                        this.videoPath=path;
                        this.beginPlay=true;
                    }
                }
            },
            viewBigImg(e){
                e.stopPropagation();
                e.preventDefault();
                var imgList=[],
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
            //添加图片、视频
            openFile(item){
                this.layerTitle=item;
                this.isFirst=false;
                $('.moxie-shim').hide();
            },
            //选择云图片
            selecImg(index,itemSrc){
                if(this.isImgSelect.indexOf(index)!=-1){
                    //移除元素
                    // this.isImgSelect.splice(this.isImgSelect.findIndex(item => item === index), 1)
                    // this.itemList.splice(this.isImgSelect.findIndex(item => item === index), 1)
                    this.isImgSelect.splice(this.isImgSelect.indexOf(index), 1)
                    this.itemList.splice(this.isImgSelect.indexOf(index), 1)
                }else {
                    //选中元素
                    this.isImgSelect.push(index);
                    //选中元素
                    this.itemList.push(itemSrc);
                }
            },
            //确定选择云图片
            selectSure(e){
                e.stopPropagation();
                e.preventDefault();
                let t=this;
                if(this.itemList.length){
                    this.closeLayer();
                    if(this.addFileType=='img'){
                        var str='';
                        $.each(this.itemList,function (index,ele) {
                            str+= '<li class="ev-bigImg" listid="'+Date.parse(new Date())+index+'">'+
                                '                        <img src="'+ele+'">'+
                                '                        <div class="imgPopup" style="display: none">'+
                                '                            <p class="uploadPending">上传中...</p>'+
                                '                            <p class="uploadFail" style="display: none">上传失败<span>点击重试</span></p>'+
                                '                        </div>'+
                                '                        <span class="deleteImg"></span> '+
                                '                     </li>';

                        });
                        $('.ev-uploadImgList .ev-addImg',$(e.target).parents(".ev-uploadConier")).before(str);
                        // $('.ev-uploadImgList .imgPopup,.ev-uploadImgList .uploadPending',$(e.target).parents(".ev-uploadConier")).hide();
                    }else {
                        var str='';
                        $.each(this.itemList,function (index,ele) {
                            str+= '<li class="ev-video" data-path="https://vpro01.allinmd.cn/1528162686448_1280_720.mp4?1528162800">'+
                                '                        <img src="'+ele+'">'+
                                '                         <span class="videoBtn"></span>'+
                                '                        <div class="imgPopup" style="display: none">'+
                                '                            <p class="uploadPending">上传中...</p>'+
                                '                            <p class="uploadFail" style="display: none">上传失败<span>点击重试</span></p>'+
                                '                        </div>'+
                                '                        <span class="deleteImg"></span> '+
                                '                     </li>';

                        });
                        $('.ev-uploadVideoList .ev-addVideo',$(e.target).parents(".ev-uploadConier")).before(str);
                        // $('.ev-uploadVideoList .imgPopup,.ev-uploadVideoList .uploadPending',$(e.target).parents(".ev-uploadConier")).hide();
                    }


                }

            },
            addFile(type){
                this.isLayer=true;
                this.itemList=[];
                if(type=='img'){
                    this.addFileType='img';
                    this.uploadImg();
                }else {
                    this.addFileType='video';
                    this.uploadVideo();

                }

            },
            closeLayer(){
                this.isLayer=false;
                this.isImgSelect=[];
                this.isFirst=true;
                $('.moxie-shim').show();
            },
            uploadImg(){
                let t=this;
                $.getScript(window.paasFilePathObj.js,function() {
                    $('.ev-uploadImgBtn').each(function (index,ele) {
                        var _t = $(this);
                        _t.uploadImg({
                            ajaxData: {
                                url: "/call/multicenter/caseinfo/attachment/upload/"
                            },
                            multiple: true,
                            inputStyle: {
                                'width': '148px',
                                'height': '44px',
                                'z-index': 1,
                                  'opacity': 0
                            },
                            formData: {
                                //fileName:'uploadify',
                                caseId: t.uploadColumn.caseId,
                                sortId: 2,
                                menuId: t.uploadColumn.menuId,
                                groupId: 1
                            },
                            fileChange: function (data) {

                            },
                            fileSelected: function (file) {
                                var type = file.type;
                                if ((/(jpg)|(jpeg)|(png)|(bmp)$/i.test(type))) {
                                    var fileSize = file.size;
                                    if (fileSize > 10 * 1048576) {
                                        // t.errorPop("图片过大，请联系在线客服寻求帮助", 1);
                                        // alert("图片过大，请联系在线客服寻求帮助");
                                        t.isUplaodError=true;
                                        t.uploadErrorText="图片过大，请联系在线客服寻求帮助";
                                        setTimeout(function () {
                                            t.isUplaodError=false;
                                        },3000)
                                        $(".ev-uploadImgBtn input").val("");
                                        return false;
                                    }
                                } else {
                                    // t.errorPop("格式不支持，请选择jpg、png、jpeg、bmp", 1);
                                    // alert("格式不支持，请选择jpg、png、jpeg、bmp");
                                    t.isUplaodError=true;
                                    t.uploadErrorText="格式不支持，请选择jpg、png、jpeg、bmp";
                                    setTimeout(function () {
                                        t.isUplaodError=false;
                                    },3000)
                                    $(".ev-uploadImgBtn input").val("");
                                    return false;
                                }
                                t.uploadImgStatus = false;//上传图片的状态：正在上传中
                                t.closeLayer();
                                var $ul = _t.parents(".ev-uploadConier").find('.ev-uploadImgList .ev-addImg');
                                var html = '<img src="' + t.localURL(file) + '">' +
                                    '<div class="imgPopup" style="display: none">' +
                                    '  <p class="uploadPending" style="display: none"><i></i><span>0%</span></p>' +
                                    '  <p class="uploadFail" style="display: none">上传失败<br/><span>请重新上传</span></p>' +
                                    '</div>' +
                                    '<span class="deleteImg ev-imgDel"></span>';
                                var data = {};
                                data.context = $('<li class="ev-bigImg"></li>').append(html);
                                data.context.find(".imgPopup,.imgPopup .uploadPending").show();//loading图进行显示
                                $ul.before(data.context);
                                file.context = data.context;
                            },
                            uploadBefore: function (file) {
                                var node = $(file.context);
                                node.find(".imgPopup,.imgPopup .uploadPending").show();//黑色背景显示
                                file.progress = 0;
                                var step = 10;
                                var count = 90;
                                if (file.size > 4 * 1024 * 1024) {
                                    step = 1;
                                    count = 99;
                                } else if (file.size > 2 * 1024 * 1024) {
                                    step = 5;
                                    count = 90;
                                }
                                file.timer = setInterval(function () {
                                    if (file.progress < count) {
                                        file.progress += step;
                                        node.find('.uploadPending span').text(file.progress + "%");
                                    } else {
                                        clearInterval(file.timer);
                                    }
                                }, 50);
                            },
                            uploadSuccess: function (data, file) {
                                var response = data;
                                var node = $(file.context);
                                node.find(".uploadPending span").html('100%');
                                node.find(".imgPopup,.imgPopup .uploadPending").hide();//黑色背景显示
                                if (response && response.responseObject && response.responseObject.responseStatus) {//图片上传成功
                                    node.attr("listId", response.responseObject.responsePk);
                                    node.find(".deleteImg").show();//删除按钮显示
                                } else {
                                    node.attr("isError", 1);
                                    node.find(".imgPopup .uploadPending").hide();//上传失败后loading隐藏
                                    node.find(".imgPopup,.imgPopup .uploadFail").show();//黑色背景显示
                                    node.find(".deleteImg").show();
                                }
                                $(".ev-imgDel").off('click').on("click", function (e) {//点击删除
                                    e.stopPropagation();
                                    e.preventDefault();
                                    $(this).parents("li").remove();
                                });
                                //点击删除
                                node.find(".deleteImg").on("click", function () {
                                    node.remove();
                                });
                                t.uploadImgStatus = true;
                            },
                            uploadFail: function (data) {
                                var node = $(data.context);
                                // alert("图片上传失败,请重新上传");
                                t.isUplaodError=true;
                                t.uploadErrorText="图片上传失败,请重新上传";
                                setTimeout(function () {
                                    t.isUplaodError=false;
                                },3000)
                                node.attr("isError", 1);
                                node.find(".imgPopup .uploadPending").hide();//上传失败后loading隐藏
                                node.find(".imgPopup,.imgPopup .uploadFail").show();//黑色背景显示
                                node.find(".deleteImg").show();
                                $(".ev-imgDel").off('click').on("click", function (e) {//点击删除
                                    e.stopPropagation();
                                    e.preventDefault();
                                    $(this).parents("li").remove();
                                });
                            }
                        });
                    })
                });

            },
            uploadVideo:function(){
                var t=this;
                $.getScript(window.paasFilePathObj.js,function() {
                    var obj=$(".ev-uploadVideoBtn");
                    var video=videoUpload({
                        obj:"#"+obj.attr("id"),
                        flash_swf_url:'//paas.allinmd.cn/modules/video_upload/plupload/Moxie.swf',
                        dragdrop:true,
                        max_file_size:80,
                        uptoken_url: "/call/qiniu/storage/getQiniuToken/",
                        domain:'//www.allinmd.cn',
                        pluploadEach:function(file){//每个文件添加队列后执行
                            var html = '<li class="imagesUploadBtn ev-uploadVideoLi"  data-Lenth="'+$(".ev-uploadVideoLi").length+'">' +
                                '<img src="" class="ev-uploadVideoPath">' +
                                '<div class="imgPopup" style="display: none">' +
                                '  <p class="uploadPending" style="display: none"><i></i><span></span></p>' +
                                '  <p class="uploadFail" style="display: none">上传失败<span>点击重试</span></p>' +
                                '</div>' +
                                '<span class="deleteImg ev-imgDel"></span>'+
                                '</li>';
                            $(obj).parents(".ev-uploadConier").find('.ev-uploadVideoList .ev-addVideo').before(html);
                            var videoList=$(obj).parents(".ev-uploadConier").find('.ev-uploadVideoList li');
                            file.context=videoList.eq(videoList.length-2);

                        },
                        beforeUpload:function(file){//文件上传之前
                            var name = t.getName(file.name);
                            var fileName = name.fileName;
                            var suffix = name.suffixName;
                            if ((/(mp4)|(mov)|(avi)|(wmv)|(flv)$/i.test(suffix))) {
                                var fileSize = file.size;
                                if (fileSize > 80 * 1048576) {
                                    // alert("视频过大，请联系在线客服寻求帮助");
                                    t.isUplaodError=true;
                                    t.uploadErrorText="视频过大，请联系在线客服寻求帮助";
                                    setTimeout(function () {
                                        t.isUplaodError=false;
                                    },3000)
                                    video.uploader.removeFile(video.uploader.getFile(file.id));
                                    return false;
                                }
                            } else {
                                // alert("格式不支持，请选择mov、mp4、avi、wmv、flv");
                                t.isUplaodError=true;
                                t.uploadErrorText="格式不支持，请选择mov、mp4、avi、wmv、flv";
                                setTimeout(function () {
                                    t.isUplaodError=false;
                                },3000)
                                video.uploader.removeFile(video.uploader.getFile(file.id));
                                return false;
                            }
                            t.closeLayer();
                            $(obj).parents(".ev-uploadConier").find('.ev-uploadVideoList .ev-addVideo').hide();
                            t.uploadVideoStatus=false;
                            obj.data("videoName", (fileName.length > 15 ? fileName.substring(0, 15) + '...' + '.' + suffix : fileName + '.' + suffix));
                        },
                        uploadProgress:function(file){//上传进度条
                            var context=file.context;
                            $(".imgPopup, .uploadPending",context).show();//显示进度
                            $(".uploadPending span",context).text(file.percent + "%");
                            if (file.percent == 100) {
                                $(".uploadPending,.imgPopup",context).remove();
                            }

                        },
                        fileUploaded:function(dataJson,file){//上传成功
                            var videoData = {};
                            var context=file.context;
                            context.attr('key',dataJson.key);
                            $(".ev-uploadVideoPath",context).attr("src", "/static/images/pages/uploadColumn/qiniu196_196.jpg");
                            $(context).parents(".ev-uploadConier").find('.ev-uploadVideoList .ev-addVideo').show();
                            $(".ev-imgDel").off('click').on("click", function () {//点击删除
                                $(this).parents("li").remove();
                            });
                            t.uploadVideoStatus=true;
                        },
                        fileUploadError:function(file){//上传失败
                            t.isUplaodError=true;
                            t.uploadErrorText="上传失败";
                            setTimeout(function () {
                                t.isUplaodError=false;
                            },3000)
                        }
                    })
                })

            },
            getName(obj) {
                var path = obj//obj.val();
                var pos1 = path.lastIndexOf('/');
                var pos2 = path.lastIndexOf("\\");
                var pos3 = Math.max(pos1, pos2);
                var pos4 = path.lastIndexOf(".");
                var fileName = path.substring(pos3 + 1, pos4);
                var suffixName = path.substring(pos4 + 1, path.length);
                return {
                    "fileName": fileName,   //文件名
                    "suffixName": suffixName //文件后缀
                };
            },
            localURL:function(file){
                var url = null;
                if (window.createObjectURL != undefined) {
                    url = window.createObjectURL(file);
                } else if (window.URL != undefined) {
                    url = window.URL.createObjectURL(file);
                } else if (window.webkitURL != undefined) {
                    url = window.webkitURL.createObjectURL(file);
                }
                return url;//     eg:     blob:http://localhost/671c3409-0047-44ec-bcba-89d63a439231
            },

        },
        mounted(){

        }
    }
</script>

<style  lang="scss">
    @import "../../utils/view-big-img/module.view-big-img.css";
    @import "../../assets/scss/modules/common-modules";
    @import "../../assets/scss/modules/utilities/utilities";
    .uploadConier{
        width: 1000px;
        margin: 0 auto;
        padding-bottom: 130px;
        .uploadColumnCont{
            /*&:after{*/
                /*content: '';*/
                /*display: block;*/
                /*width: 814px;*/
                /*height: 1px;*/
                /*background: #DFDFDF;*/
                /*margin-left: 184px;*/
            /*}*/
        }
        .formCommon{
            .articleText{
                /*vertical-align: top;*/
            }
        }
        .uploadImg{
            li{
                position: relative;
                .imgPopup{
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    background: rgba(0,0,0,0.7);
                    top: 0;
                    p{
                        position: absolute;
                        left: 50%;
                        top: 50%;
                        -webkit-transform: translate(-50%);
                        transform: translate(-50%,-50%);
                        font-size: 13px;
                        color: #fff;
                    }
                    .uploadPending{
                        i{
                            display: block;
                            width: 28px;
                            height: 28px;
                            background: url(/static/images/pages/uploadColumn/loading.png) no-repeat;
                            margin: 0 auto 5px;
                            animation: rotate 1s linear infinite;
                            -webkit-animation: rotate 1s linear infinite;
                        }
                    }
                    .uploadFail{
                        font-size: 18px;
                        white-space: nowrap;
                    }
                }
                .deleteImg{
                    position: absolute;
                    width: 26px;
                    height: 26px;
                    right: 0;
                    top: 0;
                    background: url("/static/images/pages/uploadColumn/upClose.png") 100% 100% no-repeat;
                }
            }
            li:last-child{
                i{
                    @include iconImgI(inline-block,38px,31px);
                    background: url("/static/images/pages/newCases/camera.png") no-repeat;
                    margin: 53px 0 6px 0;
                }
            }
        }
        .uploadVideo{
            li{
                position: relative;
                .videoBtn{
                    background: url("/static/images/common/icon/PlayIcon.png") 100% 100% no-repeat;
                    width: 55px;
                    height: 55px;
                    position:absolute ;
                    left: 50%;
                    top: 50%;
                    -webkit-transform: translate(-50%);
                    transform: translate(-50%,-50%);
                }
                .imgPopup{
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    background: rgba(0,0,0,0.7);
                    top: 0;
                    p{
                        position: absolute;
                        left: 50%;
                        top: 50%;
                        -webkit-transform: translate(-50%);
                        transform: translate(-50%,-50%);
                        font-size: 13px;
                        color: #fff;
                    }
                    .uploadPending{
                        i{
                            display: block;
                            width: 28px;
                            height: 28px;
                            background: url(/static/images/pages/uploadColumn/loading.png) no-repeat;
                            margin: 0 auto 5px;
                            animation: rotate 1s linear infinite;
                            -webkit-animation: rotate 1s linear infinite;
                        }
                    }
                }
                .deleteImg{
                    position: absolute;
                    width: 26px;
                    height: 26px;
                    right: 0;
                    top: 0;
                    background: url("/static/images/pages/uploadColumn/upClose.png") 100% 100% no-repeat;
                }
            }
            li:last-child{
                i{
                    @include iconImgI(inline-block,38px,31px);
                    background: url("/static/images/pages/newCases/video.png") no-repeat;
                    margin: 53px 0 6px 0;
                }
            }
        }
        .uploadColumn{
            display: inline-block;
            vertical-align: top;
            width: 814px;
            li{
                width: 160px;
                height: 160px;
                border-radius: 4px;
                display: inline-block;
                vertical-align: top;
                text-align: center;
                margin: 0 21px 21px 0;
                img{
                    width: 100%;
                    height: 100%;
                    border-radius: 4px;
                }
                &:last-child{
                    border: 1px dashed #AAAAAA;
                    border-radius: 4px;

                    p{
                        @include fontSize(14px,#aaa);
                    }
                }

            }


        }
    }
    .uploadCloud{
        position: fixed;
        top: 0;
        bottom: 0;
        left:0;
        right: 0;
        z-index: 5;
        .uploadLayers{
            position: absolute;
            width: 100%;
            height: 100%;
            opacity: 0.7;
            background: #0A1E2B;
        }
        .layersContent{
            width: 800px;
            height: 594px;
            /*padding: 40px 30px;*/
            padding: 40px 0 40px 30px;
            box-sizing: border-box;
            background: #fff;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
            /*overflow: auto;*/
            .listContainer{
                overflow: auto;
                height: 75%;
            }
            .imgList{
                &.noImgList{
                    position: relative;
                    height: 100%;
                }
                li{
                    display: inline-block;
                    margin:0 20px 20px 0;
                    position: relative;
                    &.active{
                        i{
                            background: url("/static/images/pages/uploadColumn/select.png") 100% 100% no-repeat;
                        }
                    }
                    img{
                        width: 126px;
                        height: 126px;
                    }
                    i{
                        position: absolute;
                        right: 0;
                        width: 31px;
                        height: 31px;
                        background: url("/static/images/pages/uploadColumn/unselect.png") 100% 100% no-repeat;
                    }

                }
                .noImg{
                    text-align: center;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%,-50%);
                    .imgCont{
                        background: rgba(255,85,0,0.30);
                        display: inline-block;
                    }
                    p{
                        margin-top: 18px;
                        font-size: 20px;
                        color: #333333;
                    }
                }
            }
            .layersTitle{
                @include clearfix();
                padding-bottom: 40px;
                h4{
                    font-size: 24px;
                    color: #666666;
                    float: left;
                    font-weight: normal;
                    &.secontMenu{
                        i{
                            background: url("/static/images/pages/uploadColumn/rightArrow.png") 100% 100% no-repeat;
                            width: 10px;
                            height: 18px;
                            display: inline-block;
                            margin: 0 12.5px;
                        }
                    }
                }
                span{
                    float: right;
                    width: 24px;
                    height: 24px;
                    background: url("/static/images/pages/uploadColumn/close.png") 100% 100% no-repeat;
                    margin-right: 30px;
                }
            }
            .layerList{
                /*overflow: auto;*/
                /*height: 75%;*/
               &.noFileList{
                   position: relative;
                   height: 100%;
               }
                li{
                    display: inline-block;
                    margin:0 60px 60px 0;
                    p{
                        font-size: 16px;
                        color: #555555;
                        line-height: 16px;
                        margin-top: 20px;
                    }
                }
                .noFile{
                    text-align: center;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%,-50%);
                    .imgCont{
                        background: rgba(255,85,0,0.30);
                        display: inline-block;
                    }
                    p{
                        margin-top: 18px;
                        font-size: 20px;
                        color: #333333;
                    }
                }
            }
            .layerFooter{
                position: fixed;
                bottom: 0;
                line-height: 106px;
                border-top: 1px solid #DFDFDF;
                left: 0;
                right: 0;
                padding-left: 30px;
                background: #fff;
                &.layerSet{
                    text-align: right;
                    margin-right: 40px;
                }
                .selecFile{
                    border: 1px solid #2888FF;
                    border-radius: 2px;
                    width: 148px;
                    line-height: 44px;
                    text-align: center;
                    background: #fff;
                    font-size: 16px;
                    color: #2888FF;
                    position: relative;
                    .uploadVideo{
                        width: 148px;
                        height: 44px;
                        z-index: 1;
                        top: 0;
                        left: 0;
                        position: absolute;
                        opacity: 0;
                        &.unLoad{
                            display: none;
                        }
                    }
                }
                .selecSure{
                    padding: 0 34px;
                    line-height: 44px;
                    font-size: 16px;
                    color: #FFFFFF;
                    letter-spacing: 0;
                    text-align: center;
                    background: #2888FF;
                    border-radius: 2px;
                    &.noImgList{
                        background: #AAAAAA;
                        color: #FFFFFF;
                    }
                }
            }
        }
    }
    .uploadCaseError{
        position: fixed;
        left: 50%;
        top: 50%;
        z-index: 7;
        transform: translate(-50%,-50%);
        width: 340px;
        height: 46px;
        text-align: center;
        line-height: 46px;
        background: #fce3e3;
        border: 1px solid #feb5b5;
        border-radius: 2px;
        font-size: 16px;
        color: #333;
        padding: 0 30px;
        i {
            display: inline-block;
            width: 16px;
            height: 16px;
            background: url(/static/images/pages/uploadColumn/caution.png) no-repeat;
            vertical-align: middle;
            margin-right: 6px;
        }
    }
</style>

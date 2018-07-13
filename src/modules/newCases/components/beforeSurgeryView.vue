<template>
    <section class="alEmr-indexInner">
        <aside class="surgeryInfluence caseWidth1000">
            <h2>术后影像资料</h2>
            <div class="uploadColumnCont">
            <div class="formSelect formCommon"><p class="articleText">术后X片</p>
                <ul class="uploadColumn uploadImg">
                    <li><img src="https://img05.allinmd.cn/public1/M01/13/5A/wKgBMFsrdDeAawYfAALjjAJhig4145_c_p_300_300.png"></li>
                    <li><img src="https://img05.allinmd.cn/public1/M01/13/5A/wKgBMFsrdDeAawYfAALjjAJhig4145_c_p_300_300.png"></li>
                    <li><img src="https://img05.allinmd.cn/public1/M01/13/5A/wKgBMFsrdDeAawYfAALjjAJhig4145_c_p_300_300.png"></li>
                    <li><img src="https://img05.allinmd.cn/public1/M01/13/5A/wKgBMFsrdDeAawYfAALjjAJhig4145_c_p_300_300.png"></li>
                    <li><i></i><p>添加图片</p></li>
                </ul>
            </div>
            <div class="formSelect formCommon"><p class="articleText">术后X片</p>
                <ul class="uploadColumn uploadVideo">
                    <li><img src="https://img05.allinmd.cn/public1/M01/13/5A/wKgBMFsrdDeAawYfAALjjAJhig4145_c_p_300_300.png"></li>
                    <li><img src="https://img05.allinmd.cn/public1/M01/13/5A/wKgBMFsrdDeAawYfAALjjAJhig4145_c_p_300_300.png"></li>
                    <li><img src="https://img05.allinmd.cn/public1/M01/13/5A/wKgBMFsrdDeAawYfAALjjAJhig4145_c_p_300_300.png"></li>
                    <li><img src="https://img05.allinmd.cn/public1/M01/13/5A/wKgBMFsrdDeAawYfAALjjAJhig4145_c_p_300_300.png"></li>
                    <li><i></i><p>添加图片</p></li>
                </ul>
            </div>
            <div class="formSelect formCommon"><p class="articleText">术后X片</p>
                <div class="textarea"><textarea></textarea><i>200</i></div>
            </div>
            </div>
        </aside>
        <div class="caseBottomBtn">
            <p class="casePrevBtn">上一步</p>
            <p class="caseNextBtn">下一步</p>
        </div>
    </section>
</template>
<script>
    export default {}
</script>
<style lang="scss">
    @import "../../../assets/scss/modules/common-modules";
    .alEmr-indexInner{
        width: 1000px;
        margin: 0 auto;
        padding-bottom: 130px;
        .uploadColumnCont{
            &:after{
                content: '';
                display: block;
                width: 814px;
                height: 1px;
                background: #DFDFDF;
                margin-left: 184px;
            }
        }
        .formCommon{
            .articleText{
                /*vertical-align: top;*/
            }
        }
        .uploadImg{
            li:last-child{
                i{
                    @include iconImgI(inline-block,38px,31px);
                    background: url("/static/images/pages/newCases/camera.png") no-repeat;
                    margin: 53px 0 6px 0;
                }
            }
        }
        .uploadVideo{
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
</style>

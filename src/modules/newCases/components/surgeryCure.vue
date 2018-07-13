<template>
    <section class="alEmr-indexInner">
        <aside class="caseWidth1000 surgeryCure">
            <h2>手术治疗</h2>
            <div class="formSelectS formCommon">
                <p class="articleText">手术时间</p>
                <div class="cont">
                    <div class="selectCont"><span>2013</span>
                        <ul class="selectOption">
                            <li>2014</li><li>2015</li><li>2013</li><li>2014</li>
                        </ul>
                    </div>
                    <b>年</b>
                    <div class="selectCont width83"><span>05</span>
                        <ul class="selectOption">
                            <li>2014</li><li>2015</li><li>2013</li><li>2014</li>
                        </ul>
                    </div>
                    <b>月</b>
                    <div class="selectCont width83"><span>10</span>
                        <ul class="selectOption">
                            <li>2014</li><li>2015</li><li>2013</li><li>2014</li>
                        </ul>
                    </div>
                    <b>日</b>
                </div>
            </div>
            <div class="formInput formCommon"><p class="articleText"><i>*</i>姓名</p> <div class="inputCont"><input type="text" placeholder="请输入"> <i>17</i></div></div>
            <div class="formTag formCommon"><p class="articleText">标签</p> <div class="tagCont"><ul><li class="">标签名字<i c-show="item.addTag"></i></li><li class="">标签名字<i c-show="item.addTag"></i></li><li class="">标签名字<i c-show="item.addTag"></i></li><li class="">标签名字<i c-show="item.addTag"></i></li><li class="">标签名字<i c-show="item.addTag"></i></li></ul> </div></div>
            <div class="formTag formCommon"><p class="articleText">标签</p> <div class="tagCont"><ul><li class="">标签名字<i c-show="item.addTag"></i></li><li class="">标签名字<i c-show="item.addTag"></i></li><li class="">标签名字<i c-show="item.addTag"></i></li><li class="">标签名字<i c-show="item.addTag"></i></li><li class="">标签名字<i c-show="item.addTag"></i></li></ul> <div class="tagInput"><div class="tagInputCont"><input type="text" placeholder="输入新标签"><i>10</i></div> <p>添加</p></div></div></div>
            <div class="formInput formCommon"><p class="articleText">假体名称</p> <div class="inputCont"><input type="text" placeholder="请输入"></div></div>
            <div class="formInput formCommon"><p class="articleText">假体品牌</p> <div class="inputCont"><input type="text" placeholder="请输入"></div></div>
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
    .alEmr-indexInner{
        width: 1000px;
        margin: 0 auto;
        .selectOption{
            display: none;
        }
        .surgeryCure{
            .formInput{
                .inputCont{
                    width: 810px;
                }
            }
        }

    }
</style>

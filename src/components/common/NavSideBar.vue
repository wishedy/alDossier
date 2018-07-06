<template>
    <section class="alDossier-aside">
        <Logo></Logo>
        <ul class="alDossier-aside-list">
            <li class="alDossier-aside-item">
                <a href="../routerDemo">
                    <i class="icon icon-build"></i>
                    <p class="title">新建</p>
                </a>
            </li>
            <li class="alDossier-aside-item">
                <a href="../vuexDemo">
                    <i class="icon icon-patients"></i>
                    <p class="title">选择患者</p>
                </a>
            </li>
            <li class="alDossier-aside-item alDossier-aside-active">
                <a href="../module3">
                    <i class="icon icon-template"></i>
                    <p class="title">全部病例</p>
                    <div class="pointTo"></div>
                </a>
            </li>
            <li class="alDossier-aside-item alDossier-aside-normal">
                <a href="../module3">
                    <i class="icon icon-template"></i>
                    <p class="title">模板库</p>
                </a>
            </li>
        </ul>
        <section class="alDossier-aside-item alDossier-aside-outside">
            <a href="../module3">
                <i class="icon icon-team"></i>
                <p class="title">团队设置</p>
            </a>
        </section>
    </section>
</template>
<script>
    import Logo from './Logo.vue';
    export default {
        components:{
            Logo
        }
    }
</script>
<style scoped lang="scss">
    .alDossier-aside{
        position: fixed;
        left: 0;
        top:0;
        width: 270px;
        height: 100%;
        background: #303F5B;
        z-index: 2;
        &-list{
            width: 100%;
            //background: #fff;
            min-height: 50px;
        }
        &-item,&-all{
            cursor: pointer;
            background: #4B6EA6;
            border-radius: 100px;
            width: 220px;
            height: 50px;
            margin: 30px auto 0 auto;
            a{
                display: block;
                width: 100%;
                height: 100%;
                position: relative;
                .pointTo{
                    position: absolute;
                    right: -1px;
                    background: url("../../assets/images/aside/leftPoint.png") no-repeat center 50%;
                    width: 12px;
                    height: 20px;
                    top:50%;
                    margin-top: -10px;
                }
            }
            &:nth-of-type(1){
                margin-top: 61px;
            }
            .icon{
               display: inline-block;
                width: 21px;
                height: 21px;

                margin: -5px 8px 0 58px;
                vertical-align: middle;
                &-build{
                    background: url("../../assets/images/aside/buildCase.png") no-repeat center 50%;
                }
                &-patients{
                    background: url("../../assets/images/aside/selectPatients.png") no-repeat center 50%;
                }
                &-template{
                    background: url("../../assets/images/aside/templateIcon.png") no-repeat center 50%;
                }
                &-team{
                    background: url("../../assets/images/aside/teamIcon.png") no-repeat center 50%;
                }

            }
            .title{
                line-height:50px;
                font-family: MicrosoftYaHei;
                font-size: 18px;
                color: #FEFEFE;
                display: inline-block;
                text-align: left;
            }
        }
        &-normal{
            background: none;
            border-radius: unset;
            a{
                .pointTo{
                    display: none;
                }
            }
        }
        &-active{
            background: #2586FF;
            height: 80px;
            width: 100%;
            border-radius: unset;
            .icon{
                display: inline-block;
                width: 21px;
                height: 21px;
                vertical-align: middle;
                margin: -5px 8px 0 85px;
            }
            a{
                .pointTo{
                    display: block;
                }
            }
            .title{
                line-height:80px;
            }
        }
        &-outside{
            position: absolute;
            bottom:80px;
            left: 50%;
            margin-left: -110px;

        }
    }
</style>

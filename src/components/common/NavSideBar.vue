<template>
    <section class="alEmr-aside">
        <Logo></Logo>
        <!--<ul class="alEmr-aside-list">
            <li class="alEmr-aside-item">
                <a href="../newCases?edit=0">
                    <i class="icon icon-build"></i>
                    <p class="title">新建病历</p>
                </a>
            </li>
            <li class="alEmr-aside-item">
                <a href="../choosePatients">
                    <i class="icon icon-patients"></i>
                    <p class="title">选择患者</p>
                </a>
            </li>
            <li class="alEmr-aside-item alEmr-aside-normal" :class="{'alEmr-aside-active':sideSetting.index==1}">
                <a href="/">
                    <i class="icon icon-allCase"></i>
                    <p class="title">全部病历</p>
                    <div class="pointTo" v-if="sideSetting.index==1"></div>
                </a>
            </li>
            <li class="alEmr-aside-item alEmr-aside-normal" :class="{'alEmr-aside-active':sideSetting.index==2}">
                <a href="../templateLib">
                    <i class="icon icon-template"></i>
                    <p class="title">模板库</p>
                    <div class="pointTo" v-if="sideSetting.index==2"></div>
                </a>
            </li>
        </ul>
        <section class="alEmr-aside-item alEmr-aside-outside alEmr-aside-normal" :class="{'alEmr-aside-active':sideSetting.index==3}">
            <a href="../teamSetting">
                <i class="icon icon-team"></i>
                <p class="title">团队设置</p>
                <div class="pointTo" v-if="sideSetting.index==3"></div>
            </a>
        </section>-->
        <ul class="navSideBarLi">
            <li class="navLeftNormal"><a href="../newCases?edit=0" @click="newCaseclick"><i class="caseIcon"></i><span>新建病例</span></a></li>
            <li class="navLeftNormal"><a href="../choosePatients"><i class="patientsIcon"></i><span>选择患者</span></a></li>
            <li class="navLeftSpecial" :class="{active:sideSetting.index==1}"><a href="/"><i class="allCaseIcon"></i><span>全部病历</span></a></li>
            <li class="navLeftSpecial" :class="{active:sideSetting.index==2}"><a href="../templateLib"><i class="templateIcon"></i><span>模板库</span></a></li>
            <li class="navLeftSpecial position" :class="{active:sideSetting.index==3}"><a href="../teamSetting"><i class="templateIcon"></i><span>团队设置</span></a></li>
        </ul>

    </section>
</template>
<script>
    import Logo from './Logo.vue';
    export default {
        props:[
            'sideSetting'
        ],
        data() {
            return {
                activeOnOff:false,
            }
        },
        methods:{
            navSideBarLiCli(){
                this.activeOnOff=true;
            },
            //移除新建病例缓存
            newCaseclick(){
                localStorage.removeItem("emrNewCaseCaseId");
            }
        },
        components:{
            Logo
        }
    }
</script>
<style scoped lang="scss">
@import "../../assets/scss/components/navSideBar.scss";
</style>

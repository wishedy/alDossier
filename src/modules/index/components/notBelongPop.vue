<template>
    <!--病历不能被归属提示开始-->
    <section class="alEmr-noBelongCasePop" v-if="alBelongFail">
        <section class="alEmr-noBelongCaseList">
            <h2>归属提示</h2>
            <section class="textBox">
                <h3>以下<span>{{infoList.length}}</span>个病历已归属其他团队，暂时无法更改到本团队。</h3>
                <ul>
                    <li v-for="(val,i) in infoList">
                        <span class="itemOne">{{val.patientName|nameTxt}}</span>
                        <span class="itemTwo">{{val.sex|sexText}}</span>
                        <span class="itemThree">{{val.age}}</span>
                        <span class="itemFour">{{val.preDia|commCutStr}}</span>
                        <span class="itemFive">{{val.operationName|commCutStr}}</span>
                        <span class="itemSix">{{val.tagName|commCutStr}}</span>
                    </li>
                </ul>

            </section>
            <aside>
                <p class="cancelBtn" @click="cancelBelong">放弃</p>
                <p class="sureBtn" @click="continueBelong">继续</p>
            </aside>
        </section>
    </section>
    <!--病历不能被归属提示结束-->
</template>

<script>
    import {mapActions,mapGetters} from 'vuex';
    export default {
        name: 'notBelongPop',
        data(){
            return{
                infoList:[],//病例信息
            }
        },
        computed:{
            ...mapGetters(['alBelongList','alBelongFail','failBelongInfo']),
        },
        methods: {
            ...mapActions(['alBelongFailChange', 'alBelongListChange','failBelongInfoChange']),
            //循环选择失败的列表病例信息
            failList(){
                let t=this;
                for (let i=0;i<t.failBelongInfo.length;i++){
                    let item1=t.failBelongInfo[i];
                    for (let j=0;j<t.alBelongFail.length;j++) {
                        let item2=t.alBelongFail[j];
                        if(item2.id==item1.id){
                            t.infoList.push(item1);
                        }
                    }
                }
            },
            //放弃归属,回到操作前
            cancelBelong(){
                let t=this;
            },
            //继续归属，belongList删除不符合的id
            continueBelong(){
                let t=this;

            }
        },
        filters:{
            nameTxt(txt){
                return comm.getStrLen(txt,10);
            },
            sexText(num){//性别转换
                let txt="";
                switch (parseInt(num)){
                    case 0:
                        txt="女";
                        break;
                    case 1:
                        txt="男";
                        break;
                }
                return txt;
            },
            commCutStr(txt){//字段截取
                return comm.getStrLen(txt,14);
            },
        }
    }
</script>

<style scoped>

</style>

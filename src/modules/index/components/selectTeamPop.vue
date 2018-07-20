<template>
    <!--病历归属选择团队开始-->
    <section class="alEmr-selectTeamPop" v-if="sTeamFlag">
        <section class="alEmr-selectTeamList">
            <h2>归属提示</h2>
            <section class="textBox">
                <h3>归属更改后，只有团队所有者才能进行变更哦～</h3>
                <ul>
                    <li v-for="(val,i) in teamNameList" :class="{active:i===tIndex}" @click="selectTeamId(i)">
                        <i></i><span>{{val.teamName|teamTxt}}</span>
                    </li>
                </ul>
            </section>
            <aside>
                <p class="cancelBtn" @click="sTeamCancel">取消</p>
                <p class="sureBtn" @click="sTeamSure">确定</p>
            </aside>
        </section>
    </section>
    <!--病历归属选择团队结束-->
</template>

<script>
    import {mapActions,mapGetters} from 'vuex';
    import comm from "~utils/comm.js";
    export default {
        name: 'selectTeamPop',
        data(){
            return{
                tIndex:''
            }
        },
        computed:{
            ...mapGetters(['teamNameList','teamId','sTeamFlag']),
        },
        methods: {
            ...mapActions(['teamNameListChange','teamIdChange','belongAjax','sTeamFlagChange']),
            //选择一个归属团队
            selectTeamId(index){
                let t=this;
                t.tIndex=index;
                t.teamIdChange(t.teamNameList[index].teamId);
            },
            //确认选择团队按钮
            sTeamSure(){
                let t=this;
                t.belongAjax();//发送归属请求
            },
            sTeamCancel(){
                let t=this;
                t.sTeamFlagChange(false);
            }
        },
        filters:{
            teamTxt(txt){
                return comm.getStrLen(txt,38);
            }
        }
    }
</script>

<style scoped>

</style>

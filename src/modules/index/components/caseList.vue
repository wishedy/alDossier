<template>
    <!--病历列表开始-->
    <section class="alEmr-caseList" :class="{screening:!scrShowFlag}">
        <aside class="attrBtnBox">
            <p class="attrBtn attrCancelBtn" @click="beCancel" v-if="belongBtn">取消</p>
            <p class="attrBtn attrSureBtn" @click="beSure" v-if="belongBtn">确认<span v-if="chooseTips">请先选择一个病历</span></p>
            <p class="attrBtn" @click="belongClick" v-if="!belongBtn">归属</p>
        </aside>
        <section class="caseItems" :class="{editStatus:belongBtn}">
            <!--病历列表标题开始-->
            <aside>
                <b class="allBtn" :class="{active:allBtnFlag}" @click="allBtnClick"></b>
                <p class="orderOne"><span>姓名</span></p>
                <p class="orderTwo"><span>性别</span></p>
                <p class="commOrder orderThree" @click="orderClick(1)"><span>年龄</span></p>
                <p class="commOrder orderFour" @click="orderClick(2)"><span>术前诊断</span></p>
                <p class="commOrder orderFive" @click="orderClick(3)"><span>手术名称</span></p>
                <p class="commOrder orderSix" @click="orderClick(4)"><span>标签</span></p>
                <p class="commOrder orderSeven" @click="orderClick(5)"><span>更新时间</span></p>
                <p class="commOrder orderEight" @click="orderClick(6)"><span>完整度</span></p>
            </aside>
            <!--病历列表标题结束-->
            <!--病历列表内容开始-->
            <ul>
                <li v-for="(val,i) in itemsArr">
                    <b :class="{active:val.edit}" @click="multiBtn(i)"></b><!--编辑选中标志 {active:}-->
                    <span class="listOne"><span>{{val.patientName|nameTxt}}</span><i :class="{personal:val.team===0}"></i></span>
                    <span class="listTwo">{{val.sex|sexText}}</span>
                    <span class="listThree">{{val.age}}</span>
                    <span class="listFour">{{val.preDia|commCutStr}}</span>
                    <span class="listFive">{{val.operationName|commCutStr}}</span>
                    <span class="listSix">{{val.tagName|commCutStr}}</span>
                    <span class="listSeven">{{val.uploadTime|commDateText}}</span><!--val.uploadTime-->
                    <span class="listEight">{{val.integrity|percentTxt}}</span>
                </li>
            </ul>
            <!--病历列表内容结束-->
        </section>
    </section>
    <!--病历列表结束-->
</template>

<script>
    import {mapActions,mapGetters} from 'vuex';
    import comm from "~utils/comm.js";
    import commdate from "~utils/commdate.js";
    const xUrl={
        getBelongList:'/emrpc/call/caseFolder/team_member/getCaseBelongMapList/'
    };
    export default {
        name: 'caseList',
        data(){
            return{

            }
        },
        computed:{
            ...mapGetters(['itemsArr','scrShowFlag','belongList','belongBtn','chooseTips','allBtnFlag']),
        },
        methods:{
            ...mapActions(['orderTypeChange','itemsArrChange',
                'belongListChange','belongBtnChange','chooseTipsChange','allBtnFlagChange',
                'teamListAjax','failBelongInfoChange']),
            //排序点击事件
            orderClick(index){
                let t=this;
                switch (parseInt(index)){
                    case 1://年龄
                        t.orderTypeChange(1);
                        break;
                    case 2://术前诊断
                        t.orderTypeChange(2);
                        break;
                    case 3://手术名称
                        t.orderTypeChange(3);
                        break;
                    case 4://标签
                        t.orderTypeChange(4);
                        break;
                    case 5://更新时间
                        t.orderTypeChange(5);
                        break;
                    case 6://完整度
                        t.orderTypeChange(6);
                        break;

                }
            },
            //归属按钮的点击
            belongClick(){
                let t=this;
                t.belongBtnChange(true);
            },
            //归属操作取消
            beCancel(){
                let t=this;
                t.belongBtnChange(false);
                t.belongListChange({caseId:'',flag:false});//取消操作的时候，默认取消所有id
                t.failBelongInfoChange({val:''},false);
                t.chooseTipsChange(false);
            },
            //归属操作确认
            beSure(){
                let t=this;
                if(t.belongList.length>0){//选中的列表长度大于0时才可进行归属操作
                    t.teamListAjax();
                }else{//提示，请选择一个病例
                    t.chooseTipsChange(true);
                }
            },
            //归属多选按钮点击操作
            multiBtn(index){
                let t=this;
                t.chooseTipsChange(false);
                for (let i=0;i<t.itemsArr.length;i++){
                    let _kv=t.itemsArr[i];
                    if(parseInt(i)===parseInt(index)){
                        if(_kv.edit){
                            _kv.edit=false;
                            t.belongListChange({caseId:_kv.id,flag:false});
                            t.failBelongInfoChange({val:_kv},false);

                        }else{
                            _kv.edit=true;
                            t.belongListChange({caseId:_kv.id,flag:true});
                            t.failBelongInfoChange({val:_kv},true);
                        }
                    }
                }
            },
            //全选按钮点击事件
            allBtnClick(){
                let t=this;
                t.allBtnFlagChange(!t.allBtnFlag);
                t.belongListChange({caseId:'',flag:false});//默认先清空选中列表
                t.failBelongInfoChange({val:''},false);
                if(t.allBtnFlag){//再循环按顺序选中
                    t.chooseTipsChange(false);
                    for (let i=0;i<t.itemsArr.length;i++){
                        let _kv=t.itemsArr[i];
                        if(_kv.edit){
                            _kv.edit=false;
                        }
                        _kv.edit=true;
                        t.belongListChange({caseId:_kv.id,flag:true});
                        t.failBelongInfoChange({val:_kv},true);
                    }
                }else{//全部取消操作
                    for (let i=0;i<t.itemsArr.length;i++){
                        let _kv=t.itemsArr[i];
                            _kv.edit=false;
                    }
                }
            },
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
            percentTxt(num){//百分比转换
                return num*100+'%';
            },
            commDateText(date){//日期转换
                return commdate.diffDay_three(date,commdate.local_time());
            }
        }

    }
</script>

<style>

</style>

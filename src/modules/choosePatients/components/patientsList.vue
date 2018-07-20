<template>
    <div>
        <div class="patListCon">
            <p class="importBtn" @click="importBtn()">导入<span class="patChoNum" v-text="patChoNum">0</span>
                <span class="patTip" v-show="tipError">请选择一个患者</span>
            </p>
            <section class="patLists">
                <section class="calendar"><i></i><span>12月30号</span></section>
                <ul>
                    <!--<li :class="{patListItem:true,active:indexItem.includes(index+'-'+0)}" v-for="(item,index) in patientLists">-->
                    <li :class="{patListItem:true,unchecked:true,active:indexItem.includes(index+'-'+0)}" v-for="(item,index) in patientLists">
                        <span class="patChooBtn" @click.stop="(1==1?false:true) && itemCli(index,0)"></span>
                        <span class="patType">报道患者</span>
                        <span class="patName">{{item.customerName}}</span>
                        <span class="patSex">女</span>
                        <span class="patAge">100</span>
                        <span class="patNum1">肱骨骨折桡骨肱骨折</span>
                        <span class="patNum1">#特别关注胫腓...#</span>
                        <span class="patNum1">#特别关注手术修#</span>
                        <span class="patNum1">肱骨骨折桡骨肱骨折</span>
                        <span class="patNum1">#特别关注胫腓...#</span>
                    </li>
                </ul>
            </section>
            <section class="patLists">
                <section class="calendar"><i></i><span>12月30号</span></section>
                <ul>
                    <li :class="{patListItem:true,active:indexItem.includes(index+'-'+1)}" v-for="(item,index) in patientLists">
                        <span class="patChooBtn" @click.stop="(1==3?false:true) && itemCli(index,1)"></span>
                        <span class="patType">报道患者</span>
                        <span class="patName">{{item.customerName}}</span>
                        <span class="patSex">女</span>
                        <span class="patAge">100</span>
                        <span class="patNum1">肱骨骨折桡骨肱骨折</span>
                        <span class="patNum1">#特别关注胫腓...#</span>
                        <span class="patNum1">#特别关注手术修#</span>
                        <span class="patNum1">肱骨骨折桡骨肱骨折</span>
                        <span class="patNum1">#特别关注胫腓...#</span>
                    </li>
                </ul>
            </section>
            <section class="patLists">
                <section class="calendar"><i></i><span>12月30号</span></section>
                <ul>
                    <li class="patListItem">
                        <span class="patChooBtn"></span>
                        <span class="patType">报道患者</span>
                        <span class="patName">黄景瑜啊</span>
                        <span class="patSex">女</span>
                        <span class="patAge">100</span>
                        <span class="patNum1">肱骨骨折桡骨肱骨折</span>
                        <span class="patNum1">#特别关注胫腓...#</span>
                        <span class="patNum1">#特别关注手术修#</span>
                        <span class="patNum1">肱骨骨折桡骨肱骨折</span>
                        <span class="patNum1">#特别关注胫腓...#</span>
                    </li>
                    <li class="patListItem">
                        <span class="patChooBtn"></span>
                        <span class="patType typeTwo">问诊患者</span>
                        <span class="patName">黄景瑜啊</span>
                        <span class="patSex">女</span>
                        <span class="patAge">100</span>
                        <span class="patNum1">肱骨骨折桡骨肱骨折</span>
                        <span class="patNum1">#特别关注胫腓...#</span>
                        <span class="patNum1">#特别关注手术修#</span>
                        <span class="patNum1">肱骨骨折桡骨肱骨折</span>
                        <span class="patNum1">#特别关注胫腓...#</span>
                    </li>
                    <li class="patListItem">
                        <span class="patChooBtn"></span>
                        <span class="patType">报道患者</span>
                        <span class="patName">黄景瑜啊</span>
                        <span class="patSex">女</span>
                        <span class="patAge">100</span>
                        <span class="patNum1">肱骨骨折桡骨肱骨折</span>
                        <span class="patNum1">#特别关注胫腓...#</span>
                        <span class="patNum1">#特别关注手术修#</span>
                        <span class="patNum1">肱骨骨折桡骨肱骨折</span>
                        <span class="patNum1">#特别关注胫腓...#</span>
                    </li>
                </ul>
            </section>
            <section class="patLists">
                <section class="calendar"><i></i><span>12月30号</span></section>
                <ul>
                    <li class="patListItem">
                        <span class="patChooBtn"></span>
                        <span class="patType">报道患者</span>
                        <span class="patName">黄景瑜啊</span>
                        <span class="patSex">女</span>
                        <span class="patAge">100</span>
                        <span class="patNum1">肱骨骨折桡骨肱骨折</span>
                        <span class="patNum1">#特别关注胫腓...#</span>
                        <span class="patNum1">#特别关注手术修#</span>
                        <span class="patNum1">肱骨骨折桡骨肱骨折</span>
                        <span class="patNum1">#特别关注胫腓...#</span>
                    </li>
                    <li class="patListItem">
                        <span class="patChooBtn"></span>
                        <span class="patType typeTwo">问诊患者</span>
                        <span class="patName">黄景瑜啊</span>
                        <span class="patSex">女</span>
                        <span class="patAge">100</span>
                        <span class="patNum1">肱骨骨折桡骨肱骨折</span>
                        <span class="patNum1">#特别关注胫腓...#</span>
                        <span class="patNum1">#特别关注手术修#</span>
                        <span class="patNum1">肱骨骨折桡骨肱骨折</span>
                        <span class="patNum1">#特别关注胫腓...#</span>
                    </li>
                    <li class="patListItem">
                        <span class="patChooBtn"></span>
                        <span class="patType">报道患者</span>
                        <span class="patName">黄景瑜啊</span>
                        <span class="patSex">女</span>
                        <span class="patAge">100</span>
                        <span class="patNum1">肱骨骨折桡骨肱骨折</span>
                        <span class="patNum1">#特别关注胫腓...#</span>
                        <span class="patNum1">#特别关注手术修#</span>
                        <span class="patNum1">肱骨骨折桡骨肱骨折</span>
                        <span class="patNum1">#特别关注胫腓...#</span>
                    </li>
                </ul>
            </section>
        </div>
        <div class="patPopupCont" v-show="importErr||importSuc">
            <section class="importError" v-show="importErr">
                <i class="impClose" @click.stop="popupCancle"></i>
                <article class="impErrTop">
                    <i></i>
                    <p>导入失败，请检查你的的网络设置</p>
                </article>
                <article class="impErrBot">
                    <button class="impCancle" @click.stop="popupCancle">取消</button>
                    <button class="impAgain">重新上传</button>
                </article>
            </section>
            <section class="importSuc importError" v-show="importSuc">
                <i class="impClose" @click.stop="popupCancle"></i>
                <article class="impErrTop">
                    <i></i>
                    <div>
                        <p>导入成功</p>
                        <p>
                            已将已选择的患者成功导入到病历中，可
                            在全部病历中查看
                        </p>
                    </div>
                </article>
                <article class="impErrBot">
                    <button class="impAgain" @click.stop="popupCancle">知道了</button>
                </article>
            </section>
        </div>
    </div>

</template>
<script>
    import comm from '../../../utils/comm.js';
    import axios from 'axios';
    const $ = require("jquery");
    export default {
        components:{

        },
        data() {
            return {
                tipError:false,//错误提示，true为显示错误提示
                patientLists:'',
                patChoNum:0,
                isClicked:false,//用来标示已经点击过
                // indexItem:0
                indexItem:[],
                patientData:[],
                cliFlag:true,
                importSuc:false,
                importErr:false
            }
        },
        watch:{
            importErr(){
                if(this.importErr){
                    $('body').addClass('bodyHidden');
                }else{
                    $('body').removeClass('bodyHidden');
                }
            },
            importSuc(){
                if(this.importSuc){
                    $('body').addClass('bodyHidden');
                }else{
                    $('body').removeClass('bodyHidden');
                }
            },
        },
        methods:{
            importBtn(){
                let t = this;
                if(t.patChoNum<=0){
                    t.tipError = true;
                    let timer = setTimeout(function () {
                        t.tipError = false;
                        clearTimeout(timer);
                    },3000);
                }else{
                //    此时走入接口判断是否导入成功过
                    if(false){//导入成功
                        t.importSuc=true;
                        t.importErr=false;
                    }else {
                        t.importSuc=false;
                        t.importErr=true;
                    }
                }
            },
            itemCli(indexInner,indexOut){
                let t = this,index = '';
                t.isClicked = true;
                index=indexInner+'-'+indexOut;
                if(t.indexItem.indexOf(index)>-1){
                    //移除元素
                    t.indexItem.splice(t.indexItem.indexOf(index), 1);
                    t.patChoNum--;
                }else {
                    //选中元素
                    t.indexItem.push(index);
                    t.patChoNum++;
                }
            },
            patientList(){
                let t=this;
                comm.ajax2({
                    // url: '/call/multicenter/major/customer/getCustomerList/',
                    url: '//www.allinmd.cn/call/patient/case_baseinfo/getPatientCaseSelects/',
                    type:"get",
                    dataType:"json",
                    data:{
                        paramJson:JSON.stringify({"customerId":0,"firstResult":1,"maxResult":"20",})
                    },
                    timeout: 30000,
                    success:function(res){
                        console.log(res);
                        // t.patientLists=res.responseData.data_list[0];
                        // t.rightMenu(t.thickLeft[0].menuId);
                    }
                })
            },
            popupCancle(){
                let t = this;
                t.importSuc=false;
                t.importErr=false;
            }
        },
        filters:{
            titLen:function (txt,len) {//判断title长度进行显示长内容
                if(txt){
                    if(len&&txt.length>len){
                        return txt.substring(0,len)+"..."
                    }else{
                        return txt;
                    }
                }
                // if(txt){
                //     if(txt.length>12){
                //         return txt.substring(0,12)+"..."
                //     }else{
                //         return txt;
                //     }
                // }else{
                //     return
                // }
                // return txt.length>=12?txt.substring(0,12)+'...':txt;
            },
            dateChange:function (date) {
                if(date){
                    let newDate = date.split("-");
                    return newDate[1]+'月'+newDate[2]+'日';
                }
            }
        },
        mounted() {
            let t = this;
            t.patientList();
        }
    }
</script>
<style lang="scss">

</style>

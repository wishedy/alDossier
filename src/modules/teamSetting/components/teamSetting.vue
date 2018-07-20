<template>
    <section class="alEmr-mainIndex">
        <applicationReminding :dataList="ApplicationGroup"></applicationReminding>
        <aside class="teamSetting width1000" @click="teamNameOnOff=false">
            <div class="teamName">
                <div class="nameSelect">
                    <input type="text" v-model="selected" :readonly="!ownerState"/>
                    <p @click.stop="changeTeam" v-show="groupName.length>1">切换<i></i></p>
                    <ul class="teamList" v-show="teamNameOnOff">
                        <li v-for="item in groupName" @click.stop="teamNameCli(item)">{{item.teamName}}</li>
                    </ul>
                </div>
                <div class="notApply" v-show="ownerState">
                    <div>不接受加入申请<p :class="{activation:noAcceptOnOff}" @click.stop="ifApply()"><i></i></p></div>
                    <span>开启后将不再接受加入申请</span>
                </div>
                <div class="createTeamBtn" @click="createCases"><i></i><span>新建团队</span></div>
            </div>
            <div class="teamUserList">
                <div class="userTitleCont"><p>{{ownerTransform?'团队成员':'转让所有权'}}</p>
                    <p v-show="ownerState"><span @click="invite()">邀请成员</span><span
                        @click="ownerTransform=!ownerTransform">{{ownerTransform?'转让所有权':'取消转让'}}</span>
                    </p></div>
                <ul>
                    <li v-for="(item,index) in userName">
                        <p class="userImg"><img
                            src="https://img05.allinmd.cn/public1/M01/13/5A/wKgBMFsrdDeAawYfAALjjAJhig4145_c_p_300_300.png"/>
                        </p>
                        <p class="userName">{{item.name}}</p>
                        <p class="userTitle">副主任医师</p>
                        <p class="userHospital">中国人民解放军总医院</p>
                        <div class="teamMember" :class="{'owner':item.levelId == 0,'transfer':item.levelId == 1}"><span
                            @click="ownerState,item.levelId==1?stateChange(item,index):''">{{item.levelId == 1?(ownerTransform?'成员':'转让'):'所有者'}}</span>
                            <div class='close' :class="{'inTransfer':!ownerTransform}"
                                 v-if="item.levelId==1">
                                <div class="deletePopup" v-show="item.choose&&tagShowFlag">
                                    <p>
                                        {{ownerTransform?'确定要将'+item.name+'从团队中移除吗？':'确定将所有者权限转交给'+item.name+'吗？'}}
                                    </p>
                                    <div v-show="!ownerTransform" style="color:gray;font-size: 15px;margin-left: 30px;">
                                        转让所有权后，你将失去团队的管理权限。
                                    </div>
                                    <div class="deleteBtn">
                                        <button>确认</button>
                                        <button @click="item.choose=!item.choose">取消</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </aside>
        <pagination :pageIndex=1 :pageSize=10 :total=5 @change="pageChange"></pagination>
    </section>
</template>
<script>

    import applicationReminding from './applicationReminding.vue';
    import pagination from "~components/pagination/pagination.vue";
    import getGroupList from "~utils/HttpRequest/getGroupList";
    import getTeamMemberList from "~utils/HttpRequest/getTeamMemberList";
    import getWaitingList from "~utils/HttpRequest/getWaitingList"


    export default {
        name: 'index-app',
        data() {
            return {
                //获取当前用户所在团队
                customerId: 1399252409974,

                groupName: [],//当前用户所在的小组
                tagShowFlag: false,
                tagShow: false,//弹出标签的控制阀门
                noAcceptOnOff: false,
                teamNameOnOff: false,
                ownerTransform: false,
                ownerState: true,//true
                userName: [
                    {name: 'Shurrik', levelId: 0},
                    {name: 'Eichhorist', levelId: 1},
                    {name: '泰瑞纳斯·米奈希尔', levelId: 1},
                    {name: '奥斯特洛夫斯基', levelId: 1}],
                ApplicationGroup: [
                    {name: 'Yamato', title: '维吉尔的武器'},
                    {name: 'Ashbringer', title: '大领主神器'},
                    {name: '阿尔萨斯·米奈希尔', title: '弑君者'}],
                selected: ''//初始团队名字
            }
        },
        components: {
            applicationReminding,
            pagination,
        },
        //watch去监控弹窗里面的按钮选项
        watch: {
            "ownerTransform"() {
                this.userName.forEach((element) => {
                    this.$set(element, 'choose', false);
                })
            },
            "selected"() {
                this.userName.forEach((element) => {
                    this.$set(element, 'choose', false);
                })
            }
        },
        methods: {
            init(){

            },
            //切换页数，请求数据
            pageChange(pageIndex) {
                console.log(pageIndex);
            },
            //删除（仅leader可见）
            stateChange(item, index) {
                this.userName.forEach((element) => {
                    this.$set(element, 'choose', false);
                });
                this.$set(item, 'choose', true);
                this.tagShowFlag = true
            },
            //切换按钮点击
            changeTeam(ev) {
                ev.preventDefault();
                this.teamNameOnOff = !this.teamNameOnOff;
            },
            invite() {
                this.$router.push({
                    path: 'createTeam',//跳转链接
                    /*                    query: { //链接后面的参数
                                            teamId: '0'
                                        }*/
                })
            },
            createCases() {
                this.$router.push({
                    path: 'createTeam',//跳转链接
                })
            },
            //不接受加入申请
            ifApply() {
                this.noAcceptOnOff = !this.noAcceptOnOff;
            },
            //团队名切换
            teamNameCli(item) {
                let Params = {
                    teamId: item.teamId,
                    firstResult: 0,
                    maxResult: 10,
                    teamSelectType: 3
                };
                getTeamMemberList(Params).then((res)=>{
                    //等有数据之后点击完毕刷新userList，更新waitingList
                    console.log(res)
                })
                this.selected = item.teamName;
                this.teamNameOnOff = false;
                this.ownerTransform = true;
            },
            //获取该组群的waiting list
            waitingList(){
                let Params = {
                    teamId: 1399252409974,
                    firstResult: 0,
                    maxResult: 10,
                    teamSelectType: 0,
                }
                getWaitingList(Params).then((res) => {
                    if (res.responseObject) {
                        this.groupName = res.responseObject.responseData.data_list;
                        this.selected = this.groupName[0].teamName
                    }
                })
            },
            //获取此用户所在组群
            groupList() {
                let Params = {customerId: this.customerId};
                getGroupList(Params).then((res) => {
                    if (res.responseObject) {
                        this.groupName = res.responseObject.responseData.data_list;
                        this.selected = this.groupName[0].teamName
                    }
                })
            }
        },
        mounted() {
            this.groupList();
        },
        metaInfo: {
            title: '团队设置'
        }
    }
</script>



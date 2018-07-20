<template>
    <section>
        <div class="applicationReminding">
            <div class="remindingCont">
                <div class="width1000">
                    <p class="remindingText">有<span>3</span>人申请加入团队</p>
                    <p class="remindingBtn" @click="mycheckOnOff = true"><span>去查看</span><i></i></p>

                </div>
            </div>
        </div>
        <section class="newBloodPopup" v-show="mycheckOnOff">
            <aside class="popupCont">
                <div class="popupTitle">
                    <h2>新成员管理</h2>
                    <i @click="mycheckOnOff = false"></i>
                </div>
                <ul class="list">
                    <li v-for="(item,index) in dataList">
                        <p class="userImg"><img
                            src="https://img05.allinmd.cn/public1/M01/13/5A/wKgBMFsrdDeAawYfAALjjAJhig4145_c_p_300_300.png"/>
                        </p>
                        <p class="userName">{{item.name}}</p>
                        <p class="userTitle">{{item.title}}</p>
                        <div class="stateBtn">
                            <p class="agree" v-show="item.choose!==true" @click="stateChange(1,item)">同意</p>
                            <p class="refuse" v-show="item.choose!==true" @click="stateChange(2,item)">拒绝</p>
                            <p class="stated" v-show="item.choose==true">{{item.state ==1?'已同意':'已拒绝'}}</p>
                        </div>
                    </li>
                </ul>
            </aside>
        </section>
    </section>
</template>
<script>

    export default {
        name: 'index-app',
        data() {
            return {
                mycheckOnOff: false,
                ApplicationState: 0 //0可选择状态，1已同意，2已拒绝
            }
        },
        methods: {
            stateChange(obj, item) {
                if (obj == 1) {
                    this.ApplicationState = 1;
                    this.$set(item, 'choose', true);
                    this.$set(item, 'state', 1);
                    //然后进行ajax同意的交互，并且将此用户加入肯德基豪华午餐
                } else {
                    this.ApplicationState = 2;
                    this.$set(item, 'choose', true);
                    this.$set(item, 'state', 2);
                    //执行ajax拒绝交互即可
                }
            }
        },
        async mounted() {

        },
        props: ['dataList'],
        metaInfo: {
            title: '团队设置'
        }
    }
</script>


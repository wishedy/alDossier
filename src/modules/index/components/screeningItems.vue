<template>
    <!--筛选条件开始-->
    <section class="alEmr-screeningItems active">
        <aside class="screeningTips">
            <p class="tipsName">术前诊断：</p>
            <ul ref="pre_Dia" class="scTipsUl showMore" :class="{'closeStatus':preDiaHeight&&!upTrue}">
                <li class="scTipsLi" v-for="(val,i) in tagArr.preDia_list" :class="{active:val.active}" :text="val.id" @click="screeningClick(i,1)"><span>{{val.preDia}}</span></li>
            </ul>
            <p class="screeningMoreBtn" :class="{'active':upTrue}" v-if="preDiaHeight" @click="upMoreClick(1)"><span>{{upTrue?'收起':'更多'}}</span><i></i></p>
        </aside>
        <aside class="screeningTips">
            <p class="tipsName">标签：</p>
            <ul ref="tag_height" class="scTipsUl showMore" :class="{'closeStatus':tagHeight&&!tagUpTrue}">
                <li class="scTipsLi" v-for="(val,i) in tagArr.tag_list" :class="{active:val.active}" @click="screeningClick(i,2)"><span>{{val.tagName}}</span></li>
            </ul>
            <p class="screeningMoreBtn" :class="{'active':tagUpTrue}" v-if="tagHeight" @click="upMoreClick(2)"><span>{{tagUpTrue?'收起':'更多'}}</span><i></i></p>
        </aside>
        <aside class="screeningTips">
            <p class="tipsName">手术时间：</p>
            <ul class="scTipsUl">
                <li class="scTipsLi" v-for="(val,i) in tagArr.time_list" :class="{active:parseInt(timeIndex)===parseInt(i)}" @click="timeClick(i)"><span>{{val.timeName}}</span></li>
                <li class="scTipsLi" :class="{timeActive:timeFree}" @click="timeFreeClick()"><span>自定义时间段</span>
                    <aside class="timeComponent" v-if="timeFree">
                        <DatePicker labelName="开始时间" :yearSelect="yearSelect"
                                    :monthSelect="monthSelect" :daySelect="daySelect" @changeDate="changeDateA"></DatePicker>
                        <DatePicker labelName="结束时间" :yearSelect="yearSelect"
                                    :monthSelect="monthSelect" :daySelect="daySelect"
                                    @changeDate="changeDateB"></DatePicker>
                        <aside class="timeBtn">
                            <p class="timeCancel" @click="timeCancel">取消</p>
                            <p class="timeSure"  @click="timeSure">确认</p>
                        </aside>
                    </aside>
                </li>
            </ul>
        </aside>
        <aside class="screeningTips">
            <p class="tipsName">归属：</p>
            <ul class="scTipsUl showMore">
                <li class="scTipsLi" v-for="(val,i) in tagArr.team_list" :class="{active:val.active}" @click="screeningClick(i,4)"><span>{{val.teamName}}</span></li>
            </ul>
        </aside>
        <!--筛选条件结束-->
    </section>
</template>

<script>
    import comm from "~utils/comm.js";
    import DatePicker from "./datePicker.vue";
    import {mapActions,mapGetters} from 'vuex';
    const $=require("jquery");
    const xUrl={
        screeningTag:'/emrpc/index/screeningTag/',//筛选条件列表
    };
    export default {
        name: 'screeningItems',
        data(){
          return{
              preDiaFlag:51,//术前诊断是否有展开按钮，默认高度为一行51px
              tagFlag:51,//标签是否有展开按钮，默认高度为一行51px
              upTrue:false,//术前诊断展开图标样式，默认收起的
              tagUpTrue:false,//标签展开图标样式，默认收起的
              timeIndex:'',//时间激活状态
              yearSelect:new Date().getFullYear(),
              monthSelect:new Date().getMonth()+1,
              daySelect:new Date().getDate(),
              timeFree:false,//自定义时间激活状态
          }
        },
        components:{
            DatePicker,//选择时间组件
        },
        methods:{
             ...mapActions(['scrShowArrChange','sIdListChange','scrShowFlagChange','tagArrChange',]),
            //日期改变的时候触发,开始时间
            changeDateA(v){
                 console.log(v);

            },
            //日期改变的时候触发,结束时间
            changeDateB(v){
                 console.log(v);
              //日期改变的时候触发
            },
            //筛选条件请求
            tagList(){
                let t=this;
                comm.ajax2({
                    url:xUrl.screeningTag,
                    type:"post",
                    dataType:"json",
                    data:{
                        "customerId": "22"
                    },
                    success:function(res) {
                        if(comm.hasResponseData2(res)){
                             let _tagArr=res.responseData;
                             for (let i = 0; i < _tagArr.preDia_list.length;i++){
                                 _tagArr.preDia_list[i].active=false;
                                 _tagArr.preDia_list[i].fromFlag=1;
                             }
                             for (let i = 0; i < _tagArr.tag_list.length;i++){
                                  _tagArr.tag_list[i].active=false;
                                  _tagArr.tag_list[i].fromFlag=2;
                             }
                             for (let i = 0; i < _tagArr.time_list.length;i++){
                                 _tagArr.time_list[i].active=false;
                                 _tagArr.time_list[i].fromFlag=3;
                             }
                             for (let i = 0; i < _tagArr.team_list.length;i++){
                                  _tagArr.team_list[i].active=false;
                                  _tagArr.team_list[i].fromFlag=4;
                             }
                             t.tagArrChange(_tagArr);//数组赋值
                        }
                    }
                });
            },
            //筛选条件的点击事件
            screeningClick(index,scrFlag){
                let t=this;
                switch (parseInt(scrFlag)){
                    case 1://术前诊断
                        for (let i=0;i< t.tagArr.preDia_list.length;i++) {
                            let items=t.tagArr.preDia_list[i];
                            if(i===index){
                                if(items.active){
                                    items.active=false;
                                    t.scrShowArrChange({val:{
                                            kv:items.preDia,
                                            id:items.id,
                                            active:items.active,
                                            from:items.fromFlag,
                                        },flag:false});
                                    t.sIdListChange({val:items.id,flag:false});
                                }else{
                                    items.active=true;
                                    t.scrShowArrChange({val:{
                                            kv:items.preDia,
                                            id:items.id,
                                            active:items.active,
                                            from:items.fromFlag,
                                        },flag:true});
                                    t.sIdListChange({val:items.id,flag:true});
                                }
                            }
                        }
                        break;
                    case 2://标签
                        for (let i=0;i< t.tagArr.tag_list.length;i++) {
                            let items=t.tagArr.tag_list[i];
                            if(i===index){
                                if(items.active){
                                    items.active=false;
                                    t.scrShowArrChange({val:{
                                            kv:items.tagName,
                                            id:items.id,
                                            active:items.active,
                                            from:items.fromFlag,
                                        },flag:false});
                                    t.sIdListChange({val:items.id,flag:false});
                                }else{
                                    items.active=true;
                                    t.scrShowArrChange({val:{
                                            kv:items.tagName,
                                            id:items.id,
                                            active:items.active,
                                            from:items.fromFlag,
                                        },flag:true});
                                    t.sIdListChange({val:items.id,flag:true});
                                }

                            }
                        }
                        break;
                    case 4://归属
                        for (let i = 0; i < t.tagArr.team_list.length;i++){
                            let items=t.tagArr.team_list[i];
                            if(i===index){
                                if(items.active){
                                    items.active=false;
                                    t.scrShowArrChange({val:{
                                            kv:items.teamName,
                                            id:items.id,
                                            active:items.active,
                                            from:items.fromFlag,
                                        },flag:false});
                                    t.sIdListChange({val:items.id,flag:false});
                                }else{
                                    items.active=true;
                                    t.scrShowArrChange({val:{
                                            kv:items.teamName,
                                            id:items.id,
                                            active:items.active,
                                            from:items.fromFlag,
                                        },flag:true});
                                    t.sIdListChange({val:items.id,flag:true});
                                }
                            }
                        }
                        break;
                }
                t.scrShowFlag();
            },
            //时间的单选点击事件
            timeClick(index){
                let t=this;
                if(parseInt(t.timeIndex)===parseInt(index)){//如果第二次点击自己，是取消选中
                    t.scrShowArrChange({val:{
                            kv:t.tagArr.time_list[index].timeName,
                            id:t.tagArr.time_list[index].id,
                            active:false,
                            from:t.tagArr.time_list[index].fromFlag,
                        },flag:false});
                    t.timeIndex='';
                    t.sIdListChange({val:t.tagArr.time_list[index].id,flag:false});
                }else{
                    if(t.timeIndex){//已经有选中的项目时
                        //删除之前选中的时间
                        t.scrShowArrChange({val:{
                                kv:t.tagArr.time_list[t.timeIndex].timeName,
                                id:t.tagArr.time_list[t.timeIndex].id,
                                active:false,
                                from:t.tagArr.time_list[t.timeIndex].fromFlag,
                            },flag:false});
                        t.sIdListChange({val:t.tagArr.time_list[t.timeIndex].id,flag:false});
                    }
                    //增加新选中的
                    t.scrShowArrChange({val:{
                            kv:t.tagArr.time_list[index].timeName,
                            id:t.tagArr.time_list[index].id,
                            active:true,
                            from:t.tagArr.time_list[index].fromFlag,
                        },flag:true});
                    t.timeIndex=index;
                    t.sIdListChange({val:t.tagArr.time_list[index].id,flag:true});
                }
            },
            //自定义时间的点击事件
            timeFreeClick(){
              let t=this;
              t.timeFree=!t.timeFree;
            },
            //自定义时间取消
            timeCancel(){
                 let t=this;
                t.timeFree=false;
            },
            //自定义时间选中
            timeSure(){
                 let t=this;

            },
            //筛选条件展示开关
            scrShowFlag(){
                 let t=this;
                 let _s1=false,//术前诊断
                     _s2=false,//标签筛选
                     _s3=false,//时间筛选
                     _s4=false;//归属筛选
                for (let i=0;i<t.tagArr.preDia_list.length;i++){
                    if(t.tagArr.preDia_list[i].active){
                        _s1=true;
                        break;
                    }
                }
                for (let i=0;i<t.tagArr.tag_list.length;i++){
                    if(t.tagArr.tag_list[i].active){
                        _s2=true;
                        break;
                    }
                }
                for (let i=0;i<t.tagArr.time_list.length;i++){
                    if(t.tagArr.time_list[i].active){
                        _s3=true;
                        break;
                    }
                }
                for (let i=0;i<t.tagArr.team_list.length;i++){
                    if(t.tagArr.team_list[i].active){
                        _s4=true;
                        break;
                    }
                }
                if(!(_s1||_s2||_s3||_s4)){//四种筛选条件都没有激活状态
                    t.scrShowFlagChange(false);
                }else{//筛选有任一项激活状态
                    t.scrShowFlagChange(true);
                }

            },
            //展开收起操作
            upMoreClick(index){
              let t=this;
              if(index===1){
                  t.upTrue=!t.upTrue;
              }else{
                  t.tagUpTrue=!t.tagUpTrue;
              }
            },
        },
        computed:{
            ...mapGetters(['scrShowArr','sIdList','tagArr']),
            preDiaHeight(){
                let t=this;
                return t.preDiaFlag>51;
            },
            tagHeight(){
                let t=this;
                return t.tagFlag>51;
            },

        },
        watch:{
            //判断
            'scrShowArr':{
                handler: function(v1,v2){
                    let t=this;
                    if(t.scrShowArr.length){//还有选中的项目
                        //术前诊断
                        for (let j=0;j<t.tagArr.preDia_list.length;j++){
                            let _kv=t.tagArr.preDia_list[j];
                            let _thisData=false;
                            for (let i=0;i<t.scrShowArr.length;i++){
                                let items=t.scrShowArr[i];
                                if(parseInt(items.from)===1){
                                    if(_kv.id===items.id){
                                        _thisData=true;
                                    }
                                }
                            }
                            if(_thisData){
                                _kv.active=true;
                            }else{
                                _kv.active=false;
                            }
                        }
                        //标签
                        for (let j=0;j<t.tagArr.tag_list.length;j++){
                            let _kv=t.tagArr.tag_list[j];
                            let _thisData=false;
                            for (let i=0;i<t.scrShowArr.length;i++){
                                let items=t.scrShowArr[i];
                                if(parseInt(items.from)===2){
                                    if(_kv.id===items.id){
                                        _thisData=true;
                                    }
                                }
                            }
                            if(_thisData){
                                _kv.active=true;
                            }else{
                                _kv.active=false;
                            }
                        }
                        //时间
                        for (let j=0;j<t.tagArr.time_list.length;j++){
                            let _kv=t.tagArr.time_list[j];
                            let _thisData=false;
                            for (let i=0;i<t.scrShowArr.length;i++){
                                let items=t.scrShowArr[i];
                                if(parseInt(items.from)===3){
                                    if(_kv.id===items.id){
                                        _thisData=true;
                                    }
                                }
                            }
                            if(_thisData){
                                _kv.active=true;
                            }else{
                                _kv.active=false;
                            }
                        }
                        //归属
                        for (let j=0;j<t.tagArr.team_list.length;j++){
                            let _kv=t.tagArr.team_list[j];
                            let _thisData=false;
                            for (let i=0;i<t.scrShowArr.length;i++){
                                let items=t.scrShowArr[i];
                                if(parseInt(items.from)===4){
                                    if(_kv.id===items.id){
                                        _thisData=true;
                                    }
                                }
                            }
                            if(_thisData){
                                _kv.active=true;
                            }else{
                                _kv.active=false;
                            }
                        }
                    }else{//已经没有选中的项目了
                        for (let j=0;j<t.tagArr.preDia_list.length;j++){
                            t.tagArr.preDia_list[j].active=false;
                        }
                        for (let j=0;j<t.tagArr.tag_list.length;j++){
                            t.tagArr.tag_list[j].active=false;
                        }
                        for (let j=0;j<t.tagArr.time_list.length;j++){
                            t.tagArr.time_list[j].active=false;
                        }
                        for (let j=0;j<t.tagArr.team_list.length;j++){
                            t.tagArr.team_list[j].active=false;
                        }
                        t.scrShowFlagChange(false);
                    }
                },
                deep:true
            }
        },
        updated(){
            let t=this;
            //dom全部渲染完成后进行判断筛选列表高度，判断是否有“更多”展开按钮
            (t.preDiaFlag==51)?t.preDiaFlag=$(t.$refs.pre_Dia).height():'';
            (t.tagFlag==51)?t.tagFlag=$(t.$refs.tag_height).height():'';
        },
        mounted(){
            let t=this;
            t.tagList();
        }
    }
</script>

<style scoped>

</style>

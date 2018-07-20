<template>
    <div class="formTag formCommon">
        <p class="articleText" v-if="labelName"></p>
        <div class="tagCont">
            <ul>
                <li v-for="(item,index) in tagList" :key="index" :class="{'addTag':item.addTag}"  >{{item.tagName}}<i c-show="item.addTag" @click.stop="removeTagList(index)"></i></li>
                <!--<li class="active">住院</li>
                <li>住院</li>-->
                <!--<li class="addTag">住院</li>-->
            </ul>
            <div class="addTagBtn" v-show="!addOnOff" @click="inputTag"><i></i></div>
            <div class="tagInput"  v-show="addOnOff">
                <div class="tagInputCont"> <input type="text" placeholder="输入新标签" v-model="appendTagName" @keydown.enter="appendTagList"/><i v-text="(maxLen-appendTagName.length)"></i></div>
                <p @click.stop="appendTagList" :class="{'active':appendTagName.length}">添加</p>
            </div>
        </div>
    </div>
</template>
<script>
    import {mapActions} from 'vuex';
    import axios from 'axios';
    export default {
        props:
            {
                contentTagList:{
                    type:String,
                    default:'[]'
                },
                labelName:{
                    type:String,
                    default:''
                },
                maxLen:{
                    default:''
                },
                HandleId:{
                    default:0
                }
            },
        data(){
          return{
              addOnOff:false,
              tagList:[],
              appendTagName:''
          }
        },
        methods:{
            ...mapActions(['changeComponentData']),
            appendTagList(){
                let t = this;
                //console.log(t.appendTagName);
                axios({
                    url: "/call/comm/tag/saveUserTag/",
                    method: "POST",
                    data: {
                        tagType:2,
                        isDelete:'0',
                        tagName:t.appendTagName,
                        customerId:'1399252409974'
                    },
                    transformRequest: [function(data) {
                        return "paramJson=" + JSON.stringify(data);
                    }],
                    headers: {
                        'X-Requested-With': 'XMLHttpRequest'
                    },
                    timeout: 30000
                }).then(function(res){
                    let tagId = res.data.responseObject.responseData.tagData.tagId;
                    if(t.appendTagName.length){
                        t.tagList.push({
                            tagName:t.appendTagName,
                            addTag:true,
                            tagId:tagId

                        });
                        t.appendTagName = '';
                    }
                });
            },
            getTagList(){
                let t = this;
                axios({
                    url: "/call/comm/tag/searchTagList/",
                    method: "POST",
                    data: {
                        tagType:1,
                        customerId:'1399252409974'
                    },
                    transformRequest: [function(data) {
                        return "paramJson=" + JSON.stringify(data);
                    }],
                    headers: {
                        'X-Requested-With': 'XMLHttpRequest'
                    },
                    timeout: 30000
                }).then(function(res){
                    console.log(res);
                    t.tagList = res.data.responseObject.responseData.sysTagList;
                });
            },
            inputTag(){
                this.addOnOff = !this.addOnOff;
            },
            removeTagList(index){
                let t = this;
                t.tagList.splice(index,1);
            }
        },
        watch:{
            appendTagName(newVal){
                let t = this;
                ((newVal.length>t.maxLen)&&(t.maxLen))?(t.appendTagName = (t.appendTagName).substring(0,t.maxLen)):'';
            },
            contentTagList(n){
                this.tagList = JSON.parse(n);
            },
            tagList(n){
                let t = this;
                t.changeComponentData({HandleId:t.HandleId,contentTagList:JSON.stringify(n)});
            }
        },
        created(){
            let t = this;
            //t.tagList = JSON.parse(t.contentTagList);
            t.getTagList();
            // console.log(t.maxLen)
        }
    }
</script>
<style lang="scss" scoped>
    .alEmr-indexInner .formCommon .articleText {
         vertical-align: top;
        line-height: 48px;
    }
</style>

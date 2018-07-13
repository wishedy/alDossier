<template>
    <div class="formTag formCommon">
        <p class="articleText">标签</p>
        <div class="tagCont">
            <ul>
                <li v-for="(item,index) in tagList" :key="index" :class="{'addTag':item.addTag}"  >{{item.tagName}}<i c-show="item.addTag" @click.stop="removeTagList(index)"></i></li>
                <!--<li class="active">住院</li>
                <li>住院</li>-->
                <!--<li class="addTag">住院</li>-->
            </ul>
            <div class="addTagBtn" v-show="!addOnOff" @click="inputTag"><i></i></div>
            <div class="tagInput"  v-show="addOnOff">
                <div class="tagInputCont"> <input type="text" placeholder="输入新标签" v-model="appendTagName" @keydown.enter="appendTagList"/><i v-text="(10-appendTagName.length)"></i></div>
                <p @click.stop="appendTagList">添加</p>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props:['contentTagList'],
        data(){
          return{
              addOnOff:false,
              tagList:[],
              appendTagName:''
          }
        },
        methods:{
            appendTagList(){
                let t = this;
                //console.log(t.appendTagName);
                if(t.appendTagName.length){
                    t.tagList.push({
                        tagName:t.appendTagName,
                        addTag:true
                    });
                    t.appendTagName = '';
                }
            },
            inputTag(){
                this.addOnOff = !this.addOnOff;
            },
            removeTagList(index){
                let t = this;
                t.tagList.splice(index,1);
            }
        },
        created(){
            let t = this;
            t.tagList = JSON.parse(t.contentTagList);
            //console.log(t.tagList)
        }
    }
</script>
<style lang="scss" scoped>
    .alEmr-indexInner .formCommon .articleText {
         vertical-align: top;
        line-height: 48px;
    }
</style>

<template>
    <aside class="caseHistoryMsg formCommon">
        <h3 v-if="subTitle.length" v-text="subTitle"></h3>
        <article v-text="labelName" v-show="labelName.length"></article>
        <p class="articleText">术后X片</p>
        <div class="textarea"  :class="{'focusBorder':inputFocus}"><textarea  :placeholder="placeholder" v-model="inputContent"  @focus.stop="inputFocus=true" @blur.stop="inputFocus=false"></textarea><i  v-text="maxLen-inputContent.length"></i></div>
    </aside>
</template>
<script>
    import {mapGetters,mapActions} from 'vuex';
    import regularTest from '~utils/regularTest.js';
    export default {
        props:['maxLen','contentDes','testRule','isRequired','placeholder','labelName','subTitle'],
        data(){
            return{
                inputStart:false,
                //inputError:false,
                inputFocus:false,
                inputContent:''
            }
        },
        created(){
            //console.log(this.maxLen,this.contentDes.length)
            this.inputContent = this.contentDes;
        },
        methods:{
            ...mapActions(['setTopNavTitle'])
        },
        computed:{
            ...mapGetters(['titleName']),
            required(){
                let t = this;
                return !(parseInt(t.isRequired)===0)
            },
            inputError(){
                //console.log(regularTest[this.testRule])
                return (!regularTest[this.testRule](this.inputContent))&&(this.inputStart);
            }
        },
        watch:{
            inputContent(newVal){
                let t = this;
                //console.log(t.titleName);
                //t.setTopNavTitle(newVal);
                (!t.inputStart)?(t.inputStart = true):'';
                (newVal.length>t.maxLen)?(t.inputContent = (t.inputContent).substring(0,t.maxLen)):'';
            }
        }
    }
</script>
<style lang="scss" scoped>
    .alEmr-indexInner .formCommon .articleText {
         vertical-align: top;
    }
</style>

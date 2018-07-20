<template>
    <aside class="caseHistoryMsg formCommon">
        <h3 v-if="title.length" v-text="title"></h3>
        <article v-text="titleDes" v-show="titleDes.length"></article>
        <p class="articleText" v-text="labelName" v-show="labelName.length"></p>
        <div class="textarea"  :class="{'focusBorder':inputFocus}"><textarea  :placeholder="placeholder" v-model="inputContent"  @focus.stop="inputFocus=true" @blur.stop="inputFocus=false"></textarea><i  v-text="maxLen-inputContent.length"></i></div>
    </aside>
</template>
<script>
    import {mapGetters,mapActions} from 'vuex';
    import regularTest from '~utils/regularTest.js';
    export default {
        props:{
            maxLen:{
                default:''
            },
            titleDes:{
                type:String,
                default:''
            },
            title:{
                type:String,
                default:''
            },
            subTitle:{
                type:String,
                default:''
            },
            contentDes:{
                type:String,
                default:''
            },
            testRule:{
                type:String,
                default:''
            },
            labelName:{
                type:String,
                default:''
            },
            placeholder:{
                type:String,
                default:''
            }
        },
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
            inputError(){
                //console.log(regularTest[this.testRule])
                return (this.testRule)&&(!regularTest[this.testRule](this.inputContent))&&(this.inputStart);
            }
        },
        watch:{
            contentDes(n){
                this.inputContent = n;
            },
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

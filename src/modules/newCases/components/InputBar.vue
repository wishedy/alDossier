<template>
    <div class="formInput formCommon" :class="{'formInput112':unitName}">
        <p class="articleText" :class="{'errorText':inputError}"><i v-if="isRequired">*</i>{{labelName}}</p>
        <div class="inputCont" :class="{'error':inputError,'focusBorder':inputFocus}">
            <input type="text" :placeholder="placeholder" v-model="inputContent"  @focus.stop="inputFocus=true" @blur.stop="inputFocus=false"/>
            <i v-text="maxLen-inputContent.length" v-if="maxLen" v-show="unitName.length===0"></i>
        </div>
        <span v-text="unitName" v-show="unitName"></span>
        <p class="formError">这是个错误提示提示</p>
    </div>
</template>
<script>
    import {mapGetters,mapActions} from 'vuex';
    import regularTest from '~utils/regularTest.js';
    export default {
        props:{
            maxLen:{
                default:''
            },
            HandleId:{
              default:0
            },
            contentDes:{
                type:String,
                default:''
            },
            isRequired:{
                type:Boolean,
                default:false
            },
            testRule:{
                type:String,
                default:''
            },
            labelName:{
                type:String,
                default:''
            },
            unitName:{
                type:String,
                default:''
            },
            placeholder:{
                type:String,
                default:''
            }
        },
        //props:['maxLen','contentDes','testRule','isRequired','placeholder','labelName','unitName'],
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
            //console.log(this.contentDes);
            this.inputContent = this.contentDes;
        },
        methods:{
            ...mapActions(['setTopNavTitle','changeComponentData','changeComponentTestResult'])
        },
        computed:{
            ...mapGetters(['titleName','changePageOnOff']),
            inputError(){
                //console.log(regularTest[this.testRule])
                return (this.testRule)&&(!regularTest[this.testRule](this.inputContent))&&(this.inputStart);
            },
            passOnOff(){
                return (!this.inputError)?1:0;
            }
        },
        watch:{
            inputContent(newVal){
                let t = this;
                //console.log(t.titleName);
                //t.setTopNavTitle(newVal);
                (!t.inputStart)?(t.inputStart = true):'';
                ((newVal.length>t.maxLen)&&(t.maxLen))?(t.inputContent = (t.inputContent).substring(0,t.maxLen)):'';
                t.changeComponentData({HandleId:t.HandleId,contentDes:newVal});
                //debugger;
                t.changeComponentTestResult({HandleId:t.HandleId,testResult:t.passOnOff});
            },
            contentDes(n){
                //console.log(n);
                this.inputContent = n;
            },
            passOnOff(n){
                //let t  = this;
                //t.changeComponentTestResult({HandleId:t.HandleId,testResult:n});
                console.log('改变了对错判断');
            }
        }
    }
</script>

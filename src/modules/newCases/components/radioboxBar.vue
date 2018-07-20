<template>
    <div class="formRadio formCommon formRadioFocus" :class="{'formRow':(radioListDemo.length>2)}">
        <p class="articleText"><i v-if="isRequired">*</i>{{labelName}}</p>
        <div class="radioRight">
            <div class='radioIconNormal'  v-for="(item,index) in radioListDemo"   :class="{'active':index==radioIndex}" :key="index" @click="selectRadio(index)"><i></i><span  v-text="item.radioName"></span></div>

            <!--<div  class='radioIconNormal' :class="{'active':(sex===0)}" @click.stop="changeRadio('sex',0)"><i></i><span>正常愈合</span></div>-->
            <div  class='radioIconNormal'   :class="{'active':radioIndex==-2}" :key="-2" @click="selectRadio(-2)" v-if="needInput"><i></i><span  >其他</span><input type="text" :placeholder="placeholder" :class="{'error':inputError,'focusBorder':inputFocus}" @focus="inputFocus=true" @blur="inputFocus=false" v-model="inputContent" ref="inputBar"/></div>
        </div>
    </div>
</template>
<script>
    const $ = require('jquery');
    import regularTest from '~utils/regularTest.js';
    import {mapActions} from 'vuex';
    export default {
        props:{
            RadioList:{
                type:String
            },
            index:{
                default:'-1'
            },
            HandleId:{
                default:0
            },
            isRequired:{
                type:Boolean,
                default:false
            },
            labelName:{
                type:String,
                default:''
            },
            row:{
                type:Boolean,
                default:false
            },
            needInput:{
                type:Boolean,
                default:false
            },
            testRule:{
                type:String,
                default:''
            },
            contentDes:{
                type:String,
                default:''
            },
            placeholder:{
                type:String,
                default:''
            }
        },
        //props:['RadioList','index','isRequired','labelName','row','needInput','testRule','contentDes','placeholder'],
        data(){
            return {
                inputStart:false,
                inputFocus:false,
                radioIndex:-1,
                inputContent:''
            }
        },
        computed:{
            inputError(){
                //console.log(regularTest[this.testRule])
                return (this.testRule)&&(!regularTest[this.testRule](this.inputContent))&&(this.inputStart);
            },
            radioListDemo(){
                let t = this;
                //console.log(JSON.parse(t.RadioList))
                return JSON.parse(t.RadioList);
            }
        },
        watch:{
            inputContent(newVal){
                let t = this;
                //t.setTopNavTitle(newVal);
                //console.log(this.inputError);
                (!t.inputStart)?(t.inputStart = true):'';
            },
            contentDes(n){
                this.inputContent = n;
            },
            index(n){
                this.radioIndex = n;
            },
            radioIndex(n){
                let t = this;
                t.changeComponentData({HandleId:t.HandleId,index:n});
                t.changeComponentTestResult({HandleId:t.HandleId,testResult:1});
                this.$emit('changeOption',n);
            }
        },
        methods:{
            ...mapActions(['changeComponentData','changeComponentTestResult']),
            selectRadio(index){
                let t = this;
                //console.log(index);
                this.radioIndex = index;
                (index==-2)?t.inputFocus=true:'';
                if(index==-2){
                    $(this.$refs.inputBar).trigger("focus");
                }
                //console.log(this.$refs.inputBar);
                //console.log(this.radioIndex);
            }
        },
        mounted(){
            //console.log('index');
            this.radioIndex = this.index;
            this.inputContent = this.contentDes;

        }
    }
</script>
<style lang="scss" scoped>
    .newCases .formRadio.formRadioFocus .radioRight div input{
        &.focusBorder{
            background: #FFFFFF;
            border: 1px solid #2888FF;
            box-shadow: 0 0 4px 0 rgba(67,130,241,0.47);
            border-radius: 4px;
        }
        &.error {
            background: #FFFFFF;
            border: 1px solid #F34B4B;
            box-shadow: 0 0 4px 0 rgba(243, 75, 75, 0.59);
            border-radius: 4px;
        }
    }
    .alEmr-indexInner .formCommon .articleText {
        vertical-align: top;
        line-height: 32px;
    }
</style>

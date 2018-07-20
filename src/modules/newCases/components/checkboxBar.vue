<template>
    <div class="formRadio formCommon formCheck" :class="{'formRow':(radioListDemo.length>2)}">
        <p class="articleText"><i v-if="isRequired">*</i>性别</p>
        <div class="radioRight">
            <div class='radioIconNormal'  v-for="(item,index) in radioListDemo"   :class="{'active':item.checkOnOff}" :key="index" @click.stop="selectCheck(index)"><i></i><span  v-text="item.checkboxName"></span></div>
            <div  class='radioIconNormal'   :class="{'active':inputCheck}" :key="-2" @click="selectInput"><i></i><span  >其他</span><input type="text" :placeholder="placeholder" :class="{'error':inputError,'focusBorder':inputFocus}" @focus="inputFocus=true" @blur="inputFocus=false" v-model="inputContent" @click.stop="inputCheck=true"  ref="inputBar"/></div>
        </div>
    </div>
</template>
<script>
    import regularTest from '~utils/regularTest.js';
    import {mapActions} from 'vuex';
    export default {
        props:{
            checkBoxList:{
                type:String
            },
            index:{
                default:'-1'
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
        data(){
            return {
                inputStart:false,
                inputFocus:false,
                inputCheck:false,
                inputContent:'',
                radioListDemo:[]
            }
        },
        computed:{
            inputError(){
                //console.log(regularTest[this.testRule])
                return (this.testRule)&&(!regularTest[this.testRule](this.inputContent))&&(this.inputStart);
            }
        },
        watch:{
            inputContent(newVal){
                let t = this;
                (!t.inputStart)?(t.inputStart = true):'';
            },
            checkBoxList(n){
                this.radioListDemo = JSON.parse(n);
            },
            contentDes(n){
                this.inputContent = n;
            },
            radioListDemo:{
                handler(n){
                    console.log('改变');
                },
                deep:true
            }
        },
        methods:{
            ...mapActions(['changeComponentData','changeComponentTestResult']),
            selectInput(){
              this.inputCheck = !this.inputCheck;
              this.inputCheck?$(this.$refs.inputBar).trigger("focus"):'';
            },
            selectCheck(index){
                let t = this;
                t.radioListDemo[index].checkOnOff = !t.radioListDemo[index].checkOnOff;
                let checkLen = 0;
                for(let i = 0;i<t.radioListDemo.length;i++){
                    t.radioListDemo[i].checkOnOff?checkLen++:'';
                }
                (checkLen===0)?t.changeComponentTestResult({HandleId:t.HandleId,testResult:0}):t.changeComponentTestResult({HandleId:t.HandleId,testResult:1});
            }
        },
        mounted(){
            let t = this;
            this.inputContent = this.contentDes;
            this.radioListDemo = JSON.parse(t.checkBoxList);
        }
    }
</script>
<style lang="scss" scoped>
    .newCases .formRadio.formCheck .radioRight div input{
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

<template>
    <div class="formRadio formCommon formCheck" :class="{'formRow':(row)}">
        <p class="articleText"><i v-if="isRequired">*</i>性别</p>
        <div class="radioRight">
            <div class='radioIconNormal'  v-for="(item,index) in radioListDemo"   :class="{'active':item.checkOnOff}" :key="index" @click="selectCheck(item)"><i></i><span  v-text="item.checkboxName"></span></div>
            <div  class='radioIconNormal'   :class="{'active':inputCheck}" :key="-2" @click="selectInput"><i></i><span  >其他</span><input type="text" :placeholder="placeholder" :class="{'error':inputError,'focusBorder':inputFocus}" @focus="inputFocus=true" @blur="inputFocus=false" v-model="inputContent" @click.stop="inputCheck=true"  ref="inputBar"/></div>
        </div>
    </div>
</template>
<script>
    import regularTest from '~utils/regularTest.js';
    export default {
        props:{
            RadioList:{
                type:String
            },
            index:{
                type:String||Number,
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
                inputContent:''
            }
        },
        computed:{
            inputError(){
                //console.log(regularTest[this.testRule])
                return (!regularTest[this.testRule](this.inputContent))&&(this.inputStart);
            },
            radioListDemo(){
                let t = this;
                //console.log(JSON.parse(t.RadioList))
                return JSON.parse(t.checkBoxList);
            }
        },
        watch:{
            inputContent(newVal){
                let t = this;
                //t.setTopNavTitle(newVal);
                //console.log(this.inputError);
                (!t.inputStart)?(t.inputStart = true):'';
            }
        },
        methods:{
            selectInput(){
              this.inputCheck = !this.inputCheck;
                this.inputCheck?$(this.$refs.inputBar).trigger("focus"):'';
            },
            selectCheck(item){
                //console.log(index);
                this.checkOnOff = !this.checkOnOff;
                //console.log(this.radioIndex)
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

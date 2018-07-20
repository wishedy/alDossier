<template>
    <div class="formSelect formCommon">
        <p class="articleText" :class="{'errorText':inputError}"><i v-if="isRequired">*</i>{{labelName}}</p>
        <div class="inputSelect">
            <input type="text"  :class="{'focusBorder':inputFocus,'error':inputError}" @focus="inputFocus=true;" @blur="inputFocus=false" v-model="inputContent"/>
            <div class="SelectCont" @click="toggleSelect"><span  v-text="(selectContent.length)?selectContent:'小时'" class="formInputSelectItem"></span>
                <ul class="selectOption" v-show="selectOnOff">
                    <li v-for="(item,index) in inputSelectData" v-text="(item&&item.selectName)?item.selectName:''" :key="index"  @click.stop="changeSelect(index)" class="formInputSelectItem"></li>
                    <!--<li>天</li> <li>周</li> <li>月</li> <li>年</li> <li>小时</li>-->
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    import regularTest from '~utils/regularTest.js';
    import {mapActions} from 'vuex';
    export default {
        props:{
            InputSelectList:{
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
            needInput:{
                type:Boolean,
                default:false
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
            return{
                inputSelectData:'',
                selectOnOff:false,
                inputContent:'',
                inputFocus:false,
                inputStart:false,
                selectIndex:-1,
                testRule:''
            }
        },
        computed: {
            selectContent(){
                let t = this;
                return (parseInt(t.selectIndex,10)<0)?'':((t.inputSelectData[t.selectIndex]&&t.inputSelectData[t.selectIndex].selectName)?(t.inputSelectData[t.selectIndex].selectName):'');
            },
            inputError(){
                return (this.testRule)&&(!regularTest[this.testRule](this.inputContent))&&(this.inputStart)&&(this.inputContent.length);
            },
            passOnOff(){
                return (!this.inputError)?1:0;
            }
        },
        watch:{
            inputContent(n){
                let t = this;
                (!t.inputStart)?(t.inputStart = true):'';
                t.changeComponentData({HandleId:t.HandleId,index:t.selectIndex,contentDes:n});
                t.changeComponentTestResult({HandleId:t.HandleId,testResult:t.passOnOff});
            },
            InputSelectList(n){
                this.inputSelectData = n;
            },
            index(n){
                this.selectIndex = n;
            },
            contentDes(n){
                this.inputContent = n;
            },
            selectIndex(n){
                let t = this;
                t.changeComponentData({HandleId:t.HandleId,index:n,contentDes:t.inputContent});
                t.testRule = t.inputSelectData[n].testRule;
            }
        },
        methods:{
            ...mapActions(['changeComponentData','changeComponentTestResult']),
            toggleSelect(){
                this.selectOnOff = !this.selectOnOff;
            },
        changeSelect(index){
            let t = this;
            t.selectIndex = index;
            t.selectOnOff = false;
          }
        },
        mounted(){
            this.inputSelectData =  JSON.parse(this.InputSelectList);
            this.selectIndex = this.index;
            this.inputContent = this.contentDes;
        }
    }
</script>
<style lang="scss" scoped>
    @import "../../../assets/scss/modules/common-modules";
    .formCommon {
        .articleText{
            width: 145px;
            text-align: right;
            display: inline-block;
            margin-right: 39px;
            &.errorText{
                color: #F34B4B;
            }
        }
        .inputSelect{
            display: inline-block;
            vertical-align: middle;
            @include clearfix();
            input{
                float: left;
                width: 50px;
                height: 64px;
                line-height: 64px;
                padding-left: 20px;
                //font-size: 18px;
                //color: #000000;
                @include fontSize();
                border: 1px solid #C8C8C8;
                border-radius: 4px;
                margin-right: 20px;
                &.error{
                    background: #FFFFFF;
                    border: 1px solid #F34B4B;
                    box-shadow: 0 0 4px 0 rgba(243,75,75,0.59);
                    border-radius: 4px;
                }
            }
            .focusBorder{
                background: #FFFFFF;
                border: 1px solid #2888FF;
                box-shadow: 0 0 4px 0 rgba(67,130,241,0.47);
                border-radius: 4px;
            }
            .SelectCont{
                float: left;
                width: 60px;
                height: 64px;
                border: 1px solid #C8C8C8;
                border-radius: 4px;
                display: inline-block;
                vertical-align: middle;
                position: relative;
                //font-size: 18px;
                //color: #000000;
                @include fontSize(18px,#999);
                line-height: 64px;
                padding-left: 20px;
                &:after {
                    width: 0;
                    height: 0;
                    position: absolute;
                    content: "";
                    border-color: rgba(0, 0, 0, 0.5) transparent transparent;
                    border-style: solid;
                    border-width: 6px;
                    top: 29px;
                    right: 20px;
                }
                .selectOption {
                    position: absolute;
                    top: 66px;
                    padding: 10px;
                    left: 0;
                    width: 60px;
                    //font-size: 18px;
                    //color: #333333;
                    @include fontSize(18px,#333);
                    line-height: 40px;
                    max-height: 271px;
                    background: #FFFFFF;
                    box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.1);
                    border-radius: 4px;
                    display: block;

                    li{
                        padding-left: 6px;
                        cursor: pointer;
                        &:hover{
                            background: rgba(40,136,255,0.1);
                            border-radius: 2px;
                        }
                    }
                }
            }
        }

    }
</style>

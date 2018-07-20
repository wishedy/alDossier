<template>
    <div class="formNumber formCommon">
        <p class="articleText"  :class="{'errorText':inputError}"><i v-if="isRequired">*</i>{{labelName}}</p>
        <div class="selectCont" @click.stop="toggleSelect">
            <span v-text="(selectContent.length)?selectContent:'请选择'"  class="formInputSelectItem"></span>
            <ul class="selectOption" v-show="selectOnOff">
                <li v-for="(item,index) in selectInputData" :key='index' v-text="(item&&item.selectName?item.selectName:'')"  @click.stop="changeSelect(index)" class="formInputSelectItem"></li>
            </ul>
        </div>
        <input class="inputCont" type="text" placeholder="请输入" v-model="inputContent" :class="{'error':inputError,'focusBorder':inputFocus}"  @focus.stop="inputFocus=true" @blur.stop="inputFocus=false"/>
    </div>
</template>
<script>
    import regularTest from '~utils/regularTest.js';
    import {mapActions} from 'vuex';
    export default {
        props:{
            SelectInputList:{
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
                selectOnOff:false,
                inputContent:'',
                inputFocus:false,
                inputStart:false,
                selectIndex:-1,
                testRule:''
            }
        },
        computed: {
            selectInputData() {
                return JSON.parse(this.SelectInputList);
            },
            selectContent(){
                let t = this;
                return (parseInt(t.selectIndex,10)<0)?'':((t.selectInputData[t.selectIndex]&&t.selectInputData[t.selectIndex].selectName)?t.selectInputData[t.selectIndex].selectName:'');
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
            index(n){
                this.selectIndex = n;
            },
            contentDes(n){
                this.inputContent = n;
            },
            selectIndex(n){
                let t = this;
                t.changeComponentData({HandleId:t.HandleId,index:n,contentDes:t.inputContent});
                t.testRule = t.selectInputData[n].testRule;
                console.log(t.testRule);

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
            this.selectIndex = this.index;
            this.inputContent = this.contentDes;
        }
    }
</script>
<style lang="scss">
    .formCommon{
        .selectCont{
            .selectOption{
                display: block;
            }
        }

    }

</style>

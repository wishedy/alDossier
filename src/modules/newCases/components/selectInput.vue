<template>
    <div class="formNumber formCommon">
        <p class="articleText"  :class="{'errorText':inputError}"><i v-if="required">*</i>{{labelName}}</p>
        <div class="selectCont" @click.stop="toggleSelect"><span v-text="(selectContent.length)?selectContent:'请选择'"></span>
            <ul class="selectOption" v-show="selectOnOff">
                <li v-for="(item,index) in selectInputData" :key='index' v-text="item.selectName"  @click.stop="changeSelect(index)"></li>
            </ul>
        </div>
        <input class="inputCont" type="text" placeholder="请输入" v-model="inputData" :class="{'error':inputError,'focusBorder':inputFocus}"  @focus.stop="inputFocus=true" @blur.stop="inputFocus=false"/>
    </div>
</template>
<script>
    import regularTest from '~utils/regularTest.js';
    export default {
        props:['labelName','SelectInputList','index','inputContent','testRule','isRequired'],
        data(){
            return{
                selectOnOff:false,
                inputData:'',
                inputFocus:false,
                inputStart:false,
                selectIndex:-1
            }
        },
        computed: {
            selectInputData() {
                return JSON.parse(this.SelectInputList);
            },
            required(){
                let t = this;
                return !(parseInt(t.isRequired)===0)
            },
            selectContent(){
                let t = this;
                return (parseInt(t.selectIndex,10)<0)?'':t.selectInputData[t.selectIndex].selectName;
            },
            inputError(){
                //console.log(regularTest[this.testRule])
                return (!regularTest[this.testRule](this.inputData))&&(this.inputStart)&&(this.inputData.length);
            }
        },
        watch:{
            inputData(){
                let t = this;
                (!t.inputStart)?(t.inputStart = true):'';
                //console.log('改变');
            }
        },
        methods:{
            toggleSelect(){
                this.selectOnOff = !this.selectOnOff;
            },
            changeSelect(index){
                let t = this;
                //console.log(index)
                t.selectIndex = index;
                t.selectOnOff = false;
            }
        },
        mounted(){
            this.selectIndex = this.index;
            this.inputData = this.inputContent;
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

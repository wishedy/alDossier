<template>
    <section>
        <div class="formRadio formCommon formRadioFocus" :class="{'formRow':(radioListDemo.length>2)}">
            <p class="articleText"><i v-if="isRequired">*</i>{{radioLabelName}}</p>
            <div class="radioRight">
                <div class='radioIconNormal'  v-for="(item,index) in radioListDemo"   :class="{'active':index==rIndex}" :key="index" @click="selectRadio(index)"><i></i><span  v-text="item.radioName"></span></div>
            </div>
        </div>
        <div class="formSelect formCommon" v-show="rIndex>0">
            <p class="articleText"><i v-if="false">*</i>{{selectLabelName}}</p>
            <div class="selectCont" @click.stop="toggleSelect" ref="selectBar">
                <span v-text="(selectContent.length)?selectContent:'请选择'" class="formSelectItem"></span>
                <section class="lookMore" v-show="hoverContent.length" v-text="hoverContent" ref="hoverContent"></section>
                <ul class="selectOption" v-show="selectOnOff">
                    <li v-for="(item,index) in selectData" :key="index" v-text="item.selectName" @click.stop="changeSelect(index)"></li><!-- @mouseover="hoverStart($event,item.selectName)" @mouseout="hoverEnd"-->
                </ul>
            </div>
        </div>
    </section>
</template>
<script>
    export default {
        props:{
            RadioList:{
                type:String
            },
            SelectList:{
              type:String
            },
            radioIndex:{
                default:'-1'
            },
            selectIndex:{
                default:'-1'
            },
            HandleId:{
                default:0
            },
            isRequired:{
                type:Boolean,
                default:false
            },
            radioLabelName:{
                type:String,
                default:''
            },
            selectLabelName:{
                type:String,
                default:''
            }
        },
        computed: {
            selectContent(){
                let t = this;
                return (parseInt(t.sIndex,10)<0)?'':(t.selectData[t.sIndex]&&t.selectData[t.sIndex].selectName)?t.selectData[t.sIndex].selectName:'';
            }
        },
        data(){
            return {
                rIndex:-1,
                sIndex:-1,
                selectOnOff:false,
                selectData:[],
                hoverContent:'',
                radioListDemo:[]

            }
        },
        methods:{
            toggleSelect(){
                let t = this;
                t.selectOnOff = !t.selectOnOff;
            },
            selectRadio(index){
                let t = this;
                t.rIndex = index;
            },
            changeSelect(index){
                let t = this;
                //console.log(index)
                t.sIndex = index;
                t.selectOnOff = false;
            }
        },
        watch:{
            rIndex(n){
                let t = this;
                t.sIndex = -1;

            },
            RadioList(n){
                let t = this;
                this.radioListDemo = JSON.parse(n);
            },
            selectIndex(n){
                let t = this;
                this.sIndex = n;
            },
            SelectList(n){
                this.selectData=JSON.parse(n);
            },
            radioIndex(n){
                let t = this;
                this.rIndex = n;
            }
        },
        mounted(){
            this.radioListDemo = JSON.parse(this.RadioList);
            this.selectData=JSON.parse(this.SelectList);
            this.sIndex = this.selectIndex;
            this.rIndex = this.radioIndex;
        }
    }
</script>

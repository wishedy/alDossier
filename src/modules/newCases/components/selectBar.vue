<template>
    <div class="formSelect formCommon">
        <p class="articleText"><i v-if="isRequired">*</i>{{labelName}}</p>
        <div class="selectCont" @click.stop="toggleSelect" ref="selectBar">
            <span v-text="(selectContent.length)?selectContent:'请选择'" class="formSelectItem"></span>
            <section class="lookMore" v-show="hoverContent.length" v-text="hoverContent" ref="hoverContent"></section>
            <ul class="selectOption" v-show="selectOnOff">
                <li v-for="(item,index) in selectData" :key="index" v-text="item.selectName" @click.stop="changeSelect(index)" @mouseover="hoverStart($event,item.selectName)" @mouseout="hoverEnd"></li>
            </ul>
        </div>
    </div>
</template>
<script>
    import {mapActions,mapGetters} from 'vuex';
    export default {
        props:{
            SelectList:{
                type:String
            },
            index:{
                default:'-1'
            },
            HandleId:{
              default:''
            },
            isRequired:{
                type:Boolean,
                default:false
            },
            labelName:{
                type:String,
                default:''
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
                selectOnOff:false,
                selectIndex:-1,
                selectData:'[]',
                hoverContent:'',
            }
        },
        computed: {
            selectContent(){
                let t = this;
                return (parseInt(t.selectIndex,10)<0)?'':(t.selectData[t.selectIndex]&&t.selectData[t.selectIndex].selectName)?t.selectData[t.selectIndex].selectName:'';
            }
        },
        updated(){
            let t = this;
            let moreElement = $(".lookMore");
            moreElement.css({'top':parseInt(moreElement.css('top'))-$(t.$refs.hoverContent).height()/2-2})
        },
        watch:{
            selectIndex(n){
                let t = this;
                console.log(n);
                if(n>=0){
                    t.changeComponentData({HandleId:t.HandleId,index:n});
                    t.changeComponentTestResult({HandleId:t.HandleId,testResult:1});
                }
            },
            hoverContent(){
                //console.log($(this.$refs.hoverContent).height());
            },
            index(n){
                this.selectIndex = n;
            },
            SelectList(n){
                console.log(n);
                this.selectData=JSON.parse(n);
            }
        },
        methods:{
            ...mapActions(['changeComponentData','changeComponentTestResult']),
            toggleSelect(){
                let t = this;
                t.selectOnOff = !t.selectOnOff;
            },
            changeSelect(index){
                let t = this;
                //console.log(index)
                t.selectIndex = index;
                t.selectOnOff = false;
            },
            hoverStart(e,str){
                let t = this;
                $(".lookMore").css({'top':($(e.target).offset().top-$(t.$refs.selectBar).offset().top-13)+'px'});
                if(str.length>8){
                    t.hoverContent = str;
                }else{
                    t.hoverContent = '';
                }
            },
            hoverEnd(){
                let t = this;
                t.hoverContent = '';
            }
        },
        mounted(){
            let t = this;
            t.selectIndex = t.index;
            this.selectData=JSON.parse(this.SelectList);
        }
    }
</script>

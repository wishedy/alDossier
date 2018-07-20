<template>
    <div class="formInputAge formCommon">
        <p class="articleText"  :class="{'errorText':(ageYearError||ageMonthError||ageDayError)}"><i v-if="isRequired">*</i>年龄</p>
        <input class="inputText"  :class="{'error':ageYearError,'focusBorder':ageYearFocus}" type="text" v-model="ageYear"  @focus.stop="ageYearFocus=true" @blur.stop="ageYearFocus=false"/>
        <span>岁</span>
        <input class="inputText" type="text"  :class="{'error':ageMonthError,'focusBorder':ageMonthFocus}" v-model="ageMonth"  @focus.stop="ageMonthFocus=true" @blur.stop="ageMonthFocus=false"/>
        <span>月</span>
        <input class="inputText" type="text"  :class="{'error':ageDayError,'focusBorder':ageDayFocus}" v-model="ageDay"  @focus.stop="ageDayFocus=true" @blur.stop="ageDayFocus=false"/>
        <span>日</span>
    </div>
</template>
<script>
    import regularTest from '~utils/regularTest.js';
    import {mapActions} from 'vuex';
    export default {
        props:{
            contentYear:{
                default:''
            },
            contentMonth:{
                default:''
            },
            contentDay:{
                default:''
            },
            HandleId:{
                default:0
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
            placeholder:{
                type:String,
                default:''
            }
        },
        data(){
            return{
                ageYear:'',
                yearInputStart:false,
                ageYearFocus:false,
                ageMonth:'',
                monthInputStart:false,
                ageMonthFocus:false,
                ageDay:'',
                dayInputStart:false,
                ageDayFocus:false
            }
        },
        computed:{
            ageYearError(){
                return (this.testRule)&&(!regularTest[this.testRule](this.ageYear))&&(this.yearInputStart)&&(this.ageYear.length);
            },
            ageMonthError(){
                return (this.testRule)&&(!regularTest[this.testRule](this.ageMonth))&&(this.monthInputStart)&&(this.ageMonth.length);
            },
            ageDayError(){
                return (this.testRule)&&(!regularTest[this.testRule](this.ageDay))&&(this.dayInputStart)&&(this.ageDay.length);
            },
            passOnOff(){
                return (!(this.ageYearError||this.ageMonthError||this.ageDayError))?1:0;
            }
        },
        watch:{
            ageYear(newVal){
                let t = this;
                (!t.yearInputStart)?(t.yearInputStart = true):'';
                //console.log(newVal,t.HandleId);
                console.log(this.passOnOff);
                t.changeComponentData({HandleId:t.HandleId,contentYear:newVal,contentMonth:t.ageMonth,contentDay:t.ageDay});
                t.changeComponentTestResult({HandleId:t.HandleId,testResult:t.passOnOff});
            },
            ageMonth(newVal){
                let t = this;
                (!t.monthInputStart)?(t.monthInputStart = true):'';
                t.changeComponentData({HandleId:t.HandleId,contentYear:t.ageYear,contentMonth:newVal,contentDay:t.ageDay});
                t.changeComponentTestResult({HandleId:t.HandleId,testResult:t.passOnOff});
            },
            ageDay(newVal){
                let t = this;
                (!t.dayInputStart)?(t.dayInputStart = true):'';
                t.changeComponentData({HandleId:t.HandleId,contentYear:t.ageYear,contentMonth:t.ageMonth,contentDay:newVal});
                t.changeComponentTestResult({HandleId:t.HandleId,testResult:t.passOnOff});
            },
            contentYear(n){
                this.ageYear = n;
            },
            contentMonth(n){
                this.ageMonth = n;
            },
            contentDay(n){
                this.ageDay = n;
            },
            passOnOff(n,o){
                let t  = this;
                console.log(n,o);
                //t.changeComponentTestResult({HandleId:t.HandleId,testResult:n});
                console.log('改变了对错判断');
            }
        },
        methods:{
            ...mapActions(['changeComponentData','changeComponentTestResult'])
        },
        mounted(){
            this.ageYear = this.contentYear;
            this.ageMonth = this.contentMonth;
            this.ageDay = this.contentDay;
        }
    }
</script>

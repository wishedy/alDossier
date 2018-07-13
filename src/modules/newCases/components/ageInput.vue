<template>
    <div class="formInputAge formCommon">
        <p class="articleText"  :class="{'errorText':(ageYearError||ageMonthError||ageDayError)}"><i>*</i>年龄</p>
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
    export default {
        props:['maxLen','contentDes','testRule','isRequired','placeholder','labelName'],
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
                ////console.log(regularTest[this.testRule])
                return (!regularTest[this.testRule](this.ageYear))&&(this.yearInputStart)&&(this.ageYear.length);
            },
            ageMonthError(){
                ////console.log(regularTest[this.testRule])
                return (!regularTest[this.testRule](this.ageMonth))&&(this.monthInputStart)&&(this.ageMonth.length);
            },
            ageDayError(){
               // //console.log(regularTest[this.testRule])
                return (!regularTest[this.testRule](this.ageDay))&&(this.dayInputStart)&&(this.ageDay.length);
            },
        },
        watch:{
            ageYear(newVal){
                let t = this;
                //t.setTopNavTitle(newVal);
                //console.log(t.yearInputStart);
                (!t.yearInputStart)?(t.yearInputStart = true):'';
            },
            ageMonth(newVal){
                let t = this;
                //t.setTopNavTitle(newVal);
                (!t.monthInputStart)?(t.monthInputStart = true):'';
            },
            ageDay(newVal){
                let t = this;
                //t.setTopNavTitle(newVal);
                (!t.dayInputStart)?(t.dayInputStart = true):'';
            },
        },
        mounted(){

        }
    }
</script>

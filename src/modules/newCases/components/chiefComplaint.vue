<template>
    <section class="alEmr-indexInner">
        <aside class="caseWidth">
            <h2>请描述患者主诉</h2>
            <div class="formSelect formCommon"><p class="articleText">部位</p>
                <div class="selectCont" @click="toggleSelect('illPlaceSelect')">
                    <span>请选择</span>
                    <ul class="selectOption" v-show="illPlaceSelect">
                        <li>123</li> <li>123</li> <li>123</li> <li>123</li> <li>123</li>
                    </ul>
                </div>
            </div>
            <div class="formSelect formCommon"><p class="articleText">症状</p>
                <div class="selectCont" @click="toggleSelect('illSymptomsSelect')">
                    <span>请选择</span>
                    <ul class="selectOption"  v-show="illSymptomsSelect">
                        <li>123</li> <li>123</li> <li>123</li> <li>123</li> <li>123</li>
                    </ul>
                </div>
            </div>
            <div class="formSelect formCommon"><p class="articleText">伴随症状</p>
                <div class="selectCont" @click="toggleSelect('widthIllSymptomsSelect')">
                    <span>请选择</span>
                    <ul class="selectOption"  v-show="widthIllSymptomsSelect">
                        <li>123</li> <li>123</li> <li>123</li> <li>123</li> <li>123</li>
                    </ul>
                </div>
            </div>
            <div class="formSelect formCommon"><p class="articleText">症状持续时间</p>
                <div class="inputSelect">
                    <input type="text"  :class="{'focusBorder':illDurationTimeFocus}" @focus="illDurationTimeFocus=true;" @blur="illDurationTimeFocus=false"/>
                    <div class="SelectCont" @click="toggleSelect('illDurationTimeSelect')"><span>小时</span>
                        <ul class="selectOption" v-show="illDurationTimeSelect">
                            <li>天</li> <li>周</li> <li>月</li> <li>年</li> <li>小时</li>
                        </ul>
                    </div>
                </div>
            </div>
        </aside>
        <div class="caseBottomBtn">
            <p class="casePrevBtn">上一步</p>
            <p class="caseNextBtn">下一步</p>
        </div>
    </section>
</template>
<script>
    import {mapActions,mapGetters} from 'vuex';
    export default {
        data(){
          return {
              illPlace:'',
              illPlaceSelect:false,
              illSymptoms:'',
              illSymptomsSelect:false,
              widthIllSymptoms:'',
              widthIllSymptomsSelect:false,
              illDurationTime:'',
              illDurationTimeSelect:false,
              illDurationTimeFocus:false,
          }
        },
        methods:{
            ...mapActions(['getCaseInfo','setTopNavTitle']),
            toggleSelect(keyVal){
                this[keyVal] = !this[keyVal];
            }
        },
        computed:{
            ...mapGetters(['chiefComplaintInfo','editType'])
        },
        created(){
            //console.log('kaish');
            //console.log(this.editType);
            if(parseInt(this.editType,10)){

            }else{
                this.getCaseInfo();
            }
            this.setTopNavTitle('主诉');
            //在此处发送动态请求;
        }
    }
</script>
<style lang="scss">
    .alEmr-indexInner{
        width: 1000px;
        margin: 0 auto;
    }
</style>

<template>
    <div class="formSelectS formCommon">
        <p class="articleText">
            <i v-if="isRequired">*</i>
            {{labelName}}
        </p>
        <div class="cont">
            <div class="selectCont" @click.stop="toggleSelect(0)"><span v-text="yearSelectContent"></span>
                <ul class="selectOption" v-show="yearSelectOnOff">
                    <!--<li>2014</li><li>2015</li><li>2013</li><li>2014</li>-->
                    <li v-for="(item,index) in dateData.yearTimeBox" :key="index" v-text="item" @click.stop="changeTime(0,item)"></li>
                </ul>
            </div>
            <b>年</b>
            <div class="selectCont" @click.stop="toggleSelect(1)"><span v-text="monthSelectContent"></span>
                <ul class="selectOption width83" v-show="monthSelectOnOff">
                    <li v-for="(item,index) in dateData.monthTimeBox" :key="index" v-text="item" @click.stop="changeTime(1,item)"></li>
                </ul>
            </div>
            <b>月</b>
            <div class="selectCont" @click.stop="toggleSelect(2)"><span v-text="daySelectContent"></span>
                <ul class="selectOption width83" v-show="daySelectOnOff">
                    <li v-for="(item,index) in dateData.dayTimeBox" :key="index" v-text="item" @click.stop="changeTime(2,item)"></li>
                </ul>
            </div>
            <b>日</b>
        </div>
    </div>
</template>
<script>
    import getDateData from '../jsComponents/getDateData.js';
    export default {
        props:{
            yearSelect:{
                default:''
            },
            monthSelect:{
                default:''
            },
            daySelect:{
                default:''
            },
            isRequired:{
                type:Boolean,
                default:false
            },
            labelName:{
                type:String,
                default:''
            }
        },
        data(){
          return {
              yearSelectOnOff:false,
              yearSelectContent:'',
              monthSelectOnOff:false,
              monthSelectContent:'',
              daySelectOnOff:false,
              daySelectContent:'',
              dateData:{
                  dayTimeBox:[],
                  monthTimeBox:[],
                  yearTimeBox:[]
              }
          }
        },
        methods:{
            toggleSelect(type){
              let t = this;
              //console.log(type)
              switch (parseInt(type,10)){
                  case 0:
                      t.yearSelectOnOff = !t.yearSelectOnOff;
                      break;
                  case 1:
                      t.monthSelectOnOff = !t.monthSelectOnOff;
                      break;
                  case 2:
                      t.daySelectOnOff = !t.daySelectOnOff;
                      break;
              }
            },
            changeTime(type,item){
                let t = this;
                switch (type){
                    case 0:
                        t.yearSelectContent = item;
                        t.yearSelectOnOff = false;
                        break;
                    case 1:
                        if(item=='不限'){
                            t.monthSelectContent = '';
                            t.daySelectContent = '';
                        }else{
                            t.monthSelectContent = item;
                        }
                        t.monthSelectOnOff = false;
                        break;
                    case 2:
                        if(item=='不限'){
                            t.daySelectContent = '';
                        }else{
                            t.daySelectContent = item;
                        }
                        t.daySelectOnOff = false;
                        break;
                }
            }
        },
        watch:{
            yearSelectContent(newVal){
                let t = this;
                t.dayTimeBox = [];
                t.dayTimeBox = t.dateData.getDayDate(newVal,parseInt(t.monthSelectContent,10));
                t.$emit('changeDate',newVal+'-'+t.monthSelectContent+'-'+t.daySelectContent);
            },
            monthSelectContent(newVal){
                let t = this;
                //console.log('月变了');
                t.dayTimeBox = [];
                t.dayTimeBox = t.dateData.getDayDate(parseInt(t.yearSelectContent,10),newVal);
                t.$emit('changeDate',t.yearSelectContent+'-'+newVal+'-'+t.daySelectContent);
            },
            daySelectContent(newVal){
                let t  = this;
                t.$emit('changeDate',t.yearSelectContent+'-'+t.monthSelectContent+'-'+newVal);
            },
            yearSelect(n){
                this.yearSelectContent = n;
            },
            monthSelect(n){
                this.monthSelectContent = n;
            },
            daySelect(n){
                this.daySelectContent = n;
            }
        },
        mounted(){
            this.dateData = new getDateData();
            this.yearSelectContent = this.yearSelect;
            this.monthSelectContent = this.monthSelect;
            this.daySelectContent = this.daySelect;
        }
    }
</script>

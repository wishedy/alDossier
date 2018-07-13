<template>
    <div class="formSelectS formCommon">
        <p class="articleText">
            <i v-if="required">*</i>
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
            <div class="selectCont width83" @click.stop="toggleSelect(1)"><span v-text="monthSelectContent"></span>
                <ul class="selectOption" v-show="monthSelectOnOff">
                    <li v-for="(item,index) in dateData.monthTimeBox" :key="index" v-text="item" @click.stop="changeTime(1,item)"></li>
                </ul>
            </div>
            <b>月</b>
            <div class="selectCont width83" @click.stop="toggleSelect(2)"><span v-text="daySelectContent"></span>
                <ul class="selectOption" v-show="daySelectOnOff">
                    <li v-for="(item,index) in dateData.dayTimeBox" :key="index" v-text="item" @click.stop="changeTime(2,item)"></li>
                </ul>
            </div>
            <b>日</b>
        </div>
    </div>
</template>
<script>
    import getDateData from '../assemble/getDateData.js';
    export default {
        props:['isRequired','labelName','yearSelect','monthSelect','daySelect'],
        computed:{
            required(){
                let t = this;
                return !(parseInt(t.isRequired)===0)
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
                        //console.log('选择')
                        t.monthSelectContent = item;
                        t.monthSelectOnOff = false;
                        break;
                    case 2:
                        t.daySelectContent = item;
                        t.daySelectOnOff = false;
                        break;
                }
            }
        },
        watch:{
            yearSelectContent(newVal){
                let t = this;
                //console.log('年变了');
                t.dayTimeBox = [];
                t.dayTimeBox = t.dateData.getDayDate(newVal,parseInt(t.monthSelectContent,10));
            },
            monthSelectContent(newVal){
                let t = this;
                //console.log('月变了');
                t.dayTimeBox = [];
                t.dayTimeBox = t.dateData.getDayDate(parseInt(t.yearSelectContent,10),newVal);
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

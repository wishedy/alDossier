<template>
    <div class="formSelect formCommon">
        <p class="articleText"><i v-if="required">*</i>{{labelName}}</p>
        <div class="selectCont" @click.stop="toggleSelect">
            <span v-text="(selectContent.length)?selectContent:'请选择'"></span>
            <ul class="selectOption" v-show="selectOnOff">
                <li v-for="(item,index) in selectData" :key="index" v-text="item.selectName" @click.stop="changeSelect(index)"></li>
            </ul>
        </div>
    </div>
</template>
<script>
    export default {
        props:['labelName','SelectList','index','inputContent','testRule','isRequired'],
        data(){
            return {
                selectOnOff:false,
                selectIndex:-1
            }
        },
        computed: {
            selectData() {
                return JSON.parse(this.SelectList);
            },
            required(){
                let t = this;
                return !(parseInt(t.isRequired)===0)
            },
            selectContent(){
                let t = this;
                return (parseInt(t.selectIndex,10)<0)?'':t.selectData[t.selectIndex].selectName;
            }
        },
        watch:{
            selectIndex(){
                //console.log('改变数据');
            }
        },
        methods:{
            toggleSelect(){
                let t = this;
                t.selectOnOff = !t.selectOnOff;
            },
            changeSelect(index){
                let t = this;
                //console.log(index)
                t.selectIndex = index;
                t.selectOnOff = false;
            }
        },
        mounted(){
            let t = this;
            t.selectIndex = t.index;
        }
    }
</script>

<template>
    <section class="alEmr-indexInner"  @click.stop="resetSelect">
        <aside class="casesWidth">
            <!--<InputBar maxLen="20" contentDes="" testRule="testName" isRequired="1" labelName="姓名"></InputBar>
            <RadioBar :RadioList="RadioList" index="-1" isRequired="1"></RadioBar>-->
        </aside>
    </section>
</template>
<script>
    import assemblePage from '../assemble/assemblePage.js';
    import InputBar from './InputBar.vue';
    import RadioBar from './radioboxBar.vue';
    const $  = require('jquery');
    export default {
        components:{
            InputBar,
            RadioBar
        },
        data(){
          return{
                RadioList:[{'radioName':'男'},{'radioName':'女'}],
                SelectInputList:[{'selectName':'11111'},{'selectName':'22222'}],
            }
        },
        mounted(){
            let t = this;
            let AssemblePage  = new assemblePage(t.SelectInputList);
            this.dynamicElement =AssemblePage.createPage();
            //console.log($('.casesWidth'));
            //debugger;
            this.dynamicElement.$mount(".casesWidth");
        },
        methods:{
            resetSelect(){
                //console.log('收起无关选项');
            }
        }
    }
</script>

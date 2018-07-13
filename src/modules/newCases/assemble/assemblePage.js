import Vue from 'vue';
import InputBar from '../components/InputBar.vue';
import RadioBar from '../components/radioboxBar.vue';
import SelectInput from '../components/selectInput.vue';
import InputSelect from '../components/inputSelect.vue';
import SelectBar from '../components/selectBar.vue';
import DataPicker from '../components/dataPicker.vue';
import CheckboxBar from '../components/checkboxBar.vue';
import TextAreaBar from '../components/textAreaBar.vue';
import AgeInput from '../components/ageInput.vue';
import AddButton from '../components/addButton.vue';
import TagList from '../components/tagList.vue';
import store from "../store/store.js";
import {mapGetters} from 'vuex';
import TemplatePage from './templatePage.js';
//新建病例的所有动态页面 全部在这里组装出来最后返回给那个页面一个vue对象
class assemblePage {
    constructor(props){
        ////console.log('初始化模板吧');
        this.data = props;
        //console.log(this.data,JSON.stringify(this.data));
        let str = JSON.stringify([{'selectName':'1212'},{'selectName':'234'},{'selectName':'531'}]);
        let strRadioName = JSON.stringify([{'radioName':'男'},{'radioName':'女'}]);
        let checkboxName = JSON.stringify([{'checkboxName':'男','checkOnOff':true},{'checkboxName':'女','checkOnOff':true}]);
        this.RadioList = [{'radioName':'男'},{'radioName':'女'}];
        new TemplatePage('111111');
        let tagList=JSON.stringify([
            {
                'tagName':'标签名字'
            },
            {
                'tagName':'标签名字'
            },
            {
                'tagName':'标签名字'
            },
            {
                'tagName':'标签名字'
            },
            {
                'tagName':'标签名字'
            }
        ]);
        this.template =
            `
                <SelectBar SelectList='${str}' index="-1" isRequired="0"  labelName="归属团队"></SelectBar>
                <InputBar maxLen='20' contentDes="" testRule="testName" isRequired labelName="姓名" placeholder="请输入您的姓名" ></InputBar>
                <RadioBar RadioList='${strRadioName}'  isRequired  labelName="归属"  row needInput testRule="testNum"  placeholder="请输入"></RadioBar>
                <CheckboxBar checkBoxList='${checkboxName}'  isRequired  labelName="归属" row needInput="1" testRule="testNum" contentDes="" placeholder="请输入"></CheckboxBar>
                <SelectInput SelectInputList='${str}' index="-1" isRequired="1"  labelName="编号" inputContent="" testRule="testNum"></SelectInput>
                <InputSelect InputSelectList='${str}' index="-1" isRequired="1"  labelName="症状持续时间" inputContent="" testRule="testNum"></InputSelect>
             <DataPicker isRequired="1" labelName="手术时间" yearSelect="2018" monthSelect="6" daySelect="13"></DataPicker>
               
                <AgeInput maxLen="20" contentDes="" testRule="testNum" isRequired="1" labelName="姓名" placeholder="请输入您的姓名"></AgeInput> 
                <AddButton labelName="添加病例详情"></AddButton>
                <TagList contentTagList='${tagList}'></TagList>
                <TextAreaBar  maxLen="200" contentDes="" testRule="" isRequired="1"  labelName="包含不局限于：疾病名称、疾病的治疗情况。可填写多个疾病" placeholder="请输入您的姓名" subTitle="既往病史"></TextAreaBar>
            `;
    }
    createPage(){
        let t = this;

        return new Vue({
            store,
            template:`<aside id="assemble">${t.data}${t.template}</aside>`,
            data(){
                return{
                    illDurationTimeSelect:false,
                    illDurationTimeFocus:false
                }
            },
            computed:{
              ...mapGetters(['titleName'])
            },
            methods:{
                toggleSelect(){
                    //console.log('点击');
                }
            },
            mounted(){
                //console.log(this.titleName)
            },
            components:{
                InputBar,
                RadioBar,
                SelectInput,
                SelectBar,
                InputSelect,
                DataPicker,
                TextAreaBar,
                AgeInput,
                CheckboxBar,
                AddButton,
                TagList
            }
        })
    }
}
export default assemblePage;

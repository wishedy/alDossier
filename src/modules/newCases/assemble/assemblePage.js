import Vue from 'vue';
import InputBar from '../components/InputBar.vue';
import RadioBar from '../components/radioboxBar.vue';
import SelectInput from '../components/selectInput.vue';
import InputSelect from '../components/inputSelect.vue';
import SelectBar from '../components/selectBar.vue';
import DatePicker from '../components/datePicker.vue';
import CheckboxBar from '../components/checkboxBar.vue';
import TextAreaBar from '../components/textAreaBar.vue';
import AgeInput from '../components/ageInput.vue';
import AddButton from '../components/addButton.vue';
import TagList from '../components/tagList.vue';
import store from "../store/store.js";
import {mapGetters,mapActions} from 'vuex';
import TemplatePage from './templatePage.js';
import getPageData from '../virtualData/pageData.js';
let pageConfigData = {};
//新建病历的所有动态页面 全部在这里组装出来最后返回给那个页面一个vue对象
class assemblePage {
    constructor(props){
        let assemblePageObj = this;
        const getPageVirtualData = new getPageData(props);
        assemblePageObj.pageConfigData = getPageVirtualData.createPageData();
        this.template = new TemplatePage(assemblePageObj.pageConfigData).createPageHtml();
    }
    createPage(){
        let assemblePageObj = this;
        return new Vue({
            store,
            template:`<aside id="assemble">${assemblePageObj.template}</aside>`,
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
                ...mapActions(['savePageData']),
                toggleSelect(){
                    //console.log('点击');
                }
            },
            mounted(){
                let vueObj = this;
                console.log(assemblePageObj.pageConfigData);
                vueObj.savePageData(assemblePageObj.pageConfigData);
            },
            components:{
                InputBar,
                RadioBar,
                SelectInput,
                SelectBar,
                InputSelect,
                DatePicker,
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

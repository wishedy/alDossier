class TemplatePage {
    constructor(props){
        let t = this;
        this.pageHtml = '';
        this.pageData = props;
        t.init();
    }
    init(){
        return {'id':'11111111'}
    }
    createPageHtml(){
        let t = this;
        for(let keyWord in t.pageData){
            let nowData = t.pageData[keyWord];
            switch (parseInt(nowData.componentType,10)){
                case 0://输入框
                    t.pageHtml+=
                        `
                          <InputBar maxLen=${(parseInt(nowData.maxLen)>0?nowData.maxLen:'')} contentDes="${nowData.contentDes}" testRule="${(nowData.testRule)?nowData.testRule:''}"  HandleId="${keyWord}"  ${(parseInt(nowData.isRequired,10)===1)?'isRequired':''} labelName="${nowData.labelName}" placeholder="${nowData.placeholder}" unitName="${nowData.unitName}"></InputBar>
                        `;
                    break;
                case 1://下拉框
                    t.pageHtml+=
                        `
                          <SelectBar SelectList='${JSON.stringify(nowData.SelectList)}'   HandleId="${keyWord}"  index="${nowData.index}" ${(parseInt(nowData.isRequired,10)===1)?'isRequired':''} labelName="${nowData.labelName}"></SelectBar>
                        `;
                    break;
                case 2://选择输入框
                    t.pageHtml+=
                        `
                          <SelectInput SelectInputList='${JSON.stringify(nowData.SelectInputList)}'    HandleId="${keyWord}"  index="${nowData.index}" ${(parseInt(nowData.isRequired,10)===1)?'isRequired':''} labelName="${nowData.labelName}"  contentDes="${nowData.contentDes}"  testRule="${(nowData.testRule)?nowData.testRule:''}" ></SelectInput>
                        `;
                    break;
                case 3://输入选择框
                    t.pageHtml+=
                        `
                          <InputSelect InputSelectList='${JSON.stringify(nowData.InputSelectList)}'    HandleId="${keyWord}"  contentDes="${nowData.contentDes}"  index="${nowData.index}" ${(parseInt(nowData.isRequired,10)===1)?'isRequired':''} labelName="${nowData.labelName}"  testRule="${(nowData.testRule)?nowData.testRule:''}" ></InputSelect>
                        `;
                    break;
                case 4://年龄输入框
                    t.pageHtml+=
                        `
                          <AgeInput  ${(parseInt(nowData.isRequired,10)===1)?'isRequired':''}   HandleId="${keyWord}"  labelName="${nowData.labelName}" contentYear="${nowData.contentYear}"  contentMonth="${nowData.contentMonth}"  contentDay="${nowData.contentDay}"></AgeInput>
                        `;
                    break;
                case 5://日期选择器
                    t.pageHtml+=
                        `
                          <DatePicker ${(parseInt(nowData.isRequired,10)===1)?'isRequired':''}   HandleId="${keyWord}"  labelName="${nowData.labelName}"   yearSelect="${nowData.yearSelect}" monthSelect="${nowData.monthSelect}" daySelect="${nowData.daySelect}"></DatePicker>
                        `;
                    break;
                case 6://单选框
                    t.pageHtml+=
                        `
                        <RadioBar RadioList='${JSON.stringify(nowData.RadioList)}'     HandleId="${keyWord}"  contentDes="${nowData.contentDes}"  ${(parseInt(nowData.isRequired,10)===1)?'isRequired':''} labelName="${nowData.labelName}"  ${(parseInt(nowData.row,10)===1)?'row':''} ${(parseInt(nowData.needInput,10)===1)?'needInput':''} testRule="${(nowData.testRule)?nowData.testRule:''}" placeholder="${nowData.placeholder}" ></RadioBar>
                        `;
                    break;
                case 7://多选框
                    t.pageHtml+=
                        `
                          <CheckboxBar checkBoxList='${JSON.stringify(nowData.checkBoxList)}'     HandleId="${keyWord}"  contentDes="${nowData.contentDes}"  ${(parseInt(nowData.isRequired,10)===1)?'isRequired':''} labelName="${nowData.labelName}"  ${(parseInt(nowData.row,10)===1)?'row':''} ${(parseInt(nowData.needInput,10)===1)?'needInput':''} testRule="${(nowData.testRule)?nowData.testRule:''}" placeholder="${nowData.placeholder}" ></CheckboxBar>
                        `;
                    break;
                case 8://文本域
                    t.pageHtml+=
                        `
                          <TextAreaBar maxLen=${(parseInt(nowData.maxLen)>0?nowData.maxLen:'')}     HandleId="${keyWord}"  contentDes="${nowData.contentDes}"  ${(parseInt(nowData.isRequired,10)===1)?'isRequired':''}  title="${nowData.title}"  titleDes="${nowData.titleDes}" placeholder="${nowData.placeholder}" labelName="${nowData.labelName}"  testRule="${(nowData.testRule)?nowData.testRule:''}"  ></TextAreaBar>
                        `;
                    break;
            }
        }
        return t.pageHtml;

    }
}
export default TemplatePage;

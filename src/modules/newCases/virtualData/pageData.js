class getPageData {
    constructor(props){
        //this.createPageData();
        this.pageData = props.data;
        this.templateIndex = props.templateIndex;
    }
    createPageData(){
        let t = this;
        const responseData = t.pageData;
        let pageData = {};
        let dataList = [];
        if(parseInt(responseData["data_list"][t.templateIndex].item.componentType,10)!==10){
            dataList = responseData["data_list"];
        }else{
            dataList = responseData["data_list"][t.templateIndex].item.componentList;
        }
        for(let num = 0;num<dataList.length;num++){
            let timestamp = Date.parse(new Date())+num;
            pageData[timestamp] = dataList[num].item;
        }
            return pageData;
    }
}

export default getPageData;

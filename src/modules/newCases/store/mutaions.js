import axios from 'axios';
const mutaions = {
    sendNum(state,num){
        state.num = num;
    },
    saveNavTopHeight(state,heightNum){
        state.navHeight = heightNum;
    },
    getBaseCaseInfo(state,type){
        axios({
            method: 'POST',
            url: '/call/caseFolder/baseinfo/getBaseinfoById/',
            transformRequest: [function(data) {
                return "paramJson=" + JSON.stringify(data);
            }],
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            },
            data: {
                caseId: state.CaseId
            }
        }).then((req)=>{
            console.log(req);
            //在获取基本信息的时候包含这个病历使用的模板ID
            state.templateId = req.data.responseObject.responseData.data_list[0].templateId;
            state.teamId = req.data.responseObject.responseData.data_list[0].teamId;
            state.baseInfo = req.data.responseObject.responseData.data_list[0];
        });
    },
    saveEditType(state,type){
      state.editType= parseInt(type,10);
    },
    setTopNavTitle(state,titleName){
        state.titleName = titleName;
    },
    saveCaseId(state,num){
        localStorage.removeItem('emrNewCaseCaseId');
        localStorage.setItem('emrNewCaseCaseId',num);
        console.log(num)
        state.CaseId = num;
    },
    saveTemplateId(state,id){
        console.log(id);
      state.templateId = id;
    },
    changeIndex(state,options){
        let t = mutaions;
        if(isNaN(options.index)){
            console.log(t.examinePageData(state));
            state.changePageOnOff = t.examinePageData(state);
            console.log(state.changePageOnOff);
            // clearTimeout(timer);
            // let timer = setTimeout(function(){
            //     state.changePageOnOff = true;
            // },1000);
            mutaions.clickChangeBtn(state);
            if(!t.examinePageData(state)){
                console.log('有错误跳个屁');
                return false;
            }
            if(options.pre){
                (parseInt(state.pageIndex,10)===state.tabList.length-1)?(state.pageIndex=state.tabList.length-1):(state.pageIndex++);
            }else{
                (parseInt(state.pageIndex,10)===-1)?(state.pageIndex=-1):(state.pageIndex--);
            }
        }else{
            state.pageIndex = options.index;
        }

    },
    savePageData(state,data){
        state.pageInfo.pageData = data;
    },
    clickChangeBtn(state){
        state.clickNum++;
    },
    examineBasePageData(state){
      state.changePageOnOff = mutaions.examinePageData(state);
      console.log(state.changePageOnOff);
    },
    examinePageData(state){
        let t = mutaions;
        let data = state.pageInfo.pageData;
        let examineResult = true;
        debugger;
        for(let key in data){
            if(data[key].testResult===0){//操作过错误的直接返回false
                examineResult = false;
                break;
            }else{//没操作过，但是是必填项，没填内容返回false
                switch (parseInt(data[key].componentType)){
                    case 0:
                        if(parseInt(data[key].isRequired,10)===1){
                            examineResult = !(data[key].contentDes&&data[key].contentDes.length===0);
                        }
                        break;
                    case 1:
                        if(parseInt(data[key].isRequired,10)===1){
                            examineResult = !(parseInt(data[key].index,10)===-1);
                        }
                        break;
                    case 2:
                    case 3:
                        if(parseInt(data[key].isRequired,10)===1){
                            examineResult = (!(parseInt(data[key].index,10)===-1))||(!(data[key].contentDes.length===0));
                        }
                        break;
                    case 4:
                        if(parseInt(data[key].isRequired,10)===1){

                            examineResult = !((data[key].contentYear.length===0)&&(data[key].contentMonth.length===0)&&(data[key].contentDay.length===0));
                        }
                        break;
                    case 5:
                        if(parseInt(data[key].isRequired,10)===1){
                            examineResult = (!((data[key].yearSelect.length===0)&&data[key].monthSelect.length===0)&&data[key].daySelect.length===0);
                        }
                        break;
                    case 6:
                        if(parseInt(data[key].isRequired,10)===1){
                        if(parseInt(data[key].needInput,10)===1){
                            (data[key].contentDes.length===0)?(examineResult=false):(examineResult = (!(parseInt(data[key].index,10)===-1)));
                        }else{
                            (examineResult = (!(parseInt(data[key].index,10)===-1)));
                        }
                      }
                        break;
                    case 7:
                        let checkLen = 0;
                        console.log(data[key].checkBoxList);
                        for(let i = 0;i<data[key].checkBoxList.length;i++){
                            data[key][i].checkOnOff?checkLen++:'';
                        }
                        if(parseInt(data[key].isRequired,10)===1) {
                            if (parseInt(data[key].needInput, 10) === 1) {
                                (data[key].contentDes&&data[key].contentDes.length === 0) ? (examineResult = false) : (examineResult = (!(checkLen==0)));
                            } else {
                                (examineResult = (!(checkLen==0)));
                            }
                        }
                        break;
                    case 8:
                        if(parseInt(data[key].isRequired,10)===1){
                            examineResult = !(data[key].contentDes&&data[key].contentDes.length===0);
                        }
                        break;
                }
                if(!examineResult){
                    break;
                }
            }
        }
        return examineResult;
    },
    saveBasePageInfo(state,data){
        let t = mutaions;
        console.log(state.pageInfo.pageData);
    },
    changeComponentData(state,config){
        if(state.pageInfo&&state.pageInfo.pageData&&state.pageInfo.pageData[config.HandleId]){
            switch (parseInt(state.pageInfo.pageData[config.HandleId].componentType,10)){
                case 0:
                    console.log('在修改input输入');
                    state.pageInfo.pageData[config.HandleId].contentDes = config.contentDes;
                    break;
                case 1:
                    console.log('在修改下拉框');
                    state.pageInfo.pageData[config.HandleId].index = config.index;
                    break;
                case 4:
                    console.log('在修改年龄');
                    state.pageInfo.pageData[config.HandleId].contentYear = config.contentYear;
                    state.pageInfo.pageData[config.HandleId].contentMonth = config.contentMonth;
                    state.pageInfo.pageData[config.HandleId].contentDay = config.contentDay;
                    //console.log(state.pageInfo.pageData[config.HandleId]);
                    break;
                case 6:
                    console.log('修改单选项');
                    state.pageInfo.pageData[config.HandleId].index = config.index;
                    break;
                case 2:
                    console.log('修改选择输入');
                    state.pageInfo.pageData[config.HandleId].index = config.index;
                    state.pageInfo.pageData[config.HandleId].contentDes = config.contentDes;
                    break;
                case 3:
                    console.log('修改输入选择');
                    state.pageInfo.pageData[config.HandleId].index = config.index;
                    state.pageInfo.pageData[config.HandleId].contentDes = config.contentDes;
                    break;
                case 11:
                    console.log('修改标签输入项');
                    state.pageInfo.pageData[config.HandleId].contentTagList = config.contentTagList;
                    break;
            }
        }

    },
    getTeamList(state){
        axios({
            url: "/call/caseFolder/team_baseinfo/getMapListByCustomerId/",
            method: "POST",
            data: {customerId:'1399252409974'},
            transformRequest: [function(data) {
                return "paramJson=" + JSON.stringify(data);
            }],
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            },
            timeout: 30000
        }).then(function(res){
            state.teamList = res.data.responseObject.responseData['data_list'];
        });
    },
    changeComponentTestResult(state,config){
        console.log(state.pageInfo.pageData[config.HandleId],config.HandleId);
        state.pageInfo.pageData[config.HandleId].testResult = config.testResult;
    },
    getTabList(state){
        axios({
            method: 'get',
            url: '/emrpc/caseTabInfo/',
            data: {
                id: "22"
            }
        }).then((req)=>{
           // state.tabList = req.data['data_list'];
            state.tabList = [{
                "id": 1,
                "treeLevel": 1,
                "isAdd": 0,
                "menuId": 1528163073956,
                "clinicalId": 1510290993405,
                "menuName": "患者基本信息"
            }, {
                "id": 2,
                "treeLevel": 1,
                "isAdd": 0,
                "menuId": 1528163074016,
                "clinicalId": 1510291499869,
                "menuName": "主诉&现病史"
            }, {
                "id": 3,
                "treeLevel": 1,
                "isAdd": 0,
                "menuId": 1528163074071,
                "clinicalId": 1510291539475,
                "menuName": "既往史"
            }, {
                "id": 4,
                "treeLevel": 1,
                "isAdd": 0,
                "menuId": 1528163074129,
                "clinicalId": 1510291554933,
                "menuName": "个人史"
            }, {
                "id": 5,
                "treeLevel": 1,
                "isAdd": 0,
                "menuId": 1528163074187,
                "clinicalId": 1510291583372,
                "menuName": "全身查体"
            }, {
                "id": 6,
                "treeLevel": 1,
                "isAdd": 0,
                "menuId": 1528163074246,
                "clinicalId": 1510291605398,
                "menuName": "专科查体"
            }, {
                "id": 7,
                "treeLevel": 1,
                "isAdd": 0,
                "menuId": 1528266190515,
                "clinicalId": 1510291617677,
                "menuName": "实验室检查"
            }, {
                "id": 8,
                "treeLevel": 1,
                "isAdd": 0,
                "menuId": 1528163074304,
                "clinicalId": 1510291633218,
                "menuName": "影像检查"
            }, {
                "id": 9,
                "treeLevel": 1,
                "isAdd": 0,
                "menuId": 1528163074363,
                "clinicalId": 1510291651475,
                "menuName": "诊断"
            }, {
                "id": 11,
                "treeLevel": 1,
                "isAdd": 1,
                "menuId": 1528163074421,
                "clinicalId": 1510291698740,
                "menuName": "手术记录"
            }, {
                "id": 12,
                "treeLevel": 1,
                "isAdd": 1,
                "menuId": 1528163074480,
                "clinicalId": 1510291880269,
                "menuName": "随访记录"
            }];
        });
    },
    saveSubPageData(state,data){
        state.subPageData = data;
    },
    changeSubIndex(state,index){
        console.log('改变吧'+index);
        state.subIndex = index;
    }
};
export default mutaions;

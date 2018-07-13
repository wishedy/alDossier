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
            method: 'get',
            url: '/emrpc/caseBaseInfo/',
            data: {
                id: '2'
            }
        }).then((req)=>{
            console.log(req);
        });
        let jsonData = {
            'patientName':'李春辉',
            'ageYear':'12',
            'ageMonth':'12',
            'ageDay':'12',
            'sex':'0',
            'phoneNum':'13789081234',
            'admissionNum':'172817262',
            'affiliation':0,
            'affiliationTeamName':'大唯医web组'
        };
        state.baseInfo = {
            'patientName':jsonData.patientName,
            'ageYear':jsonData.ageYear,
            'ageMonth':jsonData.ageMonth,
            'ageDay':jsonData.ageDay,
            'sex':parseInt(jsonData.sex,10),
            'phoneNum':jsonData.phoneNum,
            'admissionNum':jsonData.admissionNum,
            'affiliation':jsonData.affiliation,
            'affiliationTeamName':jsonData.affiliationTeamName
        }
    },
    saveEditType(state,type){
        //console.log(type)
      state.editType= type;
    },
    setTopNavTitle(state,titleName){
        //console.log(titleName);
        state.titleName = titleName;
    },
    saveTemplateId(state,num){
        state.templateId = num;
    },
    changeIndex(state,options){
        if(isNaN(options.index)){
            if(options.pre){
                console.log(state.a = 1);
                console.log(this.a);
                (parseInt(state.pageIndex,10)===state.tabList.length-1)?(state.pageIndex=state.tabList.length-1):(state.pageIndex++);
            }else{
                (parseInt(state.pageIndex,10)===-1)?(state.pageIndex=-1):(state.pageIndex--);
            }
        }else{
            state.pageIndex = options.index;
        }

    },
    getTabList(state){
        state.tabList =
            [{
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
        console.log(state.tagList)
    }
};
export default mutaions;

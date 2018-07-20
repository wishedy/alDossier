import comm from "~utils/comm.js";
const xUrl={
    getBelongList:'/emrpc/call/caseFolder/team_member/getCaseBelongMapList/',
    getTeamList:'/emrpc/getTeamList/',//获取团队列表信息
    caseList:'/emrpc/index/caseList/',//病历列表

};
const mutaions = {
    caseListInit(state){//病历列表初始化
        comm.ajax2({
            url:xUrl.caseList,
            type:"post",
            dataType:"json",
            data:{
                "customerId": "10",
                "searchKey":"你好",
                "screeningId":state.sIdList,
                "orderType":state.orderType
            },
            success:function(res) {
                if(comm.hasResponseData(res)){
                    let items=res.responseObject.responseData.data_list;
                    for (let i=0;i<items.length;i++){
                        items[i].edit=false;
                    }
                    mutaions.itemsArrChange(state,items);
                    mutaions.itemsLenChange(state,res.responseObject.responseData.total_count);
                }
            }
        });
    },
    tagArrChange(state,data){//筛选条件的列表
        state.tagArr=data;
    },
    itemsArrChange(state,data){//病历列表
        state.itemsArr=data;
    },
    orderTypeChange(state,data){//排序类型的变换
        state.orderType=data;
    },
    scrShowArrChange(state,data){//筛选选中的数组
        if(data.flag){//增加选中的数组
            state.scrShowArr.push(data.val);
        }else{//删除选中的数组
            let _index;
            for (let i=0;i<state.scrShowArr.length;i++){
                let index=state.scrShowArr[i];
                if(parseInt(index.id)===parseInt(data.val.id)){
                    _index=i;
                }
            }
            state.scrShowArr.splice(_index,1);
        }
    },
    sIdListChange(state,data){//筛选的id拼接 （list="1,22,33,44,"）
        if(data.flag){//增加筛选
            state.sIdList=state.sIdList+data.val+',';
        }else{//删除筛选
            let arr=state.sIdList.split(',');
            if(!arr[arr.length-1]){
                arr.splice(arr.length-1,1);
            }
            for (let i=0;i<arr.length;i++){
                if(parseInt(arr[i])===parseInt(data.val)){
                    arr.splice(i,1);
                }
            }
            if(arr.length>0){
                state.sIdList=arr.join(',')+',';
            }else{
                state.sIdList='';
            }

        }
    },
    scrShowFlagChange(state,data){//筛选选中条件的开关
        state.scrShowFlag=data;
    },
    itemsLenChange(state,data){//筛选出列表的长度
        state.itemsLen=data;
    },
    belongListChange(state,data){//归属选中的筛选列表
        if(data.flag){//选中的归属列表
            state.belongList=state.belongList+data.caseId+','
        }else{//取消选中的归属
            if(data.caseId){//正常的删减选中
                let arr=state.belongList.split(',');
                if(!arr[arr.length-1]){
                    arr.splice(arr.length-1,1);
                }
                for (let i=0;i<arr.length;i++){
                    if(parseInt(arr[i])===parseInt(data.caseId)){
                        arr.splice(i,1);
                    }
                }
                if(arr.length>0){
                    state.belongList=arr.join(',')+',';
                }else{
                    state.belongList='';
                }
            }else{//取消按钮或者全部取消的情况
                state.belongList='';
            }
        }
    },
    belongBtnChange(state,data){//归属按钮编辑状态显示隐藏
        state.belongBtn=data;
    },
    chooseTipsChange(state,data){//请选择一行病例的提示文字显示
        state.chooseTips=data;
    },
    allBtnFlagChange(state,data){//全选按钮选中标志
        state.allBtnFlag=data;
    },
    teamListAjax(state){//选择归属的团队列表
        comm.ajax2({
            url:xUrl.getTeamList,
            type:"get",
            dataType:"json",
            data:{
                customerId:12345,
            },
            success:function(res) {
                if(comm.hasResponseData2(res)){
                    let items=res.responseData.data_list;
                    mutaions.teamNameListChange(state,items);
                    if(items.length>0){
                        mutaions.sTeamFlagChange(state,true);
                    }
                }
            }
        });
    },
    belongAjax(state){//确定归属操作ajax请求
        comm.ajax2({
            url:xUrl.getBelongList,
            type:"post",
            dataType:"json",
            data:{paramJson:JSON.stringify({
                    "caseIdList":state.belongList,
                    "teamId":state.teamId,
                    "customerId":12
            })},
            success:function(res) {
                if(res.responseStatus) {//可以归属的情况，团队转移成功
                    if (parseInt(res.responseCode) === 1103) {
                        mutaions.caseListInit(state);
                        mutaions.teamSucInfoChange(state, res.responseData.data_list);
                        mutaions.sTeamFlagChange(state, false);//关闭筛选层
                        mutaions.teamSuccessChange(state, true);//显示成功层5秒消失
                        setTimeout(function() {
                            mutaions.teamSuccessChange(state, false);
                        }, 5000);
                        mutaions.belongBtnChange(state,false);
                    }
                    if (parseInt(res.responseCode) === 1101) {//无法归属，包含其他团队病例，返回无法归属病例数、无法归属的病例集合
                        mutaions.alBelongListChange(state,res.responseData.data_list);//已经有归属的病例列表
                    }
                    if (parseInt(res.responseCode) === 1102) {//无法归属，当前用户 不是 所选择要归属的团队的所有者【这种情况理论上不存在】

                    }
                }
            }
        });
    },
    teamNameListChange(state,data){//获取到的团队名称列表
        state.teamNameList=data;
    },
    teamIdChange(state,data){//选中的团队id
        state.teamId=data;
    },
    sTeamFlagChange(state,data){//选择团队列表的弹层显示开关
        state.sTeamFlag=data;
    },
    teamSuccessChange(state,data){//团队转移成功提示显示开关
        state.teamSuccess=data;
    },
    teamSucInfoChange(state,data){//团队转移成功提示信息返回
        state.teamSucInfo=data;
    },
    alBelongFailChange(state,data){//团队转移失败标志
        state.alBelongFail=data;
    },
    alBelongListChange(state,data){//团队转移失败的病例列表id
        state.alBelongList=data;
    },
    failBelongInfoChange(state,data){//团队转移失败的病例列表信息
        if(data.flag){//增加选中的数组
            state.failBelongInfo.push(data.val);
        }else{//删除选中的数组
            if(data.val){
                let _index;
                for (let i=0;i<state.failBelongInfo.length;i++){
                    let index=state.failBelongInfo[i];
                    if(parseInt(index.id)===parseInt(data.val.id)){
                        _index=i;
                    }
                }
                state.failBelongInfo.splice(_index,1);
            }else{
                state.failBelongInfo=[];
            }
        }
    },


};
export default mutaions;

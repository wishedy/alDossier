const getters = {
    tagArr(state){
        return state.tagArr;
    },
    itemsArr(state){
        return state.itemsArr;
    },
    orderType(state){
        return state.orderType;
    },
    scrShowArr(state){
        return state.scrShowArr;
    },
    sIdList(state){
        return state.sIdList;
    },
    scrShowFlag(state){
        return state.scrShowFlag;
    },
    itemsLen(state){
        return state.itemsLen;
    },
    belongList(state){
      return state.belongList;
    },
    belongBtn(state){
        return state.belongBtn;
    },
    chooseTips(state){
        return state.chooseTips;
    },
    allBtnFlag(state){
        return state.allBtnFlag;
    },
    teamNameList(state){
        return state.teamNameList;
    },
    teamId(state){
        return state.teamId;
    },
    sTeamFlag(state){
        return state.sTeamFlag;
    },
    teamSuccess(state){
        return state.teamSuccess;
    },
    teamSucInfo(state){
        return state.teamSucInfo;
    },
    alBelongList(state){
        return state.alBelongList;
    },
    alBelongFail(state){
        return state.alBelongFail;
    },
    failBelongInfo(state){
        return state.failBelongInfo;
    },
};
export default getters;

const getters = {
    num(state){
        return state.num;
    },
    baseInfo(state){
        return state.baseInfo;
    },
    titleName(state){
        return state.titleName;
    },
    editType(state){
        return state.editType;
    },
    navHeight(state){
        return state.navHeight;
    },
    CaseId(state){
        return state.CaseId;
    },
    templateId(state){
      return state.templateId;
    },
    tabList(state){
        return state.tabList;
    },
    teamId(state){
      return state.teamId;
    },
    teamList(state){
      return state.teamList;
    },
    pageIndex(state){
        return state.pageIndex;
    },
    pageInfo(state){
        return state.pageInfo;
    },
    subPageData(state){
        return state.subPageData;
    },
    subIndex(state){
        return state.subIndex;
    },
    changePageOnOff(state){
        return state.changePageOnOff;
    },
    clickNum(state){
        return state.clickNum;
    }
}
export default getters;

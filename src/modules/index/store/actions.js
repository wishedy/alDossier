const actions = {
    caseListInit:({commit, state}, str)=>{
        commit("caseListInit",str);
    },
    tagArrChange:({commit, state}, str)=>{
        commit("tagArrChange",str);
    },
    itemsArrChange:({commit, state}, str)=>{
        commit("itemsArrChange",str);
    },
    orderTypeChange:({commit, state}, str)=>{
        commit("orderTypeChange",str);
    },
    scrShowArrChange:({commit, state}, str)=>{
        commit("scrShowArrChange",str);
    },
    sIdListChange:({commit, state}, str)=>{
        commit("sIdListChange",str);
    },
    scrShowFlagChange:({commit, state}, str)=>{
        commit("scrShowFlagChange",str);
    },
    itemsLenChange:({commit, state}, str)=>{
        commit("itemsLenChange",str);
    },
    belongListChange:({commit,state},str)=>{
        commit("belongListChange",str);
    },
    belongBtnChange:({commit,state},data)=>{
        commit('belongBtnChange',data);
    },
    chooseTipsChange:({commit, state}, str)=>{
        commit("chooseTipsChange",str);
    },
    allBtnFlagChange:({commit, state}, str)=>{
        commit("allBtnFlagChange",str);
    },
    belongAjax:({commit, state}, str)=>{
        commit("belongAjax",str);
    },
    teamListAjax:({commit,state},str)=>{
        commit("teamListAjax",str);
    },
    teamNameListChange:({commit,state},str)=>{
        commit("teamNameListChange",str);
    },
    teamIdChange:({commit,state},str)=>{
        commit("teamIdChange",str);
    },
    sTeamFlagChange:({commit,state},str)=>{
        commit("sTeamFlagChange",str);
    },
    teamSuccessChange:({commit,state},str)=>{
        commit("teamSuccessChange",str);
    },
    teamSucInfoChange:({commit,state},str)=>{
        commit("teamSucInfoChange",str);
    },
    alBelongListChange:({commit,state},str)=>{
        commit("alBelongListChange",str);
    },
    alBelongFailChange:({commit,state},str)=>{
        commit("alBelongFailChange",str);
    },
    failBelongInfoChange:({commit,state},str)=>{
        commit("failBelongInfoChange",str);
    },
};
export default actions;

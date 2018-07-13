const actions = {
    sendNum:({commit,state},num)=>{
        commit('sendNum',num);
    },
    getBaseCaseInfo:({commit,state},type)=>{
       commit("getBaseCaseInfo");
    },
    setTopNavTitle:({commit,state},titleName)=>{
        commit("setTopNavTitle",titleName);
    },
    saveEditType:({commit,state},type)=>{
        commit('saveEditType',type);
    },
    saveNavTopHeight:({commit,state},num)=>{
        commit('saveNavTopHeight',num);
    },
    saveTemplateId:({commit,state},num)=>{
        commit('saveTemplateId',num);
    },
    getTabList:({commit,state})=>{
        commit('getTabList');
    },
    changeIndex:({commit,state},options)=>{
        commit('changeIndex',options);
    }
}
export default actions;

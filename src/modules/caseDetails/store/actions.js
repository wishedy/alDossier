const actions = {
    showLoadi:({commit,state},flag)=>{
        console.log(flag);
        commit('showLoadi',flag);
        // sendNum(commit,state,num);
    }
}
export default actions;

const actions = {
    sendNum:({commit,state},num)=>{
        console.log(num);
        commit('sendNum',num);
        // sendNum(commit,state,num);
    }
}
export default actions;

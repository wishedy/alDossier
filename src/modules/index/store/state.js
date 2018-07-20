
const state = {
    tagArr:[],//筛选条件的列表
    itemsArr:[],//病历列表
    itemsLen:0,//筛选结果数目，默认0，没有筛选状态
    orderType:'5',//各项列表排序规则，默认更新时间由近及远
    sIdList:'',//筛选id列表，默认没有筛选
    scrShowArr:[],//筛选条件的展示
    scrShowFlag:false,//筛选条件展示与否（20180718暂定可与arr合并）
    belongList:'',//归属选中的筛选列表
    belongBtn:false,//归属按钮的状态
    chooseTips:false,//选择一个病例的归属病例提示
    allBtnFlag:false,//全选按钮选中标志
    teamNameList:[],//团队列表数组
    teamId:'',//选择好的团队id
    sTeamFlag:false,//选择团队列表的弹层显示开关
    teamSuccess:false,//团队转移成功
    teamSucInfo:[],//归属成功后提示信息
    failBelongInfo:[],
    alBelongFail:false,//团队转移失败标志
    alBelongList:[],//团队转移失败的病例列表
};

export default  state;

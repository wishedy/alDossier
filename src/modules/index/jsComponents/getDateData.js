class dateData {
    //时间选择器的数据基于这个类产生
    constructor(){
        this.yearTimeBox=[];
        this.monthTimeBox=[];
        this.dayTimeBox=[];
        this.getYearDate();
    }
    getYearDate(){
        let t = this;
        const dateTime = new Date();
        for(let num = 1930;num<dateTime.getFullYear()+1;num++){
            t.yearTimeBox.push(num);
        }
        t.getMonthDate();

    }
    getMonthDate(){
        let t = this;
        t.monthTimeBox.push('不限');
        for(let num = 1;num<12+1;num++){
            t.monthTimeBox.push(num);
        }
        const dateTime = new Date();
        t.getDayDate(dateTime.getFullYear(),dateTime.getMonth()+1);
    }
    getDayDate(y,m){
        let t = this;
        const year=y; //表示需要查找的年份
        const month=m;//表示需要查找的月份
        this.dayTimeBox=[];
        t.dayTimeBox.push('不限');
        if(month!="不限"){
            const curMonthDays=new Date(year,month,0).getDate(); //0表示3月的第0天，上月的最后一天,月份从0开始记数
            for(let num = 1;num<curMonthDays+1;num++){
                t.dayTimeBox.push(num);
            }
        }
        //console.log(t.yearTimeBox,t.monthTimeBox,t.dayTimeBox);
        return t.dayTimeBox;

    }
}
export default  dateData;

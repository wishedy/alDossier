<template>
    <div class="formNumber formCommon">
        <p class="articleText">{{data.commDataField.fieldName}}</p>
        <div class="selectCont" v-if="data.caseFolderTemplateScope&&data.caseFolderTemplateScope.length>0"><span>请选择</span>
            <ul class="selectOption" v-show="false">
                <!--<li v-for="(item,index) in admissionNumList" :key='index' v-text="item.admissionNum"></li>-->
            </ul>
        </div>
        <input class="inputCont" type="text" :placeholder="data.commDataThreshold&&data.commDataThreshold['1'].thresholdUnit?'':'请输入'" readonly="readonly" :class="{'inputNumber':data.commDataThreshold&&data.commDataThreshold['1'].thresholdUnit}"/>
        <span v-if="data.commDataThreshold&&data.commDataThreshold['1'].thresholdUnit" class="thresholdUnit">{{data.commDataThreshold&&data.commDataThreshold['1'].thresholdUnit}}</span>
    </div>
</template>

<script>
    export default {
        name: "form-number",
        props:['data'],
        data(){
            return{

            }
        }
    }
</script>

<style scoped lang="scss">
    .thickCase{
         .inputCont.inputNumber{
             width: 112px;
         }
        .thresholdUnit{
            display: inline-block;
            font-size: 18px;
            color: #333333;
            margin-left: 20px;
            vertical-align: middle;
        }
    }


</style>

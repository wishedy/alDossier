<template>
    <div class="formRadio formCommon">
        <p class="articleText"><i v-if="data.isRequire">*</i>{{data.commDataField.fieldName}}</p>
        <div class="radiocontainer" :class="{'radioListcon':data.caseFolderTemplateScope&&data.caseFolderTemplateScope.length>2}">
            <div class='radioIconNormal' v-for="(item,index) in data.caseFolderTemplateScope" :class="{'radioList':data.caseFolderTemplateScope&&data.caseFolderTemplateScope.length>2}">
                <i></i>
                <span>{{item.dictionaryName}}</span>
                <input placeholder="请输入"  type="text" class="otherTag" readonly="readonly" v-if="item.dictionaryName=='其他'&&data.caseFolderTemplateScope&&data.caseFolderTemplateScope.length>2"/>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "form-radio",
        props:['data'],
        data(){
            return{

            }
        }
    }
</script>

<style scoped lang="scss">
    .thickCase{
        .radiocontainer{
            display: inline-block;
            vertical-align: middle;
            &.radioListcon{
                vertical-align: top;
            }
        }
        .radioList{
            display: block;
            margin-bottom: 34px;
            &:last-child{
                margin-bottom: 0;
            }
        }
        .otherTag{
            width: 275px;
            height: 62px;
            border: 1px solid #C8C8C8;
            border-radius: 4px;
            font-size: 18px;
            color: #000000;
            padding: 0 20px;
            display: inline-block;
            vertical-align: top;
            /*background: rgba(216,216,216,0.10);*/
        }
    }


</style>

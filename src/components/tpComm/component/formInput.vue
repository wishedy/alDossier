<template>
   <section>
       <div class="formInput formCommon" v-if="data.commDataThreshold&&data.commDataThreshold['1'].thresholdValue<=50">
           <p class="articleText"><i v-if="data.isRequire">*</i>{{data.commDataField.fieldName}}</p>
           <div class="inputCont" :class="{'shortInput':data.commDataThreshold['1'].thresholdValue<=20}">
               <input type="text" :placeholder="'请输入'+data.commDataField.fieldName" readonly="readonly"/>
               <i v-text="data.commDataThreshold[1].thresholdValue" v-if="data.commDataThreshold[1].thresholdValue<=20"></i>
           </div>
       </div>
       <now-medical v-else :data="data"></now-medical>
   </section>
</template>

<script>
    import nowMedical from './nowMedical';//5-文本域
    export default {
        name: "form-input",
        props:['data'],
        components:{
            nowMedical
        }
    }
</script>

<style scoped lang="scss">
    .newCases .formInput .inputCont.shortInput{
        width: 317px;
    }


</style>

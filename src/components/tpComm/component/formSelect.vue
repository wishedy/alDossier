<template>
   <section>
       <div class="formSelect formCommon" v-if="data.caseFolderTemplateScope.length>6">
           <p class="articleText">{{data.commDataField.fieldName}}</p>
           <div class="selectCont">
               <span v-text="'请选择'"></span>
           </div>
       </div>
       <div v-else>
           <form-radio v-if="data.commDataField.fieldType==1||data.commDataField.fieldType==2" :data="data"></form-radio>
           <form-check v-else :data="data"></form-check>
       </div>

   </section>
</template>

<script>
    import formRadio from './formRadio';//单选
    import formCheck from './formCheck';//多选
    export default {
        name: "form-select",
        props:['data'],
        data(){
          return{

          }
        },
        components:{
            formRadio,
            formCheck
        }
    }
</script>

<style scoped>

</style>

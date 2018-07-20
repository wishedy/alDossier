<template>
    <div class="formInputAge formCommon">
        <p class="articleText"><i>*</i>{{data.commDataField.fieldName}}</p>
        <input class="inputText"  type="text" readonly="readonly"/>
        <span>岁</span>
        <input class="inputText" type="text"  readonly="readonly"/>
        <span>月</span>
        <input class="inputText" type="text"  readonly="readonly"/>
        <span>天</span>
    </div>
</template>

<script>
    export default {
        props:['data'],
        name: "form-input-age"
    }
</script>

<style scoped>

</style>

<template>
    <div class="formInput formCommon">
        <p class="articleText"><i v-if="data.isRequire">*</i>{{data.menuName}}</p>
        <div class="inputCont">
            <input type="text" :placeholder="'请输入'+data.menuName" readonly="readonly"/>
            <i v-text="20"></i>
        </div>
    </div>
</template>

<script>
    export default {
        name: "form-input",
        props:['data']
    }
</script>

<style scoped lang="scss">


</style>

<template>
    <div class="formRadio formCommon">
        <p class="articleText"><i v-if="data.isRequire">*</i>{{data.menuName}}</p>
        <div class='radioIconNormal' v-for="(item,index) in data.sonList"><i></i><span>{{item.menuName}}</span></div>
    </div>
</template>

<script>
    export default {
        name: "form-radio",
        props:['data']
    }
</script>

<style scoped>

</style>

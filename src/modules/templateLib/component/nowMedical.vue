<template>
    <aside class="nowMedical caseWidth814">
        <h2>{{data.menuName}}</h2>
        <aside class="caseHistoryMsg">
            <article>{{data.limitTerm}}</article>
            <div class="textarea"><textarea readonly="readonly"></textarea><i>200</i></div>
        </aside>

    </aside>
</template>

<script>
    export default {
        name: "now-medical",
        props:['data']
    }
</script>

<style scoped>

</style>

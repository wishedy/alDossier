<template>
    <!--<tp-comm :typeName="'newCase'" :crumbsText="'新建病例'"></tp-comm>-->
    <tp-comm typeNameCase="newCase" crumbsText="新建病例" @tpUse="useBtn"></tp-comm>
</template>

<script>
    import tpComm from '~components/tpComm/tpComm';
    import {mapActions} from 'vuex';
    export default {
        components: {tpComm},
        methods:{
            ...mapActions(['saveTemplateId']),
            useBtn(data){
                console.log(data);
                let t  = this;
                t.saveTemplateId(data);

            }
        }
        // name: "upload"
    }
</script>

<style >
/*.caseTopNav{*/
    /*display: none;*/
/*}*/
</style>

<template>
<div>
    <router-view></router-view>
    <u-confirm ref="confirm"></u-confirm>
</div>
</template>

<script>
import Vue from 'vue';
export default {
    mounted() {
        Vue.$confirm = Vue.prototype.$confirm = this.$refs.confirm.open.bind(this.$refs.confirm);
    },
};
</script>

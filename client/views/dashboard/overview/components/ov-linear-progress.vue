<template>
<u-panel title="Goal Completion">
    <u-linear-layout direction="vertical">
        <u-text-progress v-for="item in data" :key="item.title" :name="item.title" :max="100" :value="item.percent" unit="%" size="huge"></u-text-progress>
    </u-linear-layout>
</u-panel>
</template>

<script>
import UTextProgress from './u-text-progress.vue';
import overviewService from 'services/overview';
export default {
    name: 'ov-linear-progress',
    components: { UTextProgress },
    data() {
        return {
            data: [],
        };
    },
    created() {
        this.getStatic();
    },
    methods: {
        getStatic() {
            return overviewService.getStatic().then(({ data }) => this.data = data);
        },
    },
};
</script>

<style module>
.info {
    margin-top: 10px;
}

.info::after {
    content: '';
    display: block;
    clear: both;
}

.info .title {
    float: left;
}

.info .percent {
    float: right;
    color: $green-sea;
    font-weight: 600;
}
</style>

<template>
<u-panel :title="title">
    <u-pie-chart height="360px" legend :data="data"></u-pie-chart>
</u-panel>
</template>

<script>
import overviewService from 'services/overview';
export default {
    name: 'ov-pie-chart',
    data() {
        return {
            title: '访问来源占比',
            data: [],
        };
    },
    created() {
        this.getSource();
    },
    methods: {
        getSource() {
            return overviewService.getSource().then(({ data }) => this.data = data);
        },
    },
};
</script>

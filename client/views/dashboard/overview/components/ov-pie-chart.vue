<template>
<u-panel :title="title">
    <div style="margin: -20px;">
        <u-pie-chart height="360px" legend :data="data"></u-pie-chart>
    </div>
</u-panel>
</template>

<script>
import overviewService from '../service';
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

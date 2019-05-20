<template>
<u-panel :title="title">
    <div style="margin: -20px;">
        <u-line-chart height="360px" fill smooth legend="always" :x-axis="xaxis" :y-axis="yaxis" :series="series" :data="data">
            <!-- <div slot="titleTemplate">{{ title }}</div> -->
            <span slot="legendTemplate" slot-scope="scope">
                <template>{{ scope.sery.name || scope.sery.key }}</template>
            </span>
        </u-line-chart>
    </div>
</u-panel>
</template>

<script>
import overviewService from '../service';
export default {
    name: 'ov-line-chart',
    data() {
        return {
            title: '每星期访问量',
            xaxis: { key: 'week' },
            yaxis: { min: 0, name: '个' },
            series: [{ key: 'number' }, { key: 'num' }],
            data: [],
            smooth: true,
        };
    },
    created() {
        this.getVisit();
    },
    methods: {
        getVisit() {
            return overviewService.getVisit().then(({ data }) => this.data = data);
        },
    },
};
</script>

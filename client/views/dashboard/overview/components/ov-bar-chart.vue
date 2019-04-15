<template>
<u-panel :title="title">
    <u-bar-chart height="360px" legend :stack="stack" :x-axis="xaxis" :y-axis="yaxis" :series="series" :data="data">
        <div slot-scope="scope" slot="tooltip">
            <div v-for="sery in series" :key="sery.key">{{ sery.name || sery.key }} : {{ scope.row[sery.key] }}</div>
        </div>
    </u-bar-chart>
</u-panel>
</template>

<script>
import overviewService from '../service';
export default {
    name: 'ov-bar-chart',
    data() {
        return {
            title: '收入',
            xaxis: { key: 'year' },
            yaxis: { min: 0 },
            series: [{ key: 'nsf' }, { key: 'ncs' }],
            stack: true,
            data: [],
        };
    },
    created() {
        this.getIncome();
    },
    methods: {
        getIncome() {
            return overviewService.getIncome().then(({ data }) => this.data = data);
        },
    },
};
</script>

<style>

</style>

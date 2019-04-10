<template>
<div :class="$style.root">
    <div :class="$style.wrap">
        <div :class="$style.layout">
            <u-loading v-if="loading" size="large" display="full" style="background: transparent"></u-loading>
            <u-grid-layout v-else>
                <u-grid-layout-row :repeat="3">
                    <u-grid-layout-column>
                        <ov-pie-chart></ov-pie-chart>
                    </u-grid-layout-column>
                    <u-grid-layout-column>
                        <ov-bar-chart></ov-bar-chart>
                    </u-grid-layout-column>
                    <u-grid-layout-column>
                        <ov-line-chart></ov-line-chart>
                    </u-grid-layout-column>
                </u-grid-layout-row>
                <u-grid-layout-row :repeat="3">
                    <u-grid-layout-column :span="2">
                        <ov-table-view></ov-table-view>
                    </u-grid-layout-column>
                    <u-grid-layout-column :span="1">
                        <ov-linear-progress></ov-linear-progress>
                    </u-grid-layout-column>
                </u-grid-layout-row>
            </u-grid-layout>
        </div>
    </div>
</div>
</template>

<script>
import OvPieChart from './components/ov-pie-chart.vue';
import OvBarChart from './components/ov-bar-chart.vue';
import OvLineChart from './components/ov-line-chart.vue';
import OvTableView from './components/ov-table-view.vue';
import OvLinearProgress from './components/ov-linear-progress.vue';

export default {
    name: 'overview',
    components: { OvPieChart, OvBarChart, OvLineChart, OvTableView, OvLinearProgress },
    data() {
        return {
            loading: false,
        };
    },
};
</script>

<style module>
.root {}

.wrap {
    position: relative;
    height: calc(100vh - $navbar-height);
    margin: 0 auto;
}

.layout {
    min-width: 1180px;
    max-width: 1920px;
}
</style>

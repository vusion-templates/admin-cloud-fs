<template>
<u-linear-layout direction="vertical">
    <u-monitor-optionbar :optionbar-modules="['time', 'statistics']"
                         @change="change($event)" size="normal small">
        <div slot="pre" :class="$style.item">
            {{ $t('nlb.label.object') }}
            <u-select size="normal small" @change="updateType($event)">
                <u-select-item v-for="(item, key) in typeOptions" :key="key" :value="item.value">
                    <template v-if="!item.name">
                        {{ item.text }}
                    </template>
                    <template v-else>
                        <span :class="['f-toe f-toe-lb', $style.wrapText]">{{ item.name }}</span>:{{ item.listenPort }}
                    </template>
                </u-select-item>
            </u-select>
        </div>
    </u-monitor-optionbar>
    <u-grid-layout>
        <u-grid-layout-row>
            <u-grid-layout-column span="6" v-for="(metric, index) in metricsList" :key="metric.title">
                <u-monitor-chart-panel :ref="'chartPanel' + index"
                                       :options="options"
                                       :key="metric.title"
                                       :metrics="metric.metrics"
                                       :title="metric.title"
                                       :unit="metric.unit"
                                       :preprocessor="metric.preprocessor"
                                       :dimensions="metric.dimensions">
                </u-monitor-chart-panel>
            </u-grid-layout-column>
        </u-grid-layout-row>
    </u-grid-layout>
</u-linear-layout>
</template>

<script>
import overviewService from 'services/overview';
export default {
    data() {
        return {
            typeOptions: [
                { text: '实例', value: 'name1' },
            ],
            metricsList: [
                {
                    title: '每星期访问量',
                    unit: '次',
                    metrics: [{
                        namespace: 'NLB',
                        key: 'num',
                        name: `num`,
                    }],
                    dimensions: '',
                    preprocessor: () => overviewService.getVisit().then((data) => data.data),
                },
            ],
            options: {
                type: undefined,
            },
        };
    },
    methods: {
        updateType($event) {
            this.options.type = $event.value;
            this.refresh();
        },
        change(value) {
            console.log(value);
            Object.assign(this.options, value);
            this.refresh();
        },
        refresh() {
            // if (this.instance.loadDone) {
            const map = ['endTime', 'interval', 'startTime', 'statistics', 'type'];
            if (map.every((item) => this.options[item])) {
                this.$nextTick(() => {
                    this.metricsList.forEach((item, index) => {
                        if (this.$refs['chartPanel' + index] && this.$refs['chartPanel' + index].length) {
                            this.$refs['chartPanel' + index][0].refresh();
                        }
                    });
                });
            }
            // }
        },
    },
};
</script>

<style module>
.item {
    display: inline;
    margin-right: 20px;
}
</style>

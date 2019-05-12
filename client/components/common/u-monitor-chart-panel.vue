<template>
<div>
    <u-monitor-chart ref="monitorChart" border smooth fill :height="height" :type="type" :data-type="dataType" :chart-sum="chartSum"
                     :title="title" :title-align="titleAlign" :content-style="contentStyle" :title-template="titleTemplate" :caption="caption" :caption-template="captionTemplate"
                     :unit="unit" :options="options" :metrics="metrics" :series="series" :preprocessor="preprocessor" :processor="processor"
                     :dimensions="dimensions" :filters="filters" :format="format" :settings="settings" @sumtotal="getSumtotal($event)"
                     :show-chart-switch="showChartSwitch" :legend="legend" @loaded="onLoaded($event)">
        <div v-for="(item, index) in data" :key="index" :slot="'tooltipTemplate' + index">
            {{ item.datetime }}
            <div v-if="item.total !== undefined">{{ $t('global.total.withColon.label') }}{{ item.total }}</div>
            <div v-for="(sery, index) in series" :key="index">
                {{ sery.name || sery.key }}: {{ item[sery.key] }} {{ unit }}
            </div>
        </div>
        <template slot="titleTemplate">
            <slot name="titleTemplate" v-bind="sumtotal" :data="templateData"></slot>
        </template>
        <template slot="captionTemplate">
            <slot name="captionTemplate" v-bind="sumtotal" :data="templateData"></slot>
        </template>
        <div :class="$style.btn">
            <i :class="$style.refreshIcon" @click="refresh"></i>
            <i :class="$style.zoomIcon" v-if="!noModel" @click="showModal"></i>
        </div>
    </u-monitor-chart>
    <!-- <u-modal ref="modalcomponent" :title="metricTitle" :visible="visible" :ok-button="okButton" :cancel-button="cancelButton" :width="modalWidth" @close="close"> -->
    <u-modal v-if="!noModel" ref="modalcomponent" :title="title" ok-button="" cancel-button="" :visible.sync="isModalShow" width="1020" @close="closeModal">
        <div v-if="'monitor' === type || 'window' === type || 'old-monitor' === type">
            <u-monitor-optionbar :is-n-o-s-custom-period="isNOSCustomPeriod" :is-c-d-n-custom-period="isCDNCustomPeriod"
                                 :is-statistic-hide="isStatisticHide" :time-range="timeRange"
                                 :statistics-options="statisticsOptions" :init-time-range-selected-index="initTimeRangeSelectedIndex"
                                 :type-options="typeOptions" :statistics="statistics" @change="change($event.menuValue)"></u-monitor-optionbar>
        </div>
        <div v-else>
            <div class="m-optionbar">
                <u-capsules :value="modal.options ? modal.options.period:'30'" @select="change({period: $event.value})">
                    <u-capsule value="30">{{ $t('global.nearly.minute',[30]) }}</u-capsule>
                    <u-capsule value="60">{{ $t('global.nearly.hours',[1]) }}</u-capsule>
                    <u-capsule value="120">{{ $t('global.nearly.hours',[2]) }}</u-capsule>
                    <u-capsule value="360">{{ $t('global.nearly.hours',[6]) }}</u-capsule>
                    <u-capsule value="1440">{{ $t('global.nearly.days',[1]) }}</u-capsule>
                    <u-capsule value="10080">{{ $t('global.nearly.days',[7]) }}</u-capsule>
                </u-capsules>
            </div>
        </div>
        <u-monitor-chart ref="monitorModalChart" smooth fill height="445px" :type="type" :data-type="dataType" :chart-sum="chartSum"
                         :caption="modal.caption" :content-style="contentStyle" :caption-template="modal.captionTemplate" @sumtotal="getSumtotal($event)" @loaded="onLoaded($event)"
                         :unit="modal.unit" :tooltip-template="modal.tooltipTemplate" :options="modal.options" :metrics="modal.metrics" :series="modal.series"
                         :dimensions="modal.dimensions" :filters="modal.filters" :preprocessor="modal.preprocessor" :processor="modal.processor"
                         :format="modal.format" :settings="modal.settings" :show-chart-switch="modal.showChartSwitch" :legend="modal.legend">
            <div v-for="(item, index) in data" :key="index" :slot="'tooltipTemplate' + index">
                {{ item.datetime }}
                <div v-if="item.total !== undefined">{{ $t('global.total.withColon.label') }}{{ item.total }}</div>
                <div v-for="(sery, index) in series" :key="index">
                    {{ sery.name || sery.key }}: {{ item[sery.key] }} {{ unit }}
                </div>
            </div>
            <template slot="titleTemplate">
                <slot name="titleTemplate" v-bind="sumtotal" :modal="true" :data="modalTemplateData"></slot>
            </template>
            <template slot="captionTemplate">
                <slot name="captionTemplate" v-bind="sumtotal" :modal="true" :data="modalTemplateData"></slot>
            </template>
        </u-monitor-chart>
    </u-modal>
</div>
</template>

<script>
import MonitorChart from './u-monitor-chart.vue';
import { mapComponents } from 'vusion-utils';
import MonitorOptionbar from './u-monitor-optionbar.vue';

export default {
    name: 'u-monitor-chart-panel',
    components: mapComponents([MonitorChart, MonitorOptionbar]),
    props: {
        legend: { type: Boolean, default: true },
        dimensions: String,
        filters: Object,
        preprocessor: Function,
        processor: Function,
        format: Object,
        settings: Object,
        showChartSwitch: Boolean,
        isStatisticHide: { type: Boolean, default: false }, /* 统计指标选项是否隐藏 */
        isNOSCustomPeriod: { type: Boolean, default: false }, /* 特定NOS */
        isCDNCustomPeriod: { type: Boolean, default: false }, /* 特定CDN */
        initTimeRangeSelectedIndex: { type: Number, default: 0 }, /* 默认时间选择选中项索引 */
        timeRange: Array,
        options: Object,
        unit: { type: String, default: '' },
        titleAlign: { type: String, default: 'left' },
        title: { type: String, default: '' },
        titleTemplate: { type: String, default: '' },
        caption: { type: String, default: '' },
        captionTemplate: { type: String, default: '' },
        width: { type: String, default: '100%' },
        height: { type: String, default: '388px' },
        border: { type: Boolean, default: false },
        contentStyle: Object,
        // xAxisCount:
        xAxis: { type: Object, default() {
            return {
                key: 'timestr',
            };
        } },
        yAxis: { type: Object, default() {
            return {
                min: 0,
                name: '',
                count: 6,
            };
        } },
        tooltipTemplate: { type: Boolean, default: false },
        metrics: { type: Array, default: () => [] },
        dataType: { type: String, default: '' },
        chartSum: { type: Boolean, default: false },
        type: { type: String, default: 'monitor' },
        noModel: Boolean,
        templateData: Object,
        modalTemplateData: Object,
    },
    data() {
        return {
            // chart的信息
            data: [],
            loading: false,
            isModalShow: false,
            btnsVisible: true,
            modal: {},
            series: [],
            sumtotal: {
                num: '',
                unit: '',
            },
        };
    },
    created() {
        // this.$on('finish', (value) => {
        //     console.log('xxx');
        //     this.unit = value.unit;
        //     this.data = value.data;
        // });
    },
    methods: {
        getSumtotal(event) {
            Object.assign(this.sumtotal, event);
        },
        // 这里因为data传递给父组件之后，会全局更新一遍u-monitor-chart的变量，所以如果unit有processor的改动，又会被初始覆盖
        // 所以需要传递unit的变动
        onLoaded(event) {
            Object.assign(this, event);
        },
        refresh() {
            // 刷新时，更新时间;
            // 20170519，选择自定义时间段，不需要刷新。
            const options = this.options;
            if (!options.isCustomTime) {
                const crtTime = Date.now();
                options.startTime = crtTime + (options.startTime - options.endTime);
                options.endTime = crtTime;
            }
            this.loading = true;
            this.series = this.metrics.map((metric) => ({ key: metric.key, name: metric.name }));
            this.$refs.monitorChart.$emit('refresh');
        },
        showModal() {
            Object.assign(this.modal, {
                caption: this.caption,
                unit: this.unit,
                options: this.options,
                metrics: this.metrics,
                series: this.series,
                dimensions: this.dimensions,
                filters: this.filters,
                settings: this.settings,
                showChartSwitch: this.showChartSwitch,
                legend: this.legend,
                preprocessor: this.preprocessor,
                processor: this.processor ? (result) => this.processor(result, this.modal) : undefined,
            });
            this.isModalShow = true;
            this.$nextTick(() => this.$refs.monitorModalChart && this.$refs.monitorModalChart.$emit('refresh'));
        },
        closeModal() {
            this.isModalShow = false;
        },
        change(menuValue) {
            Object.assign(this.modal.options, menuValue);
            this.$nextTick(() => this.$refs.monitorModalChart && this.$refs.monitorModalChart.$emit('refresh'));
        },
    },
};
</script>

<style module>
.btn {
    position: absolute;
    right: 20px;
    top: 20px;
    z-index: 100;
    width: 100px;
    text-align: right;
}

.btn > .i-font {
    font-size: 16px;
    color: #9ba4ad;
    margin-left: 4px;

    &:hover { color: #68aaf5; }

    &.z-dis { color: #ccc; }
}

.refreshIcon, .zoomIcon {
    position: absolute;
    top: -15px;
    font-size: 16px;
    margin-bottom: 6px;
    color: #9ba4ad;
}

.refreshIcon:hover, .zoomIcon:hover {
    color: #68aaf5;
    cursor: pointer;
}

.refreshIcon {
    left: 75px;
}
.refreshIcon::after {
    icon-font: url('../../assets/icons/svg/font/chart-refresh.svg');
}
.zoomIcon::after {
    icon-font: url('../../assets/icons/svg/font/chart-zoom.svg');
}

/*------------------ anquanfuwuyemian ----------------------*/
.btn-security {
    top: 5px;
    right: 0;
}

</style>

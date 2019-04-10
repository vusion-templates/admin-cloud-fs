<script>
import { LineChart } from 'cloud-ui.vusion';
// import service from '@/services/monitor';
import { date } from '@necfe/cloud-ui-internal/src/filters';
// import UnitFormat from '@/utils/filters/unit';
// import apmMonitorService from '@/views/dashboard/apm/services/monitor';

export default {
    name: 'u-monitor-chart',
    mixins: [LineChart],
    props: {
        unit: { type: String, default: '' },
        xAxis: { type: Object, default() {
            return {
                key: 'timestr',
                count: 6,
            };
        } },
        yAxis: { type: Object, default() {
            return {
                min: 0,
                name: '',
                count: 6,
            };
        } },
        options: { type: Object, default() {
            return {
                type: 'monitor',
                startTime: 0,
                endTime: 0,
                period: undefined,
                statistics: 'average',
            };
        } },
        metrics: {
            type: Array,
            default: () => [],
        },
        data: {
            type: Array,
            default: () => [],
        },
        chartSum: { type: Boolean, default: false },
        type: { type: String, default: 'monitor' },
        // loading: { type: Boolean, default: true },
        processor: undefined,
        preprocessor: undefined,
        dimensions: { type: String, default: '' },
        dataType: { type: String, default: '' },
        filters: Object,
    },
    data() {
        return {
            fill: true,
            loading: true, // 加载数据
            settings: {},
            showChartSwitch: false, // 是否显示更换曲线按钮
            legendTemplate: '',
            lengendNum: '', // legend个数，包括更换按钮
        };
    },
    watch: {
        unit(value, oldValue) {
            this.yAxis.name = value;
        },
    },
    created() {
        this.$on('refresh', () => {
            this.refresh();
        });

        if (this.settings.hasOwnProperty('yAxisMin'))
            this.yAxis.min = this.settings.yAxisMin;
        if (this.settings.hasOwnProperty('xAxisCount'))
            this.xAxis.count = this.settings.xAxisCount;

        if (this.modal)
            this.xAxis.count = 10;
    },
    methods: {
        refresh(data) {
            const options = this.options;
            const metrics = this.metrics;
            const filters = this.filters;
            // todo: 使用watch实现
            this.yAxis.name = this.unit;
            this.loading = true;

            // 清除选中状态
            // this.series = metrics.map((metric) => ({ key: metric.key, name: metric.name }));

            let promise;

            // 如果有预处理，则直接从预处理中获取promise
            if (this.preprocessor)
                promise = this.preprocessor();
            else {
                // 默认的chart后端请求
                // if (this.type === 'monitor') {
                //     const canFixData = options.canFixData;
                //     promise = service.loadData(Object.assign({
                //         metrics: this.metrics.map((metric) => ({
                //             Namespace: metric.namespace,
                //             MetricName: metric.metricName || metric.key,
                //             Dimensions: metric.dimensions || this.dimensions,
                //         })),
                //     }, options)).then((result) => {
                //         // 处理数据合并
                //         const data = [];

                //         // mock：放大数据
                //         // result[0].forEach((item) => item.average = item.average * 100);

                //         if (!result.length)
                //             return data;

                //         if (metrics.every((metric, index) => !result[index].length))
                //             return data;

                //         const period = (options.period - 0) * 1000; // s -> ms
                //         let minTimestamp = parseInt(options.startTime / period) * period;
                //         let maxTimestamp = parseInt(options.endTime / period) * period;
                //         if (period >= 86400000) {
                //             const timezoneOffset = new Date().getTimezoneOffset() * 60 * 1000;
                //             minTimestamp = parseInt((options.startTime - timezoneOffset) / period) * period + timezoneOffset;
                //             maxTimestamp = parseInt((options.endTime - timezoneOffset) / period) * period + timezoneOffset;
                //         }

                //         // 用Map是为了补足数据
                //         const dataMap = {};

                //         metrics.forEach((metric, index) => {
                //             // if (result[index]) {
                //             result[index].forEach((item) => {
                //                 if (!dataMap[item.createTime]) {
                //                     dataMap[item.createTime] = {
                //                         timestamp: item.createTime,
                //                     };
                //                 }
                //                 dataMap[item.createTime][metric.key] = item[options.statistics];
                //                 if (this.dataType === 'sumMinute' && dataMap[item.createTime][metric.key])
                //                     dataMap[item.createTime][metric.key] = ((dataMap[item.createTime][metric.key] || 0) / 60);
                //             });
                //             // }
                //         });

                //         for (let timestamp = minTimestamp; timestamp <= maxTimestamp; timestamp += period) {
                //             data.push(dataMap[timestamp] || {
                //                 timestamp,
                //                 hidden: true,
                //             });
                //         }

                //         return data;
                //     });
                //     // 聚合总量
                //     if (this.chartSum) {
                //         this.$emit('sumtotal', {
                //             unit: '',
                //             num: '',
                //         });
                //         service.loadData(Object.assign({
                //             metrics: this.metrics.map((metric) => ({
                //                 Namespace: metric.namespace,
                //                 MetricName: metric.metricName || metric.key,
                //                 Dimensions: metric.dimensions || this.dimensions,
                //             })),
                //         }, options, {
                //             statistics: 'sum',
                //             period: Math.ceil((options.endTime - options.startTime) / 1000),
                //         })).then((json) => {
                //             const sumtotal = (((json[0] || [])[0] || {})).sum || 0;
                //             const format = UnitFormat.size(sumtotal, 'B');
                //             this.sumtotal = {
                //                 unit: format.unit[0].replace('B', '') + 'B',
                //                 num: format.num[0].toFixed(2),
                //             };
                //             this.$emit('sumtotal', this.sumtotal);
                //         });
                //     }
                // } else if (this.type === 'old-monitor') {
                //     // 对monitor的旧接口进行兼容
                //     promise = service.loadOldData(Object.assign({
                //         metrics: this.metrics.map((metric) => metric.metricName || metric.key, this).join(','),
                //         containerId: this.dimensions,
                //     }, options)).then((result) => {
                //         // 处理数据合并
                //         const data = [];

                //         if (!result.length)
                //             return data;

                //         for (let i = 0; i < result[0].length; i++) {
                //             const item = {
                //                 timestamp: result[0][i].createTime,
                //             };

                //             metrics.forEach((metric, index) => {
                //                 item[metric.key] = result[index][i][options.statistics];
                //             });

                //             data.push(item);
                //         }

                //         return data;
                //     });
                // } else if (this.type === 'apm') {
                //     promise = apmMonitorService.getMonitorData({
                //         query: {
                //             timePeriod: options.period,
                //             filters: JSON.stringify(filters),
                //             metrics: metrics.map((metric) => metric.key).join(','),
                //             productId: filters.productId,
                //         },
                //     }).then((result) => {
                //         const data = result.result.map((item) => Object.assign({
                //             timestamp: item.timestamp,
                //         }, item.data[0]));

                //         return data;
                //     });
                // }
            }

            promise.then((data) => {
                const showDate = data[0] ? new Date().toDateString() !== new Date(data[0].timestamp).toDateString() : false;
                data.forEach((item) => {
                    item.timestr = date.dateFormat(item.timestamp, showDate ? 'MM-dd HH:mm' : 'HH:mm');
                    item.datetime = date.dateFormat(item.timestamp, 'yyyy-MM-dd HH:mm');
                });

                return data;
            });

            // 后续处理
            if (this.processor)
                promise = promise.then(this.processor.bind(this));

            promise.then((data) => {
                const showDate = data[0] ? new Date().toDateString() !== new Date(data[0].timestamp).toDateString() : false;

                // 处理图表个数问题
                const TICKES = [2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20, 30, 40, 50, 100, 200, 500, 1000, 1];
                const _xAxisCount = this.xAxis.count || 12;
                let pieceCounts = data.length - 1;
                let tick = pieceCounts / _xAxisCount;
                if (tick !== parseInt(tick)) {
                    tick = 1;
                    while (!(pieceCounts / tick <= _xAxisCount && pieceCounts % tick === 0)) {
                        for (let i = 0; i < TICKES.length; i++) {
                            tick = TICKES[i];
                            if (pieceCounts / tick <= _xAxisCount && pieceCounts % tick === 0)
                                break;
                        }

                        // 如果不能整除，则补充后面的点和相应的横坐标
                        if (tick === 1) {
                            const item = {
                                timestamp: data[pieceCounts].timestamp + (data[pieceCounts].timestamp - data[pieceCounts - 1].timestamp),
                                hidden: true,
                            };
                            item.timestr = date.dateFormat(item.timestamp, showDate ? 'MM-dd HH:mm' : 'HH:mm');
                            item.datetime = date.dateFormat(item.timestamp, 'yyyy-MM-dd HH:mm');
                            data.push(item);
                            pieceCounts++;
                        } else
                            break;
                    }
                }

                return data;
            }).then((data) => {
                this.$emit('loaded', { data, unit: this.unit });
                this.loading = false;
                this.data = data;
            }).catch(() => {
                this.loading = false;
                this.data = [];
            });
        },
        isAlonePoint(data, index, key) {
            return (data[index - 1] && isNaN(data[index - 1][key])) && !isNaN(data[index][key]) && (!data[index + 1] || isNaN(data[index + 1][key]));
        },
    },
};
</script>
<style module>
@import 'cloud-ui.vusion/src/components/u-line-chart.vue/module.css';

.piece .u-tooltip {
    border-radius: 2px;
    position: absolute;
    z-index: 10;
    text-align: initial;
    white-space: nowrap;
    line-height: 20px;
    padding: 17px 20px;
    font-size: 12px;
    background: rgba(71,88,107,0.9);
    color: #fff;
}

.piece .u-tooltip:after {
    border: 5px solid rgba(71,88,107,0.9);;
}

.root[role=empty] .axis[role=axisy]{
    border-top: none;
    display: none;
}
.root[role=empty] .axis[role=axisx]{
    display: none;
}
.root[role=empty] .grid{
    display: none;
}
.line[role=y] {
    display: none;
    border-left: none;
}
.axis[role=axisy] {
    border-right: none;
}
.label[role=label-yName]{
    color: #a9a9a9;
}
.label[role=labelx] {
    white-space: nowrap;
}
.root[role=empty] .label[role=label-yName]{
    display: none;
}

.piece .u-tooltip{
    max-width: initial;
}

.point {
    width: 7px;
    height: 7px;
    margin-bottom: -3px;
    margin-left: -3px;
}

</style>

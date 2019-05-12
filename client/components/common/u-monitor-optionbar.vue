<template>
<div :class="$style.root" v-if="visible">
    <div :class="$style.item" role="range" v-if="typeOptions">{{ typeName }}{{ $t('global.colon') }}
        <u-select :class="$style.selectField" :size="size" field="name" :value="menuValue.type" :data="typeOptions" @select="onTypeSelect($event.value)"></u-select>
    </div>
    <div :class="$style.item">{{ $t('global.label.time2') }}
        <ul :class="$style.timerange" ref="timerange" v-if="!isCustomTime">
            <li v-for="(trg, index) in timeRange" :key="index" :class="$style.rangeitem" :role="index === timerangeindex ? 'sel' : ''" @click="onSelectTimeRange(index)">{{ trg.name }}</li>
        </ul>
        <div v-if="isCustomTime" :class="$style.dateperiod" ref="dateperiod">
            <u-data-picker-monitor :class="$style.datepicker" :date="firstDate" :width="datewidth" :min-date="firstMinDate" :max-date="secondDate" @change="firstDateSelect($event.date)"></u-data-picker-monitor>&nbsp;
            <u-number-input :class="$style.numberitem" formatter="00" :min="numberFirstHourMin" :max="numberFirstHourMax" :value="hourFirstTime" @change="firstHourChange($event.value)"></u-number-input> :
            <u-number-input :class="$style.numberitem" :min="numberFirstMinuteMin" :max="numberFirstMinuteMax" formatter="00" :value="minuteFirstTime" @change="firstMinuteChange($event.value)"></u-number-input> {{ $t('global.to') }}

            <u-data-picker-monitor :class="$style.datepicker" :date="secondDate" :width="datewidth" :min-date="firstDate" :max-date="secondMaxDate" @change="secondDateSelect($event.date)"></u-data-picker-monitor>&nbsp;
            <u-number-input :class="$style.numberitem" :min="numberSecondHourMin" :max="numberSecondHourMax" formatter="00" :value="hourSecondTime" @change="secondHourChange($event.value)"></u-number-input> :
            <u-number-input :class="$style.numberitem" :min="numberSecondMinuteMin" :max="numberSecondMinuteMax" formatter="00" :value="minuteSecondTime" @change="secondMinuteChange($event.value)"></u-number-input>

            <u-button :class="$style.btn" @click="custimeTimeBtn" color="primary">{{ $t('global.confirm.ok.noBlank') }}</u-button>
        </div>
        <a :class="$style.selfdefinition" @click="onClickCustomTime">{{ isCustomTime ? $t('global.label.backdefault') : $t('global.custom') }}</a>
    </div>
    <div :class="$style.item">{{ $t('global.label.interval') }}
        <u-select :class="$style.selectField" size="normal small" field="name" :value="menuValue.period" :data="periodOptions" @select="onPeriodSelect($event.value)"></u-select>
    </div>
    <div :class="$style.item" v-if="!isStatisticHide">{{ $t('global.label.statisticalIndicators') }}
        <u-select :class="$style.selectField" size="normal small" field="name" :value="menuValue.statistics" :data="statisticsOptions" @select="onStatisticsSelect($event.value)"></u-select>
    </div>
</div>
</template>

<script>
import DatePickerMonitor from './u-date-picker-monitor.vue';
import i18n from '@/utils/i18n';
/**
 * [PERIOD_OPTIONS 时间间隔options的所有选项值]
 * @type {Array}
 */
const PERIOD_OPTIONS = [
    { value: 60 * 1, name: `${i18n.t('global.option.minute', [1])}` },
    { value: 60 * 5, name: `${i18n.t('global.option.minute', [5])}` },
    { value: 60 * 15, name: `${i18n.t('global.option.minute', [15])}` },
    { value: 60 * 60, name: `${i18n.t('global.option.hour', [1])}` },
    { value: 60 * 60 * 6, name: `${i18n.t('global.option.hour', [6])}` },
    { value: 60 * 60 * 24, name: `${i18n.t('global.option.day', [1])}` },
    { value: 60 * 60 * 24 * 6, name: `${i18n.t('global.option.day', [6])}` },
    { value: 60 * 60 * 24 * 15, name: `${i18n.t('global.option.day', [15])}` },
];
const NOS_PERIOD_OPTIONS = [
    { value: 60 * 60, name: `${i18n.t('global.option.hour', [1])}` },
    { value: 60 * 60 * 24, name: `${i18n.t('global.option.day', [1])}` },
];
const CDN_PERIOD_OPTIONS = [
    { value: 60 * 60, name: `${i18n.t('global.option.hour', [1])}` },
    { value: 60 * 60 * 6, name: `${i18n.t('global.option.hour', [6])}` },
    { value: 60 * 60 * 24, name: `${i18n.t('global.option.day', [1])}` },
];
const NOS_FLOW_PERIOD_OPTIONS = [
    { value: 60 * 5, name: `${i18n.t('global.option.minute', [5])}` },
    { value: 60 * 60, name: `${i18n.t('global.option.hour', [1])}` },
    { value: 60 * 60 * 24, name: `${i18n.t('global.option.day', [1])}` },
];
const NOS_QPS_PERIOD_OPTIONS = [
    { value: 60 * 1, name: `${i18n.t('global.option.minute', [1])}` },
    { value: 60 * 60, name: `${i18n.t('global.option.hour', [1])}` },
    { value: 60 * 60 * 24, name: `${i18n.t('global.option.day', [1])}` },
];
const ONE_MINUTE = 1000 * 60;
export default {
    name: 'u-monitor-optionbar',
    components: {
        'u-data-picker-monitor': DatePickerMonitor,
    },
    props: {
        isStatisticHide: { type: Boolean, default: false }, /* 统计指标选项是否隐藏 */
        isNOSCustomPeriod: { type: Boolean, default: false }, /* 特定NOS */
        isCDNCustomPeriod: { type: Boolean, default: false }, /* 特定CDN */
        initTimeRangeSelectedIndex: { type: Number, default: 0 }, /* 默认时间选择选中项索引 */
        /* 时间选择的options */
        timeRange: {
            type: Array,
            default() {
                return [
                    { value: '3hour', name: `${i18n.t('global.nearly.hours', [3])}` },
                    { value: 'today', name: `${i18n.t('global.nearly.hours', [24])}` },
                    { value: 'yesterday', name: `${i18n.t('global.nearly.hours', [48])}` },
                    { value: '1week', name: `${i18n.t('global.nearly.days', [7])}` },
                ];
            },
        },
        /* 统计指标的options */
        statisticsOptions: {
            type: Array,
            default() {
                return [
                    { value: 'average', name: `${i18n.t('global.selection.average')}` },
                    // {value: 'sum', name: '总和'},
                    { value: 'maxinum', name: `${i18n.t('global.selection.maximum')}` },
                    { value: 'mininum', name: `${i18n.t('global.selection.minimum')}` },
                    // {value: 'sampleCount', name: '采样次数'},
                ];
            },
        },
        typeOptions: Array, // 类型选择 暂时未用上
        menuValueType: [Number, String], // 类型选择选中值
        statistics: { type: String, default: 'average' },
        visible: { type: Boolean, default: true }, /* 是否显示此组件属性值 */
        typeWidth: { type: String, default: '120' },
        typeName: { type: String, default: `${i18n.t('global.type.label')}` },
        size: { type: String, default: 'normal large' },
    },
    data() {
        return {
            isCustomTime: false, /* 表示是否选中自定义选项 */
            limitDays: 59, // 用来确定自定义日期做早时间 当前日前的前两个月时间
            timerangeindex: this.initTimeRangeSelectedIndex || 0, /* 表示选中时间tag项的索引值 */
            /* 选中项值组合的对象 */
            menuValue: {
                type: this.menuValueType || 0, /* 指标选中项值 */
                startTime: 0, /* 开始时间 */
                endTime: 0, /* 结束时间 */
                period: undefined, // 初始为一分钟 间隔
                statistics: this.statistics, // 初始为平均值 统计指标
            },
            periodOptions: [],
            width: '120', /* */
            // 自定义日期数据
            firstDate: undefined,
            firstMinDate: new Date(),
            secondDate: undefined,
            secondMaxDate: new Date(),
            hourFirstTime: 0,
            hourSecondTime: 0,
            minuteFirstTime: 0,
            minuteSecondTime: 0,
            datewidth: '85', /* 日期组件宽度 */
            timewidth: '50', /* 时分组件宽度 */
            numberFirstHourMin: 0, /* 时分组件最小值 最大值 */
            numberFirstMinuteMin: 0,
            numberFirstHourMax: 23,
            numberFirstMinuteMax: 59,
            numberSecondHourMin: 0, /* 时分组件最小值 最大值 */
            numberSecondMinuteMin: 0,
            numberSecondHourMax: 23,
            numberSecondMinuteMax: 59,
            // requesting: false, /* 表示确定按钮请求否处于进行中的状态*/
        };
    },
    watch: {
        initTimeRangeSelectedIndex(newValue) {
            this.timerangeindex = newValue;
            this.initTimeRange();
        },
        menuValueType(newValue) {
            this.menuValue.type = newValue;
        },
    },
    created() {
        this.initTimeRange();
    },
    methods: {
        /**
         * [initTimeRange 初始化时间函数]
         * @return null
         */
        initTimeRange() {
            const endTime = new Date().getTime();
            const starttime = this.timeRange[this.timerangeindex].value;
            const firstMinDate = endTime - 1000 * 60 * 60 * 24 * this.limitDays;
            const secondMaxDate = endTime;
            const nowtime = new Date();
            nowtime.setDate(1);
            nowtime.setHours(0, 0, 0, 0);
            const firstDate = nowtime.getTime();
            const secondDate = new Date().getTime();
            const hourFirstTime = nowtime.getHours();
            const hourSecondTime = new Date().getHours();
            const minuteFirstTime = nowtime.getMinutes();
            const minuteSecondTime = new Date().getMinutes();
            let sTime = 0;
            switch (starttime) {
                case '30min':
                    sTime = endTime - (30 * 60 * 1000);
                    break;
                case '1hour':
                    sTime = endTime - (1 * 60 * 60 * 1000);
                    break;
                case '2hour':
                    sTime = endTime - (2 * 60 * 60 * 1000);
                    break;
                case '3hour':
                    sTime = endTime - (3 * 60 * 60 * 1000);
                    break;
                case '6hour':
                    sTime = endTime - (6 * 60 * 60 * 1000);
                    break;
                case '12hour':
                    sTime = endTime - (12 * 60 * 60 * 1000);
                    break;
                case 'today':
                case '1day':
                    sTime = endTime - (24 * 60 * 60 * 1000);
                    break;
                case 'yesterday':
                    sTime = endTime - (2 * 24 * 60 * 60 * 1000);
                    break;
                case '1week':
                case '7day':
                    sTime = endTime - (7 * 24 * 60 * 60 * 1000);
                    break;
                case '3day':
                    sTime = endTime - (3 * 24 * 60 * 60 * 1000);
                    break;
                case '15day':
                    sTime = endTime - (15 * 24 * 60 * 60 * 1000);
                    break;
            }
            const interval = endTime - sTime;
            this.periodOptions = this.initPeriodOptions(interval, ONE_MINUTE);
            this.menuValue.startTime = sTime;
            this.menuValue.endTime = endTime;
            this.firstDate = firstDate;
            this.secondDate = secondDate;
            this.firstMinDate = firstMinDate;
            this.secondMaxDate = secondMaxDate;
            this.hourFirstTime = hourFirstTime;
            this.hourSecondTime = hourSecondTime;
            this.minuteFirstTime = minuteFirstTime;
            this.minuteSecondTime = minuteSecondTime;
            this.$emit('change', {
                sender: this,
                menuValue: this.menuValue,
            });
        },
        /**
         * 时间选择函数 示例：近3小时 近24小时
         */
        onSelectTimeRange(index) {
            this.timerangeindex = index;
            this.initTimeRange();
        },
        /**
         * 自定义函数
         * 切换自定义时间会导致时间间隔的变化
         */
        onClickCustomTime() {
            this.isCustomTime = !this.isCustomTime;
            if (this.isCustomTime) {
                const curtime = new Date();
                const hourSecondTime = curtime.getHours();
                const minuteSecondTime = curtime.getMinutes();
                this.hourSecondTime = hourSecondTime;
                this.minuteSecondTime = minuteSecondTime;
                const curtimestamp = curtime.getTime();
                curtime.setDate(1);
                curtime.setHours(0, 0, 0, 0);
                const stime = curtime.getTime();
                const etime = curtimestamp;
                const interval = etime - stime;
                this.periodOptions = this.initPeriodOptions(interval, ONE_MINUTE);
            } else
                this.initTimeRange();
        },

        refreshTime() {
            const current = new Date().getTime();
            const interval = this.menuValue.startTime - this.menuValue.endTime;
            this.menuValue.startTime = current + interval;
            this.menuValue.endTime = current;
        },
        /**
         * [onPeriodSelect 间隔选择函数]
         * @param  {[type]} value [表示选中项的值]
         */
        onPeriodSelect(value) {
            this.getUpdateTime();
            this.menuValue.period = parseInt(value);
            this.refreshTime();
            this.$emit('change', {
                sender: this,
                menuValue: this.menuValue,
            });
        },
        /**
         * [onStatisticsSelect 统计指标选择函数]
         * @param  {[type]} value [表示选中项的值]
         * @return {null}       [无]
         */
        onStatisticsSelect(value) {
            this.getUpdateTime();
            this.menuValue.statistics = value;
            this.refreshTime();
            this.$emit('change', {
                sender: this,
                menuValue: this.menuValue,
            });
        },
        /**
         * [firstDateSelect 自定义事件第一个日期选择函数 需要特殊处理第一个年月日时分大于第二个日期的年月日时分，大于的话，将两个置成一样即可]
         * @param  {[Date]} date [时间戳]
         * @return {null}      [无]
         */
        firstDateSelect(date) {
            const firstStamp = this.datetostamp(date, this.hourFirstTime, this.minuteFirstTime, 'start');
            const secondStamp = this.datetostamp(this.secondDate, this.hourSecondTime, this.minuteSecondTime, 'end');
            if (firstStamp > secondStamp) {
                this.hourFirstTime = this.hourSecondTime;
                this.minuteFirstTime = this.minuteSecondTime;
            }
            this.firstDate = new Date(date).getTime();
            this.custimePeriod();
        },
        /**
         * [secondDateSelect 自定义事件第二个日期选择函数 需要特殊处理第一个年月日时分大于第二个日期的年月日时分，大于的话，将两个置成一样即可]
         * @param  {[Date]} date [时间戳]
         * @return {null}      [无]
         */
        secondDateSelect(date) {
            const firstStamp = this.datetostamp(date, this.hourFirstTime, this.minuteFirstTime, 'start');
            const secondStamp = this.datetostamp(this.secondDate, this.hourSecondTime, this.minuteSecondTime, 'end');
            if (firstStamp > secondStamp) {
                this.hourFirstTime = this.hourSecondTime;
                this.minuteFirstTime = this.minuteSecondTime;
            }
            this.secondDate = new Date(date).getTime();
            this.custimePeriod();
        },
        /**
         * [firstHourChange 自定义事件第一个时选择函数 需要特殊处理第一个年月日时分大于第二个日期的年月日时分，大于的话，将两个置成一样即可]
         * @param  {[string]} value [改变后hour后的值]
         * @return {null}       [无]
         */
        firstHourChange(value) {
            const firstStamp = this.datetostamp(this.firstDate, value, this.minuteFirstTime, 'start');
            const secondStamp = this.datetostamp(this.secondDate, this.hourSecondTime, this.minuteSecondTime, 'end');
            // 当开始日期大于结束日期相等的时候 需要重新设置开始日期的时分min max的值，将其设置等于结束日期时分的值
            if (firstStamp > secondStamp) {
                this.hourFirstTime = this.hourSecondTime;
                this.minuteFirstTime = this.minuteSecondTime;
                this.numberFirstHourMax = this.hourSecondTime;
                this.numberFirstMinuteMax = this.minuteSecondTime;
            } else {
                this.hourFirstTime = parseInt(value);
                this.numberFirstHourMax = 23;
                this.numberFirstMinuteMax = 59;
            }

            this.custimePeriod();
        },
        /**
         * [firstMinuteChange 自定义事件第一个minute选择函数]
         * @param  {[string]} value [改变后minute后的值]
         * @return {null}       [无]
         */
        firstMinuteChange(value) {
            const firstStamp = this.datetostamp(this.firstDate, this.hourFirstTime, value, 'start');
            const secondStamp = this.datetostamp(this.secondDate, this.hourSecondTime, this.minuteSecondTime, 'end');
            if (firstStamp > secondStamp) {
                this.hourFirstTime = this.hourSecondTime;
                this.minuteFirstTime = this.minuteSecondTime;
                this.numberFirstHourMax = this.hourSecondTime;
                this.numberFirstMinuteMax = this.minuteSecondTime;
            } else {
                this.minuteFirstTime = parseInt(value);
                this.numberFirstHourMax = 23;
                this.numberFirstMinuteMax = 59;
            }

            this.custimePeriod();
        },
        secondHourChange(value) {
            const firstStamp = this.datetostamp(this.firstDate, this.hourFirstTime, this.minuteFirstTime, 'start');
            const secondStamp = this.datetostamp(this.secondDate, value, this.minuteSecondTime, 'end');
            if (firstStamp > secondStamp) {
                this.hourFirstTime = this.hourSecondTime;
                this.minuteFirstTime = this.minuteSecondTime;
                this.numberFirstHourMax = this.hourSecondTime;
                this.numberFirstMinuteMax = this.minuteSecondTime;
            } else {
                this.hourSecondTime = parseInt(value);
                this.numberFirstHourMax = 23;
                this.numberFirstMinuteMax = 59;
            }

            this.custimePeriod();
        },
        secondMinuteChange(value) {
            const firstStamp = this.datetostamp(this.firstDate, this.hourFirstTime, this.minuteFirstTime, 'start');
            const secondStamp = this.datetostamp(this.secondDate, this.hourSecondTime, value, 'end');
            if (firstStamp > secondStamp) {
                this.hourFirstTime = this.hourSecondTime;
                this.minuteFirstTime = this.minuteSecondTime;
                this.numberFirstHourMax = this.hourSecondTime;
                this.numberFirstMinuteMax = this.minuteSecondTime;
            } else {
                this.minuteSecondTime = parseInt(value);
                this.numberFirstHourMax = 23;
                this.numberFirstMinuteMax = 59;
            }

            this.custimePeriod();
        },
        /**
         * [datetostamp 将日期转换为时间戳的函数 需要注意safari浏览器不支持2014-02-05这种日期格式 采用2014/02/05这种都支持的格式处理]
         * @param  {[Date]} date   [时间戳 年月日]
         * @param  {[string]} hour   [小时]
         * @param  {[string]} minute [分钟]
         * @return {null}        [无]
         */
        datetostamp(date, hour, minute, type) {
            if (!date)
                return;
            if (hour === undefined)
                return;
            if (minute === undefined)
                return;
            date = new Date(date);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const dtime = date.getDate();
            let dateTime;
            if (type === 'start')
                dateTime = year + '/' + month + '/' + dtime + ' ' + hour + ':' + minute + ':00';
            else
                dateTime = year + '/' + month + '/' + dtime + ' ' + hour + ':' + minute + ':59';
            return new Date(dateTime).getTime();
        },
        /**
         * [onTypeSelect 类型选择函数]
         * @param  {[number|string]} value [选中项的值]
         * @return {null}       [无]
         */
        onTypeSelect(value) {
            this.getUpdateTime();
            this.menuValue.type = value;
            this.$emit('change', {
                sender: this,
                menuValue: this.menuValue,
            });
        },
        /**
         * [initPeriodOptions 初始化间隔options选项和默认值]
         * @param  {[nuber]} interval  [开始时间和结束时间间隔]
         * @param  {[number]} ONE_MINUTE [1分钟对应的毫秒]
         * @param  {[number]} start     [开始时间对应的时间戳]
         * @param  {[number]} end       [结束时间对应的时间戳]
         * @return {null}           [无]
         */
        initPeriodOptions(interval, ONE_MINUTE) {
            let periodOptions;
            let start;
            let end;
            if (interval <= ONE_MINUTE * 12) {
                start = 0;
                end = 1;
            } else if (interval <= ONE_MINUTE * 60) {
                start = 0;
                end = 2;
            } else if (interval <= ONE_MINUTE * 60 * 3) {
                start = 0;
                end = 3;
            } else if (interval <= ONE_MINUTE * 60 * 12) {
                start = 1;
                end = 4;
            } else if (interval <= ONE_MINUTE * 60 * 24 * 2) {
                start = 2;
                end = 5;
            } else if (interval <= ONE_MINUTE * 60 * 24 * 12) {
                start = 3;
                end = 6;
            } else if (interval <= ONE_MINUTE * 60 * 24 * 48) {
                start = 4;
                end = 7;
            } else if (interval <= ONE_MINUTE * 60 * 24 * 60) {
                start = 5;
                end = 8;
            } else {
                start = 5;
                end = 8;
            }

            if (this.isNOSCustomPeriod) {
                periodOptions = NOS_PERIOD_OPTIONS;
                if (interval < ONE_MINUTE * 60 * 24 * 2)
                    periodOptions = NOS_PERIOD_OPTIONS.slice(0, 1);
                else if (interval > ONE_MINUTE * 60 * 24 * 12)
                    periodOptions = NOS_PERIOD_OPTIONS.slice(1, 2);
                this.menuValue.period = periodOptions[0].value;
                return periodOptions;
            }

            if (this.isCDNCustomPeriod) {
                if (interval <= ONE_MINUTE * 60 * 12)
                    periodOptions = CDN_PERIOD_OPTIONS.slice(0, 1);
                else if (interval <= ONE_MINUTE * 60 * 48)
                    periodOptions = CDN_PERIOD_OPTIONS.slice(0, 2);
                else if (interval <= ONE_MINUTE * 60 * 24 * 12)
                    periodOptions = CDN_PERIOD_OPTIONS.slice(0, 3);
                else if (interval <= ONE_MINUTE * 60 * 24 * 48)
                    periodOptions = CDN_PERIOD_OPTIONS.slice(1, 3);
                else if (interval <= ONE_MINUTE * 60 * 24 * 60)
                    periodOptions = CDN_PERIOD_OPTIONS.slice(2, 3);
                this.menuValue.period = periodOptions[0].value;
                return periodOptions;
            }

            periodOptions = PERIOD_OPTIONS.slice(start, end);
            // 每列三个值，取第二个值
            const index = +(periodOptions.length > 1);
            this.menuValue.period = periodOptions[index].value;
            return periodOptions;
        },
        /**
         * [custimeTimeBtn 自定义时间 确定按钮事件]
         * @return {null} [无]
         */
        custimeTimeBtn() {
            const stime = this.datetostamp(this.firstDate, this.hourFirstTime, this.minuteFirstTime, 'start');
            const etime = this.datetostamp(this.secondDate, this.hourSecondTime, this.minuteSecondTime, 'end');
            this.menuValue.startTime = stime;
            this.menuValue.endTime = etime;
            this.menuValue.isCustomTime = true;
            this.$emit('change', {
                sender: this,
                menuValue: this.menuValue,
            });
        },
        custimePeriod() {
            const stime = this.datetostamp(this.firstDate, this.hourFirstTime, this.minuteFirstTime, 'start');
            const etime = this.datetostamp(this.secondDate, this.hourSecondTime, this.minuteSecondTime, 'end');
            const interval = etime - stime;
            this.periodOptions = this.initPeriodOptions(interval, ONE_MINUTE);
        },
        // 非自定义时间的时候 改变时间间隔 统计指标都会触发获取最新的时间
        getUpdateTime() {
            let sTime;
            let endTime;
            if (this.isCustomTime) {
                sTime = this.datetostamp(this.firstDate, this.hourFirstTime, this.minuteFirstTime, 'start');
                endTime = this.datetostamp(this.secondDate, this.hourSecondTime, this.minuteSecondTime, 'end');
            } else {
                endTime = new Date().getTime();
                const starttime = this.timeRange[this.timerangeindex].value;
                sTime = 0;
                switch (starttime) {
                    case '30min':
                        sTime = endTime - (30 * 60 * 1000);
                        break;
                    case '1hour':
                        sTime = endTime - (1 * 60 * 60 * 1000);
                        break;
                    case '2hour':
                        sTime = endTime - (2 * 60 * 60 * 1000);
                        break;
                    case '3hour':
                        sTime = endTime - (3 * 60 * 60 * 1000);
                        break;
                    case '6hour':
                        sTime = endTime - (6 * 60 * 60 * 1000);
                        break;
                    case '12hour':
                        sTime = endTime - (12 * 60 * 60 * 1000);
                        break;
                    case 'today':
                    case '1day':
                        sTime = endTime - (24 * 60 * 60 * 1000);
                        break;
                    case 'yesterday':
                        sTime = endTime - (2 * 24 * 60 * 60 * 1000);
                        break;
                    case '1week':
                    case '7day':
                        sTime = endTime - (7 * 24 * 60 * 60 * 1000);
                        break;
                    case '3day':
                        sTime = endTime - (3 * 24 * 60 * 60 * 1000);
                        break;
                    case '15day':
                        sTime = endTime - (15 * 24 * 60 * 60 * 1000);
                        break;
                }
            }
            this.menuValue.startTime = sTime;
            this.menuValue.endTime = endTime;
        },
    },
};
</script>

<style module>
.datepicker{
    display: inline-block;
}
.item, .dateperiod{
    display: inline;
    margin-right: 20px;
}
.item[role=range]{ font-size: 14px; }
.selectField{
    vertical-align: middle;
    height: 30px !important;
    line-height: 28px !important;
}
.timerange{
    display: inline-block;
    vertical-align: middle;
}
.rangeitem{
    display: inline-block;
    float: left;
    height: 30px;
    line-height: 28px;
    background: #fff;
    color: #666;
    border: 1px solid #cbd5dd;
    padding: 0 12px;
    margin-right: 5px;
    -moz-border-radius: 2px;
    border-radius: 2px;
    cursor: pointer;

    &:hover {
        border-color: $brand-primary;
    }
}
.rangeitem[role=sel]{
    color: #fff;
    background-color: $brand-primary;
    border-color: $brand-primary;
}
.numberitem[class] {
    width: 50px;
    height: 30px;
    line-height: 30px;
}

.numberitem[class] input {
    padding: 6px;
}

.btn{
    margin-left: 5px;
    padding: 0 10px !important;
    height: 30px !important;
    line-height: 28px !important;
    background: $brand-primary !important;
    width: 48px;
    border-radius: 2px;
}
.selfdefinition{
    color: #4477d0;
}
</style>

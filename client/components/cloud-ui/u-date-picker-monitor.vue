<template>
<u-popper ref="popper" append-to="reference" :placement="placement" @toggle="onToggle($event)">
    <div :class="$style.header">
        <input :class="$style.input" :placeholder="placeholder" :value="showSpecific(showDate)" ref="input" :autofocus="autofocus" :readonly="readonly" :disabled="disabled" :style="{width: width+'px'}" @change="onInput($event)">
    </div>
    <div :class="$style.body" slot="popper" @click.stop>
        <u-calendar :min-date="minDate" :max-date="maxDate" :date="showDate" @select="select($event.date)"></u-calendar>
    </div>
</u-popper>
</template>
<script>
import { DatePicker } from 'cloud-ui.vusion';
export default {
    name: 'u-date-picker-monitor',
    mixins: [DatePicker],
    methods: {
        showSpecific(value) {
            value = new Date(value);
            const month = value.getMonth() + 1;
            const date = value.getDate();
            return `${this.$t('global.dateFormat2', [month, date])}`;
        },
        onInput($event) {
            const value = $event.target.value;
            let date = value ? new Date(value.replace(/-/g, '/').replace(/年|月|日/g, '/')) : null;
            this.showDate = '';
            if (date.toString() !== 'Invalid Date' && date !== null) {
                date = this.isOutOfRange(date) ? this.isOutOfRange(date) : date;
                // 此处有坑 需要特殊处理 由于改成最小值 再次输入不合法的值会变成最小值 认为没有发生变化
                this.showDate = this.format(date, 'yyyy-MM-dd');
            } else
                this.$refs.input.value = this.format(this.showDate, 'yyyy-MM-dd');
        },
    },
};
</script>
<style module>
@import 'cloud-ui.vusion/src/components/u-date-picker.vue/module.css';
.input{
    height: 30px;
    line-height: 30px;
    outline: none;
}
.body{z-index: 999;}
</style>

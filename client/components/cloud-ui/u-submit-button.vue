<template>
<div :class="$style.wrap">
    <span :class="$style.error" v-if="(message || errMsg)" :title="(message || errMsg)">{{ (message || errMsg) }}</span>
    <slot :submit="clickWrap" :submitting="submitting" :errMsg="errMsg"></slot>
</div>
</template>
<style module>
.wrap {
    position: relative;
    /* min-width: 500px; */
}
.wrap[place='middle']{
    text-align: center;
}
.wrap[place='left']{
    text-align: left;
}
.wrap[place='right']{
    text-align: right;
}
.error {
    position: absolute;
    display: inline-block;
    height: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    top: -23px;
    left: 0px;
    font-size: 12px;
    color: #ff867f;
    width: 100%;
}
.error[error='middle'] {
    top: -26px;
    left: 50%;
    transform: translate(-50%, 0);
}
</style>
<script>
export default {
    name: 'u-submit-button',
    props: {
        click: {
            type: Function,
        },
        message: {
            type: String,
        },
    },
    data() {
        return {
            errMsg: '',
            submitting: false,
            clickWrap: this.submit,
        };
    },
    methods: {
        submit() {
            if (this.submitting) {
                return;
            }
            this.submitting = true;
            this.errMsg = '';
            this.click().then((data) => {
                this.submitting = false;
                return data;
            }, (err) => {
                this.submitting = false;
                if (Array.isArray(err)) {
                    this.errMsg = (err.filter((item) => item.message)[0] || {}).message;
                } else {
                    this.errMsg = err.message || err.Message || err.reason;
                }
            });
        },
    },
};
</script>


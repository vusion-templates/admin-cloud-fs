<template>
<div>
    <u-linear-layout justify="space-between">
        <u-text color="secondary">{{ name }}</u-text>
        <u-text color="secondary">{{ value }}{{ unit }}</u-text>
    </u-linear-layout>
    <u-linear-progress :size="size" :percent="max === 0 ? max : value / max * 100"></u-linear-progress>
</div>
</template>

<script>
export default {
    props: {
        name: String,
        value: { type: Number, default: 0 },
        max: { type: Number, default: 0 },
        unit: String,
        size: { type: String, default: 'normal' },
    },
};
</script>

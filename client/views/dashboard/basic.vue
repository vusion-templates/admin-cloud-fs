<template>
<u-linear-layout direction="vertical">
    <u-linear-layout>
        <u-link href="#">链接</u-link>
        <u-link href="#">查看详情</u-link>
        <u-label>Label</u-label>
        <u-label color="primary">Label</u-label>
    </u-linear-layout>
    <u-linear-layout>
        <u-button color="primary">创建</u-button>
        <u-button>取消</u-button>
        <span>消息 <u-badge :value="3"></u-badge></span>
        <u-badge :value="3" corner>
            <u-button>评论</u-button>
        </u-badge>
    </u-linear-layout>
</u-linear-layout>
</template>

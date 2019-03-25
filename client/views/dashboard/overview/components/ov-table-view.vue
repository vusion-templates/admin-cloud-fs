<template>
<u-panel title="执行失败的用例">
    <u-table-view title-alignment="left" :data="data">
        <u-table-view-column title="用例名称" label="name"></u-table-view-column>
        <u-table-view-column title="路径" label="path"></u-table-view-column>
        <u-table-view-column title="失败次数" label="count"></u-table-view-column>
    </u-table-view>
</u-panel>
</template>

<script>
import overviewService from 'services/overview';
export default {
    name: 'ov-table-view',
    data() {
        return {
            data: [],
        };
    },
    created() {
        this.getFailInfo();
    },
    methods: {
        getFailInfo() {
            return overviewService.getFailInfo().then(({ data }) => this.data = data);
        },
    },
};
</script>

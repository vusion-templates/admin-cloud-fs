<template>
<u-panel title="执行失败的用例">
    <u-table-view title-alignment="left" :data-source="loadFailedCases">
        <u-table-view-column title="用例名称" field="name"></u-table-view-column>
        <u-table-view-column title="路径" field="path"></u-table-view-column>
        <u-table-view-column title="失败次数" field="count"></u-table-view-column>
    </u-table-view>
</u-panel>
</template>

<script>
import overviewService from 'services/overview';

export default {
    name: 'ov-table-view',
    methods: {
        loadFailedCases() {
            return overviewService.getFailInfo().then(({ data }) => data);
        },
    },
};
</script>

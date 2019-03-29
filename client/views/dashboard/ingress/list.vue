<template>
<u-linear-layout direction="vertical">
    <div>负载均衡</div>
    <u-table-view :data="data" :loading="loading">
        <u-table-view-column title="名称" label="Name"></u-table-view-column>
        <u-table-view-column title="InstanceId" label="InstanceId"></u-table-view-column>
        <u-table-view-column title="可用区" label="azList"></u-table-view-column>
        <u-table-view-column title="运行状态">
            <template slot-scope="props">
                <u-status-icon v-if="props.row.statusInfo" :name="props.row.statusInfo.icon">{{ props.row.statusInfo.label }}</u-status-icon>
            </template>
        </u-table-view-column>
        <u-table-view-column title="创建时间" label="CreateAt"></u-table-view-column>
        <u-table-view-column title="操作">
            <u-link-list slot-scope="props">
                <u-link-list-item to="/">设置</u-link-list-item>
                <u-link-list-item :to="{ path: '/ingress/detail', query: { id: props.row.InstanceId } }">详情</u-link-list-item>
                <u-link-list-item :to="{ path: '/ingress/detail/performance', query: { id: props.row.InstanceId } }">性能监控</u-link-list-item>
                <u-link-list-item @click="deleteItem(props.row.InstanceId)">删除</u-link-list-item>
            </u-link-list>
        </u-table-view-column>
    </u-table-view>
</u-linear-layout>
</template>

<script>
import ingressService from 'services/ingress';

export default {
    data() {
        return {
            data: [],
            loading: false,
        };
    },
    created() {
        this.loadList();
    },
    methods: {
        loadList() {
            this.loading = true;
            return ingressService.getList().then(({ data }) => {
                this.data = data;
                this.loading = false;
            });
        },
        deleteItem(id) {
            console.log(id);
        },
    },
};
</script>

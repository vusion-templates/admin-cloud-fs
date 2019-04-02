<template>
<u-linear-layout direction="vertical">
    <div>负载均衡</div>
    <u-linear-layout type="flex" justify="space-between">
        <u-linear-layout>
            <u-button color="primary" icon="create" to="/ingress/create">创建负载均衡</u-button>
            <u-button icon="refresh" square @click="loadList"></u-button>
        </u-linear-layout>
        <u-input v-model="filter" placeholder="输入名称过滤列表"></u-input>
    </u-linear-layout>
    <u-table-view :data="list" :loading="loading">
        <u-table-view-column title="名称" label="Name"></u-table-view-column>
        <u-table-view-column title="InstanceId" label="InstanceId"></u-table-view-column>
        <u-table-view-column title="可用区" label="azList"></u-table-view-column>
        <u-table-view-column title="运行状态">
            <template slot-scope="props">
                <u-status-icon v-if="props.row.statusInfo" :name="props.row.statusInfo.icon">{{ props.row.statusInfo.label }}</u-status-icon>
            </template>
        </u-table-view-column>
        <u-table-view-column title="创建时间">
            <template slot-scope="props">
                {{ props.row.CreateAt | timeFormat }}
            </template>
        </u-table-view-column>
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
            filter: '',
        };
    },
    computed: {
        list() {
            return this.data.filter((item) => item.Name.indexOf(this.filter) !== -1);
        },
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
            this.$confirm({
                title: '提示',
                content: '是否删除该负载均衡？',
                ok: () => ingressService.deleteIngress({
                    uuid: id,
                }).then(() => {
                    this.loadList();
                }),
            });
        },
    },
};
</script>

<template>
<u-linear-layout direction="vertical" gap="small">
    <u-linear-layout gap="small">
        <u-button color="primary" icon="create">申请弹性公网 IP</u-button>
        <u-button icon="refresh" square @click="$refs.tableView.reload()"></u-button>
    </u-linear-layout>
    <u-table-view ref="tableView" :data-source="load">
        <u-table-view-column title="IP 地址" field="IpAddress"></u-table-view-column>
        <u-table-view-column title="带宽" field="MaxBandwidth" width="100">
            <template #cell="{ value }">
                <span>{{ value }} Mbps</span>
            </template>
        </u-table-view-column>
        <u-table-view-column title="状态" field="Status" width="120">
            <template #cell="{ value }">
                <u-status-icon :name="iconMap[value].icon">{{ iconMap[value].text }}</u-status-icon>
            </template>
        </u-table-view-column>
        <u-table-view-column title="绑定实例类型" field="InstanceType" width="100"></u-table-view-column>
        <u-table-view-column title="绑定实例" field="InstanceName"></u-table-view-column>
        <u-table-view-column title="计费方式" field="PayType" width="100" :formatter="payTypeFormatter"></u-table-view-column>
        <u-table-view-column title="创建时间" field="CreatedAt" formatter="placeholder | date"></u-table-view-column>
        <u-table-view-column title="操作">
            <template #cell="{ item }">
                <u-actions>
                    <u-action @click="$toast.show('点击了“更改配置”')">更改配置</u-action>
                    <u-action @click="$toast.show('点击了“绑定”')">绑定</u-action>
                    <u-action @click="$toast.show('点击了“设置”')">设置</u-action>
                    <u-action @click="$toast.show('点击了“转包年包月”')">转包年包月</u-action>
                    <u-action @click="$toast.show('点击了“释放”')">释放</u-action>
                </u-actions>
            </template>
        </u-table-view-column>
    </u-table-view>
</u-linear-layout>
</template>

<script>
export default {
    data() {
        return {
            iconMap: {
                Available: { icon: 'success', text: '可用' },
                Failed: { icon: 'error', text: '不可用' },
            },
            payTypeMap: {
                PrePaid: '包年包月',
                PostPaid: '按量付费',
            },
        };
    },
    methods: {
        load() {
            return Promise.resolve([{
                ActiveStatus: 'Normal',
                Comment: 'aaa',
                CreatedAt: '2019-03-18T10:05:51Z',
                Id: 'c89807b8-3a5c-489e-a699-71eb642b61e7',
                InstanceId: '',
                InstanceName: '',
                InstanceType: '-',
                IpAddress: '59.100.100.111',
                MaxBandwidth: 10,
                NetworkChargeType: 'PayByBandwidth',
                PayType: 'PostPaid',
                Status: 'Available',
                UpdatedAt: '2019-03-18T10:05:51Z',
            }, {
                ActiveStatus: 'Normal',
                Comment: 'bbb',
                CreatedAt: '2019-03-18T10:05:51Z',
                Id: 'c89807b8-3a5c-489e-a699-71eb642b61e8',
                InstanceId: '',
                InstanceName: '',
                InstanceType: '-',
                IpAddress: '59.100.100.112',
                MaxBandwidth: 10,
                NetworkChargeType: 'PayByBandwidth',
                PayType: 'PostPaid',
                Status: 'Failed',
                UpdatedAt: '2019-03-18T10:05:51Z',
            }, {
                ActiveStatus: 'Normal',
                Comment: 'ccc',
                CreatedAt: '2019-03-18T10:05:51Z',
                Id: 'c89807b8-3a5c-489e-a699-71eb642b61e9',
                InstanceId: '',
                InstanceName: '',
                InstanceType: '-',
                IpAddress: '59.100.100.113',
                MaxBandwidth: 10,
                NetworkChargeType: 'PayByBandwidth',
                PayType: 'PrePaid',
                Status: 'Available',
                UpdatedAt: '2019-03-18T10:05:51Z',
            }]);
        },
        payTypeFormatter(payType) {
            return this.payTypeMap[payType];
        },
    },
};
</script>

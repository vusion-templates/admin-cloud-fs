<template>
<div>
    <u-info-list-group title="基本信息" column="3">
        <u-info-list-item label="名称">{{ instance.Name }}</u-info-list-item>
        <u-info-list-item label="UUID">{{ instance.InstanceId }}</u-info-list-item>
        <u-info-list-item label="可用区">{{ instance.azList }}</u-info-list-item>
        <u-info-list-item label="状态">
            <u-status-icon :name="instance.statusInfo.icon">{{ (instance.statusInfo.label) }}</u-status-icon>
        </u-info-list-item>
        <u-info-list-item label="创建时间">{{ instance.CreateAt | timeFormat }}</u-info-list-item>
        <u-info-list-item label="实例类型">{{ instance.Network }}</u-info-list-item>
        <u-info-list-item label="描述" column="1">{{ instance.Description || '-' }}</u-info-list-item>
    </u-info-list-group>
</div>
</template>

<script>
import subscribe from '@necfe/cloud-ui-internal/src/utils/mixins/subscribe';
export default {
    mixins: [subscribe],
    data() {
        return {
            instance: {
                statusInfo: {},
            },
        };
    },
    subscribes: {
        loadDetail(instance) {
            this.instance = instance;
        },
    },
};
</script>

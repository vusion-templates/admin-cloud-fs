<template>
<div>
    <u-head-card :title="instance.Name">
        <div slot="info">
            <ul>
                <li>
                    <label>公网 IP：</label>{{ instance.Ip }}
                </li>
                <li>
                    <label>公网带宽：</label>{{ instance.Bandwidth }} Mbs
                </li>
                <li>
                    <label>状态：</label>{{ instance.StatusInfo.label }}
                </li>
                <li>
                    <label>更新时间：</label>{{ instance.CreateAt | dateFormat('yyyy-MM-dd HH:mm:ss') }}
                </li>
            </ul>
        </div>
    </u-head-card>
    <div>
        <u-tabs router>
            <u-tab title="详细信息" :to="{ path: '/ingress/detail/info', query: { id: $route.query.id } }"></u-tab>
            <u-tab title="安全组" :to="{ path: '/ingress/detail/securityGroups', query: { id: $route.query.id } }"></u-tab>
            <u-tab title="性能监控" :to="{ path: '/ingress/detail/monitor', query: { id: $route.query.id } }"></u-tab>
            <u-tab title="操作日志" :to="{ path: '/ingress/detail/logs', query: { id: $route.query.id } }"></u-tab>
        </u-tabs>
        <div>
            <router-view></router-view>
        </div>
    </div>
</div>
</template>

<script>
import ingressService from '../service';
import { MPublisher } from 'cloud-ui.vusion/dist';

export default {
    extends: MPublisher,
    data() {
        return {
            instance: {
                StatusInfo: {},
            },
        };
    },
    created() {
        this.getDetail();
    },
    methods: {
        getDetail() {
            ingressService.getDetail({
                uuid: this.$route.query.id,
            }).then((info) => this.instance = info.data);
        },
    },
    publish: {
        loadDetail: 'instance',
    },
};
</script>

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
            <u-tab exact title="详细信息" :to="{ path: '/ingress/detail', query: { id: $route.query.id } }"></u-tab>
            <u-tab title="性能监控" :to="{ path: '/ingress/detail/performance', query: { id: $route.query.id } }"></u-tab>
        </u-tabs>
        <div>
            <router-view></router-view>
        </div>
    </div>
</div>
</template>

<script>
import subscribe from '@necfe/cloud-ui-internal/src/utils/mixins/subscribe';
import ingressService from 'services/ingress';
export default {
    mixins: [subscribe],
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
    publishs: {
        loadDetail: 'instance',
    },
};
</script>

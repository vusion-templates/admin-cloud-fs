<template>
<u-linear-layout direction="vertical">
    <u-crumb>
        <u-crumb-item to="/ingress">负载均衡</u-crumb-item>
        <u-crumb-item disabled>创建负载均衡</u-crumb-item>
    </u-crumb>
    <u-form>
        <u-form-item label="计费方式">
            <u-radios v-model="form.chargeType">
                <u-radio :label="0">包年包月</u-radio>
                <u-radio :label="1">按量付费</u-radio>
            </u-radios>
        </u-form-item>
        <u-form-item label="可用区">
            <u-capsules :data="azList" v-model="form.az"></u-capsules>
        </u-form-item>
        <u-form-item label="网络" required layout="block">
            <u-form-table :class="$style.formTable">
                <thead><tr><th>VPC</th><th>子网</th></tr></thead>
                <tbody>
                    <tr>
                        <td>
                            <u-select size="huge medium" v-if="!vpcs.length" key="noVpc">
                                <u-select-item>暂无可选 VPC</u-select-item>
                            </u-select>
                            <u-select :disabled="disabled" size="huge medium" v-else v-model="form.currentVpcId" @select="loadSubnets($event.value)" key="vpc">
                                <u-select-item v-for="vpc in vpcs" :key="vpc.Id" :value="vpc.Id" :flag="vpc.IsDefault ? '默认 VPC' : undefined">
                                    {{ vpc.Name }}
                                </u-select-item>
                            </u-select>
                        </td>
                        <td style="display: relative;">
                            <u-form-item name="VirtualPrivateCloud" class="no-label-form-item" ref="VirtualPrivateCloud">
                                <u-select size="huge medium" v-if="classic && !subnets.length" disabled key="classicSelect">
                                    <u-select-item>-</u-select-item>
                                </u-select>
                                <u-select size="huge medium" v-else-if="!classic && !subnets.length" disabled key="emptySelect">
                                    <u-select-item>暂无可选择的子网</u-select-item>
                                </u-select>
                                <template v-else>
                                    <u-select :disabled="disabled" size="huge medium" v-model="form.currentSubnetId" key="select">
                                        <u-select-item v-for="subnet in subnets" :key="subnet.Id" :value="subnet.Id">
                                            {{ subnet.Name }}
                                        </u-select-item>
                                    </u-select>
                                </template>
                            </u-form-item>
                        </td>
                    </tr>
                </tbody>
            </u-form-table>
        </u-form-item>
        <u-form-item label="实例类型">
            <u-capsules :data="types" v-model="form.type"></u-capsules>
        </u-form-item>
        <u-form-item label="名称" required>
            <u-input ref="name" v-model="form.name" size="huge"></u-input>
        </u-form-item>
        <u-form-item label="描述">
            <u-input v-model="form.description" size="huge"></u-input>
        </u-form-item>
        <u-form-item>
            <u-submit-button :click="submit.bind(this)">
                <template slot-scope="scope">
                    <u-button color="primary"
                              :disabled="!canSubmit || scope.submitting"
                              :icon="scope.submitting ? 'loading' : ''" @click="scope.submit">
                        创建
                    </u-button>
                </template>
            </u-submit-button>
        </u-form-item>
    </u-form>
</u-linear-layout>
</template>

<script>
import ingressService from 'services/ingress';
import vpcService from 'services/vpc';
export default {
    data() {
        return {
            form: {
                chargeType: 1,
                az: 'a',
                type: 'public',
                name: '',
                description: '',
                currentVpcId: '',
                currentSubnetId: '',
            },
            azList: [{ text: '可用区 A', value: 'a' }, { text: '可用区 B', value: 'b' }],
            types: [{ text: '公网', value: 'public' }, { text: '私有网', value: 'private' }],
            vpcs: [],
            subnets: [],
            classic: false,
        };
    },
    computed: {
        canSubmit() {
            return this.form.name.trim() && this.form.description.trim();
        },
        disabled() {
            return false;
        },
    },
    created() {
        this.loadVpc();
    },
    methods: {
        loadVpc() {
            vpcService.getVpcs().then(({ data }) => {
                this.vpcs = data;
                return this.form.currentVpcId = data[0] ? data[0].Id : '';
            }).then((id) => this.loadSubnets(id));
        },
        loadSubnets(id) {
            if (!id)
                return;
            return vpcService.getSubnets({
                id,
            }).then(({ data }) => {
                this.subnets = data;
                return this.form.currentSubnetId = data[0] ? data[0].Id : '';
            });
        },
        submit() {
            return ingressService.createIngress({
                Name: this.form.name,
                AzList: this.form.az,
                Description: this.form.description,
                Network: this.form.type,
                VpcId: this.form.currentVpcId,
                SubnetId: this.form.currentSubnetId,
            }).then(() => this.$router.push('/ingress'));
        },
    },
};
</script>

<style module>
:global(.no-label-form-item) > div {
    max-width: 100% !important;
}
:global(.no-label-form-item) > label {
    width: 0 !important;
    padding-right: 0 !important;
}
.formTable > table {
    width: auto;
    margin-bottom: 5px;
}
</style>

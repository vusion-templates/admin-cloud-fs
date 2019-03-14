<template>
<u-form gap="large">
    <u-form-item label="计费方式" required>
        <u-radios v-model="model.chargeType">
            <u-radio label="0">包年包月</u-radio>
            <u-radio label="1">按量付费</u-radio>
        </u-radios>
    </u-form-item>
    <u-form-item label="可用区">
        <u-capsules v-model="model.availableZone">
            <u-capsule value="A">可用区 A</u-capsule>
            <u-capsule value="B">可用区 B</u-capsule>
        </u-capsules>
    </u-form-item>
    <u-form-item label="创建方式">
        <u-radios v-model="model.createType">
            <u-radio label="direct">直接创建</u-radio>
            <u-radio label="snapshot">从快照创建</u-radio>
        </u-radios>
    </u-form-item>
    <u-form-item label="名称" required>
        <u-input v-model="model.name" size="huge" maxlength="32" placeholder="1-32位小写字母、数字、或中划线组成，以字母开头，字母或数字结尾"></u-input>
    </u-form-item>
    <u-form-item label="适用范围" required layout="block">
        <u-capsules v-model="model.scope">
            <u-capsule value="Ext4">面向容器服务</u-capsule>
            <u-capsule value="Raw">面向云服务器</u-capsule>
        </u-capsules>
    </u-form-item>
    <u-form-item label="类型" required layout="block">
        <u-capsules v-model="model.ssdType">
            <u-capsule value="C_SSD">SSD 云盘</u-capsule>
            <u-capsule value="NBS_SSD">高性能 SSD 云盘</u-capsule>
        </u-capsules>
    </u-form-item>
    <u-form-item>
        <u-button color="primary">立即创建</u-button>
    </u-form-item>
</u-form>
</template>

<script>
export default {
    data() {
        return {
            model: {
                chargeType: '1',
                availableZone: 'A',
                createType: 'direct',
                name: '',
                scope: '',
                ssdType: 'C_SSD',
            },
        };
    },
};
</script>

<style scoped>
.test {}
</style>

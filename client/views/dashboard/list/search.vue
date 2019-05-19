<template>
<u-linear-layout direction="vertical">
    <u-form layout="inline" label-size="auto">
        <u-form-item label="查找类型">
            <u-select v-model="searchField">
                <u-select-item value="name">用户名</u-select-item>
                <u-select-item value="phone">手机号</u-select-item>
                <u-select-item value="email">邮箱</u-select-item>
            </u-select>
        </u-form-item>
        <u-form-item label="查找内容">
            <u-input size="normal medium" clearable v-model="searchKeyword" @keyup.enter="reload()" @clear="reload()"></u-input>
        </u-form-item>
        <u-form-item>
            <u-button color="primary" @click="reload()">查询</u-button>
        </u-form-item>
    </u-form>
    <u-table-view ref="tableView" striped :data-source="load" pageable remote-paging remote-sorting>
        <u-table-view-column sortable field="name" title="用户名"></u-table-view-column>
        <u-table-view-column field="phone" title="手机号"></u-table-view-column>
        <u-table-view-column field="email" title="邮箱"></u-table-view-column>
        <u-table-view-column field="remark" title="备注"></u-table-view-column>
        <u-table-view-column sortable field="createdTime" title="创建时间" formatter="placeholder | date"></u-table-view-column>
        <u-table-view-column sortable field="lastLoginTime" title="最近登录时间" formatter="placeholder | date"></u-table-view-column>
        <u-table-view-column title="操作">
            <template #cell="{ item }">
                <u-actions>
                    <u-action>更改配置</u-action>
                    <u-action>删除</u-action>
                </u-actions>
            </template>
        </u-table-view-column>
    </u-table-view>
</u-linear-layout>
</template>

<script>
import userService from '@/services/user/user';

export default {
    data() {
        return {
            searchField: 'name',
            searchKeyword: '',
        };
    },
    methods: {
        load({ paging, sorting, filtering }) {
            return userService.getList({
                limit: paging.limit,
                offset: paging.offset,
                sortField: sorting && sorting.field,
                sortOrder: sorting && sorting.order,
                searchField: this.searchField,
                searchKeyword: this.searchKeyword,
            });
        },
        reload() {
            this.$refs.tableView.reload();
        },
    },
};
</script>

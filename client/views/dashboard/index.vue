<template>
<l-dashboard>
    <u-navbar slot="head">
        <u-logo slot="left">演示</u-logo>
        <u-navbar-item href="/">首页</u-navbar-item>
        <u-navbar-item href="https://vusion.github.io" target="_blank">Vusion</u-navbar-item>
        <u-navbar-item href="https://github.com/vusion/cloud-ui" target="_blank">组件库</u-navbar-item>
        <u-navbar-item href="https://github.com/vusion-templates/admin-cloud-fs" target="_blank">GitHub</u-navbar-item>
        <div slot="right">
            <u-navbar-dropdown style="width: 100px; margin-right: 10px;">
                <div slot="title">user</div>
                <u-navbar-menu>
                    <u-navbar-menu-item to="/account/info">个人信息</u-navbar-menu-item>
                    <u-navbar-menu-item>安全退出</u-navbar-menu-item>
                </u-navbar-menu>
            </u-navbar-dropdown>
        </div>
    </u-navbar>
    <u-sidebar slot="side" collapsible>
        <u-sidebar-item to="/overview">总览</u-sidebar-item>
        <u-sidebar-group title="列表页">
            <u-sidebar-item to="/list/basic">基础列表</u-sidebar-item>
            <u-sidebar-item to="/list/search">搜索列表</u-sidebar-item>
        </u-sidebar-group>
        <u-sidebar-group title="个人页">
            <u-sidebar-item to="/account/info">个人信息</u-sidebar-item>
        </u-sidebar-group>
        <u-sidebar-item to="/ingress">综合模块</u-sidebar-item>
    </u-sidebar>
    <div slot="main" :overview="$route.path === '/overview'">
        <u-auto-crumb style="margin-bottom: 20px;"></u-auto-crumb>
        <router-view></router-view>
    </div>
</l-dashboard>
</template>

<script>
export default {
    name: 'u-global-layout',
};
</script>

<style module>
.sidebar {
    height: 100%;
}

.main[overview] {
    background: $background-color-base;
}
</style>

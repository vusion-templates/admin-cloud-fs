<template>
<div :class="$style.root">
    <header :class="$style.head">
        <u-logo :class="$style.left"></u-logo>
        <u-navbar :class="$style.right">
            <u-navbar-item href="/">首页</u-navbar-item>
            <u-navbar-item href="https://vusion.github.io" target="_blank">文档</u-navbar-item>
            <u-navbar-item href="https://github.com/vusion" target="_blank">GitHub</u-navbar-item>
        </u-navbar>
    </header>
    <aside :class="$style.side">
        <u-sidebar :class="$style.sidebar">
            <u-sidebar-item to="/overview">Overview</u-sidebar-item>
            <u-sidebar-item to="/basic">Basic</u-sidebar-item>
            <u-sidebar-item to="/form">Form</u-sidebar-item>
        </u-sidebar>
    </aside>
    <main :class="$style.main">
        <router-view></router-view>
    </main>
</div>
</template>

<script>
export default {
    name: 'u-global-layout',
};
</script>

<style module>
.head {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    height: 68px;
    background: #1ba67e;
    color: white;
    box-shadow: 0 3px 4px rgba(0,0,0,0.1);
    padding: 0 10px;
    z-index: 1;
}

.left {
    float: left;
}

.right {
    float: right;
}

.body {
    /* min-height: calc(100vh - 134px); */
    margin-top: 68px;
}

.side {
    position: fixed;
    top: 68px;
    left: 0;
    bottom: 0;
    width: 180px;
}

.main {
    position: fixed;
    top: 68px;
    left: 180px;
    bottom: 0;
    right: 0;
    padding: 40px;
}

.sidebar {
    height: 100%;
}
</style>

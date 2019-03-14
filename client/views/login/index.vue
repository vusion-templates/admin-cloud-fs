<template>
<div :class="$style.root">
    Login
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
    height: 64px;
    background: #1c2b41;
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
    margin-top: 64px;
}

.side {
    position: fixed;
    top: 64px;
    left: 0;
    bottom: 0;
    width: 160px;
}

.main {
    position: fixed;
    top: 64px;
    left: 160px;
    bottom: 0;
    right: 0;
    padding: 40px;
}

.sidebar {
    height: 100%;
}
</style>

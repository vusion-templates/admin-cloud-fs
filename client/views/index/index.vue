<template>
<div :class="$style.root">
    <header :class="$style.head">
        <u-navbar :class="$style.wrap">
            <u-logo slot="left"></u-logo>
            <u-navbar-item href="/dashboard">Dashboard</u-navbar-item>
            <u-navbar-item href="https://vusion.github.io" target="_blank">文档</u-navbar-item>
            <u-navbar-item href="https://github.com/vusion" target="_blank">GitHub</u-navbar-item>
        </u-navbar>
    </header>
    <main :class="$style.body">
        <section :class="$style.banner">
            <div :class="$style.bannerContent">
                <h1 :class="$style.heading">Hello World！</h1>
                <h2 :class="$style.subtitle">Welcome to Vusion App</h2>
            </div>
        </section>
    </main>
</div>
</template>

<script>
export default {};
</script>

<style module>
.head {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    height: $navbar-height;
    background: #1c2b40;
    color: white;
    box-shadow: 0 3px 4px rgba(0,0,0,0.1);
    padding: 0 10px;
    z-index: 1;
}

.wrap {
    width: 1180px;
    margin: 0 auto;
}

.banner {
    margin-top: $navbar-height;
    height: 480px;
    background: #f0f6fa;
    color: #676975;
}

.bannerContent {
    width: 1180px;
    margin: 0 auto;
    padding: 80px;
}

.heading {
    font-size: 52px;
    font-weight: normal;
    margin-bottom: 20px;
}

.subtitle {
    font-size: 28px;
    font-weight: normal;
    margin: 0;
}
</style>


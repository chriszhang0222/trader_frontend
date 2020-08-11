<template>
    <div class="wrapper">
        <vHeader></vHeader>
        <router-view></router-view>
    </div>
</template>

<script>
    import vHeader from "../components/Header";
    //import vSidebar from "../components/sidebar";
    export default {
        name: "Home",
        components: {vHeader}
    }
</script>

<style scoped>

</style>

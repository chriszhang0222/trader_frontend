<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-s-order"></i> Query
                </el-breadcrumb-item>
                <el-breadcrumb-item>History Deal</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-card shadow="hover" class="container">
            <his-trade-list/>
        </el-card>

    </div>
</template>

<script>
    import HisTradeList from "../components/HisTradeList";
    export default {
        name: "HisTradeQuery",
        components: {
            HisTradeList,
        },
    }
</script>

<style scoped>

</style>

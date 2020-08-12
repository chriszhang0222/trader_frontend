<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-s-order"></i> Query
                </el-breadcrumb-item>
                <el-breadcrumb-item>Today's Transaction</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-card shadow="hover" class="container">
            <trade-list/>
        </el-card>
    </div>
</template>

<script>
    import TradeList from "../components/TradeList";
    export default {
        name: "TradeQuery",
        components: {TradeList}
    }
</script>

<style scoped>

</style>
